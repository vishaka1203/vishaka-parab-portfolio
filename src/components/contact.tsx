"use client";
import { contactEmail, emailDraft } from "@/content/contact";
import { useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
export function ContactForm() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  return (
    <form
      className="contact-form"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setStatus("");
        setDraft("");
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form));
        try {
          const r = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          const result = await r.json();
          setStatus(result.message);
          if (
            r.status === 503 &&
            typeof result.mailto === "string" &&
            result.mailto.startsWith(`mailto:${contactEmail}?`)
          ) {
            setDraft(result.mailto);
            window.location.href = result.mailto;
          }
          if (r.ok) form.reset();
        } catch {
          setDraft(
            emailDraft({
              name: String(data.name || ""),
              email: String(data.email || ""),
              message: String(data.message || ""),
            }),
          );
          setStatus(
            `Delivery is unavailable. No message was sent. Open an email draft to ${contactEmail} below.`,
          );
        } finally {
          setBusy(false);
        }
      }}
    >
      <div className="contact-inputs">
        <label>
          Your name
          <input
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            placeholder="Alex Morgan"
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="alex@company.com"
          />
        </label>
      </div>
      <label>
        What do you have in mind?
        <textarea
          name="message"
          required
          minLength={20}
          maxLength={3000}
          rows={3}
          placeholder="A role, an idea, or something we could build together…"
        />
      </label>
      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="form-footer">
        <p>
          Have a good project in mind?
          <br />
          I’d love to hear about it.
        </p>
        <Button disabled={busy} type="submit">
          {busy ? (
            <LoaderCircle className="spin" size={16} />
          ) : (
            <>
              Send message <ArrowUpRight size={16} />
            </>
          )}
        </Button>
      </div>
      {status && (
        <p role="status" className="form-status">
          {status}
        </p>
      )}
      {draft && (
        <a className="text-link contact-email" href={draft}>
          Open email draft to {contactEmail} <ArrowUpRight size={16} />
        </a>
      )}
    </form>
  );
}
