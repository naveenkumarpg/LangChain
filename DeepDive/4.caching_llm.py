# Caching allows to boost performance and optimize interactions with LLM's by reducing API calls and speeding up application request/response cycles, resulting more efficient user experience


# LLm cache
import os
from dotenv import load_dotenv, find_dotenv
from langchain.globals import set_llm_cache
from langchain_openai import OpenAI
from langchain.cache import InMemoryCache

load_dotenv(find_dotenv(), override=True)

# Loading Open api key
os.environ.get("OPENAI_API_KEY")

# creating llm instance
llm = OpenAI(model_name="gpt-3.5-turbo-instruct")

set_llm_cache(InMemoryCache())

answer = llm.invoke("Tell me a Joke that only software engineers only understand")

print(answer)
