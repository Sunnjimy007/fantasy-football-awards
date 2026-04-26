# Fantasy Football Awards Generator – MVP Build Plan

---

## Product Overview

Create a web-based tool that generates personalized, humorous award certificates for end-of-season fantasy football leagues.

Users input player details → tool generates:

- A funny award
- A stylized certificate
- An AI-generated quote in the style of a footballer

---

## Goals

- Deliver hilarious, shareable end-of-season awards
- Keep UX simple and fast
- Build incrementally (feature-by-feature using V0.dev)
- Enable future monetization potential

---

## Inputs

User provides:

1. **Awardee Name** (e.g., Baaz)
2. **Fantasy Team Name** (e.g., Mind the Gap)
3. **Favorite Football Team** (e.g., Tottenham)
4. **Award Title** (e.g., "Best Buy in the League")
5. **Style of Quote** (choose famous player from the team, e.g., "Haaland")
6. **Optional Story/Joke** (context for the award)

## Output

- A downloadable **image certificate** that includes:
    - Player cartoon (inspired by the team)
    - Award title
    - Fantasy team name
    - AI-generated quote in the *style* of the selected player
    - Funny, themed design (banter > polish for V1)

## AI Functionality

- **Prompt Template Engine** for quote generation (e.g., *"Generate a funny quote in the style of [player] reacting to [scenario]"*).
- Optionally match tone to player (Zlatan = cocky, Haaland = dry deadpan, Klopp = motivational madness, etc.)

## Design

- Use fun, illustrated/cartoonish certificate templates
- Visuals should match:
    - Club colors/themes
    - Tone of award (e.g. over-the-top trophies, crying emojis, red cards, etc.)
- MVP will include a small set of reusable templates

## Tech Stack

**Frontend**:
- Next.js 15 (App Router)
- TailwindCSS for styling
- V0.dev or custom component library
- Zustand for state management

**Backend / APIs**:
- OpenAI for quote generation
- DALL·E or other image generation APIs
- Optional: Supabase or Firebase for data persistence (if user accounts or history tracking are needed later)

## Build Strategy

- Start **without a database**
- Use **Zustand (or Context)** for local state
- Mock AI + image generation initially
- Add Supabase later if needed

## User Flow

1. User visits landing page.
2. Fills in award form.
3. Clicks "Generate".
4. Tool generates:
    - AI quote
    - Final image certificate
5. User can download or share it.

---

# MVP Definition

## Included

- Form input
- Quote generation (mocked)
- Certificate preview
- Download as image

## Not Included (Yet)

- Database / accounts
- League dashboards
- Real stats integrations
- Multi-user features

---

# Future Expansion Ideas

- Real AI quote generation (OpenAI)
- Image generation (DALL·E)
- Save/share awards
- League-wide batch generation
- Voting system for awards
- Premium templates
