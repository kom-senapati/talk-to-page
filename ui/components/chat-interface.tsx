"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useSpeechToText } from "@/hooks/use-speech-to-text"
import { useTextToSpeech } from "@/hooks/use-text-to-speech"
import { cn } from "@/lib/utils"
import { Role, TextMessage } from "@copilotkit/runtime-client-gql"
import { Loader2, Mic, MicOff, Pause, Play, Send, Square, Volume2 } from 'lucide-react'
import { useEffect, useRef, useState } from "react"
import { Textarea } from "./ui/textarea"

export default function ChatInterface({
  isLoading,
  appendMessage,
  visibleMessages
}: {
  isLoading: boolean
  appendMessage: (message: TextMessage) => void
  visibleMessages: TextMessage[]
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState("")
  const { transcript, isListening, startListening, stopListening, error: speechToTextError } = useSpeechToText()
  const { speak, pause, resume, cancel, isSpeaking, isPaused, getSpeakingState } = useTextToSpeech()
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setInputValue(transcript)
  }, [transcript])

  useEffect(() => {
    if (speechToTextError) {
      console.error("Speech-to-text error:", speechToTextError)
    }
  }, [speechToTextError])

  useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      appendMessage(new TextMessage({
        content: inputValue,
        role: Role.User
      }))
      setInputValue("")
    }
  }

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const handleSpeak = (messageId: string, content: string) => {
    if (speakingMessageId && speakingMessageId !== messageId) {
      cancel();
    }
    speak(content);
    setSpeakingMessageId(messageId);
  }

  const handlePauseResume = () => {
    const { isPaused } = getSpeakingState();
    if (isPaused) {
      resume();
    } else {
      pause();
    }
  }

  const handleStop = () => {
    cancel();
    setSpeakingMessageId(null);
  }

  return (
    <Card className="bg-[#F7F7F8] dark:bg-[#191A19] flex-grow flex flex-col overflow-hidden">
      <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
        {visibleMessages.map((message) => message.content && (
          <div
            key={message.id}
            className={cn("flex items-start gap-2 group", {
              "justify-end": (message.role === "user"),
            })}
          >
            {(message.role === "assistant") && (
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://robohash.org/coagents-rag" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn("relative rounded-2xl px-4 py-2 max-w-md text-sm", {
                "bg-secondary text-secondary-foreground": (message.role === "assistant"),
                "bg-primary text-primary-foreground": (message.role === "user"),
              })}
            >
              {message.role === "assistant" && (
                <div className="bg-red absolute -top-5 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleSpeak(message.id, message.content)}
                    className="h-6 w-6"
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                  {isSpeaking && speakingMessageId === message.id && (
                    <>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={handlePauseResume}
                        className="h-6 w-6"
                      >
                        {isPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleStop}
                        className="h-6 w-6"
                      >
                        <Square className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                </div>
              )}
              {message.content}
            </div>
            {(message.role === "user") && (
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://avatar.iran.liara.run/public/41" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://robohash.org/coagents-rag" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="bg-secondary text-secondary-foreground rounded-2xl px-4 py-2 max-w-md text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="relative p-4 pt-2">
        <div className="relative w-full">
          <Textarea
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.slice(0, 85))}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            className="w-full min-h-[80px] max-h-[160px] pr-24"
            style={{ "scrollbarWidth": "none" }}
          />
          <div className="absolute bottom-5 right-5 flex gap-2">
            <Button
              onClick={toggleListening}
              size="icon"
              effect="shineHover"
              variant="outline"
              className="rounded-full"
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button
              onClick={handleSendMessage}
              size="icon"
              effect="shineHover"
              className="rounded-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}