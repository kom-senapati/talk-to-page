"use client";

import { CopilotKit } from "@copilotkit/react-core";
import { CopilotChat, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function Home() {
  return (
    <main className="h-screen w-full p-10" style={{
      "--copilot-kit-primary-color": "#0078D7",
      "--copilot-kit-contrast-color": "#FFFFFF",
      "--copilot-kit-secondary-color": "#F3F4F6",
      "--copilot-kit-secondary-contrast-color": "#333333",
      "--copilot-kit-background-color": "#F9FAFB",
      "--copilot-kit-muted-color": "#6B7280",
      "--copilot-kit-separator-color": "#E5E7EB",
      "--copilot-kit-scrollbar-color": "#D1D5DB",
      "--copilot-kit-response-button-color": "#2563EB",
      "--copilot-kit-response-button-background-color": "#EFF6FF"
    } as CopilotKitCSSProperties}>
      <CopilotKit runtimeUrl="/api/copilotkit" agent="chatbot">
        <div>
          <h1 className="text-2xl text-center">🦙 LLama Chat 🦙</h1>
        </div>
        <CopilotChat
          className="h-full w-full"
          labels={{
            title: "LLama Assistant",
            initial: "Hi! 👋 How can I assist you today?",
          }}
        />
      </CopilotKit>
    </main>
  );
}
