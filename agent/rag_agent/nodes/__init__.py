from rag_agent.nodes.retriever import retriever_instance
from rag_agent.nodes.generate import rag_chain
from rag_agent.nodes.retrieval_grader import retrieval_grader
from rag_agent.nodes.question_rewriter import question_rewriter
from langchain_core.messages import HumanMessage


def update_url(state):
    print("---UPDATE URL---")

    new_url = state["url"]
    print(f"---NEW URL DETECTED: {new_url}---")

    retriever_instance.update_retriever(new_url)

    print("---RETRIEVER TOOL UPDATED---")

    return {**state, "url": new_url, "messages": []}


def retrieve(state):
    """
    Retrieve documents

    Args:
        state (dict): The current graph state

    Returns:
        state (dict): New key added to state, documents, that contains retrieved documents
    """
    print("---RETRIEVE---")
    messages = state["messages"]
    question = messages[-1].content

    retriever = retriever_instance.retriever
    documents = retriever.invoke(question)
    return {
        **state,
        "documents": documents,
        "question": question,
        "max_retries_rewrite": state.get("max_retries_rewrite", 0),
        "max_generations": state.get("max_generations", 0),
    }


def generate(state):
    """
    Generate answer

    Args:
        state (dict): The current graph state

    Returns:
        state (dict): New key added to state, generation, that contains LLM generation
    """
    print("---GENERATE---")
    question = state["question"]
    documents = state["documents"]

    generation = rag_chain.invoke({"context": documents, "question": question})
    return {
        **state,
        "documents": documents,
        "question": question,
        "generation": generation,
    }


def grade_documents(state):
    """
    Determines whether the retrieved documents are relevant to the question.

    Args:
        state (dict): The current graph state

    Returns:
        state (dict): Updates documents key with only filtered relevant documents
    """

    print("---CHECK DOCUMENT RELEVANCE TO QUESTION---")
    question = state["question"]
    documents = state["documents"]

    filtered_docs = []
    for d in documents:
        score = retrieval_grader.invoke(
            {"question": question, "document": d.page_content}
        )
        grade = score.binary_score
        if grade == "yes":
            print("---GRADE: DOCUMENT RELEVANT---")
            filtered_docs.append(d)
        else:
            print("---GRADE: DOCUMENT NOT RELEVANT---")
            continue
    return {**state, "documents": filtered_docs, "question": question}


def transform_query(state):
    """
    Transform the query to produce a better question.

    Args:
        state (dict): The current graph state

    Returns:
        state (dict): Updates question key with a re-phrased question
    """

    print("---TRANSFORM QUERY---")
    question = state["question"]
    documents = state["documents"]

    better_question = question_rewriter.invoke({"question": question})
    return {**state, "documents": documents, "question": better_question}


def no_context(state):
    print("---NO CONTEXT---")

    messages = state["messages"]
    messages.append(HumanMessage("I'm sorry, I can't find any relevant information."))

    return state
