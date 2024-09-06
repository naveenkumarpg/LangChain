import os
from dotenv import load_dotenv, find_dotenv
from langchain_openai import ChatOpenAI

load_dotenv(find_dotenv(), override=True)


# Loading Open api key
os.environ.get("OPENAI_API_KEY")

# creating llm instance
llm = ChatOpenAI()

# invoking the llm with the prompt
response = llm.invoke(
    "You will respond to me in JSON format only, Top 10 countries in asia by population"
)

print(response)
print(response.content)
