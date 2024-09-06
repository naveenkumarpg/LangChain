from langchain.prompts import PromptTemplate
from langchain import hub
from langchain.agents import Tool, AgentExecutor, initialize_agent, create_react_agent
from langchain.tools import DuckDuckGoSearchRun, WikipediaQueryRun
from langchain.utilities import WikipediaAPIWrapper
from langchain_experimental.tools.python.tool import PythonREPLTool
from langchain_openai import ChatOpenAI

# Initialize the ChatOpenAI model (gpt-4-turbo-preview) with a temperature of 0. Utilize gpt-3.5-turbo if you use the free plan
llm = ChatOpenAI(model_name="gpt-4-turbo-preview", temperature=0)

# Define a template for answering questions
template = """
Answer the following questions in GERMAN as best you can.
Questions: {q}
"""

# Create a PromptTemplate object from the template
prompt_template = PromptTemplate.from_template(template)

# Pull the react prompt from the hub
prompt = hub.pull("hwchase17/react")

# displaying information about the react prompt
# print(type(prompt))
# print(prompt.input_variables)
# print(prompt.template)


# Create tools for the agent

# 1. Python REPL Tool (for executing Python code)
python_repl = PythonREPLTool()
python_repl_tool = Tool(
    name="Python REPL",
    func=python_repl.run,
    description="Useful when you need to use Python to answer a question. You should input Python code.",
)

# 2. Wikipedia Tool (for searching Wikipedia)
api_wrapper = WikipediaAPIWrapper()
wikipedia = WikipediaQueryRun(api_wrapper=api_wrapper)
wikipedia_tool = Tool(
    name="Wikipedia",
    func=wikipedia.run,
    description="Useful for when you need to look up a topic, country, or person on Wikipedia.",
)

# 3. DuckDuckGo Search Tool (for general web searches)
search = DuckDuckGoSearchRun()
duckduckgo_tool = Tool(
    name="DuckDuckGo Search",
    func=search.run,
    description="Useful for when you need to perform an internet search to find information that another tool can't provide.",
)

# Combine the tools into a list
tools = [python_repl_tool, wikipedia_tool, duckduckgo_tool]

# Create a react agent with the ChatOpenAI model, tools, and prompt
agent = create_react_agent(llm, tools, prompt)

# Initialize the AgentExecutor
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,
    handle_parsing_errors=True,
    max_iterations=10,
)
