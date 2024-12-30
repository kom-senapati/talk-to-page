import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CopilotKit } from "@copilotkit/react-core";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TalkToPage",
  description: "Explore web content like never before. TalkToPage allows you to interact with any URL, enabling real-time discussions, insights, and exploration of webpage content. Transform static browsing into a dynamic and engaging experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💬</text></svg>" />
      </head>
      <body className={inter.className}>
        <CopilotKit runtimeUrl="/api/copilotkit" agent="rag_agent">
          {children}
        </CopilotKit>
      </body>
    </html>
  );
}
