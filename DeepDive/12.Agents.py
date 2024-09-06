import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv(), override=True)
# Loading Open api key
os.environ.get("OPENAI_API_KEY")

from langchain_experimental.agents.agent_toolkits import create_python_agent
from langchain_experimental.tools.python.tool import PythonREPLTool
from langchain_openai import ChatOpenAI


# creating llm instance
llm = ChatOpenAI(model_name="gpt-4o-mini", temperature=1.6, verbose=True)

agent_executor = create_python_agent(llm=llm, tool=PythonREPLTool(), verbose=True)

agent_executor.invoke("3.4**4.5")
