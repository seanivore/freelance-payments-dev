# Development Protocols

**Version**: v4.1.0 **Last Updated**: 2026-06-23 **Changes**: v4.1.0 — formalized the gap-review loop's hard-won mechanics from the Everlastings v3.2 gate (canonical worked example is now `assets/docs/archive/v3_2/v3_2_3_REVIEW_PROMPTS.md`, richer than the v1_6 one): the review lens is **three** parts not two (added **(c) read-in-full + co-design-not-audit + flag-don't-assert**); **flag-don't-assert** — a finding that depends on runtime/code the reviewer can't see is FLAGGED *needs-verification*, never asserted "broken" (whole rounds of false alarms came from confident "broken" calls the code disproved; on a delta prefer "I can't verify X" over "X is broken"), and the orchestrator **validates-then-folds**; landmines are the **"Settled — do not re-raise" ledger** — current-only + bounded, every entry a *verified* prior-round finding, **shared once** where reviewers share context (B/C/D at 1M), a superseding fold **replaces** its entry (never append a contradiction); the verdict is a **trichotomy** (`READY TO BUILD` / `NEEDS ANOTHER PASS` / `NEEDS ANOTHER PASS (NARROW)` — NARROW is load-bearing for planning); **B/C/D close angle-by-angle** — a passed angle re-runs only when a fold lands in its lane and is then **scoped + narrowed** ("you passed; confirm only X; the narrow is deliberate, not a violation"), anti-polish-treadmill, the 2-subagent breadth pass the cross-lane backstop; **what to hand each angle** is explicit (A = docs only/NO repo; B/C/D = repo + docs + shared ledger; C reads the architecture doc first; D the design research/feedback) + an optional final cold-A holistic pass; **end-game cleanup** (a clean-up full-read before the last NARROW A; **Build Guide Final Cuts** after every angle is READY → strip changelog/provenance/rationale/owner-decision-tags/gap-review-framing, move long rationale to a sibling `RATIONALE.md`, → MAJOR bump); **orchestrator hygiene** (compact *forward* right after each fold; keep memories across the long loop); the gate is **never the first reviewer**; these prompt lines are **counter-reflex instrumentation** (they override the model's do-less instincts — narrow-to-my-lane, grep/skim, assert-from-training, budget-tokens — keep in every block, never trim as redundant); and **don't manufacture a persona opener** (lead with task + lens). Also added *exit-a-dir-keep-a-copy* (§Versioning) and named the peer-separation reflex (THE CORE). v4.0.13 — added *As-built doc-sync* (§Versioning): the living architecture doc is brought current by a **FRESH agent** deriving from the build-adjusted IMPLEMENT (read end-to-end/linearly first) + the BUILD_REPORT, with **code as the tiebreaker** on behavior conflicts — never summarized from a tired session's memory (a hasty as-built left Everlastings' STORE a release behind + ~10 stale ARs that manufactured false gap-review findings). Upstream aid: each IMPLEMENT phase carries a one-line **`Doc impact:`** annotation (most steps = "none"); NOT a separate doc-updates addendum (it would re-drift); truth order IMPLEMENT→BUILD_REPORT→code; BUILD_REPORT stays deviations-only. Two reconciler/reviewer landmines: the Status/Version header drifts a release behind (verify vs the newest BUILD_REPORT first), and stale `file:line` anchors survive code growth (re-open before trusting). v4.0.12 — added the *settled-base* note to the gap-review-prompt protocol: when a build is a **delta on a shipped/tested system**, every prompt states that the current system (architecture doc + repo) is the **proven substrate** and the build is a delta on top — review the delta + its fit, don't re-litigate/redesign/flag settled behavior (stops reviewers manufacturing blockers out of proven code — the v1.6 loop warned of this). v4.0.11 — formalized the *gap-review prompts* protocol (§The Gap-Review Gate): the orchestrator **auto-generates a paste-ready `vX_Y_Z_REVIEW_PROMPTS.md`** — one **self-contained** block per angle, each inlining (1) the **two-part review lens** [the North Star value-lens AND the broader mandate: search the WHOLE build — the IMPLEMENT + every addendum, every element — for exclusively-executable / unvalidated-assumption / design-correctness gaps; the lens must NOT shrink the scope — the v1.5/1.6 lesson that a lone North-Star lens made reviewers skip whole files + the design], (2) the **full landmines list** [living — append each newly-found one + re-embed every round; the v1.5 A-loop grew it ~6→36 and that accretion drove the guide near-flawless], (3) the angle charge, (4) the explicit **write-findings-to `vX_Y_Z_GAP_REVIEW_<angle>.md`**. Angles A/B/C with **D (design-correctness) conditional** on substantial design/UX (fold into B/C when light — but then the prompt must say "the design addendum is always in scope, don't skip it"). v4.0.10 — added two notes. (1) A *self-driven gap pass* as a standing **pre-loop** step: before any breadth pass or fresh-instance gate, the orchestrator reads the plan/IMPLEMENT clean itself and grounds each gap by opening the reuse surface, folding what it finds — fewer/faster review rounds (a real lesson from the v1.5 gate); it never substitutes for the gate (THE CORE #2). (2) A *Skills* convention: globally-installed Agent Skills live at `~/.agents/skills` (the `npx skills add …` dir), **not** `~/.claude/skills` where agents reflexively look and find nothing — check/pass that path. v4.0.9 — added the *human-formatted docs* convention pointing at the new `.agent/HUMAN_FORMATTING.md`: default formatting stays dense (best for agent ingestion); **only** on Sean's explicit "human-formatted" request (or a clearly Sean-only doc) switch to the cognitive-load-first layout, never on agent-read docs. v4.0.8 — clarified `BUILD.md` vs `IMPLEMENT.md`: **both name a ready-to-execute guide** — a complete *plan-it-all* runs its gate-cleared IMPLEMENT directly at the execution version, while a `BUILD` packet carves *ready slices* out of a still-incomplete/larger plan (the incremental/app shape). Reframed the orchestrator-blueprint (it rides the *ready-to-execute guide*, IMPLEMENT or BUILD) and the "split into TRACK BUILDs at one ship" line so the **execution arrangement — one orchestrator/session vs split tracks, sequential vs parallel — is a planning-time call, not a default** (worked example: Everlastings' v1.4 first build went one IMPLEMENT → tracks-at-the-end → sequential-rearranged-to-parallel; its v2.0.0 store-management build is run directly by one orchestrator in one session). v4.0.7 — added *Versioning → Archiving a revision* and reconciled the doc's contradictory keep-all-vs-rename guidance to recorded practice: living planning docs (IMPLEMENT + addendums + review-prompt charters) are **current-only** through the gap-review loop (a bump renames; git holds the patches), while terminal records (GAP_REVIEW / BUGS / FEEDBACK / SESH) are **kept standing**; carve-outs for condense (`_2` diff copy) and dead-end *decisions* (content, not files). Rewrote the muddled `BUGS` "rename, not duplicate" clause — a speculative relic from before real flow was recorded that never matched it (on-the-fly fix → BUILD_REPORT; researched bug-list → a genuinely new IMPLEMENT). Aligned the IMPLEMENT-file-type, PROJECT_NAME "nothing is deleted," and Quickstart "copy to the next revision" lines to the same rule. v4.0.6 — added *Addendums*: a big IMPLEMENT can split design/testing into same-version sibling docs (`…_ADDENDUM_DESIGN.md`, `…_ADDENDUM_TESTING.md`) that bump in lockstep and are **always** in gap-review scope; codified that design is planned *exclusively executable* and **tested + feedback'd exactly like functionality** (concrete default + render-tune, never frozen-no-feedback), and that production-grade placeholders mean **real content is never a build/test gate**. v4.0.5 — added *Where information lives — route by scope*: the five memory tiers (global `~/.claude/CLAUDE.md`, per-project Claude auto-memory, synced `.agent/` protocol, in-repo `PROJECT_LESSONS.md`, the living architecture doc) and how to route a fact by scope + whether it must travel. v4.0.4 — added two principles proven out by the Everlastings v1.5 gate (9 cold-A rounds): *run the in-session breadth pass on every IMPLEMENT version-push, not just the first draft* (a fold can introduce the next bug; convergence is non-monotonic), and the *phase-demarcation versioning* pattern for long multi-angle gate loops (MINOR bump per review phase + its own dir; MAJOR reserved for execution). v4.0.3 — documented the `.agent/PROJECT_NAME.md` + `.agent/README.md` starter templates (adapt-don't-author; sync back to the fleet). v4.0.2 — added the *prose soft-wrap* convention (one logical line per paragraph; never hard-wrap; never reflow inside fences/tables). v4.0.1 — added the *Markdown-table width* convention (≤ ~100 cols, else grouped bullets). v4.0.0 — Strategic restructure. Re-centers the doc on the two things that make this workflow work — planning to **exclusively executable** and proving it with **fresh-instance gap review** — and cuts boilerplate that buried the signal (Common Pitfalls, Agent Documentation Standards, the enterprise parallel-dev essay, the research/testing/commit templates). New: the *subagent-pass vs fresh-instance-gate* distinction, the reviewer **access→perspective** model, the gate framed as non-waivable + ego-safe, and an IMPLEMENT template that stops seeding tiny version-milestone BUILDs. **Purpose**: How we plan and build with agentic tools. Read THE CORE first; the rest is the machinery and reference. **Syncing**: One canonical copy, propagated to every project via `filemgmt` (see § *Syncing*).

---

## THE CORE — if you internalize nothing else, internalize this

Our whole method rests on one inversion of the old norm: **with today's tools, code is fast and cheap; the plan is where the work is.** ~90% of effort goes to planning, ~10% to building. Five things follow, and none are optional:

1. **Plan until the build doc is EXCLUSIVELY EXECUTABLE.** The agent who builds it needs *no prior context, no guessing, nothing looked up* — exact files, exact code, exact decisions, all written out. If the builder has to *decide* something, the plan failed; it could decide wrong.

2. **You cannot certify your own plan — fresh, separate instances do.** A plan's author is the worst judge of its gaps (you fill them from memory without noticing). The gate is a *genuinely separate instance* — a new session, ideally with different asset access (§ *The Gap-Review Gate*). **In-session subagents you spawn are NOT this gate.** "I'll spawn subagents" / "I'll review it myself" is the exact reflex this rule exists to stop. **And it shows up dressed up:** under pressure an instance will insist it can *be* the reviewer — "I'll adopt/imbue the other agent's perspective and check it myself." It cannot — a reviewer that shares your process, context, or authorship is not the gate, however sincerely it role-plays independence. (The pride fades fast: one fold of real findings and the instance turns eager to perfect the plan.)

3. **Your job as planner is to make the work maximally reviewable — not to judge whether it's ready.** Whether the gate runs is co-owned with the human and not yours to waive. Write everything out *so others can check it.*

4. **A residual gap always survives, and that's expected.** We *minimize* struggle; we don't chase a flawless doc. Gaps found in review are the process working, not a grade on your competence — which is exactly why the gate is safe to open wide.

5. **Don't build a big thing in one breath. Orchestrate.** Large work decouples into independently buildable chunks; an orchestrator delegates tightly-scoped tasks to fresh subagents. (Subagents for *parallel building* — distinct from the fresh-instance *review gate* in #2.)

Everything below is the machinery that makes these five real.

---

## Development Philosophy (the why)

### Agentic coding in 2026 is 90% planning, 10% building

| Activity | Effort |
| -------- | ------ |
| Planning | 90%    |
| Building | 10%    |

Agents write thousands of correct lines in minutes and can one-shot a working app. The old high-cost "writing code" step is cheap now, so the value moved upstream to the plan. The old **debugging phase** — an unbounded, unpredictable "figure it out later" space — is precisely what good planning *replaces*: you move the uncertainty to *before* the code exists, where it's cheap to resolve and safe to review.

### The new failure mode: agents go down the wrong path

The risk today isn't slow typing — it's an agent confidently heading the wrong way on one small *unstated* thing and compounding it. Two consequences:
- **Whole rewrites often beat bug-hunting.** A clean re-generation from a correct spec is frequently faster and cleaner than patching; patched bugs compound in hard-to-trace ways and leave a codebase later agents can't reason about.
- **Specificity is everything.** The smallest unstated detail is where it breaks. Hence: exclusively executable.

### Question whether your training data is dated

LLMs are built to produce an answer in the moment, which can blind you to a gap in your own knowledge. Tech moves fast; the API you "know" may have changed. The discipline: don't *find the solution while building* — find it while **planning**, where there's room to verify against current docs and be reviewed. Prove current knowledge in the doc (link the real API docs). Never present training-data recall as fact.

### The Agentic Orchestration Paradox

The larger a task, the more an agent instinctively *shrinks* it to stay in its comfort zone — managing context, avoiding losing the thread. Unchecked, it tries to do a massive plan in one stream of consciousness and drops context / writes bugs. The only way to execute big work well is to make the agent a high-level **orchestrator** that aggressively delegates deterministic, tightly-scoped tasks to fresh subagents. Decouple complex plans into independent tracks; the orchestrator runs the pipeline, subagents do the typing.

---

## The Gap-Review Gate (the heart of the method)

"Exclusively executable" is a *claim*. The only way to know it's true is to have cold eyes try to break it before any code is written. This is the operational core of the 90/10 philosophy — without it, the philosophy stays aspirational and agents revert to "this looks fine, let me code."

### Two things people conflate — keep them apart

|              | In-session subagent pass                             | The fresh-instance gate                                                                     |
| ------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **What**     | the orchestrator spawns a subagent to review a chunk | a genuinely separate instance reviews the plan                                              |
| **Where**    | same session, same model state                       | a new Claude Code window, or a non-Claude tool (ChatGPT / Claude.ai), launched by the human |
| **Good for** | breadth, first-pass cleanup while drafting           | *certifying* exclusively-executable before promotion                                        |
| **Limit**    | shares the session's blind spots & assumptions       | — this is the real gate                                                                     |

Subagent passes are useful early. **They are not the gate.** Promotion to a BUILD requires fresh-instance passes. An orchestrator that "reviews its own plan" or "spawns subagents instead" has **not** passed the gate, however thorough it was.

### Access determines what a reviewer can even find

A reviewer can only catch what its *access* lets it see. Run all three angles at least once — complementary, not redundant:

| Angle                           | Access                         | The only thing it can truly test                                                                               |
| ------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| **A — Cold / self-containment** | the plan doc ONLY, **no repo** | Is it *actually* exclusively executable? Anywhere it must open a file, guess, or recall is a defect.           |
| **B — Fidelity**                | plan + repo                    | Do the quoted before/after blocks match the real code? Will edits apply cleanly?                               |
| **C — Integration**             | plan + repo + architecture doc | Does it fit the wider system (scoping, idempotency, resource caps, conventions, AR conflicts, stale pointers)? |

The **cold / no-repo** reviewer is the only one that can *prove* self-containment — it physically cannot fill a gap from the code, so wherever it gets stuck is exactly where your builder would have to guess. A subagent inside your session can never be angle A. Non-Claude tools are excellent at A (paste the doc, no repo). B and C are fresh Claude Code instances in the repo.

### The loop

1. **Orchestrator** drafts/extends the IMPLEMENT (living; sessions refine it). Optional: in-session subagent passes for first-draft breadth.
2. **Run the gate:** fresh instances, one per angle, **a new instance per pass** (no context contamination). Each writes findings to a file (`vX_Y_Z_GAP_REVIEW_<angle>.md`); a no-filesystem tool prints the full file contents to paste in.
3. **Orchestrator folds** real findings into IMPLEMENT; notes it in the SESSION log. A "gap" that's actually an architecture decision → pause, surface to the human (don't research it away). Watch for *plan drift* — fresh reviewers know only what the plan says, not what it's *for*, so they sometimes reshape the architecture; steer back or escalate.
4. **Repeat** until each angle's fresh pass returns nothing load-bearing.
5. **Stop conditions** (any): each angle finds only nitpicks (resolvable without research); OR an architecture decision surfaces (→ human); OR token/time budget hit (→ ask human).
6. **Gate clears → human approves → promote the chunk to a BUILD.** No code before this. The orchestrator who runs the BUILD writes a `BUILD_REPORT`; its findings flow back into IMPLEMENT.

**One drafting session is never the finished plan.** A pass that finds *anything* means you're not done — loop until a *fresh* pass of each angle finds nothing load-bearing. Subagents surfacing gaps is **not** permission to stop; it's proof there's more to find. The 90/10 ratio is **literal, not hyperbole**: an exclusively-executable plan takes multiple rounds, usually across multiple sessions. (Drafting/refining with one agent over several rounds is normal and good — *then* the fresh-instance gate certifies it.)

**Re-run the breadth pass on every version-push, and expect non-monotonic convergence.** The cheap in-session subagent pass (owner-journey + integration, through the project lens) is worth running after *each* fold — not only while first-drafting. A fold can silently introduce the next bug, so the doc that just changed is exactly the doc to re-scan; it's near-free insurance against regressions the fold itself created. It stays **advisory** — never a substitute for the fresh-instance gate. And convergence is **non-monotonic**: a clean-looking pass can still surface something, and a fix can *create* the next finding (in the Everlastings v1.5 gate, an 8th-round data-loss bug was introduced by the 7th round's own fix). That's why the exit condition is *a fresh pass that finds nothing load-bearing* — never *it feels close*.

**Hunt your own gaps first — a pre-loop step, before even the breadth pass.** Before spinning up *any* review (the in-session breadth pass or the fresh-instance gate), take a deliberate step back and read the plan/IMPLEMENT clean yourself, grounding each gap by actually opening the reuse surface (not recalling it from memory), and fold what you find now. This is THE CORE #3 ("make the work maximally reviewable") applied early: the more the orchestrator surfaces on its own, the fewer rounds the loop needs and the faster it converges — a real lesson from the v1.5 gate, where skipping this (and the breadth pass) stretched the loop. It does **not** substitute for the gate (THE CORE #2): a self-read shares your blind spots, so it just clears the cheap-to-find gaps and lets cold eyes spend their value on the deep ones. **Non-negotiable: the gate is never the first reviewer.** Don't open a fresh-instance pass (or fire the courier tool) until real gap-hunting has happened — your own clean read-back, the breadth pass, ideally a day's distance. There are always gaps; the cheap ones get found by cheap means first, or you burn fresh-reviewer rounds (and human loop-time) re-discovering basics.

### Why this isn't the orchestrator's call — and why that's fine

Asking a plan's author to commission a hard critique of its own work is a conflict of interest — which is why the planner-confidence reflex ("it's ready," "I'll handle review myself") shows up *right here* and nowhere else in planning. So the decision to gate is **co-owned with the human and not waivable by the orchestrator.** And it's *safe*: a residual gap always survives (THE CORE #4). Found gaps are the method working. Make the plan maximally reviewable; don't defend it.

### The reviewer prompts — auto-generated, paste-ready, one self-contained block per angle

When the gate opens, the orchestrator **generates a `vX_Y_Z_REVIEW_PROMPTS.md`** — don't hand-write prompts each round, and don't make the human assemble pieces (the v1.5 loop burned several rounds before realizing the landmines had to be *inside* each prompt). One **fully self-contained, copy-paste block per angle**, each carrying everything the reviewer needs inline:

1. **The three-part review lens (all three, every angle).** A single lens shrinks the scope and reviewers skip whole files / the design — the hard v1.5/1.6 lesson. So:
   - **(a) the product North Star / thesis** — the *value* lens ("can the user actually do this, least-friction?"); a capability that reads "covered" but isn't truly drivable is a real gap. **The North Star is the *current build's*** — the problem this build/phase solves — not a fixed project-wide star; it evolves across phases, and an angle may tailor it (D's is design-flavored).
   - **(b) the broader mandate** — *the North Star is the primary functionality lens, NOT the filter for what counts as a gap.* Search the **whole build (the IMPLEMENT + every addendum), every element** — *"do not neglect the design addendum"* even if you're "not the design reviewer" (the value is many eyes on the *whole*, not tidy specialization) — for anything not truly **exclusively-executable**, any **unvalidated assumption**, and any **design-correctness** failure (the "columns-bug" class — a spec that *applies* cleanly but *renders wrong/incomplete*). Don't let the lens narrow what gets reviewed.
   - **(c) read-in-full, co-design, flag-don't-assert** — read ALL provided docs **end-to-end** and **don't ration tokens** (max effort; context is managed for you; grep/jump reading has produced real mis-diagnoses). **Co-design, don't just audit:** a gap is a gap whether it's a flaw in what we wrote OR something the build should address but omitted — don't assume it's mostly complete. **Flag-don't-assert:** when a finding depends on runtime/code you can't see, FLAG it *needs-verification* — never assert it "broken" (whole rounds of false alarms came from confident "broken" calls the code disproved; on a delta, prefer "I can't verify X" over "X is broken" — it cuts both ways). The orchestrator then **validates before folding**; only verified findings become landmines.
2. **The landmines = the "Settled — do not re-raise" ledger** (the project's hard-won truths — "validate against reality, not training data"). **Current-only + bounded: every entry is a *verified* prior-round finding; a superseding fold *replaces* its entry (never append a contradiction — no mixed truth); prune at each condense.** Append each newly-verified landmine as the loop runs. **Share it ONCE** where reviewers share context (B/C/D run in Claude Code at 1M with the whole prompts file present); re-inline it per-block only when a reviewer has *no* shared context (the cold-A web-UI paste). (Everlastings' v1.5 A-loop grew it ~6→36, then v3.2 carried it to ~68; that accretion is what drives a build near-flawless.)
3. **The angle's specific charge** (below).
4. **The OUTPUT spec + the explicit instruction to WRITE the report** to `vX_Y_Z_GAP_REVIEW_<angle>.md` (a no-filesystem tool prints the full file to paste back). The reviewer changes nothing else.
5. **All docs inlined, and what to hand each angle.** Paste the IMPLEMENT *and every addendum* into the prompt — the reviewer never opens or hunts a file (angle A *can't*). Per angle: **A** = the docs only, **NO repo** (the absence is the point); **B/C/D** = the repo + the docs + the shared ledger (Claude Code at 1M); **C** reads the architecture doc first; **D** reads the design research + feedback screenshots. An **optional final cold-A holistic pass** on the B/C/D-clean docs (docs only) is welcome.
6. **No manufactured persona; the lines are counter-reflexes.** Lead with the *task + lens*, not "you are a senior engineer…" (the model gets the role from context — drop the cosplay; a surviving role line stays minimal/functional). And treat the loud, repeated instructions — *read in full, don't ration tokens, don't shrink scope, flag-don't-assert* — as **counter-reflex instrumentation**: each overrides a model instinct to do less (skim/grep, narrow-to-my-lane, assert-from-training, budget-tokens). **Keep them in every block; never trim them as "redundant"** — a tidy-up quietly reopens the exact narrowing they beat back.

**Name the settled base (for a delta build).** When the build is a *delta* on a shipped/tested system (most incremental work), every prompt states it: *"the current system (all of [the architecture doc] + the repo as it stands today) is built, tested, and live/approved — the fixed substrate; this build is a delta on top. Review the delta for gaps + whether it FITS the base; don't re-litigate, redesign, or flag settled/shipped behavior — a finding must be about what this build adds/changes, or a real conflict it creates with the base."* This stops reviewers manufacturing blockers out of proven code (the v1.6 loop explicitly warned against re-litigating the closed A-loop).

**Angles** (run A holistically/looped first or independently; B+C(+D) in parallel; a **new instance per pass**):
- **A — cold / no-repo (self-containment + completeness):** the docs only — the absence of a repo is the point; every place the builder would open a file, guess, recall a library, or decide.
- **B — fidelity (repo):** every CURRENT block byte-matches the tree; every NEW block applies cleanly + references only things that exist. Byte-check the **design addendum's** DECIDED blocks at the same bar (for render-tuned defaults, judge "concrete enough the builder never guesses," not whether it's final).
- **C — integration (repo + architecture):** read the living architecture doc first; system-fit gaps (scoping, idempotency, auth, resource caps, AR conflicts, stale pointers) **through the lens**, incl. design integration.
- **D — design-correctness (CONDITIONAL):** add it **when the build carries substantial design/UX** — A can't see the repo and B/C lean code-fidelity/integration, so they under-weight whether the UI actually *renders right, is accessible (reduced-motion/screen-reader), responsive, and matches the design addendum*. When design is light, fold these into B + C — **but then the prompts must say explicitly "the design addendum is always in scope; do not skip it"** (lumping-in silently dropped the design review in the first v1.6 round).

**Then:** fold findings → bump → **regenerate the prompts** (carrying the updated ledger) → repeat until each angle's fresh pass finds nothing load-bearing. **B/C/D close angle-by-angle, not in lockstep:** an angle that returned `READY TO BUILD` re-runs *only* when a fold lands in **its** lane — and is then **scoped + narrowed** (told it passed, given the named change, asked to confirm *only* that, and told explicitly the narrow is *deliberate, not a violation* of the don't-shrink mandate). A passed angle at max effort will always find one more "polish" nicety; reflexively folding those manufactures work + new seams. If a round's folds touch no lane, that angle **stays closed**; the 2-subagent breadth pass is the cross-lane backstop. Every `vX_Y_Z_GAP_REVIEW_<angle>.md` is kept standing (the rigor trail); the `REVIEW_PROMPTS` file is current-only (rename on bump). A full worked example: `assets/docs/archive/v3_2/v3_2_3_REVIEW_PROMPTS.md` (Everlastings' v3.2 management-features gate — richer than the older `v1_6/v1_6_2_REVIEW_PROMPTS.md`).

### The per-block skeleton (the generator fills this)

Run angle A in a no-repo tool; B/C/D in fresh repo instances.

```
You are a senior engineer doing a pre-build gap review. Effort: maximum. Do NOT change code or existing docs — your only output is your findings (write them to `[vX_Y_Z_GAP_REVIEW_<A|B|C>.md]`, or print the full file contents if you have no filesystem).

CONTEXT
- `[path to the BUILD/IMPLEMENT]` is a packet a FRESH agent will execute against [this repo / from the doc alone], then test on [preview]. It is meant to be "exclusively executable": it embeds the exact current code and exact replacement for every edit, so the builder only LOCATES and APPLIES — never DISCOVERS or DECIDES.
- [Project landmines to respect — the hard-won truths, e.g. "the X integration's public docs are wrong for the loaded bundle; the real surface is Y." Give the reviewer these so it validates against reality, not training data.]

ANGLE — [pick one]
- A (cold / no-repo): you get ONLY the doc; its absence of a repo is the point. Find every place you'd have to open a file, guess, recall a library's behavior, or make a decision the doc didn't make for you.
- B (fidelity): open the files the doc edits; verify every before-block matches the repo and every after-block applies cleanly.
- C (integration): read `[architecture doc]` first; hunt system-fit gaps ([scoping], [idempotency], [resource caps], AR conflicts, stale pointers).

OUTPUT
- A gap list RANKED by how likely each is to derail the build: location, what's wrong/missing, the concrete fix.
- The single most important "if you fix one thing" insight.
- One-line verdict — three values: READY TO BUILD / NEEDS ANOTHER PASS / NEEDS ANOTHER PASS (NARROW). NARROW = "almost there, only a bounded area left" — load-bearing for planning: it triggers the end-game clean-up read and lets the next pass be scoped tight.
Be concrete: "Phase X mounts `[selector]` but Phase Y never defines it" beats "check the selectors."
```

### Why fresh instances (not re-used ones)

A reviewer who already saw draft v1 unconsciously fills gaps from memory instead of catching them. The cold-read reaction *is* the value. **A new instance per pass.** And different instances genuinely differ — different recall, different instincts, different paths — the same reason a team brings diverse people to a hard review.

### End-game cleanup (the last stretch)

Two condensing passes shed the scaffolding as the loop converges — both exclusively-executable work, not optional polish:
- **Clean-up read (before the suspected last, NARROW, A pass).** Round-after-round surgical edits leave stray/outdated references; do a deliberate **end-to-end read** to catch them and condense the doc, then a breadth-subagent pass.
- **Build Guide Final Cuts (after every angle verdicts READY).** Strip what's the *wrong context* for the execution orchestrator — changelog, **provenance**, slipped-scope rationale, resolved-edges, owner-decision tags, gap-review framing, excessive prose — keeping the byte-exact anchors. Move substantial rationale to a sibling **`vX_Y_Z_RATIONALE.md`** with a *"don't read the rationale unless you must"* note in the IMPLEMENT. (Broad context genuinely helps an LLM, but as the guide nears ~100k tokens it shouldn't be *forced* — the same reason TESTING/DESIGN already live in addenda: the IMPLEMENT must *feel* manageable.) This cut drives a **MAJOR** bump (plan → execution); a mere recent-build delta bumps **MINOR**.

### Orchestrator hygiene — compact forward, keep memories

The Build-Guide orchestrator is long-lived across many rounds, so manage its context deliberately. **Immediately after** each fold + breadth pass + prompt-regeneration, **compact the session with a forward-looking note** — written as if the reviews it just prepped are already done — so a later `--resume` returns a correctly-compacted orchestrator (wait, and the compaction offered then can't be steered). Let the orchestrator author its own compact note (they do it well), and **keep memories** throughout — the loop is too long to hold in one context.

---

## What "Exclusively Executable" Requires

The mechanical guarantees behind the claim. A BUILD that violates any of these isn't ready.

### Confirmed decisions only
The IMPLEMENT/BUILD the executing agent reads contains **only confirmed decisions** — no alternatives, no "we could X or Y," no "TBD," no "Decision Dn" markers. Everything was discussed, researched, and locked earlier. If a subagent surfaces a decision-shaped question mid-build, that's a real plan bug: **stop, surface to the human, fix the plan, continue. Never decide on the agent's own.** This is what makes "exclusively executable" mechanically true — the agent has nothing to decide, so it can't decide wrong.

### No mixed truth
Never put a known-wrong fact and the right one in the same context — an LLM can't be trusted to pick the right one consistently. Remove or fix **before** the agent sees the plan: stale paths, superseded decisions, "bug noted but not patched," "carry forward from vX" redirects, "Phase 0 fixes these bugs" folded into forward spec. Code-level fixes happen in a **prep session**; only the post-fix world enters the next IMPLEMENT. Closeouts / BUGS / FEEDBACK / prior IMPLEMENTs are *historical archive* — their content folds in as standing behavior; the executing agent never reads them. **Fix or remove, then execute. Don't ask an LLM to debug your context.**

### No pass-through between tracks
When a BUILD surfaces a gap/bug — even one affecting the next sequential track — **do not patch the next BUILD inline.** Finish the current scope (report it) → a planning session updates IMPLEMENT → the next BUILD is created *with the gap already resolved.* A packet carrying both correct and corrected info is mixed truth; pass-through erases the loop's value.

### The orchestrator's blueprint (parallel groundwork)
The **ready-to-execute guide** (the IMPLEMENT run directly, or a TRACK BUILD if one was carved — § *Two operating modes*) hands the executing orchestrator a starting point for parallel work so it doesn't design it cold — the operational answer to the Orchestration Paradox:
- **Subagent groupings** per phase: what runs in parallel, what dependencies sequence it, what context each subagent needs.
- **Boundaries of delegation:** what the orchestrator does NOT delegate (gate decisions, branch state, commit cadence, escalation, verification reads).
- **Placeholders as decouplers:** strict `<!-- PLACEHOLDER: ... -->` conventions sever cross-team dependencies (frontend builds against a placeholder while backend builds the real thing). Treat groupings as a starting point, not a contract.

---

## The Artifact System

### Versioning — one internal counter, end to end

A three-part `vMAJOR.MINOR.PATCH` lives for the project's life, **starting at the first IMPLEMENT draft** and continuing through planning rounds into shipped releases. **Version numbers are internal artifacts that serve our work — not a customer-facing release counter.** One continuous track covers planning → rounds → ships.

| Position  | Bumps when                                                                    |
| --------- | ----------------------------------------------------------------------------- |
| **MAJOR** | Architectural rewrite, deployment-target change, breaking external change     |
| **MINOR** | New feature, capability shift, breaking-but-internal change                   |
| **PATCH** | Bug fix, doc-only update, micro-tweak that doesn't change the feature surface |

Higher bump resets lower to zero (`v3.1.5` → `v3.2.0`). **No change, no bump; the number tracks changes regardless of source.** A planning round that meaningfully revises the doc bumps it: `v5_0_0_IMPLEMENT` → `v5_0_1` (after feedback) → `v5_0_2` (after a cold pass) → `v5_0_3` (exclusively executable). When the BUILD from `v5_0_3` ships clean, the git tag is `v5.0.3` — *the same number.* Plan version IS ship version when nothing changed between them. **Addendums to an IMPLEMENT** (e.g. `…_ADDENDUM_DESIGN.md`) share its version and bump in lockstep — see *Addendums*.

*Why we don't reserve numbers for releases:* that's a UX gesture from when versions were dressed up for users; our lifecycle is 90% planning, so planning gets the same machinery. Users find a changelog fine without gap-free numbers. Each file's 2-line header says whether it's a planning revision or a ship artifact — **trust the header, not filename pattern-matching.**

**Long, multi-angle gate loops — demarcate phases with a MINOR bump.** The default above (each pass bumps PATCH) is right for a normal loop. When a gate runs many rounds across multiple angles and the per-version `docs/archive/vX_Y/` dir gets large, you MAY open each new *review phase* with a MINOR bump so each phase keeps its own directory and a self-contained patch-trail: the holistic A-loop lives in `vX.5.*`, the B/C round opens at `vX.6.0`, and execution/as-built opens the next MAJOR (`v(X+1).0.0`). (Everlastings v1.5: A ran in `v1_5/` as `v1.5.1…v1.5.9`, B/C opened at `v1_6/` `v1.6.0`, the build will open `v2.0.0`.) The number still tracks changes (no empty bumps); the minor boundary just keeps a long trail navigable, and the major boundary marks plan→as-built (where the review scaffolding is finally shed).

**Archiving IMPLEMENT updates during initial planning phases and folding in human surfaced feedback revisions — keep all old documents by COPYING the file first, then updating the new file with changes.** -- This is notably different from the very next rule. The logic is that in the beginning phases of planning and when human provides feedback during the process, then the actual original (for example when looking at v1_5_4_IMPLEMENT.md) is still extremely valuable context for future work, and should remain in the directory (right next to the new v1_5_5_IMPLEMENT.md in our example). Whereas the GAP REVIEW surfaced revisions have all the valuable information in the GAP_REVIEW meaning keeping all copies of the IMPLEMENT.md version in the directory isn't necessary. The next note emphasizes this. 

**Archiving GAP REVIEW surfaced revisions — current-only living docs; keep the records.** When GAP REVIEWS bump from revisions they surfaced, the **living planning docs** (the IMPLEMENT + its addendums + the review-prompt charters) are **current-only**: rename them to the new version (`git mv`, history preserved) so git + descriptive per-file commits hold the superseded patch and the dir doesn't fill with near-duplicates. **Terminal records are kept standing, never renamed:** the per-pass `vX_Y_Z_GAP_REVIEW_<angle>.md` findings, `BUGS`, `FEEDBACK`, and `SESH` logs — they're cited forward and are the visible rigor trail. **Two carve-outs:** (1) when a living doc is *condensed/whittled* (a big rewrite, not a normal fold), keep a diffable pre-condense copy (`…_2.md`) so the human's inline notes aren't silently lost; (2) *dead-end **decisions** within a doc* stay in context (anti-mixed-truth — a content rule, distinct from keeping old version *files*). This relaxation rides on consistent, descriptive commits; without them, prefer keeping copies. (Early drafts of this doc imagined keep-every-file as the norm before real flow was recorded — this is the reconciliation.) **Don't strand an empty directory:** when work *leaves* a `vX_Y/` dir for the next, drop a copy of that dir's final-state living docs so it isn't left empty (the standing records usually keep it populated; this just covers the case where a dir would otherwise empty out).

**Delimiters:** dots everywhere (`v3.1.2`, git tags, commit messages) **except filenames**, which use underscores (`v3_1_2_IMPLEMENT.md`) — dots in filenames have caused tooling issues. **Git tags are pure numeric, no suffixes** (`v3.1.2`, never `v3.1.2-fix`); human labels go in the commit body / GitHub Release. Re-pointing a tag = delete + recreate, never `-v2`.

### As-built doc-sync — derive the architecture doc from the build guide, never from memory

When a build's gate clears and execution completes, the living architecture doc (e.g. `EVERLASTINGS_STORE.md`) is brought current as a **distinct task run by a FRESH agent** — never as the tired tail-end of the executing session. The failure it prevents: an executor whose context is nearly full summarizes the doc from memory, silently dropping/distorting details — stale lines then poison every future cold review (reviewers can only reason from the doc) and mis-frame fresh instances. (Everlastings: a hasty as-built left the doc's header a whole release behind and ~10 stale `AR`s, incl. a "sale sets quantity=0" line the webhook never did — which manufactured false gap-review findings.)

- **Inputs + method:** the fresh agent (1) reads the architecture doc **end-to-end, linearly, like a human** — no chunked/grep reads — so it coheres in mind and contradictions surface; (2) walks the **build-adjusted IMPLEMENT line by line** as the change-source, with the **BUILD_REPORT** for build-time deltas; (3) folds essentially everything from the IMPLEMENT into the architecture doc; (4) where the IMPLEMENT/report and the doc disagree on a **behavior, the actual code is the tiebreaker** (cite `file:line`) — a plan-vs-doc pass alone can't catch a doc-vs-code drift.
- **Upstream aid (cheaper than re-deriving):** each IMPLEMENT phase carries a one-line **`Doc impact:`** annotation naming the architecture-doc fact it creates/changes (most copy/CSS steps = "none"), so the as-built becomes *apply the annotations* + the coherence read, not re-derive from scratch. **Not** a separate doc-updates addendum — that re-creates the very drift. Truth order: **IMPLEMENT (incl. its `Doc impact:` lines) → BUILD_REPORT deltas → code.** The BUILD_REPORT stays **deviations-from-IMPLEMENT only** (lean = trustworthy).
- **Two landmines for the reconciler + every cold reviewer:** (a) the doc's top **Status/Version/Build-Guide header drifts a release behind the code** — treat it as suspect *first*, verify against the newest `*_BUILD_REPORT.md` before trusting the body; (b) **stale `file:line` anchors survive code growth** — never carry a cited line forward without re-opening the file to confirm the behavior still lives there.

### The four file types (all in `docs/archive/vX_Y/`)

- **`vX_Y_Z_IMPLEMENT.md`** — the evolving plan for one initiative; the living roadmap (there is no separate MASTER). Iterates by revision; the highest-numbered one is active. **Through the gap-review loop the living plan is *current-only*: a revision bump renames it (`git mv`, history preserved) and git holds the superseded patches** — don't pile up near-duplicate standing copies (see *Versioning → Archiving a revision*). Header: `Initiative` + `Revision driven by`.
- **`YYYY_MM_DD_SESH.md`** — the session log; date-named (event in time). Checkboxes marked **live**, not at the end. Header: `Driving` + `Type`. Close with footers: `## Session Notes`, `## Picked Up From / Stopped At`, `## Open Threads For Next Session`.
- **`vX_Y_Z_TRACK_<LETTER>_BUILD.md`** (or `vX_Y_Z_BUILD.md` for single-track/patch) — the frozen, exclusively-executable chunk handed to one orchestrator. Letter labels (A/B/C), not descriptive names that pigeonhole when scope grows. Created **only after the gap-gate clears.** A `BUILD` is for carving *ready slices* out of a plan still being completed (the incremental/app shape — ship what's executable while planning continues). A complete *plan-it-all* needs **no** separate BUILD file: its gate-cleared IMPLEMENT *is* the executable guide, run directly at the execution version. Both are the same thing — a ready-to-execute guide; the only question is *whether you carve one* (§ *Two operating modes*).
- **`vX_Y_Z_BUGS.md`** — bug log tied to a release; **kept standing** (a terminal record, cited later). In patch mode, a confirmed cluster can promote straight to a small BUILD. *How bugs flow into versions* (the recorded flow, not the early guess): a fix found **on the fly during a build** is recorded in the BUILD_REPORT — no new IMPLEMENT; a **provided bug list** that needs research/planning gets a **genuinely new** IMPLEMENT round (new planning ⇒ a new doc, not a rename of a prior one).

Plus dated **`YYYY_MM_DD_FEEDBACK.md`** (human review of an IMPLEMENT round) and **unversioned sketch files** (notes whose actionable content migrates into the next IMPLEMENT, then move to `processed/`).

### Two operating modes — route correctly

- **Initiative mode** (default for features): architecture involved, genuine planning. One IMPLEMENT iterated 0→1→2→… through the gap-gate, then **executed** — either **directly from the gate-cleared IMPLEMENT** (a complete plan-it-all, the orchestrator parallelizing via subagent groupings) or **carved into one or more TRACK BUILDs** sized to natural execution boundaries (a subsystem, a layer, a file cluster) when slices ship while planning continues, or the ship is too big for one session. **Which arrangement is a planning-time call**, not a default.
- **Patch mode** (bug fix / trivial polish, root cause known, no architecture): BUGS → small `vX_Y_Z_BUILD.md` → ship. The IMPLEMENT loop is skipped. The small-build pattern is *right* here and *wrong* for feature work.

> **The #1 trap (it stalled Thot): sizing initiative work as patch work** — cutting tiny BUILDs because the IMPLEMENT was structured by version-milestone. Initiative BUILDs are cut by execution boundary, **never** by feature/version unit.

### Roadmap ≠ build queue (how to chunk without fragmenting)

The IMPLEMENT is the roadmap *and* the detailed plan, at two depths — keep them separate:
- **The roadmap is coarse direction.** It names where things are headed; it is NOT a list of build units, and a milestone is NOT a version to ship.
- **Only the imminent slice is detailed to executable depth.** Detailing the *entire* future to build-depth in one file is the opposite failure — a bloated, unbuildable IMPLEMENT. (Anti-pattern seen on Thot: a ~350KB IMPLEMENT beside a near-empty BUILD stub — everything planned, nothing executable.)
- **Chunks promote to BUILD by readiness × execution boundary**, not by version. A chunk can be *large* (a whole subsystem) when that's the coherent boundary.

Two project shapes, same machinery:
- **Plan-it-all** (e.g. a store launch): research/plan the whole product to gap-free, then **execute at one ship** — run the gate-cleared IMPLEMENT directly (the orchestrator parallelizing via subagent groupings) *or* carve it into parallel TRACK BUILDs if the ship is too big for one session. **Decide the arrangement when you can see the work**: Everlastings' v1.4 first build went one IMPLEMENT → split to tracks at the end → rearranged sequential-to-parallel right before execution, while its v2.0.0 store-management build is run directly by one orchestrator in one session — same machinery, different call.
- **Incremental** (e.g. an app that grows): the IMPLEMENT carries the **full vision as direction** (so you build to accommodate what's coming), but you detail + gate + ship **one coherent slice at a time** by execution boundary. You do NOT invent a version number per feature to decide the slicing.

### Directory & master docs

```
docs/
├── archive/
│   ├── images/  resources/        ← diagrams; pulled-in API/tech references
│   ├── v1_0/  v1_1/  v2_0/ …       ← one subdir per MINOR; all that version's artifacts
├── research/  planning/            ← optional; only if active heavy research/planning
└── PROJECT_NAME.md                 ← living architecture / state / pitfalls doc
```

The highest-numbered `vX_Y_Z_IMPLEMENT.md` IS the roadmap — there is no `IMPLEMENT_MASTER`. Two master docs live outside the archive:

| Doc                    | Role                                                          | Updated when                   |
| ---------------------- | ------------------------------------------------------------- | ------------------------------ |
| `docs/PROJECT_NAME.md` | architecture, current state, design system, pitfalls (living) | every non-trivial change ships |
| `.agent/DEV_RULES.md`  | rules of engagement (this doc)                                | a convention is added/changed  |

**Starter templates — `.agent/PROJECT_NAME.md` + `.agent/README.md`.** Both ship in every project's `.agent/` as ready-to-adapt starters, so you never write either from scratch: `.agent/PROJECT_NAME.md` is the seed for a project's living architecture doc (you copy it out and rename it for the project — e.g. it grew into `EVERLASTINGS_STORE.md`), and `.agent/README.md` is the base project README. They're kept in sync across projects via `filemgmt` (§ *Syncing*), and because they get refined naturally while being adapted in any one project, those improvements flow back to the fleet — so the templates only get better. When starting a new project, reach for these two first.

Reference content (schemas, glossary, diagrams) lives in `PROJECT_NAME.md` and `archive/resources/`, **not** in IMPLEMENT/BUILD — a forcing function that keeps PROJECT_NAME honest. Conflict resolution: a *past* IMPLEMENT vs PROJECT_NAME → **PROJECT_NAME wins** (it's living); the *current* IMPLEMENT vs PROJECT_NAME → **IMPLEMENT wins** (PROJECT_NAME was likely neglected — update it). **Dead-end *decisions* stay in context** so future agents read a live decision against what it replaced — a **content** rule (anti-mixed-truth), distinct from keeping old version *files* (those follow *Versioning → Archiving a revision*).

### Where information lives — route by scope (don't put cross-cutting facts in the wrong tier)

Five homes, each with a different scope and load behavior. Putting a fact in the wrong one means it either won't be there when you need it, or it bloats every unrelated session. Route by **scope** (who needs it) and **whether it must travel** (other machines/repos):

- **`~/.claude/CLAUDE.md`** (global, machine-local) — *about the human and how to work with them*: communication style, cognitive needs, writing mechanics, durable preferences. Auto-loads in **every** session on this machine. Keep it lean (always-on context). Does **not** sync to other machines/teammates. Right for "how to talk to the human," wrong for project facts or bulky data.
- **Per-project Claude auto-memory** (`~/.claude/projects/<project>/memory/`) — *facts about one project/codebase/client*. Auto-loads only in that project. Where project decisions, gotchas, and project-scoped feedback go.
- **`.agent/DEV_RULES.md` + synced `.agent/` docs** (this doc) — *cross-project build method/protocol*. Travels to every repo via `filemgmt`. The only tier that reliably reaches other machines/repos, so anything that must be portable protocol goes here — **not** in machine-local CLAUDE.md.
- **`.agent/PROJECT_LESSONS.md`** (in-repo, **not** fleet-synced) — *project-specific hard-won lessons* that live with the repo (travels via git with the repo, but isn't fanned out to the fleet).
- **The project's living architecture doc** (`PROJECT_NAME.md` → e.g. `EVERLASTINGS_STORE.md`) — the project's current-state architecture/spec.

Two routing traps: (1) cross-project but **not** protocol — measured calibration data, a reusable technique — has no perfect home; prefer a clearly-labeled synced reference doc over stuffing it into DEV_RULES (keep this doc pure method) or into machine-local CLAUDE.md (won't travel). (2) Always-on cost: anything in `~/.claude/CLAUDE.md` loads into *every* session including unrelated projects — put short durable facts there, not narrow or bulky content.

### IMPLEMENT template (the living roadmap)

```markdown
# v[X.Y.Z] Implementation Plan
**Initiative**: [what this initiative is]
**Revision driven by**: [initial draft / post-feedback / post-cold-review / lock-in review…]
**Required reading first**: docs/PROJECT_NAME.md · README.md · [archive/resources/* as applicable]
**If you find missing context**: PROJECT_NAME.md is living — confirm with the human and update it; don't paper over the gap here.

## Roadmap (coarse direction — NOT a build queue)
[Where this initiative is headed. Brief. Milestones are direction, not version-ships and not BUILD units.]

## Imminent slice — [name] (detailed to executable depth)
[The next coherent execution-boundary chunk: phases, file:line specifics, production-ready snippets, verification, rollback, subagent groupings. When this clears the gap-gate it's **ready to execute** — run directly (a complete plan-it-all) or promote to a BUILD packet (§ *Two operating modes*); sized by execution boundary, not by version.]

## Later (direction only)
[Bulleted direction for what follows. Detail arrives as a slice approaches the gate — not before.]

## Cross-references
[Architecture/glossary → PROJECT_NAME.md · API/schemas → archive/resources/ · branching/versioning → DEV_RULES.md]
```

### BUILD template (the frozen executable chunk)

```markdown
# v[X.Y.Z] Track [LETTER] Build Packet   (or: # v[X.Y.Z] Build Packet — [chunk]  for single-track/patch)
**Source**: extracted from vX_Y_Z_IMPLEMENT.md § [section]
**Branch**: [feat/fix branch]
**Required reading first**: docs/PROJECT_NAME.md · THIS doc only — do NOT read prior IMPLEMENTs, BUGS, or BUILD_REPORTs

## Pre-flight  [branch cut, deps, env, services]
## Phase 0: Setup
## Phase 1..N  [each step file:line specific; production-ready snippets, no placeholders]
## Verification  [per-phase + end-to-end; orchestrator records actual results in the BUILD_REPORT]
## Rollback  [per-phase]
## Subagent Groupings  [parallel execution plan]
## BUILD_REPORT_<source>.md to write when done:
  - what changed (file-by-file one-liners) · what deviated (ideally empty) · gaps/bugs surfaced (do NOT pass-through) · verification results
```

The orchestrator returns `BUILD_REPORT_<source>.md` in the same directory (`<source>` mirrors the BUILD name minus `_BUILD` — e.g. `BUILD_REPORT_v5_0_3_TRACK_A.md`). Its findings fold back into the next IMPLEMENT round.

---

## Git Branching & Merging

`main` = production-ready, tagged releases only (tested, bug-free, public-ready). `dev` = persistent integration/testing branch. `feat/*` and `fix/*` = temporary, deleted after merge.

**New project init:**
```bash
cd ~/Development && mkdir <project> && cd <project>
cp -R /Users/seanivore/Development/_git_init/. .
git init && git add . && git commit -m "chore: initial commit"
git branch -M main
gh repo create <project> --public --source=. --remote=origin
git push -u origin main
git checkout -b dev
```

**Feature → dev preview → ship:**
```bash
# 1. Start a feature off latest main
git checkout main && git pull origin main && git checkout -b feat/<name>

# 2. Ship through dev first (ff-merge keeps history linear), push → Vercel auto-deploys the dev preview
git checkout dev && git merge --ff-only feat/<name> && git push origin dev
```
**🛑 PAUSE.** Tell the human it's live on the dev preview URL (in README / PROJECT_NAME) with a one-line summary. Do NOT ship to main until they sign off. Bug? Fix on `feat/*`, ff-merge to `dev`, push, ping again — production is untouched until step 3.

```bash
# 3. Ship to main (after: tests pass · human signed off · PROJECT_NAME current · SESSION footers done ·
#    BUILD_REPORT folded back · package.json bumped if applicable · build succeeds)
git checkout main && git merge --ff-only dev && git push origin main
git tag vX.Y.Z && git push origin vX.Y.Z     # pure numeric tag, no suffix
```
After step 3, `dev` and `main` are at the same commit. The dev→main ff-merge model means dev is always at-or-ahead of main, never out of sync.

---

### Addendums — split a big plan, keep one build

A large IMPLEMENT can shed bulk into **addendums** — sibling docs it references, e.g. `vX_Y_Z_ADDENDUM_DESIGN.md` (the presentation layer) and `vX_Y_Z_ADDENDUM_TESTING.md` (the verification plan) — so the executable functionality plan stays scannable while design/test detail grows without entangling its byte-anchors.

- **One build, one task.** The IMPLEMENT + its addendums are a single execution task and a single source of truth; the IMPLEMENT lists its addendums in its required-reading.
- **Lockstep version.** Every addendum carries the **same version** as its IMPLEMENT and bumps with it (a v1.6.1 IMPLEMENT ⇒ v1.6.1 addendums) — a reader never diffs mismatched versions.
- **Always in review scope.** Every gap review (and the breadth pass) ingests the IMPLEMENT **and all its addendums** — no per-review reminder needed; "review the build" means all of them.
- **Same executable bar everywhere.** Design and tests are planned to *exclusively executable* exactly like functionality (the builder never discovers/decides). Design that depends on the live render ships a **concrete default + a render-tune note** and gets a **test + feedback pass** alongside functionality testing — "executable" means no guesswork, not "frozen, no feedback." **Real content is never a build/test gate:** build and test on production-grade placeholders that mimic the validated real-asset specs; real content arrives later (often by the client, post-handoff).
- **When to split.** Reach for an addendum when one concern would bloat the IMPLEMENT past easy scanning or tangle its anchors; keep tightly-coupled behavior (data model, handlers) in the IMPLEMENT itself.

---

## Conventions

- **Commits:** `type(scope): brief [vX.Y.Z]` + body bullets (`feat fix docs style refactor test chore`); word them to mirror the BUILD chunk so history maps to plan.
- **Drift:** fix protocol drift you hit (whether or not you caused it); if unsure it's drift, confirm with the human first.
- **Research:** verify current docs while planning — never ship training-data recall as fact. Business-grade research only → `.agent/RESEARCH_PROTOCOL.md`.
- **Skills:** globally-installed Agent Skills live under `~/.agents/skills` (the `npx skills add …` install dir) — **not** `~/.claude/skills`, where agents reflexively look and find nothing. When a task needs a skill, or a subagent must locate one, check/pass that path explicitly.
- **Markdown tables ≤ ~100 cols.** Keep a table's total rendered width under ~100 monospace characters (any number of columns within that budget); past it, rows wrap and become unreadable in editors (and paste badly into Thot). If the data won't fit, drop the table for **grouped bullets** (one sub-list per row) — never a wider table. *Exception:* a doc read **only** by agents (e.g. a frozen BUILD) may keep a wider table when it genuinely conveys structure better than bullets — never in human-facing docs (IMPLEMENT, README, FEEDBACK, PROJECT_NAME).
- **Prose soft-wraps; never hard-wrap a paragraph.** Write each paragraph/bullet as **one logical line** and let the editor wrap to the window — do not insert manual line breaks mid-paragraph. A single newline renders as a space, so hard-wrapping changes nothing visible but multiplies physical lines, and these docs get cited by line number constantly: a hard-wrapped paragraph spans many numbered lines, so a human pointing at "line 76" (the block) and an agent pointing at "line 81" (a sentence inside it) are both right about *different* lines — soft-wrapped, the whole paragraph is one number and they agree. **Never reflow inside a fenced ` ``` ` code block or a table** — those carry significant newlines / column alignment and *are* the anchors (the byte-exact CURRENT/NEW quotes). Reflowing prose is always safe; touching a fence or table is never. (Claude Code's doc output hard-wraps prose by habit — strip it.)
- **Human-formatted docs are opt-in — not the default.** Default formatting is dense (one logical line, delimiter-rich) — that's how agents ingest best. **Only** when Sean says **"human-formatted"** (or a doc is unmistakably Sean-only and agent-read by no one) switch to the cognitive-load-first layout in `.agent/HUMAN_FORMATTING.md` (foldable indentation, one-idea-per-line lists, `+`/`-` markers, colon-outside-bold). Never apply it to agent-read docs (IMPLEMENT / BUILD / ADDENDUM / gap-review / reports). If unsure, stay dense and ask.
- **Testing:** the BUILD carries the verification plan; the orchestrator records results in the BUILD_REPORT.
- **Syncing:** one canonical copy → every project via `filemgmt -f ~/Development -r <path>/.agent/DEV_RULES.md` (new shared files: `-a`). `.agent/PROJECT_LESSONS.md` is per-project, not synced.

---

## Agent Quickstart

**Read first (no exceptions):** `docs/PROJECT_NAME.md` → `README.md` → your assigned doc (a BUILD if executing; the highest-numbered `vX_Y_Z_IMPLEMENT.md` if planning) → `.agent/PROJECT_LESSONS.md` (skim).

**If you're planning, the gap-gate IS the job:** draft → fresh-instance review (3 angles) → fold → repeat → human approves → promote to BUILD. **No code before the gate.**

**As you work:** mark SESSION checkboxes live; if the plan is wrong, stop + surface + start a new SESSION (don't silently patch); confirm via `git diff` before commit.

**Before closing:** SESSION footers; `BUILD_REPORT_<source>.md` if you ran a BUILD; update `PROJECT_NAME.md` if architecture changed; commit mirroring the chunk.

**You do NOT:**
- read past IMPLEMENTs / BUGS / FEEDBACK / BUILD_REPORTs during a build (already folded into your BUILD);
- edit a current IMPLEMENT mid-build, or backfill an earlier one to fold findings — fold into the **next** revision (bump it; through the gap-review loop that's a rename — *Versioning → Archiving a revision*);
- write a separate "completion/walkthrough" file (footers go in SESSION; orchestrator findings in BUILD_REPORT);
- create archive dirs at major-version level (`v3_0/`, never `v3/`);
- put reference content in IMPLEMENT/BUILD (→ PROJECT_NAME / archive/resources);
- pass-through fixes between sequential tracks;
- **self-certify the plan, or substitute in-session subagents for the fresh-instance gap-review gate.**
