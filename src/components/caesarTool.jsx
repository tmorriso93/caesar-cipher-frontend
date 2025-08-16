"use client";

import { useMemo, useState } from "react";
import { caesar, caesarDecrypt, normalizeShift } from "@/lib/caesar";

export default function CaesarTool() {
  const [input, setInput] = useState("");
  const [shift, setShift] = useState(2);
  const [mode, setMode] = useState("encrypt"); // "encrypt" | "decrypt"

  const output = useMemo(() => {
    const s = Number.isFinite(shift) ? shift : 0;
    return mode === "encrypt" ? caesar(input, s) : caesarDecrypt(input, s);
  }, [input, shift, mode]);

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="text-2xl font-semibold text-center">Caesar Cipher</h1>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Text</label>
        <textarea
          className="w-full resize-y rounded-md border p-3 text-green-500"
          rows={6}
          placeholder="Type or paste your message here…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="flex items-end gap-4 flex-wrap">
        <div>
          <label className="block text-sm font-medium">Shift</label>
          <input
            type="number"
            className="w-28 rounded-md border p-2"
            value={shift}
            onChange={(e) => setShift(parseInt(e.target.value || "0", 10))}
          />
          <p className="text-xs text-gray-500 mt-1">
            Effective shift: {normalizeShift(Number.isFinite(shift) ? shift : 0)}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            className={`rounded-md border px-4 py-2 ${mode === "encrypt" ? "bg-black text-white" : ""}`}
            onClick={() => setMode("encrypt")}
          >
            Encrypt
          </button>
          <button
            className={`rounded-md border px-4 py-2 ${mode === "decrypt" ? "bg-black text-white" : ""}`}
            onClick={() => setMode("decrypt")}
          >
            Decrypt
          </button>
        </div>

        <button
          className="rounded-md border px-4 py-2"
          onClick={() => setInput(output)}
          disabled={!input}
          title="Apply result back into the input"
        >
          Apply to Input
        </button>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          {mode === "encrypt" ? "Encrypted" : "Decrypted"} Result
        </label>
        <textarea
          className="w-full resize-y rounded-md border p-3 bg-gray-50 text-green-500"
          rows={6}
          readOnly
          value={output}
        />
      </div>
    </div>
  );
}
