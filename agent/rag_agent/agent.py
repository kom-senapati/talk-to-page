from langgraph.graph import END, StateGraph, START
from rag_agent.state import AgentState
from rag_agent.nodes import (
    generate,
    grade_documents,
    retrieve,
    transform_query,
    update_url,
    no_context
)
from rag_agent.edges import (
    decide_to_generate,
    grade_generation_v_documents_and_question,
    new_url,
)
from langgraph.checkpoint.memory import MemorySaver


workflow = StateGraph(AgentState)

workflow.add_node("update_url", update_url)
workflow.add_node("retrieve", retrieve)
workflow.add_node("grade_documents", grade_documents)
workflow.add_node("generate", generate)
workflow.add_node("transform_query", transform_query)
workflow.add_node("no_context", no_context)

workflow.add_conditional_edges(
    START,
    new_url,
    {
        "update_url": "update_url",
        "retrieve": "retrieve",
    },
)
workflow.add_edge("retrieve", "grade_documents")
workflow.add_conditional_edges(
    "grade_documents",
    decide_to_generate,
    {
        "transform_query": "transform_query",
        "generate": "generate",
    },
)
workflow.add_edge("transform_query", "retrieve")
workflow.add_conditional_edges(
    "generate",
    grade_generation_v_documents_and_question,
    {
        "not supported": "generate",
        "useful": END,
        "not useful": "transform_query",
        "no_context": "no_context",
    },
)
workflow.add_edge("update_url", END)
workflow.add_edge("no_context", END)

graph = workflow.compile(checkpointer=MemorySaver())
