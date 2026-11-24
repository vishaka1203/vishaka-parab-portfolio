# Vishaka Parab · Frontend portfolio

A Next.js App Router portfolio with strict TypeScript, React, Tailwind, shadcn-style Radix Slot/CVA button source, Once UI Tag, Motion, MDX project pages and a server-only assistant.

## Run

Node 22+ recommended (developed on Node 24).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Production: `npm run build && npm start`.

## Content and verification

Edit `src/content/profile.ts` for professional details, skills, education, project allowlist and links. Career facts come from the owner-supplied resume. Public project facts and repository dates come from GitHub. Professional content is centralized in `src/content/profile.ts`.

The contact section links directly to the owner-approved address `devvishakaparab@gmail.com` using `mailto:`. Visitors can send email through their own mail app. The server form still requires email-provider configuration.

The public resume in `public/resume/` is generated from verified portfolio data with the approved contact email and portfolio link; the phone number is omitted. The original resume is not included. Replace this PDF with an approved version as desired and edit `profile.resumeUrl` if its path changes. To display an approved Naukri profile, set `profile.naukri` to a public URL and add a social link; the supplied account-page URL is not a shareable verified profile. Oracle certifications are included from the profile listings; credential documents have not been independently inspected.

## Add a project without UI changes

1. Copy the data example in `PROJECT_TEMPLATE.md` into `curatedProjects` in `src/content/profile.ts` with a unique slug.
2. Optionally create `src/content/projects/<slug>.mdx`. Only trusted local MDX is compiled; never accept MDX from a contact form or external service.
3. Add an approved image under `public/projects/` and set `image`, or choose one of the existing concept artwork styles using `art`.
4. Save. Cards, category and technology search, case page, metadata and sitemap derive from the data automatically.

Dates are ISO `YYYY-MM-DD`. The default sort is newest `createdAt` first; recently updated uses `updatedAt`. Slug breaks date ties. `featured` permanently labels manually selected projects; all entries remain listed as new ones are added. Images should be accurately labelled screenshots or illustrations.

## Selected GitHub synchronization

`npm run sync:github` refreshes dates for only the manually selected public repositories in `profile.ts`. Pass slugs to restrict it: `npm run sync:github -- wushu-goa`.

The script writes only `src/content/github.generated.json`, after every selected fetch succeeds. It preserves titles, descriptions, case studies and source links, prevents duplicate slugs through content tests, and never imports private repositories. New repositories require adding a curated data entry first. Runtime public activity is cached for one hour, includes only public metadata, and falls back without breaking the site. Optional `GITHUB_TOKEN` stays server-side. Do not grant private-repository scopes.

## Assistant

Without AI configuration, the server returns a deterministic verified-content guide. With `AI_API_KEY`, `AI_API_URL` (an HTTPS OpenAI-compatible chat-completions endpoint) and `AI_MODEL`, the provider classifies a question into a supported intent. The application then streams verified content for that intent. Provider text is never displayed as a biographical fact, preventing invented achievements. This is bounded intent interpretation, not open-ended retrieval or free-form AI generation. Project links are clickable. Provider failure automatically uses the guide; unsupported questions acknowledge missing information. Only the visitor question is sent to the provider; keys stay server-side.

## Contact

Set `RESEND_API_KEY`, a verified `CONTACT_FROM`, and an approved destination `CONTACT_TO`. The form validates on both client and server, uses a honeypot, caps payloads, checks origin and shares a basic 12-request/minute in-memory limit with the assistant. A successful provider response with a message ID is required before confirming acceptance. Acceptance by the email provider does not prove inbox delivery. Without configuration, the form prepares a `mailto:` draft addressed to the approved contact email, attempts to open the visitor’s email app, and displays a manual draft link. The visitor must send the draft from their email app. The website explicitly says no message was sent. Network failures also offer a draft link and preserve the entered fields.

The local in-memory limit is best effort: it resets on restart and is per process. Before public deployment, add a distributed limiter or hosting firewall, configure trusted proxy IP handling, and set provider spending limits. Never put secrets in `NEXT_PUBLIC_*` variables.

## Deployment to Vercel (owner approval required)

1. Review all content and privacy decisions. Supply real screenshots, retrospective details and an approved resume if desired.
2. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin for canonical, sitemap and social metadata. Configure optional provider variables above.
3. Run `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`.
4. Import this repository into Vercel using the Next.js preset after approving publication. Set the variables in Vercel and redeploy after changes.
5. Verify production navigation, contact acceptance, AI fallback, rate limiting, keyboard behavior, themes and mobile layout. Run representative Lighthouse audits; no scores are claimed here.

The UI uses system fonts to avoid remote font downloads. Core content is server rendered, interactive search and assistant are isolated client components, motion respects user preferences, and project visuals are local CSS. Once UI is imported through its component subpath and styled within the portfolio tokens, without a competing global reset.

## Dependency audit notes

The runtime dependency audit (`npm audit --omit=dev`) reported zero vulnerabilities during verification. The full audit reported seven moderate findings through the development-only TypeScript ESLint / minimatch dependency chain. Compatible automatic remediation did not resolve that chain; no forced major override was applied. ESLint 9 is selected because the installed React/import/accessibility plugins declare support through 9. Recheck upstream toolchain compatibility before updating.

To regenerate the public resume after editing content, export public content data with `node --import tsx -e "const p=require('./src/content/profile.ts');require('fs').writeFileSync('/tmp/portfolio-public-data.json',JSON.stringify(p));"`, then run `python scripts/generate-public-resume.py /tmp/portfolio-public-data.json` with reportlab 4 installed. Python is only needed for regeneration, not for running or deploying the site.

## Theme background

The site-wide background uses the React Bits Iridescence component, tinted from the existing `--accent` CSS token. `src/components/portfolio-background.tsx` controls the slow animation, subtle mouse response, capped render resolution, and page-visibility pause. Its opacity is defined in `src/app/globals.css`. Both the theme toggle and system theme changes update the effect. Reduced-motion visitors see a static theme gradient. Other visitors retain a moving CSS gradient if WebGL2 is unsupported. The effect uses an explicit background layer below the page content, with theme-specific brightness to keep the green motion visible. The background is decorative and cannot intercept navigation, form input, or scrolling.

The vendored component lives under `src/components/backgrounds/` and retains its upstream license in `public/licenses/react-bits.txt`. Source: https://reactbits.dev/backgrounds/iridescence.

## Local luxury design preview

The approved design was prepared on the `design/local-luxury` branch. The owner approved deployment on 24 November 2026. The design contract is deep jade and porcelain with restrained champagne details; Manrope for interfaces, Cormorant Garamond for editorial emphasis; clear project evidence as the primary task; no new career claims or invented metrics.

`src/app/design.css` owns the preview palette and presentation overrides. Shared native inputs and buttons follow the shadcn/ui source-owned component pattern; Once UI supplies toolkit tags; the licensed React Bits Iridescence renderer supplies decorative motion. The background uses the palette’s `--iridescence-color` token. Light/dark themes, 16px inputs, touch targets, reduced-motion handling and form feedback are retained. Font files and their SIL licenses are hosted locally under `public/`, so rendering does not depend on a third-party font service. Reading surfaces protect contrast over the animated background.

References: https://ui.shadcn.com/docs/theming · https://docs.once-ui.com/quick-start · https://reactbits.dev/backgrounds/iridescence.
