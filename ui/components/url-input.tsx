"use client"

import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function UrlInput({
  state,
  setState,
  handleSave,
  isLoading
}: {
  state: { url: string },
  setState: (state: { url: string }) => void,
  handleSave: () => void,
  isLoading: boolean
}) {
  return (
    <div className="flex gap-2 mb-6">
      <Input
        placeholder="Enter page URL..."
        value={state.url}
        onChange={(e) => setState({ url: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSave();
          }
        }}
        className="flex-1"
      />
      <Button variant="secondary" effect="ringHover" onClick={handleSave} disabled={!state.url || isLoading}>Save</Button>
    </div>
  )
}