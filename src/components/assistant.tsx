"use client";
import { useState } from "react";
import { Sparkles, ArrowUpRight, ArrowUp, LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
function Answer({ text }: { text: string }) {
  return (
    <>
      {text
        .split(
          /(\/resume\/vishaka-parab-public-resume\.pdf|\/projects\/[a-z-]+|\/#experience|https:\/\/www.linkedin.com\/in\/vishakaparab\/)/g,
        )
        .map((s, i) =>
          s.startsWith("/projects/") ||
          s.startsWith("/resume/") ||
          s === "/#experience" ? (
            <Link key={i} href={s}>
              {s.startsWith("/projects/")
                ? "View project ↗"
                : s.startsWith("/resume/")
                  ? "Download resume ↓"
                  : "View experience ↗"}
            </Link>
          ) : s.startsWith("https://") ? (
            <a key={i} href={s}>
              LinkedIn ↗
            </a>
          ) : (
            s
          ),
        )}
    </>
  );
}
export function Assistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState("");
  async function ask(q: string) {
    if (!q.trim() || busy) return;
    setBusy(true);
    setAnswer("");
    setQuestion(q);
    try {
      const r = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      if (!r.ok) throw new Error("Please try again in a moment.");
      setMode(
        r.headers.get("x-assistant-mode") === "ai"
          ? "AI-assisted guide · grounded in portfolio content"
          : "Verified portfolio guide · AI is not configured",
      );
      const reader = r.body?.getReader();
      if (!reader) throw new Error("Response unavailable.");
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        setAnswer((a) => a + decoder.decode(value, { stream: true }));
      }
    } catch {
      setAnswer(
        "The assistant is unavailable right now. Explore the projects above or connect on LinkedIn.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="assistant-section section" id="assistant">
      <div className="assistant-intro">
        <span className="assistant-icon">
          <Sparkles size={23} />
        </span>
        <p className="eyebrow">A DIFFERENT WAY TO EXPLORE</p>
        <h2>
          Curious about
          <br />
          the person behind
          <br />
          <em>the pixels?</em>
        </h2>
        <p>
          Ask my AI portfolio assistant about my work, skills, or the project
          that fits your team.
        </p>
        <span className="assistant-note">
          Answers grounded in my portfolio. Always.
        </span>
      </div>
      <div className="assistant-panel">
        <div className="assistant-topline">
          <span>
            <span className="status-dot" /> Portfolio assistant
          </span>
          <span>AI / GUIDE</span>
        </div>
        <p className="assistant-greeting">
          Hello, curious mind.
          <br />
          <span>What would you like to know?</span>
        </p>
        <div className="suggestions">
          {[
            "What is your frontend experience?",
            "Which projects use Next.js?",
            "Tell me about your cloud work.",
          ].map((q) => (
            <button disabled={busy} onClick={() => ask(q)} key={q}>
              {q}
              <ArrowUpRight size={14} />
            </button>
          ))}
        </div>
        {(answer || busy) && (
          <div className="assistant-answer" aria-live="polite">
            <small>{busy ? "Reading the portfolio…" : mode}</small>
            <p>
              <Answer text={answer} />
              {busy && <LoaderCircle size={16} className="spin" />}
            </p>
          </div>
        )}
        <form
          className="assistant-input"
          onSubmit={(e) => {
            e.preventDefault();
            void ask(question);
          }}
        >
          <input
            aria-label="Ask the portfolio assistant"
            placeholder="Ask something about my work…"
            value={question}
            maxLength={500}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button
            disabled={busy || !question.trim()}
            aria-label="Send question"
          >
            <ArrowUp size={17} />
          </Button>
        </form>
      </div>
    </section>
  );
}
