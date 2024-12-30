from typing import List, Annotated, Sequence
from typing_extensions import TypedDict
from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages


class AgentState(TypedDict):
    """
    Represents the state of our graph.

    Attributes:
        url: current url
        question: question
        generation: LLM generation
        documents: list of documents
        messages: list of messages
    """

    url: str
    question: str
    generation: str
    documents: List[str]
    messages: Annotated[Sequence[BaseMessage], add_messages]
    max_retries_rewrite: int
    max_generations: int
