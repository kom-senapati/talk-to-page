"""Demo"""

from copilotkit import CopilotKitSDK, LangGraphAgent
from copilotkit.integrations.fastapi import add_fastapi_endpoint
from dotenv import load_dotenv
from fastapi import FastAPI
from rag_agent.agent import graph
import os
import uvicorn

load_dotenv()

app = FastAPI()
sdk = CopilotKitSDK(
    agents=[
        LangGraphAgent(
            name="rag_agent",
            description="A rag_agent that's used for chatting with an url",
            graph=graph,
        )
    ],
)

add_fastapi_endpoint(app, sdk, "/copilotkit")


def main():
    """Run the uvicorn server."""
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("rag_agent.demo:app", host="0.0.0.0", port=port, reload=True)
