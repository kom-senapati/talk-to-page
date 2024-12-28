"""
This is the main entry point for the AI.
It defines the workflow graph and the entry point for the agent.
"""
# pylint: disable=line-too-long, unused-import

from typing import TypedDict, Annotated
from langchain_groq import ChatGroq
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    """Contains the state of the agent."""
    messages: Annotated[list, add_messages]

llm = ChatGroq(model="llama-3.3-70b-versatile")

def chatbot(state: AgentState):
    return {"messages": [llm.invoke(state["messages"])]}

workflow = StateGraph(AgentState)
workflow.add_node("chat", chatbot)
workflow.set_entry_point("chat")
workflow.add_edge("chat", END)

memory = MemorySaver()
graph = workflow.compile(checkpointer=memory)
