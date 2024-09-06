import os
from dotenv import load_dotenv, find_dotenv
from langchain_openai import ChatOpenAI

load_dotenv(find_dotenv(), override=True)


# Loading Open api key
os.environ.get("OPENAI_API_KEY")

# creating llm instance
llm = ChatOpenAI()

help(ChatOpenAI)
