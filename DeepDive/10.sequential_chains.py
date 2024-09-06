import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv(), override=True)
# Loading Open api key
os.environ.get("OPENAI_API_KEY")

from langchain_openai import ChatOpenAI
from langchain import PromptTemplate
from langchain.chains import LLMChain, SimpleSequentialChain

# creating llm instance
llm = ChatOpenAI(model_name="gpt-3.5-turbo-0125", temperature=1.6, verbose=True)

# CHAIN ONE
prompt_template_one = PromptTemplate.from_template(
    template="""You are an experienced python, AI and ML programmer. Write a program that implements the concept of {concept}"""
)
chain_one = LLMChain(llm=llm, prompt=prompt_template_one)


# CHAIN TWO
prompt_template_two = PromptTemplate.from_template(
    template="""Given the python function {function}, describe it in detail as possible with comments to every line."""
)
chain_two = LLMChain(llm=llm, prompt=prompt_template_two)


# Merging the chains
all_chains = SimpleSequentialChain(chains=[chain_one, chain_two], verbose=True)

# Invoking the chains
response = all_chains.invoke("Linear Regression")
print(response["output"])
