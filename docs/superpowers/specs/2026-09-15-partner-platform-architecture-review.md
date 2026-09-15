# RNDRNTWRK Partner Platform — Expansive Architecture Review

**Review date:** 2026-09-15  
**Reviewed artifact:** `2026-09-15-partner-platform-cloudflare-design.md`  
**Disposition:** Approve the product thesis; supersede the first technical architecture with Architecture v2 before implementation.  
**Severity scale:** Blocker, High, Medium, Low

---

## 1. Executive assessment

The original design gets the most important product decisions right:

- Partner is a context-to-value router, not a static partnership form.
- Cloudflare can be the exclusive production runtime.
- Partner context is private and ephemeral by default.
- A user reviews extracted claims before persistence.
- Matching combines structured rules, semantic retrieval, and model synthesis.
- MCP is allowed to read, analyze, and propose, but not to perform consequential actions.
- Partner-to-partner identities stay hidden until mutual consent.
- The canonical outputs—Partner Passport, Collaboration Map, Pilot Brief, and Program Envelope—are the right product abstractions.

The first draft is not yet safe to implement unchanged. It describes products and stores but does not fully define the consistency model, publication authority, identity federation, source authority, model-release discipline, recovery model, jurisdiction boundary, encryption key lifecycle, or operational degradation strategy. Those omissions would create hidden dual writes, stale authorization risks, unverifiable recommendations, and an identity silo.

Architecture v2 closes those gaps while preserving the approved product direction.

---

## 2. Repository review scope

The review examined the repositories most relevant to this system:

| Repository | Relevant precedent | Architecture consequence |
| --- | --- | --- |
| `rndrntwrk/report` | Contract-first schemas, private ingestion, quarantine, admission coordinator, immutable signed releases, public projection, redaction, restatement, SSRF policy | Reuse its trust model for capability-registry releases, public partner projections, evidence authority, and signed Program Envelopes |
| `rndrntwrk/outreachr` | Fail-closed MCP, exact disclosure grants, pre/post validation, pending-proposal-only writes, audit failure closes the operation | Make this the normative MCP safety boundary |
| `rndrntwrk/cloud` | Existing agent runtime, A2A route, public JWKS pattern, wallet and session flows | Federate identity and preserve future A2A interoperability without hosting Partner inside Cloud |
| `rndrntwrk/crtx-auth-svc` | Existing authentication service boundary and subject/session concepts | Define an identity adapter rather than inventing an incompatible subject model |
| `rndrntwrk/docs` | Existing ecosystem system map and legacy Technology/Content/Distribution partnership tiers | Use docs as presentation, not as the canonical machine-readable registry |
| `rndrntwrk/555-backend` | SIWS, quests, rewards, Alice/admin protected operations | Advertise capabilities through manifests; do not let Partner call privileged reward operations directly |
| `rndrntwrk/Sw4p` and SW4P documentation | Financial, quote, settlement, webhook, and protected execution surfaces | Keep Partner read/proposal-only and require a separate, product-owned execution approval path |
| `rndrntwrk/slopdotcash` | Manifest-as-write-master, immutable reviewed state, precise projected/approved/paid distinctions, GitHub acceptance boundary | Reuse for development-bounty handoffs and capability-manifest governance |
| `rndrntwrk/render`, `stream`, `stream-plugin` | Creator and streaming product surfaces | Integrate through capability manifests and handoff contracts rather than shared databases |

---

## 3. Findings

### F-01 — The original design lacks an explicit consistency model

**Severity: Blocker**

The first design assigns state to Durable Objects, D1, R2, Vectorize, Workflows, and analytics, but it does not say how one accepted change becomes visible in every derived store. Implementing direct writes from request handlers would create partial success, stale projections, and hard-to-repair divergence.

**Required correction**

- The Workspace Durable Object is the authoritative command model for private workspace state.
- Every accepted command writes domain state and an outbox event in the same SQLite transaction.
- Alarms or Queues drain the outbox at least once.
- Every projection consumer is idempotent by `event_id` and aggregate version.
- D1, Vectorize, search, notifications, analytics, and public release candidates are derived projections.
- No request-path dual writes.
- Reconciliation jobs compare authoritative versions with projections and rebuild them.
- Every read contract declares strong or eventual consistency.
- Authorization and revocation always read authoritative state, never Vectorize or a lagging D1 projection.

### F-02 — The ecosystem catalog has no canonical machine authority

**Severity: Blocker**

The docs and repositories disagree in age, status, and deployment reality. A matching system cannot recommend a product merely because a prose document calls it live.

**Required correction**

Introduce product-owned, reviewed `rndr-capability.json` manifests and a signed registry release. Each capability declares:

- stable ID and owning repository;
- immutable source commit;
- lifecycle state: `planned`, `preview`, `live`, `degraded`, `paused`, or `retired`;
- integration surfaces;
- value primitives and eligible partner contexts;
- prerequisites, restrictions, geographies, risk class, and owner;
- operational evidence references and freshness;
- handoff endpoint or human owner;
- version and compatibility range.

Only capabilities in an admitted signed release can be recommended as available. Planned capabilities may be shown only as planned.

### F-03 — Source authority and claim status are under-specified

**Severity: High**

A user statement, a repository manifest, an operational event, a legal document, a public article, and a model inference are not equivalent evidence.

**Required correction**

Add source-authority and evidence-type registries. Every claim must carry:

- source and evidence IDs;
- authority class;
- observation time and freshness policy;
- visibility and consent;
- status: `candidate`, `attested`, `verified`, `disputed`, `stale`, `revoked`, or `superseded`;
- confidence only where confidence is meaningful;
- support and conflict links;
- exact source span or an honest attested summary.

Absence of evidence cannot be converted into a negative fact.

### F-04 — Lifecycle semantics collapse deletion, revocation, and correction

**Severity: High**

Deletion is not the same as withdrawing consent, redacting sensitive evidence, superseding an obsolete claim, or restating a prior decision.

**Required correction**

Adopt distinct operations:

- **Revoke** — stop future access or use.
- **Redact** — withhold delivery while preserving accountability metadata where legally permissible.
- **Supersede** — replace a current claim or envelope with a new version.
- **Restate** — correct a previously admitted decision and link old and new versions.
- **Delete** — erase active content and schedule backup expiry subject to legal obligations.

Program Envelopes and accepted public releases are immutable; corrections create linked versions.

### F-05 — Program Envelopes are versioned but not cryptographically admitted

**Severity: High**

A Program Envelope may control budget, data grants, agents, metrics, and approvals. A mutable database row is not enough.

**Required correction**

- Canonicalize accepted envelopes.
- Hash the canonical bytes.
- Sign the manifest with a service-bound Ed25519 signer Worker.
- Keep signing keys only in the signer Worker.
- Publish a separate verification JWKS/key set.
- Include schema, policy, taxonomy, capability-registry, model, prompt, evidence, and source-commit versions.
- Verify signatures before execution or public display.
- Use signed revocation/restatement records rather than silent replacement.

### F-06 — The MCP boundary needs the full Outreachr safety model

**Severity: Blocker**

Scopes alone do not protect private context. Tool output and service adapters can also leak data.

**Required correction**

Effective access is the intersection of:

```text
requested access
∩ OAuth token scopes
∩ active disclosure grant
∩ current workspace membership
∩ record ACL
∩ field policy
∩ declared purpose
∩ freshness and revocation state
```

Every invocation carries a UUID, actor, client, tool, risk class, requested records and fields, disclosed IDs, purpose, and trace ID. The server validates adapter output before redaction and validates again after redaction. It records requested/succeeded/failed audit events; failure of the initial or final audit write fails closed. Private tools accept authorized context handles, not arbitrary paths, URLs, SQL, or files.

### F-07 — Partner authentication would become another RNDRNTWRK identity silo

**Severity: High**

Passkeys are appropriate, but a Partner-only subject and organization model would later conflict with Cloud, wallet identities, agent principals, and product accounts.

**Required correction**

Add an RNDR Identity Adapter:

- stable RNDR subject ID;
- OIDC/JWT/JWKS verification boundary;
- organization and workspace mappings;
- optional SIWE/SIWS wallet association;
- passkey-backed local fallback;
- service principals for agents;
- identity-linking and recovery rules;
- authority-verification states for domains, GitHub organizations, wallets, legal entities, and product ownership.

A wallet signature or domain email proves control of that credential, not legal authority to bind an organization.

### F-08 — Encryption is described without a key hierarchy or recovery model

**Severity: High**

“Application-layer encryption” is not implementable until key generation, wrapping, rotation, nonce use, AAD, deletion, backup behavior, and incident recovery are defined.

**Required correction**

- Random per-object or per-record data-encryption key.
- AES-256-GCM with unique nonce.
- AAD binds workspace, object, version, classification, and schema.
- Versioned master key-encryption key in a Worker secret; Secrets Store may be adopted only after operational qualification.
- Wrapped DEK and key version stored beside ciphertext, never the master key.
- Rotation rewraps DEKs without rewriting object bodies.
- Crypto-shred deletes wrapped keys while deletion workflows remove ciphertext.
- Deletion receipts disclose backup-retention windows honestly.

### F-09 — Disaster recovery and restore testing are absent

**Severity: High**

A privacy-sensitive control plane needs tested recovery, not only backups.

**Required correction**

Use Durable Object point-in-time recovery, D1 Time Travel, versioned or immutable R2 objects for admitted artifacts, signed registry snapshots, and rebuildable projections. Define RPO/RTO per state class and run quarterly restore drills. Derived Vectorize and D1 projections must be rebuildable from authoritative event/snapshot state.

### F-10 — Data residency promises are not bounded by actual Cloudflare resources

**Severity: High**

Workspace locality cannot be promised after the fact or per record when a service does not provide that guarantee.

**Required correction**

- Define supported jurisdiction profiles before launch.
- Provision separate namespaces, databases, and buckets for each supported profile.
- Select a profile at workspace creation.
- Treat moves as controlled export/import into new resources.
- Disclose where inference and external connectors may process data.
- Disable features that cannot meet a required jurisdiction rather than claiming compliance.

### F-11 — Model and prompt changes have no release discipline

**Severity: High**

A recommendation cannot be reproduced if the model, prompt, policy, registry, evidence, or Passport changes invisibly.

**Required correction**

Every generated artifact records:

- model and provider ID;
- model release;
- prompt template and hash;
- extraction/ranking schema;
- policy and taxonomy versions;
- capability-registry release;
- Passport version;
- evidence IDs and digests;
- deterministic candidate scores;
- generation timestamp;
- authorized-context digest.

Model or prompt changes pass offline evaluations, adversarial fixtures, a canary, and rollback criteria. Hard eligibility and privacy gates remain deterministic code.

### F-12 — Abuse and cost controls are not first-class domain rules

**Severity: High**

Uploads, website crawl, inference, embeddings, MCP calls, and introductions can all be abused economically or socially.

**Required correction**

Add per-workspace budgets for bytes, pages, crawl depth, tokens, embeddings, concurrent Workflows, MCP requests, proposals, and introduction requests. Implement circuit breakers, anomaly detection, dead-letter review, and operator kill switches. Introduction requests require double opt-in, cadence limits, suppression lists, anti-enumeration behavior, and disclosure previews.

### F-13 — Email is currently a beta dependency

**Severity: Medium**

Email may be useful, but it cannot be required for core access or approval.

**Required correction**

Make in-app notification and review queues authoritative. Email is feature-flagged convenience delivery. Passkeys, recovery codes, and direct workspace review remain functional when email is degraded.

### F-14 — Public and private planes are logically separated but not physically narrow enough

**Severity: High**

A public Worker with private bindings broadens the blast radius.

**Required correction**

Use separate deployables:

1. `partner-public` — static/public pages and signed public projection only.
2. `partner-app` — authenticated BFF and workspace UI.
3. `partner-core` — service-bound private command/query API.
4. `partner-mcp` — OAuth-protected MCP boundary.
5. `partner-ingest` — source credentials, Browser Rendering, conversion, inference, Workflows, and Queues.
6. `partner-admission` — serialized release/admission coordinator.
7. `partner-signer` — service-bound signer with no public route.

The public plane receives no source credentials, signing key, private R2 binding, private Vectorize binding, or workspace Durable Object binding.

### F-15 — The repository destination should be explicit

**Severity: High**

The profile repository is suitable for the architectural decision but not the application.

**Required correction**

Create a dedicated `rndrntwrk/partner` monorepo for implementation. Keep the architecture decision and cross-ecosystem pointer in `rndrntwrk/rndrntwrk`. Product repositories own their capability manifests. Shared contracts are published from source and pinned by version; the Partner app never imports another product’s private runtime package.

### F-16 — Product integrations need contracts rather than database coupling

**Severity: High**

Direct access to 555, SW4P, Stream, Cloud, or Slop databases would make Partner a fragile super-admin surface.

**Required correction**

Integrations use one of four explicit forms:

1. signed public capability manifest;
2. read-only operational evidence adapter;
3. user-approved handoff/deep link;
4. product-owned proposal or execution API with its own approval policy.

Partner does not distribute rewards, execute SW4P transfers, publish Slop projects, or operate streams directly.

### F-17 — A2A and MCP need separate semantics

**Severity: Medium**

MCP exposes tools, resources, and context. A2A delegates tasks to an agent. Combining them creates confused authority.

**Required correction**

MCP ships first. A2A remains a later, separately authorized surface with its own Agent Card, delegated-task envelope, status model, and service-principal policy. It may call the same core proposal APIs but cannot inherit MCP grants implicitly.

### F-18 — Operational SLOs and degraded modes are missing

**Severity: High**

A best-in-class platform must define what remains available during partial failure.

**Required correction**

- Serve the last verified signed public registry when admission, inference, or private stores are degraded.
- Allow Passport review without Vectorize.
- Fall back from model reranking to deterministic rankings.
- Pause proposals when audit or approval stores are unavailable.
- Never fall back from failed authorization to broader access.
- Define route SLOs, error budgets, paging thresholds, and incident runbooks.

---

## 4. Corrected architectural shape

```text
Internet
  |
  +-- partner-public
  |     signed public R2 projection only
  |
  +-- partner-app
  |     authenticated UI/BFF
  |       |
  |       +-- service binding -> partner-core
  |
  +-- partner-mcp
  |     OAuth + MCP 2026-07-28
  |       |
  |       +-- service binding -> partner-core
  |
  +-- Cloudflare Access -> /admin on partner-app

partner-core
  |
  +-- Workspace Durable Objects (authoritative private command state)
  +-- D1 control/program read models
  +-- encrypted R2 private objects
  +-- private/public Vectorize adapters
  +-- outbox and reconciliation

partner-ingest
  |
  +-- connector secrets
  +-- Browser Rendering / Browser Run
  +-- Workers AI
  +-- Workflows and Queues
  +-- quarantine R2
  +-- service binding -> partner-core

partner-admission
  |
  +-- serialized Admission Coordinator Durable Object
  +-- immutable release manifests
  +-- service binding -> partner-signer

partner-signer
  |
  +-- Ed25519 signing key only
  +-- no public route
```

---

## 5. Canonical authority matrix

| Data | Authority | Derived stores |
| --- | --- | --- |
| Consent, grants, approvals, private claims, proposal state | Workspace Durable Object | D1 indexes, Vectorize, analytics |
| User and organization directory | Identity adapter plus `partner_control` D1 | workspace membership snapshots |
| Raw private source body | encrypted R2 object | normalized temporary object, evidence slices |
| Capability availability | admitted signed capability-registry release | public R2, D1 search, Vectorize |
| Recommendation candidate score | deterministic matching package | Collaboration Map |
| Model explanation | versioned generated artifact | UI/MCP presentation |
| Accepted Program Envelope | signed immutable envelope | D1 index, public/private projection |
| Public partner profile/case study | signed admitted public projection | CDN and search |
| Audit history | append-only workspace audit sequence | content-free operational index |
| Vector embedding | derived, rebuildable | Vectorize only |

---

## 6. Recommended release boundary

The first release should include:

- signed manually curated capability registry;
- passkey account plus RNDR identity-adapter interface;
- text, one approved website, and PDF/image intake;
- claim review and Partner Passport;
- deterministic matching plus model explanation;
- Pilot Brief proposal;
- public MCP discovery;
- private MCP reads through exact disclosure grants;
- proposal creation only;
- admin review through Access;
- export, revoke, redact, supersede, restate, and delete workflows;
- full outbox, reconciliation, signed-release, threat-model, and recovery contracts.

It should defer:

- A2A;
- autonomous connector breadth;
- financial execution;
- direct product administration;
- public marketplace messaging;
- private partner identity revelation before double opt-in;
- automated legal or commercial acceptance;
- strict jurisdiction profiles not demonstrably supported by every selected service.

---

## 7. Review verdict

**Product architecture:** approved.  
**Original technical draft:** superseded.  
**Architecture v2:** suitable to become the implementation contract after owner review.  
**Implementation:** should not start until the v2 specification and repository split are approved.
