# Kaushik Sundar Product Portfolio Design

## Purpose

Update the existing portfolio so it accurately presents Kaushik Sundar as a product manager focused on enterprise SaaS platforms, GenAI and RAG solutions, and API ecosystems. The supplied resume is the source of truth for professional content. The current visual system and responsive behavior should be retained where they support the new content.

## Source And Privacy Decisions

- Use `Kaushik_Sundar 1.docx` as the source for professional claims, dates, metrics, skills, education, certifications, awards, languages, email, and LinkedIn profile.
- Do not display or encode the phone number anywhere in the public site.
- Replace the previous profile photograph with the supplied `KS_PIC (2).png` portrait. The site must not reference or load the previous profile image.
- Use the resume email address and LinkedIn URL for contact actions.
- Remove unverified GitHub, personal-site, source-code, and live-project links rather than guessing them.

## Content Structure

### Navigation

Provide concise navigation to Overview, Impact, Experience, Capabilities, Case Studies, and Contact. LinkedIn may remain available as an external navigation action. Remove GitHub navigation until a verified account is supplied.

### Hero

Present:

- Name: Kaushik Sundar
- Role: Product Manager
- Focus: SaaS Platforms, GenAI and RAG Solutions, API Ecosystems
- Location: Bengaluru, India
- A short value proposition distilled from the professional summary
- Primary contact action using `sundar.kaushik23@gmail.com`
- Secondary action using `https://linkedin.com/in/kaushik-sundar23`
- The supplied Kaushik Sundar profile portrait in place of the previous photograph

### Impact Highlights

Feature the strongest supported outcomes in a compact, scannable band:

- 11 years of experience
- $2M cost-saving opportunity
- $650K immediate savings and $1.5M projected long-term savings
- Four cross-functional teams comprising approximately 25 members
- Approximately 10% month-over-month monthly active user growth for the Software Download Portal

Metrics must preserve qualifiers such as `approximately`, `immediate`, and `projected` where present in the resume.

### Professional Summary

Adapt the resume summary into concise web copy covering end-to-end product lifecycle ownership, enterprise SaaS and API platforms, GenAI and LLM solutions, Spec-Driven Development, Pods and Squads governance, cross-functional leadership, adoption, and value realization.

### Capabilities

Group the resume skills into readable capability areas:

- Product strategy and lifecycle management
- GenAI, RAG, and LLM workflows
- Product operating models and delivery governance
- SaaS platforms, APIs, microservices, Kubernetes, knowledge graphs, and SQL
- Cross-functional leadership and value realization
- Jira, Confluence, Miro, Figma, Power BI, Tableau, and product analytics

Avoid presenting Kaushik as a hands-on staff software engineer. Technical topics should be framed through product leadership, solution shaping, platform strategy, and delivery alignment.

### Experience

Present the three resume roles in reverse chronological order:

1. Technical Product Manager, Thermo Fisher Scientific, April 2024 to Present
2. Product Owner III, Thermo Fisher Scientific, November 2021 to March 2024
3. Senior Business Analyst, Accenture Services Pvt Ltd, Prior Experience

Use selected achievement bullets from the resume. Do not invent exact Accenture dates because the source provides only `Prior Experience`.

### Product Case Studies

Replace the current developer-project gallery with three outcome-oriented case studies:

1. AI-Powered Scientific Research Assistant
2. Software Download and Licensing Platform
3. Analytical Data Store and Semantic Knowledge Graph

Each case study should clearly separate the problem, Kaushik's approach or role, and the resulting impact. Case studies must be readable without external links. The site must not show source-code or live-demo buttons for these entries.

### Credentials

Include:

- B.E., R.V. College of Engineering, Bengaluru, 2011 to 2015
- Certified Scrum Product Owner
- Pendo Product Certification
- Thermo Fisher Awards, 2022 to 2026
- Accenture Pinnacle Award, XTRA Miler, and Ace Award
- Languages: English, Hindi, Kannada, and Tulu

### Contact And Footer

Provide email and LinkedIn as the only public contact methods. The footer should identify Kaushik Sundar and must not contain the previous owner's name, phone number, or unverified profile links.

## Presentation

Retain the existing site's restrained, professional visual language and responsive layout. Rework labels and section emphasis around product leadership rather than software engineering. Convert the supplied 1254 by 1254 PNG portrait to an optimized local WebP asset named `assets/images/kaushik-sundar-profile.webp`. Preserve its black-and-white appearance, square framing, circular composition, and visible face and shoulders. Do not introduce a résumé-document layout or a new marketing landing page.

## Data And Behavior

The case-study content may continue to load from the existing project data file if the schema is updated to represent problem, approach, and impact. The page must retain a useful static fallback when JavaScript or the data request is unavailable. No external action should be rendered unless its URL is verified and present.

## Metadata And Accessibility

- Update the page title, description, social metadata, and structured data for Kaushik Sundar and the Product Manager role.
- Use the verified LinkedIn URL in structured data; omit unverified social profiles.
- Give the profile portrait concise alternative text that identifies Kaushik Sundar.
- Preserve semantic headings, keyboard access, responsive text fitting, and reduced-motion behavior.
- Ensure hidden phone information is absent from visible text, metadata, structured data, and links.

## Verification

- Update automated content and rendering tests to reflect the product-management portfolio.
- Add assertions that the new Kaushik Sundar profile asset is present and that the phone number, previous profile image, previous identity, and unverified GitHub URLs are absent from the public page.
- Verify the three case studies render from data and in the static fallback.
- Run the full unit test suite and local-link checker.
- Run browser-based visual verification with the local server active at desktop and mobile viewport sizes.
- Confirm there is no text overlap, clipping, layout shift, broken local asset, or empty project state.

## Deferred Items

A phone number, GitHub account, downloadable resume, and external case-study links may be added later when Kaushik explicitly supplies and approves them. Their absence must not create placeholder text or broken controls.
