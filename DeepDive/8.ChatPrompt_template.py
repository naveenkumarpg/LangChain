import os
from dotenv import load_dotenv, find_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, HumanMessagePromptTemplate
from langchain_core.messages import SystemMessage

load_dotenv(find_dotenv(), override=True)

# Loading Open api key
os.environ.get("OPENAI_API_KEY")

chat_template = ChatPromptTemplate.from_messages(
    [
        SystemMessage(content="You will respond to me in JSON format only"),
        HumanMessagePromptTemplate.from_template(
            "Top {num} countries in {area} by population"
        ),
    ]
)

messages = chat_template.format_messages(num=10, area="Asia")

print(messages)

llm = ChatOpenAI(model_name="gpt-4o", temperature=0.9)

response = llm.invoke(messages)

print(response)
print(response.content)
