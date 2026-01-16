import os
import json
import requests
import datetime
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Constants
ARTICLES_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src', 'data', 'articles.json')
NEWS_API_KEY = os.environ.get("NEWS_API_KEY")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

def fetch_market_news():
    """Fetches high-level market and AI news."""
    if not NEWS_API_KEY:
        return "NewsAPI Key missing. Simulating news data."
        
    url = "https://newsapi.org/v2/everything"
    params = {
        "q": "Artificial Intelligence OR Tech Markets OR NVDA OR OpenAI",
        "language": "en",
        "sortBy": "publishedAt",
        "pageSize": 5,
        "apiKey": NEWS_API_KEY
    }
    
    try:
        response = requests.get(url, params=params)
        data = response.json()
        articles = data.get("articles", [])
        
        summary = ""
        for i, art in enumerate(articles[:3]):
            summary += f"- {art['title']}: {art['description']}\n"
            
        return summary if summary else "No recent news found."
    except Exception as e:
        return f"Error fetching news: {e}"

def generate_article(news_summary):
    """Generates a blog post using LangChain and OpenAI."""
    if not OPENAI_API_KEY:
        print("Error: OPENAI_API_KEY not found.")
        return None

    template = """
    You are an expert tech and market analyst writing for a product leader's personal blog.
    
    Recent News Context:
    {news_summary}
    
    Write a short, punchy weekly insight article (max 1500 characters).
    - Title: Catchy and professional.
    - Style: Insightful, optimistic but grounded, data-driven.
    - Focus: The intersection of AI, Product Management, and Market Trends.
    - Structure:
        1. A strong opening hook.
        2. Key observation from the news.
        3. Strategic takeaway for leaders.
    - Formatting: Use Markdown. Use bolding for emphasis.
    
    Return the response as a JSON object with keys: "title" and "content".
    """
    
    prompt = PromptTemplate(template=template, input_variables=["news_summary"])
    llm = ChatOpenAI(model_name="gpt-4", temperature=0.7)
    chain = prompt | llm | StrOutputParser()
    
    try:
        result = chain.invoke({"news_summary": news_summary})
        # Clean up potential markdown formatting in the response if the LLM wraps it in ```json ... ```
        cleaned_result = result.replace("```json", "").replace("```", "").strip()
        return json.loads(cleaned_result)
    except Exception as e:
        print(f"Error generating article: {e}")
        return None

def save_article(article_data):
    """Appends the new article to the JSON file."""
    if not article_data:
        return

    new_entry = {
        "id": datetime.datetime.now().strftime("%Y%m%d%H%M%S"),
        "date": datetime.datetime.now().strftime("%B %d, %Y"),
        "title": article_data.get("title", "Weekly Insights"),
        "content": article_data.get("content", ""),
        "tags": ["AI", "Markets", "Strategy"]
    }

    # Load existing articles
    if os.path.exists(ARTICLES_FILE):
        with open(ARTICLES_FILE, 'r') as f:
            try:
                articles = json.load(f)
            except json.JSONDecodeError:
                articles = []
    else:
        articles = []

    # Prepend new article (newest first)
    articles.insert(0, new_entry)

    # Save back
    with open(ARTICLES_FILE, 'w') as f:
        json.dump(articles, f, indent=2)
    
    print(f"Successfully saved article: {new_entry['title']}")

if __name__ == "__main__":
    print("Fetching news...")
    news = fetch_market_news()
    
    print("Generating insights...")
    article = generate_article(news)
    
    if article:
        save_article(article)
    else:
        print("Failed to generate article.")
