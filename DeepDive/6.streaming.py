import os
from dotenv import load_dotenv, find_dotenv
from langchain_openai import ChatOpenAI

load_dotenv(find_dotenv(), override=True)

# Loading Open api key
os.environ.get("OPENAI_API_KEY")

# creating llm instance
llm = ChatOpenAI()

# Creating prompt
prompt = "Writ eme a songs about Romeo and juliet"

for chunk in llm.stream(prompt):
    print(chunk.content, end="", flush=True)
