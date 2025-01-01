"use client"

import ChatInterface from "@/components/chat-interface";
import Header from "@/components/header";
import RetroGrid from "@/components/ui/retro-grid";
import UrlInput from "@/components/url-input";
import Wrapper from "@/components/wrapper";
import { useToast } from "@/hooks/use-toast";
import { useCoAgent, useCopilotChat } from "@copilotkit/react-core";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";

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
  const { isLoading, appendMessage, visibleMessages } = useCopilotChat()
  const { toast } = useToast()

  const handleSave = () => {
    if (!state.url) return;
    run(() => new TextMessage({ role: Role.System, content: "URL UPDATED" }))
    toast({
      title: "URL UPDATED",
      description: "The URL has been updated successfully.",
    })
  }

  return (
    <Wrapper>
      <Header />
      <UrlInput state={state} setState={setState} handleSave={handleSave} isLoading={false} />
      <ChatInterface
        isLoading={isLoading}
        appendMessage={appendMessage}
        visibleMessages={visibleMessages as TextMessage[]}
      />

      <RetroGrid className="z-0" />
    </Wrapper>
  )
}