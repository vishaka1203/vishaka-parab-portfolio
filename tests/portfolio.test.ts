import { test } from "node:test";
import assert from "node:assert/strict";
import {
  discover,
  sortProjects,
  contactSchema,
  fallback,
} from "../src/lib/portfolio";
import { projects } from "../src/content/profile";
test("newest first and pinned projects remain featured", () => {
  const list = sortProjects(projects);
  assert.equal(
    list[0].createdAt,
    projects
      .map((p) => p.createdAt)
      .sort()
      .at(-1),
  );
  assert.ok(list.some((p) => p.featured));
});
test("natural language technology discovery", () => {
  assert.ok(
    discover(projects, "Show projects using TypeScript").every((p) =>
      p.technologies.includes("TypeScript"),
    ),
  );
  assert.equal(discover(projects, "nonexistent").length, 0);
});
test("contact rejects invalid emails and short messages", () => {
  assert.equal(
    contactSchema.safeParse({
      name: "V",
      email: "bad",
      message: "hi",
      website: "",
    }).success,
    false,
  );
});
test("assistant does not invent employment", () => {
  assert.match(fallback("professional experience"), /not yet/);
});
import { githubActivity } from "../src/lib/github";
import { POST as contact } from "../src/app/api/contact/route";
import { POST as assistant } from "../src/app/api/assistant/route";
test("GitHub outages preserve the portfolio", async () => {
  const data = await githubActivity(async () => {
    throw new Error("offline");
  });
  assert.equal(data.available, false);
  assert.ok(projects.length > 0);
});
test("dates tie deterministically without mutating content", () => {
  const a = { ...projects[0], slug: "z", createdAt: "2024-01-01" },
    b = { ...projects[0], slug: "a", createdAt: "2024-01-01" };
  const input = [a, b];
  assert.equal(sortProjects(input)[0].slug, "a");
  assert.equal(input[0].slug, "z");
});
test("unconfigured contact cannot claim delivery", async () => {
  const old = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  try {
    const r = await contact(
      new Request("http://localhost/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "Alex Morgan",
          email: "alex@example.com",
          message: "I would like to discuss a frontend engineering role.",
          website: "",
        }),
      }),
    );
    assert.equal(r.status, 503);
    assert.match((await r.json()).message, /No message was sent/);
  } finally {
    if (old) process.env.RESEND_API_KEY = old;
  }
});
test("contact rejects filled honeypot", () => {
  assert.equal(
    contactSchema.safeParse({
      name: "Alex",
      email: "alex@example.com",
      message: "This is a valid length message.",
      website: "spam.example",
    }).success,
    false,
  );
});
test("assistant rejects empty questions", async () => {
  const r = await assistant(
    new Request("http://localhost/api/assistant", {
      method: "POST",
      body: JSON.stringify({ question: "" }),
    }),
  );
  assert.equal(r.status, 400);
});
test("assistant fallback streams source-based answers", async () => {
  const old = process.env.AI_API_KEY;
  delete process.env.AI_API_KEY;
  try {
    const r = await assistant(
      new Request("http://localhost/api/assistant", {
        method: "POST",
        body: JSON.stringify({ question: "What projects have you built?" }),
      }),
    );
    assert.equal(r.headers.get("x-assistant-mode"), "guide");
    assert.match(await r.text(), /\/projects\/wushu-goa/);
  } finally {
    if (old) process.env.AI_API_KEY = old;
  }
});
test("all portfolio content has unique slugs, sources, valid dates and public URLs", () => {
  assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length);
  for (const p of projects) {
    assert.ok(p.source);
    assert.ok(Number.isFinite(Date.parse(p.createdAt)));
    assert.ok(Number.isFinite(Date.parse(p.updatedAt)));
    assert.match(p.githubUrl, /^https:\/\/github.com\/vishaka1203\//);
  }
});
test("assistant recommends only matching Next.js projects", () => {
  const answer = fallback("Which projects use Next.js?");
  assert.match(answer, /\/projects\/wushu-goa/);
  assert.doesNotMatch(answer, /\/projects\/hospital-research/);
});
test("recently updated view keeps matching projects", () => {
  assert.equal(discover(projects, "recently updated").length, projects.length);
  assert.equal(
    discover(projects, "recently updated")[0].updatedAt,
    projects
      .map((p) => p.updatedAt)
      .sort()
      .at(-1),
  );
});
test("unconfigured contact offers a draft to the approved address", async () => {
  const old = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  try {
    const r = await contact(
      new Request("http://localhost/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "Alex Morgan",
          email: "alex@example.com",
          message: "I would like to discuss a frontend engineering role.",
          website: "",
        }),
      }),
    );
    const result = await r.json();
    assert.equal(r.status, 503);
    assert.match(result.message, /devvishakaparab@gmail.com/);
    assert.match(result.mailto, /^mailto:devvishakaparab@gmail.com\?/);
    assert.match(decodeURIComponent(result.mailto), /Alex Morgan/);
    assert.doesNotMatch(result.message, /undefined/);
  } finally {
    if (old) process.env.RESEND_API_KEY = old;
  }
});
import { resolveSiteUrl } from "../src/lib/site-url";
test("deployment metadata uses the Vercel production domain", () => {
  assert.equal(
    resolveSiteUrl({
      VERCEL_PROJECT_PRODUCTION_URL: "vishaka-portfolio.vercel.app",
    }),
    "https://vishaka-portfolio.vercel.app",
  );
  assert.equal(
    resolveSiteUrl({
      NEXT_PUBLIC_SITE_URL: "https://custom.example/",
      VERCEL_PROJECT_PRODUCTION_URL: "fallback.vercel.app",
    }),
    "https://custom.example",
  );
});

test("Curating Frames is discoverable by name", () => {
  const matches = discover(projects, "Curating Frames");
  assert.equal(matches[0]?.slug, "curating-frames");
});
