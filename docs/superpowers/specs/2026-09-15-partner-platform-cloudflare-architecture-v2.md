# RNDRNTWRK Partner Platform — Normative Architecture v2

**Status:** Proposed canonical technical architecture  
**Date:** 2026-09-15  
**Supersedes:** Technical implementation sections of `2026-09-15-partner-platform-cloudflare-design.md`  
**Companion review:** `2026-09-15-partner-platform-architecture-review.md`  
**Implementation repository:** `rndrntwrk/partner`  
**Runtime boundary:** Cloudflare-only production infrastructure

The original specification remains authoritative for the product thesis, partner experience, Partner Passport, Collaboration Map, Pilot Brief, and Program Envelope requirements. This document replaces its technical control-plane, storage, integration, security, and operational architecture.

---

## 1. Binding decisions

1. Partner is implemented in a dedicated `rndrntwrk/partner` repository. The central `rndrntwrk/rndrntwrk` repository retains the architecture decision and ecosystem pointer.
2. Product repositories own reviewed `.rndr/capabilities.json` manifests. Partner never maintains a hidden second product inventory.
3. Cloudflare is the exclusive production runtime. External products and data sources are connectors, evidence sources, or approved handoff destinations.
4. Private workspace commands are authoritative in one SQLite-backed Durable Object per workspace.
5. D1, Vectorize, analytics, notifications, and public search are projections. They never authorize access.
6. No request path dual-writes authoritative and derived stores. A transactional outbox and idempotent consumers project state.
7. Public capability data, public partner artifacts, and accepted Program Envelopes use admission, canonicalization, immutable storage, Ed25519 signing, and verification.
8. MCP follows the fail-closed Outreachr boundary: bounded reads and pending proposals only.
9. Partner federates with RNDR identity through an adapter and does not create an incompatible identity silo.
10. Model output never grants authority, changes consent, approves a proposal, or determines a hard eligibility gate.
11. Raw private context is ephemeral by default. Persistence requires source retention consent or claim approval.
12. MCP and A2A are separate. MCP ships first; A2A is deferred under a different delegated-task contract.

---

## 2. Repository-informed precedent

### `rndrntwrk/report`

Partner reuses the trust pattern, not the metrics product:

- contract-first JSON Schemas and generated validators;
- source-authority and evidence registries;
- private ingestion, quarantine, and bounded network policy;
- serialized admission;
- immutable content-addressed artifacts;
- canonical bytes, digests, signatures, key rotation, and verification;
- physical private/public projection separation;
- last-known-good public release;
- explicit revoke, redact, supersede, restate, and rollback;
- machine-readable acceptance criteria and threat model.

### `rndrntwrk/outreachr`

Partner adopts:

- exact record and field disclosure;
- `pending_user_approval` proposal results;
- tool risk, side-effect, approval, and redaction metadata;
- no send, approve, retry, raw SQL, shell, arbitrary file, or unrestricted network tools;
- adapter output validation before and after redaction;
- requested/succeeded/failed audit events;
- audit failure closes the operation.

### `rndrntwrk/cloud` and `rndrntwrk/crtx-auth-svc`

Partner aligns with:

- stable subject and organization IDs;
- OIDC/JWT/JWKS verification;
- wallet association;
- service principals;
- future A2A interoperation.

Partner does not share Cloud’s database or host inside its application.

### Product repositories

555, Stream, SW4P, Slop, agent, and creator products integrate through:

1. signed capability manifests;
2. read-only operational evidence;
3. user-approved handoffs;
4. product-owned pending-proposal APIs.

Partner does not invoke privileged reward, payment, withdrawal, settlement, publishing, or stream-control operations.

---

## 3. Deployable Workers

### `partner-public`

Serves:

- public site;
- public docs;
- signed capability registry;
- signed opportunities;
- admitted public profiles and case studies;
- `/agents.md`, `/llms.txt`, `/privacy`, `/security`, `/status`.

Bindings are limited to static assets and the admitted public R2 projection. It receives no private store, connector, AI, core, or signing binding.

### `partner-app`

Authenticated workspace and internal BFF.

Bindings:

- `partner-core` Service Binding;
- Turnstile;
- Cloudflare Access identity for `/admin`.

It does not access private persistence directly.

### `partner-core`

Service-bound only.

Owns:

- authorization;
- membership;
- disclosure grants;
- strongly consistent private reads;
- Partner Passport versions;
- proposal and approval state;
- outbox;
- redaction;
- Workflow and Queue orchestration;
- signed-artifact verification.

### `partner-mcp`

Public OAuth-protected stateless MCP endpoint.

Owns:

- authorization-server flow;
- client and consent validation;
- `server/discover`;
- tools, resources, and prompts;
- invocation context;
- request/response limits;
- pre/post audit;
- redaction and output validation.

It calls `partner-core` through a Service Binding and has no direct data bindings.

### `partner-ingest`

Private processing plane.

Owns:

- source credentials;
- Browser Rendering and Browser Run crawl jobs;
- upload validation and quarantine;
- document normalization;
- prompt-injection classification;
- Workers AI;
- Workflows and Queues;
- projection consumers;
- reconciliation and retention jobs.

It cannot approve claims, proposals, releases, or Program Envelopes.

### `partner-admission`

Service-bound serialized release coordinator.

Owns:

- expected-release compare-and-swap;
- capability release admission;
- public projection admission;
- Program Envelope admission;
- visibility, evidence, freshness, PII, and policy checks;
- revoke, redact, restate, and rollback.

### `partner-signer`

Service-bound and unroutable from the public Internet.

Owns:

- Ed25519 private key;
- canonical-byte digest verification;
- signatures;
- key IDs;
- rotation and revocation;
- public verification key set.

### Route policy

```text
/mcp, /authorize, /token, /.well-known/oauth-*  -> partner-mcp
/workspace/*, /admin/*, /api/private/*          -> partner-app
all remaining public routes                     -> partner-public
```

Bindings are allowlisted per Worker in a machine-readable environment resource matrix. Preview deployments cannot address production resources.

---

## 4. Implementation stack

- TypeScript with strict compiler settings.
- React Router 7 on Workers Static Assets.
- Cloudflare Vite plugin.
- Native Fetch API handlers and Service Bindings.
- JSON Schema as contract source; generated TypeScript and runtime validators.
- Vitest against the Cloudflare local runtime.
- Playwright for browser, authorization, accessibility, and deployment smoke tests.
- Web Crypto for hashing, AES-GCM, Ed25519 signing, and verification.
- Pinned package-manager, lockfile, Wrangler, and toolchain versions.
- No Node-only dependency in deployed Worker packages.

---

## 5. Authoritative state and projections

### Workspace authority

One opaque-UUID-addressed SQLite Durable Object per workspace owns:

```text
settings
membership snapshot
sources and retention
claims and evidence links
claim conflicts
Passport versions
disclosure grants
context handles
match versions and feedback
proposal details
approvals
hash-linked audit events
outbox events
projection cursors
deletion state
```

Large bodies and compute never run in the workspace object.

### Shared D1 databases

`partner_control`:

```text
subjects
identity links
organizations
organization authority
workspaces
membership index
passkeys and recovery index
OAuth clients and grants
workflow index
security events
```

`partner_registry`:

```text
capability manifest index
admitted registry releases
products
capabilities
value primitives
collaboration patterns
opportunities
eligibility rules
public relationships
```

`partner_programs`:

```text
pilot index
Program Envelope index
milestones
metrics
outcomes
public case-study index
```

Private claim, source, or proposal bodies are prohibited in shared D1.

### R2

```text
private/raw/<workspace>/<source>/<version>
private/normalized/<workspace>/<source>/<version>
private/evidence/<workspace>/<evidenceId>
private/exports/<workspace>/<exportId>
quarantine/<objectId>
admission/candidates/<type>/<candidateId>
admitted/registry/<digest>.json
admitted/programs/<digest>.json
admitted/public/<release>/<digest>
tombstones/<digest>.json
```

Admitted objects are content-addressed and create-only.

### Vectorize

- `partner-public`
- `partner-private`

Private vectors use workspace namespaces and indexed workspace metadata. Every result is re-authorized against current workspace state. Vectorize stores no credentials, legal documents, source bodies, payment details, or unrestricted contacts.

---

## 6. Consistency model

Every accepted workspace command executes one SQLite transaction:

1. check expected aggregate version;
2. evaluate current authorization and policy;
3. update domain state;
4. append audit event;
5. append outbox events;
6. commit.

Alarms or Queues drain the outbox at least once. Consumers:

- enforce unique event IDs;
- enforce aggregate version order;
- are idempotent;
- record projection version and time;
- dead-letter unrecoverable events.

There are no synchronous request-path writes from the command handler to D1, Vectorize, analytics, email, or public releases.

Strong reads come from authoritative state:

- grants and revocation;
- membership and role;
- approvals;
- proposal preview;
- source retention;
- current Passport after a command;
- audit head.

Eventual reads include:

- lists;
- search;
- vector retrieval;
- analytics;
- candidate indexes;
- public search after release.

Every eventual response may expose `source_version` and `projected_at`. Reconciliation compares aggregate and projection versions, deletes orphaned vectors, rebuilds stale projections, verifies object digests, and alerts on persistent drift.

Vectorize’s eventual consistency never participates in synchronous revocation or authorization.

---

## 7. Capability registry

Each product repository owns `.rndr/capabilities.json` with:

```text
manifest version
product and capability IDs
owner and steward authority
repository and immutable commit
lifecycle status
integration surfaces
value primitives
eligible partner contexts
availability and geography
prerequisites and restrictions
risk and data classes
human and machine handoff
operational evidence
freshness
compatibility
support
```

Lifecycle status:

```text
PLANNED
PREVIEW
LIVE
DEGRADED
PAUSED
RETIRED
```

A capability becomes recommendable as available only through an admitted, signed release. Admission requires:

- valid schema;
- immutable source commit;
- verified steward;
- fresh required evidence;
- explicit lifecycle and restrictions;
- public visibility scan;
- complete source-set digest;
- compatibility checks;
- valid signer response.

Failure preserves the last verified registry release. Planned or degraded capabilities are never presented as live.

The release manifest records source commits, schemas, taxonomy, policy, manifest digests, source-set digest, artifact digests, admission state, signature state, key ID, and superseded release.

---

## 8. Source authority and claims

Authority classes:

```text
partner_attested
product_manifest
first_party_operational
onchain_primary
external_primary
legal_primary
public_primary
public_secondary
observational_secondary
model_inference
```

Claim states:

```text
CANDIDATE
ATTESTED
VERIFIED
DISPUTED
STALE
REVOKED
SUPERSEDED
REDACTED
```

Every claim records source and evidence IDs, authority, exact source span or honest attested summary, observation time, freshness, status, reviewer, consent, visibility, support, conflict, and supersession.

Confidence does not replace authority. Missing evidence is not a negative fact. Material conflicts block hard-gated recommendations until resolved or explicitly accepted as uncertainty.

A Partner Passport version is immutable after approval. Matches and proposals reference its exact version.

---

## 9. Matching and model governance

Pipeline:

1. freeze Passport, registry, policy, taxonomy, score, and model versions;
2. apply deterministic privacy, consent, lifecycle, geography, legal, budget, conflict, trust, and readiness gates;
3. generate relational candidates;
4. retrieve semantic candidates;
5. re-authorize private candidates;
6. score deterministically;
7. optionally rerank and explain with Workers AI;
8. validate every explanation against evidence and policy;
9. remove unsupported claims and identity disclosures;
10. capture user feedback and outcome.

Initial score:

```text
Need coverage                  25
Value contributed to network  20
Mutual strategic value        20
Execution feasibility         15
Readiness and timing          10
Evidence confidence           10
```

Hard gates cannot be offset by score.

Every generated artifact records:

```text
model provider, ID, and release
prompt ID, version, and hash
input/output schema versions
policy and taxonomy versions
registry release
Passport version
evidence IDs and digests
authorized-context digest
deterministic candidate scores
generation time
trace ID
```

Model or prompt changes require offline evaluation, schema checks, evidence-grounding tests, privacy-leak and prompt-injection suites, canary, rollback criteria, and a release record.

Models never decide authorization, consent, legal authority, capability status, hard eligibility, approval, money movement, signature validity, or deletion completion.

Private inference uses the direct Workers AI binding. Private prompt and response content is not logged.

---

## 10. Identity

Partner uses an RNDR Identity Adapter with:

```text
stable RNDR subject ID
provider and provider subject
organization IDs
credential types
assurance level
issue and expiry
```

It supports OIDC/JWT/JWKS verification, passkey local fallback, optional SIWE/SIWS linking, recovery, service principals, session revocation, and future issuer migration.

Organization authority states:

```text
UNVERIFIED
SELF_ATTESTED
DOMAIN_VERIFIED
REPOSITORY_ADMIN_VERIFIED
WALLET_AUTHORITY_VERIFIED
PRODUCT_STEWARD_VERIFIED
LEGAL_ENTITY_VERIFIED
REVOKED
```

A wallet signature or domain email proves credential control, not legal power to bind an organization.

Cloudflare Access authenticates staff; application roles still authorize reviewer, program-owner, registry-steward, incident-responder, and auditor capabilities.

---

## 11. MCP

Protocol:

- revision 2026-07-28;
- stateless Streamable HTTP;
- `POST /mcp`;
- `server/discover`;
- no protocol session dependency;
- expiring authenticated application context handles when continuity is required.

Effective access is:

```text
requested records and fields
∩ OAuth scopes
∩ active disclosure grant
∩ current membership
∩ record ACL
∩ field policy
∩ stated purpose
∩ freshness and revocation state
```

Invocation context records actor, client, workspace, tool, risk class, scopes, records, fields, disclosed IDs, purpose, grant, trace, and invocation ID.

Tools:

```text
rndr_describe_ecosystem
rndr_search_opportunities
rndr_get_opportunity
rndr_analyze_partner_context
rndr_build_partner_passport
rndr_find_collaborations
rndr_explain_collaboration
rndr_design_pilot
rndr_propose_action
```

Allowed proposal actions:

```text
save_passport
submit_partner_profile
request_introduction
submit_pilot
share_context
```

Successful proposals return `pending_user_approval` plus a review URL.

Processing order:

1. validate input and size;
2. write requested audit event;
3. evaluate the full access intersection;
4. call a narrow core adapter;
5. validate untrusted adapter output;
6. redact;
7. validate redacted output;
8. write success or failure audit event;
9. return bounded result.

Initial or final audit failure closes the operation.

No MCP tool can send, queue, retry, publish, introduce, approve, pay, sign, configure credentials, execute SQL or shell, access arbitrary files or URLs, disable audit, or widen scope.

---

## 12. Privacy, encryption, and lifecycle

Raw sources are ephemeral by default. Persistence requires source-retention consent or claim approval.

Default retention:

- raw and normalized temporary source: 24 hours after successful review;
- rejected candidates: immediate after review finalization;
- unreviewed candidates: seven days;
- approved claims: until deleted or superseded;
- context handles: one hour;
- exports: seven days;
- content-free security index: 365 days;
- accepted envelopes: agreement and legal policy.

Private objects use envelope encryption:

1. random 256-bit DEK;
2. unique AES-GCM nonce;
3. AAD binds workspace, object, version, class, schema, and purpose;
4. DEK wrapped by a versioned Worker-secret KEK;
5. ciphertext stores nonce, wrapped DEK, AAD digest, and key version.

Rotation rewraps DEKs. Deletion revokes access, destroys wrapped keys, removes active ciphertext and vectors, records a content-free tombstone, and discloses backup expiry.

Lifecycle operations are distinct:

- revoke;
- redact;
- supersede;
- restate;
- delete.

Accepted releases and Program Envelopes are immutable. Corrections create linked signed versions.

Private content is not used to train RNDRNTWRK or provider models.

---

## 13. Ingestion and network safety

First-release sources:

- text;
- one approved URL or bounded domain;
- PDF, Markdown, text, JSON, CSV, and common images;
- public GitHub repository;
- explicitly provided public wallet address.

Pipeline:

```text
consent
-> registration and budget
-> type, magic-byte, and size checks
-> quarantine
-> network-policy validation
-> retrieval
-> safe normalization
-> embedded-instruction classification
-> candidate extraction
-> evidence binding
-> schema validation
-> user review
-> accepted claim transaction
-> outbox projection
-> retention deletion
```

Website work uses Cloudflare Browser Rendering; bounded asynchronous crawls use the Browser Run crawl endpoint.

Network policy:

- no model-generated arbitrary URLs;
- no credentialed URLs;
- exact or suffix allowlists;
- DNS and IP validation;
- block loopback, private, link-local, metadata, multicast, documentation, and non-routable ranges;
- revalidate redirects;
- cap redirects, pages, bytes, duration, and types.

Source text is untrusted data. It cannot change prompts, request tools, widen scope, retain itself, send data, alter approval, change authority, or suppress audit.

---

## 14. Workflows and approval

Workflows persist progress and may wait for explicit external events.

Required workflows:

- `ingest-source`
- `generate-collaboration-map`
- `propose-pilot`
- `request-introduction`
- `registry-release`
- `revoke-redact-restate`
- `delete-workspace`
- `reconcile-projections`

Introduction flow is double opt-in:

1. verify eligibility without revealing identity;
2. enforce cadence, suppression, and anti-enumeration;
3. initiating partner approves;
4. target receives minimum-disclosure request;
5. target opts in;
6. both review final disclosure;
7. create shared introduction.

In-app notifications are authoritative. Email is optional, feature flagged, and cannot be required for sign-in, recovery, or approval.

---

## 15. Program Envelopes and signing

Accepted envelopes include parties, verified authority, owners, agents, tools, models, data grants, budgets, economic policy, approval thresholds, distribution, metrics, evidence, dates, stop conditions, schema/policy/registry versions, source commits, digest, and signature.

State:

```text
DRAFT
PARTNER_APPROVED
RNDR_REVIEW
CHANGES_REQUESTED
ACCEPTED
ACTIVE
PAUSED
COMPLETED
EXPIRED
REJECTED
REVOKED
RESTATED
```

No agent may transition an envelope to `ACCEPTED`, `ACTIVE`, or `COMPLETED`.

Admission:

1. validate expected current version;
2. validate authority and approvals;
3. validate grants, budget, expiry, and stop conditions;
4. canonicalize;
5. hash;
6. sign through `partner-signer`;
7. verify;
8. store by content digest;
9. index;
10. activate.

Restatement produces a new signed envelope and preserves the prior digest.

The signing JWKS is separate from OAuth identity keys.

---

## 16. Jurisdiction, recovery, and continuity

Only jurisdiction profiles demonstrably supported across DO, D1, R2, logs, inference, backups, and connectors are offered. A workspace selects a profile at creation. Moves use controlled export/import into newly provisioned resources.

Where a service cannot meet a locality requirement, the feature is disabled or explicitly disclosed.

Recovery:

- Durable Object point-in-time recovery;
- D1 Time Travel;
- immutable or versioned admitted R2 artifacts;
- signed snapshots;
- rebuildable D1 and Vectorize projections;
- previous verified Worker deployment.

Targets:

| State | RPO | RTO |
| --- | ---: | ---: |
| signed public registry | zero admitted releases | 30 minutes |
| consent, grants, approvals | 5 minutes | 4 hours |
| Passport and proposals | 5 minutes | 4 hours |
| raw ephemeral source | no guarantee | none |
| D1 projections | rebuildable | 8 hours |
| Vectorize | rebuildable | 24 hours |

Quarterly restore drills must prove that deleted workspaces, revoked grants, expired tokens, superseded releases, and revoked signing keys do not reactivate after restore.

---

## 17. Quotas, SLOs, and degraded modes

Workspace budgets cover:

```text
upload and retained bytes
sources and pages
crawl depth and bytes
Workflow concurrency
Queue backlog
embeddings
inference tokens
MCP requests
proposals
introductions
exports
```

The system has independent kill switches for inference, crawl, connectors, introductions, publication, and admission.

Initial SLOs:

| Surface | Availability | Latency |
| --- | ---: | --- |
| signed public catalog | 99.95% | p95 < 500 ms |
| workspace reads | 99.9% | p95 < 1.5 s |
| command acceptance | 99.9% | p95 < 2 s excluding async work |
| public MCP | 99.95% | p95 < 1 s |
| private bounded MCP read | 99.9% | p95 < 2 s excluding analysis |
| revocation enforcement | 99.99% | before success response |

Degraded behavior:

- public serves last verified release;
- Passport review works without Vectorize;
- deterministic ranking works without a model;
- proposals pause when audit or authority is unavailable;
- private reads fail closed when grants cannot be verified;
- email failure does not block core flows.

---

## 18. Machine-readable contracts

The implementation repository must contain and verify:

```text
contracts/acceptance-criteria.json
contracts/environment-resource-matrix.json
contracts/threat-model.json
contracts/data-classification-registry.json
contracts/source-authority-registry.json
contracts/evidence-type-registry.json
contracts/capability-manifest.schema.json
contracts/capability-release.schema.json
contracts/partner-passport.schema.json
contracts/collaboration-map.schema.json
contracts/pilot-brief.schema.json
contracts/program-envelope.schema.json
contracts/proposal.schema.json
contracts/audit-event.schema.json
contracts/domain-event.schema.json
contracts/model-registry.json
contracts/prompt-registry.json
contracts/mcp-surface.json
contracts/slo.json
```

Schemas generate runtime validators and TypeScript. CI fails on drift.

---

## 19. Test gates

Required suites:

- domain and state-machine unit tests;
- contract and compatibility tests;
- Durable Object transaction and outbox integration tests;
- Queue duplicate and dead-letter tests;
- D1 projection replay;
- R2 encryption/content-address tests;
- Workflow wait/resume;
- signer isolation, rotation, and revoked-key tests;
- admission race and rollback;
- MCP client/server discovery, disclosure, limits, and negative tools;
- cross-workspace and field-level property tests;
- OAuth CSRF, redirect, audience, and confused-deputy tests;
- SSRF, DNS rebinding, redirect, and oversized response tests;
- malicious upload and prompt-injection tests;
- log-content assertions;
- target-enumeration and introduction abuse tests;
- restore and deletion non-reactivation tests;
- WCAG 2.2 AA and full mobile approval tests;
- real deployment DNS, TLS, headers, signed release, and exact-commit smoke tests.

---

## 20. Delivery order

1. Create `rndrntwrk/partner`, contracts, threat model, resource matrix, local Cloudflare runtime, and CI.
2. Implement manually curated capability manifests, admission, signer, and signed public explorer.
3. Implement identity adapter, passkey fallback, organization authority, workspace DO, audit, and outbox.
4. Implement text/URL/PDF ingestion, quarantine, claim review, Passport, retention, and lifecycle.
5. Implement deterministic matching, Vectorize, model governance, explanation, and feedback.
6. Implement OAuth, stateless MCP, disclosure grants, fail-closed audit, private reads, and proposals.
7. Implement Pilot Brief, internal review, signed Program Envelope, and double-opt-in introductions.
8. Run load, abuse, accessibility, privacy, key-rotation, restore, and incident exercises before launch.

The first vertical slice is limited to three product manifests, one signed registry, text intake, claim review, Passport v1, deterministic match, one model explanation, one Pilot proposal, public MCP discovery, one grant-protected Passport resource, revocation, and a signed Program Envelope fixture.

No additional connector ships until that slice passes its security, recovery, and accessibility gates.

---

## 21. Acceptance criteria

Implementation cannot be called production-ready until:

1. public and private Workers have distinct bindings;
2. public Worker has no private or signer access;
3. product status comes from a verified signed release;
4. Workspace DO is authoritative for private commands;
5. no request path dual-writes a projection;
6. outbox delivery is idempotent and replayable;
7. authorization never depends on Vectorize or stale D1;
8. users approve claims before Passport persistence;
9. raw sources expire by default;
10. matches pin Passport, registry, score, policy, prompt, and model versions;
11. planned or degraded capabilities are not presented as live;
12. private target identity requires mutual opt-in;
13. MCP supports stateless discovery and exact disclosure;
14. MCP output is validated before and after redaction;
15. audit failure closes protected MCP operations;
16. no MCP tool can send, publish, introduce, approve, pay, sign, or widen access;
17. accepted Program Envelopes verify offline;
18. signing key exists only in the signer Worker;
19. revoke, redact, supersede, restate, and delete are distinct and tested;
20. source ingestion passes SSRF, upload, and injection tests;
21. logs contain no private content bodies;
22. restore drills meet RPO/RTO without reactivation of revoked/deleted state;
23. jurisdiction claims match the resource matrix;
24. quotas and kill switches are verified;
25. email failure does not block core access or approval;
26. critical flows meet WCAG 2.2 AA;
27. deployment evidence matches the exact tested commit and deployed bytes;
28. `/agents.md` matches the actual MCP surface and approval boundary;
29. owner can export approved context and receive a deletion receipt;
30. public service remains available from last verified release during private-plane failure;
31. deterministic matching works during model failure;
32. no launch-affecting placeholder remains in contracts, runbooks, or tests.

---

## 22. Implementation handoff

After owner approval:

1. mark the first technical draft superseded;
2. treat this document and its companion review as the canonical architecture;
3. create the dedicated repository;
4. produce a task-level implementation plan;
5. execute the first vertical slice with test-driven development;
6. require verification evidence before declaring a milestone complete.
