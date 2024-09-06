import os
from dotenv import load_dotenv, find_dotenv
from langchain.schema import SystemMessage, AIMessage, HumanMessage
from langchain_openai import ChatOpenAI

load_dotenv(find_dotenv(), override=True)

# Loading Open api key
os.environ.get("OPENAI_API_KEY")

messages = [
    SystemMessage(content="You are archeologist, respond only in French language"),
    HumanMessage(content="Explain what is the oldest language on this world"),
]

# creating llm instance
llm = ChatOpenAI()

answer = llm.invoke(messages)

print(answer.content)
