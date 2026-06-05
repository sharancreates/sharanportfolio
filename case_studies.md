# Portfolio Case Studies — Sharanya Nagar

---

## 01 · RESUMATCH AI

### The Problem

> **89% of resumes are rejected by Applicant Tracking Systems before a human ever reads them** — yet most free ATS checkers only perform shallow keyword matching, missing the contextual meaning behind skills like "team leadership" vs. "managing a cross-functional squad." Job seekers are left guessing why their applications silently disappear.

### The Solution

ResuMatch AI is a **hybrid-intelligence resume analyzer** that combines traditional lexical keyword scanning with deep semantic vector search to produce a match score that reflects both *what you said* and *what you meant*. Unlike single-method tools, ResuMatch uses a weighted dual-engine architecture (40% keyword + 60% semantic) to surface the gap between a resume and a job description — then tells the user exactly which missing keywords to add. The result is a one-click audit that transforms a blind application process into a data-driven optimization loop.

### Key Features

| Feature | What It Does | Why It Matters |
|---|---|---|
| **Hybrid Scoring Engine** | Fuses Scikit-Learn lexical analysis (exact keyword overlap via `CountVectorizer`) with `all-MiniLM-L6-v2` sentence embeddings (contextual meaning via cosine similarity). The 40/60 weighted formula produces a single, interpretable match percentage. | Eliminates false negatives — a resume that says "orchestrated distributed systems" will still score well against a JD asking for "microservices architecture." |
| **Missing Keyword Extraction** | Tokenizes, stems, and diff-checks the JD against the resume. Returns the top 10 most critical missing terms, displayed as actionable tags the user can immediately weave into their resume. | Shifts the user from *"what's wrong?"* to *"here's exactly what to fix"* — reducing iteration cycles from hours to minutes. |
| **PDF Upload + Auto-Parse** | Accepts `.pdf` resume uploads via a server-side parser, extracting raw text and pre-populating the analysis input. Drag-and-drop or paste-text fallback ensures zero-friction entry. | Removes the copy-paste barrier that kills conversion on most ATS tools. |
| **LRU Embedding Cache** | A custom `BoundedEmbeddingCache` (OrderedDict-backed LRU) stores up to 128 vectorized embeddings, keyed by text hash. Repeat analyses of the same resume or JD skip the expensive transformer inference entirely. | Reduces repeat-analysis latency by **~70%** and keeps memory bounded on a free-tier Render dyno. |

### Tech Stack

```
Frontend:  React.js · Vite · TailwindCSS · Axios
Backend:   Flask · Python · Flask-CORS
AI/ML:     Sentence-Transformers (all-MiniLM-L6-v2) · ONNX Runtime · Scikit-Learn · NLTK
Infra:     Render (server) · Vercel (client) · Procfile deployment
```

### Results & Metrics

- 🟢 **Live & deployed** at [resumatch-cm7x.onrender.com](https://resumatch-cm7x.onrender.com) with real-time health-check monitoring (`/api/health`)
- ⚡ **Sub-2s analysis** on warm cache; semantic model loads via ONNX Runtime for 3× faster inference vs. vanilla PyTorch
- 🔒 **5 MB upload cap** + CORS origin whitelisting for production-grade security
- 📊 Dual-score breakdown (Keywords vs. Meaning) gives users a **clear, two-axis understanding** of their resume gap — a UX pattern missing from most competitors

### What I Learned

Building ResuMatch forced me to grapple with a core ML engineering tradeoff: **accuracy vs. latency on constrained infrastructure.** Moving from PyTorch to ONNX Runtime was a pivotal decision that cut inference time while keeping the model's semantic quality intact. I also learned that the "last 10 missing keywords" heuristic is more actionable than a full keyword dump — users need signal, not noise. Engineering the custom LRU cache taught me that production ML is 20% model, 80% systems.

### Links

[Live Demo](https://resumatch-cm7x.onrender.com) **|** [GitHub](https://github.com/sharancreates/resumatch)

---

## 02 · SELENE — Zero-Knowledge Period Tracker

### The Problem

> **Period tracking apps routinely sell or leak the most intimate health data a person can generate.** After the Dobbs decision and multiple data-breach scandals, millions of users deleted their trackers overnight. The market desperately needs a period-tracking tool where the server *literally cannot read* the data it stores — but existing "privacy-first" apps still require email sign-ups, centralized databases, and trust in the vendor.

### The Solution

Selene is a **zero-knowledge menstrual health tracker** that performs all computation client-side and encrypts all data with **AES-256-GCM** (via the Web Crypto API) before it ever leaves the browser. The backend is architecturally *incapable* of reading user data — it stores only opaque ciphertext keyed to anonymous UUIDs. No emails. No passwords. No accounts. The prediction engine uses a variance-aware rolling-average algorithm designed to handle **irregular cycles and PCOS patterns** with dynamic confidence windows, rather than forcing a rigid 28-day assumption.

### Key Features

| Feature | What It Does | Why It Matters |
|---|---|---|
| **Client-Side AES-256-GCM Encryption** | All cycle data is encrypted in the browser using the Web Crypto API (`crypto.subtle`) before syncing. The server receives and stores only Base64-encoded ciphertext + IV pairs. Decryption keys never leave the device. | True zero-knowledge architecture: even a database breach yields nothing readable. Regulatory compliance (GDPR, HIPAA-adjacent) is *structural*, not policy-based. |
| **PCOS-Aware Prediction Engine** | A rolling-average algorithm over the last 6 valid cycles, with automatic variance detection. If cycle lengths vary by >5 days, the prediction window widens dynamically (e.g., ±4 days instead of ±2), reflecting real irregular-cycle biology. Users can also flag anomalous cycles (stress, medication) to exclude from predictions. | Most trackers assume regularity and produce anxiety-inducing "late" warnings for PCOS users. Selene adapts to the person, not the other way around. |
| **Anonymous UUID Authentication** | The frontend generates a cryptographically random UUID — no email, no password. This UUID serves as the `Bearer` token for all API calls. The server's `require_auth` decorator extracts it from the `Authorization` header. | Eliminates the identity layer entirely. There is no "account" to breach, no password to leak, and no email to correlate across services. |
| **Rate-Limited Sync API** | Flask-Limiter enforces 15 writes/min and 10 reads/min per IP, preventing abuse of the zero-auth model. The `/api/sync` endpoint upserts encrypted payloads; `/api/backup` retrieves them for cross-device restore. | Balances the openness of anonymous auth with real production safeguards against brute-force or denial-of-service attacks. |

### Tech Stack

```
Frontend:  React.js · Vite · Framer Motion · date-fns · Web Crypto API (AES-256-GCM)
Backend:   Flask · Flask-SQLAlchemy · Flask-Limiter · Flask-CORS · SQLite
Security:  AES-256-GCM (client-side) · Anonymous UUID auth · Rate limiting
Design:    Custom calming blue palette · Breathing CSS animations · Mobile-first
```

### Results & Metrics

- 🔐 **Zero PII collected** — no emails, no names, no phone numbers. The server is architecturally blind to user data.
- 🩺 **Variance-aware predictions** handle cycles ranging from 21–45 days without false "late" alerts
- 📱 **Mobile-first responsive UI** with Framer Motion breathing animations for a calming UX — designed to reduce health-tracking anxiety
- ⚡ **Sub-50ms encryption** per sync via native Web Crypto API (no JS crypto libraries, no overhead)

### What I Learned

Selene was a masterclass in **privacy-by-architecture**. I learned that "we don't sell your data" is a policy — but "we *can't read* your data" is an architecture. The biggest challenge was designing a system where the server is maximally useful (cross-device sync, backup/restore) while being minimally trusted (it never sees plaintext). I also discovered that health-tracking UX is deeply emotional — the breathing ring animation and calm blue palette weren't aesthetic choices, they were *therapeutic* ones. Engineering for vulnerable users requires a different design language than engineering for productivity users.

### Links

[GitHub](https://github.com/sharancreates/selene) **|** In Progress — Deployment Pending

---

## 03 · AROGYA HMS — Secure, Interoperable Hospital Management System

### The Problem

> **Healthcare applications must balance strict security and compliance (HIPAA/GDPR) with the need to seamlessly share patient data across disparate EHR systems.** Traditional hospital management software suffers from rigid schemas that don't support modern interoperability standards, alongside backend bottlenecks (such as database query latency and synchronous email dispatches) that delay critical patient notifications.

### The Solution

Arogya is a **production-grade, full-stack Hospital Management System** built with React 19 and Flask. It coordinates the full lifecycle of hospital operations—from patient registration and appointment scheduling to inpatient bed management, billing, and clinical data export. To address the healthcare data exchange problem, Arogya integrates an **interoperability layer** that dynamically generates compliant **HL7 v2 ADT segments** and **FHIR R4 Patient JSON resources**, allowing clinical data to be easily shared with external EMR platforms.

### Key Features

| Feature | What It Does | Why It Matters |
|---|---|---|
| **HL7 & FHIR Interoperability** | Generates valid HL7 v2 messages (e.g., ADT-A08) and formats patient clinical records into structured FHIR R4 resources. | Ensures compatibility with global medical records infrastructure, making patient data portable and standard-compliant. |
| **Real-time Bed Occupancy** | Integrates an admin dashboard tracking occupancy across ICU, General, and Private wards. | Maximizes resource utilization and intake efficiency through live operational insight. |
| **Async Task Decoupling** | Delegates resource-heavy operations (like PDF prescription generation and mail dispatches) to Celery workers backed by Redis. | Removes blocking calls from the main HTTP request-response cycle, guaranteeing immediate user feedback. |
| **Database Eager Loading** | Consolidates nested relational database lookups for doctors, treatments, and slot availability using SQLAlchemy `joinedload`. | Fixes the common N+1 query problem, dropping DB lookups for scheduling checks from $O(N)$ to $O(1)$. |

### Tech Stack

```
Frontend:  React 19 · Vite · TailwindCSS · React Router 7 · Socket.IO Client · Recharts
Backend:   Flask · Flask-SQLAlchemy · PostgreSQL · Celery · Redis · Waitress / Gunicorn
DevOps:    GitHub Actions (CI/CD) · Pytest · Docker
Standards: HL7 v2 ADT Messages · FHIR R4 Patient / Encounter schemas
```

### Results & Metrics

- 🟢 **Live & deployed** at [arogya-hms-sharancreates.vercel.app](https://arogya-hms-sharancreates.vercel.app/)
- ⚡ **20ms reminder dispatches** down from 32s by shifting synchronous SMTP notifications to Celery task queues backed by Redis (~1,600× improvement)
- 🔒 **Production-grade security** with role-based access control (RBAC), CSRF tokens via Flask-WTF, API rate-limiting via Flask-Limiter, and bcrypt password hashing
- 📊 **O(1) scheduling lookup latency** via consolidated eager loaded SQL queries, saving DB processing overhead

### What I Learned

Building Arogya HMS was a deep dive into the constraints of **high-compliance domain engineering**. I learned that implementing standard compliance (like HL7 and FHIR) requires highly strict data validation pipelines on both the client (Zod) and server. Additionally, optimizing DB session performance through eager loading taught me how database indexing and relationship loading strategies are critical for scaling clinical applications.

### Links

[Live Demo](https://arogya-hms-sharancreates.vercel.app/) **|** [GitHub](https://github.com/sharancreates/hospital-management-system)

---

## Summary Matrix

| Project | Domain | Stack | Status | Architecture Highlight |
|---|---|---|---|---|
| **ResuMatch AI** | HR-Tech / AI | React · Flask · ONNX · Scikit-Learn | 🟢 Deployed | Hybrid lexical + semantic scoring engine |
| **Selene** | Health-Tech / Privacy | React · Flask · Web Crypto API | 🟡 In Progress | Zero-knowledge AES-256-GCM encryption |
| **Arogya HMS** | Health-Tech / Interoperability | React 19 · Flask · PostgreSQL | 🟢 Deployed | HL7 v2 / FHIR R4 interoperability layer |

---

> *Each project represents a different dimension of my engineering philosophy: ResuMatch demonstrates ML systems thinking, Selene demonstrates privacy-first architecture, and Arogya HMS demonstrates standards-driven healthcare interoperability and performance scale. Together, they reflect my commitment to building software that is technically rigorous and genuinely useful.*
