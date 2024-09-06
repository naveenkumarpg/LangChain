from langchain_community.utilities import DuckDuckGoSearchAPIWrapper
from langchain.tools import DuckDuckGoSearchResults

wrapper = DuckDuckGoSearchAPIWrapper(
    region="de-de", max_results=3, safesearch="moderate"
)
search = DuckDuckGoSearchResults(api_wrapper=wrapper, source="news")
output = search.run("Berlin")
