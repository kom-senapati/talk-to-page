"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCoAgent, useCopilotChat } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import { MessageRole, TextMessage } from "@copilotkit/runtime-client-gql";
import "@copilotkit/react-ui/styles.css";

interface AgentState {
  url: string
}

export default function Home() {
  const { state, setState, run } = useCoAgent<AgentState>({
    name: "rag_agent",
    initialState: {
      url: "https://blog.langchain.dev/langgraph/"
    }
  })

  const { isLoading } = useCopilotChat()

  const handleSave = () => {
    run(() => new TextMessage({ role: MessageRole.System, content: "URL UPDATED" }))
  }

  return (
    <main className="h-screen w-full p-4 md:p-10">
      <div className="h-[20%] flex flex-col">
        <h1 className="text-2xl md:text-5xl font-bold text-center mb-5">🗣️ TalkToPage 🌐📄</h1>
        <div className="flex flex-row justify-center gap-2">
          <Input
            type="text"
            placeholder="Enter URL"
            value={state.url}
            onChange={(e) => setState({ url: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log(state)
                e.preventDefault();
                handleSave();
              }
            }}
            className="flex-grow md:max-w-lg"
          />
          <Button onClick={handleSave} disabled={!state.url || isLoading}>
            Save
          </Button>
        </div>
      </div>
      <CopilotChat
        className="h-[80%] w-full"
        labels={{
          title: "LLama Assistant",
          initial: "Hi! 👋 How can I assist you today?",
        }}
      />
    </main>
  );
}
