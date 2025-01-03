import { useState, useEffect } from "react";

interface TextToSpeechHook {
  speak: (text: string, voice?: SpeechSynthesisVoice | null, rate?: number, pitch?: number) => void;
  pause: () => void;
  resume: () => void;
  cancel: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  voices: SpeechSynthesisVoice[];
  getSpeakingState: () => { isSpeaking: boolean; isPaused: boolean };
}

export const useTextToSpeech = (): TextToSpeechHook => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      setVoices(synth.getVoices());
    };

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, []);

  const speak = (
    text: string,
    voice: SpeechSynthesisVoice | null = null,
    rate: number = 1,
    pitch: number = 1
  ) => {
    const synth = window.speechSynthesis;
    synth.cancel(); // Cancel any ongoing speech
    if (text === "") {
      console.error("No text provided to speak.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onerror = (event) => {
      if (event.error !== 'interrupted') {
        console.error("SpeechSynthesisUtterance error:", event.error);
      }
      setIsSpeaking(false);
      setIsPaused(false);
    };

    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = rate;
    utterance.pitch = pitch;
    synth.speak(utterance);
  };

  const pause = () => {
    const synth = window.speechSynthesis;
    if (synth.speaking && !synth.paused) {
      synth.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    const synth = window.speechSynthesis;
    if (synth.speaking && synth.paused) {
      synth.resume();
      setIsPaused(false);
    }
  };

  const cancel = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const getSpeakingState = () => ({ isSpeaking, isPaused });

  return { speak, pause, resume, cancel, isSpeaking, isPaused, voices, getSpeakingState };
};