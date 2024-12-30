from rag_agent.edges.hallucination_grader import hallucination_grader
from rag_agent.edges.answer_grader import answer_grader
from langchain_core.messages import SystemMessage, HumanMessage


def new_url(state):
    messages = state["messages"]
    last_message = messages[-1]

    if (
        isinstance(last_message, SystemMessage)
        and "URL UPDATED" in last_message.content
    ):
        return "update_url"

    return "retrieve"


def decide_to_generate(state):
    """
    Determines whether to generate an answer, or re-generate a question.

    Args:
        state (dict): The current graph state

    Returns:
        str: Binary decision for next node to call
    """

    print("---ASSESS GRADED DOCUMENTS---")
    state["question"]
    filtered_documents = state["documents"]

    if not filtered_documents:
        # print(f"max_retries_rewrite: {state['max_retries_rewrite']}")
        # if state["max_retries_rewrite"] < 2:
        #     state.update({"max_retries_rewrite": state["max_retries_rewrite"] + 1})

        print(
            "---DECISION: ALL DOCUMENTS ARE NOT RELEVANT TO QUESTION, TRANSFORM QUERY---"
        )
        return "transform_query"
        # else:
        #     state.update({"max_retries_rewrite": 0})

        #     print("---DECISION: ALL DOCUMENTS ARE NOT RELEVANT TO QUESTION, STOP---")
        #     return "no_context"
    else:
        print("---DECISION: GENERATE---")
        return "generate"


def grade_generation_v_documents_and_question(state):
    """
    Determines whether the generation is grounded in the document and answers question.

    Args:
        state (dict): The current graph state

    Returns:
        str: Decision for next node to call
    """

    print("---CHECK HALLUCINATIONS---")
    question = state["question"]
    documents = state["documents"]
    generation = state["generation"]

    score = hallucination_grader.invoke(
        {"documents": documents, "generation": generation}
    )
    grade = score.binary_score

    if grade == "yes":
        print("---DECISION: GENERATION IS GROUNDED IN DOCUMENTS---")

        print("---GRADE GENERATION vs QUESTION---")
        score = answer_grader.invoke({"question": question, "generation": generation})
        grade = score.binary_score

        if grade == "yes":
            messages = state["messages"]
            messages.append(HumanMessage(generation))

            print("---DECISION: GENERATION ADDRESSES QUESTION---")
            return "useful"
        else:
            # print(f"max_retries_rewrite: {state['max_retries_rewrite']}")
            # if state["max_retries_rewrite"] < 2:
            #     state["max_retries_rewrite"] += 1

            print("---DECISION: GENERATION DOES NOT ADDRESS QUESTION---")
            return "not useful"
            # else:
            #     state["max_retries_rewrite"] = 0

            #     print("---DECISION: GENERATION DOES NOT ADDRESS QUESTION, STOP---")
            #     return "no_context"
    else:
        # print(f"max_generations: {state['max_generations']}")
        # if state["max_generations"] < 2:
        #     state["max_generations"] += 1

        print("---DECISION: GENERATION IS NOT GROUNDED IN DOCUMENTS, RE-TRY---")
        return "not supported"
        # else:
        #     state["max_generations"] = 0

        #     print("---DECISION: GENERATION IS NOT GROUNDED IN DOCUMENTS, STOP---")
        #     return "no_context"
