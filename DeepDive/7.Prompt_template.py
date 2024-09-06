import os
from dotenv import load_dotenv, find_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate

load_dotenv(find_dotenv(), override=True)

# Loading Open api key
os.environ.get("OPENAI_API_KEY")

template = """You are famous and very knowledgeable archeologist, Provide the details about {place}. place, in {lang} language."""
prompt_template = PromptTemplate.from_template(template=template)
prompt = prompt_template.format(place="Taj Mahal, Agra", lang="English")

# creating llm instance
llm = ChatOpenAI(model_name="gpt-4o", temperature=0.9)

answer = llm.invoke(prompt)
print(answer.content)
