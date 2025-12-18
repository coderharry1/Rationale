
# Rationale — Product Decision Log

## The Problem
In distributed, async-first teams, product decisions are often spread across Slack threads, Zoom transcripts, and Jira comments. As time passes, the **why** behind a decision is lost. This leads to:
1. **Decision Churn:** Reopening settled topics because context was forgotten.
2. **Onboarding Friction:** New team members can't understand why things are the way they are.
3. **Low Trust:** Stakeholders question priorities when trade-offs aren't visible.

## Why This Tool Exists
Rationale is a "Memory Layer" for your product team. It forces thinking discipline by requiring PMs to explicitly document options and trade-offs *at the moment the decision is made*.

### What It Intentionally Does NOT Do
To maintain focus and avoid bloat, Rationale excludes:
- **Discussions/Comments:** Have those in Slack or meetings. Rationale is for the *output*.
- **Task Management:** That's what Jira is for.
- **Workflow Automation:** Decisions are human; the tool is a record, not an engine.

## Conceptual Jira Integration
Rationale complements Jira via the `Jira ID` field.
1. **In Jira:** Use a custom field or link to the Rationale decision URL in the "Implementation" ticket.
2. **In Rationale:** Always link a decision to its delivery ticket (e.g., `PROD-123`).
3. **Benefit:** Engineers see *what* to build in Jira; future PMs see *why* it was chosen in Rationale.

## Data Model
- **Decision:**
    - `id`: Unique identifier.
    - `createdAt`: Timestamp.
    - `jiraId`: Associated ticket link.
    - `problem`: High-level intent.
    - `options`: Alternatives explored.
    - `tradeoffs`: Explicit "this over that" reasoning (The Core).
    - `finalDecision`: The conclusion.
    - `confidence`: Subjective level of certainty (Low/Medium/High).

## User Flow
1. **Discover:** PM scans the Timeline to see recent pivot points.
2. **Capture:** After a meeting or Slack debate, PM hits "Record Decision".
3. **Template:** PM follows the structured form (Problem -> Options -> Trade-offs -> Result).
4. **Archive:** The decision is saved permanently in the chronological timeline for future reference.
