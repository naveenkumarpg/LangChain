# with sequential chains, you can make a series of calls to one or more LL<s. You can take the output from one chain and use it as input to other chain.

# There are two types of chains
# - SimpleSequential chains
#    - SimpleSequentialChain represents a series of chains, where each individual chain has single inout and a single output, and the output of one step is used as input to the next

# - General form of sequential chains
#   -

import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv(), override=True)
# Loading Open api key
os.environ.get("OPENAI_API_KEY")

from langchain_openai import ChatOpenAI
from langchain import PromptTemplate
from langchain.chains import LLMChain

# creating llm instance
llm = ChatOpenAI()

template = """You are famous and very knowledgeable archeologist, Provide the details about {place}. place, in {lang} language."""
prompt_template = PromptTemplate.from_template(template=template)

chain = LLMChain(llm=llm, prompt=prompt_template, verbose=True)

response = chain.invoke({"place": "Buckingham Palace", "lang": "English"})

print(response)
print(response["text"])
