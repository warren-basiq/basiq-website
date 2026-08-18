---
name: kalibrate-integration
description: Guide a developer through building a Kalibrate prompt-management integration — interviews first, then generates client setup, prompt management, and execution code for the chosen pattern (execute with fallback, store + pull, or execute only).
argument-hint: [project context or language]
---

# Kalibrate Integration Skill

Build a production-ready integration against the Kalibrate prompt-management API.

**Context:** $ARGUMENTS

---

## Step 1: Interview

Before writing any code, ask the user these three questions in a single message. Do not proceed until you have answers.

---

> **Before I write anything, I need three answers:**
>
> **1. Integration pattern — which fits your situation?**
>
> - **(A) Execute with Fallback** *(recommended)* — Call Kalibrate to execute the prompt. If Kalibrate is unavailable or returns an error, fall back to the locally-cached prompt body and call your own LLM directly. Most resilient; keeps your cache as a live safety net.
> - **(B) Store + Pull** — Create and version prompts in Kalibrate, cache the body locally, render templates yourself, and always call your own LLM. Kalibrate is the source of truth for prompt content, not execution.
> - **(C) Execute Only** — Call Kalibrate execute directly. No local cache, no fallback. Simplest to build; requires Kalibrate to be available at inference time.
>
> **2. Local cache / database?**
> Do you have a database (Firestore, Postgres, Redis, SQLite, etc.) available to store prompt records? Required for A and B; not needed for C.
>
> **3. Language / stack?**
> What language are you implementing in? (Python, TypeScript/Node, Go, etc.) This shapes the code examples.

---

Wait for the user's answers, then proceed to Step 2.

---

## Step 2: Client Setup

Implement a reusable Kalibrate HTTP client. This is the same regardless of pattern.

**Configuration (env vars):**

| Var | Default | Purpose |
|---|---|---|
| `KALIBRATE_BASE_URL` | `https://app.kalibrate.work` | Base URL (override for self-hosted) |
| `KALIBRATE_API_TOKEN` | — | Bearer token (`pat_...`); never hardcode |

**Requirements:**
- Single reusable HTTP client/session with `Authorization: Bearer <token>` set once
- `Content-Type: application/json` on all requests
- 30-second timeout on sync calls
- **Retry policy:** on `429` or `5xx`, retry up to 3 times with exponential backoff (`1s → 2s → 4s`). Honor `retry_after` from the error envelope when present. Never retry other `4xx` responses.

**Error envelope shape** (non-2xx responses):
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT",
    "message": "...",
    "is_retryable": true,
    "retry_after": 2
  }
}
```

### Python (httpx async)

```python
import asyncio, os
from typing import Optional
import httpx

RETRY_DELAYS = [1.0, 2.0, 4.0]

class KalibrateError(Exception):
    def __init__(self, status_code: int, message: str):
        self.status_code = status_code
        self.message = message
        super().__init__(f"Kalibrate {status_code}: {message}")

class KalibrateClient:
    def __init__(self):
        self._base = os.getenv("KALIBRATE_BASE_URL", "https://app.kalibrate.work")
        self._token = os.getenv("KALIBRATE_API_TOKEN", "")

    @property
    def _headers(self):
        return {"Authorization": f"Bearer {self._token}", "Content-Type": "application/json"}

    async def _request(self, method: str, path: str, **kwargs) -> dict:
        url = f"{self._base}{path}"
        delays = [0.0] + RETRY_DELAYS
        for attempt, delay in enumerate(delays):
            if delay:
                await asyncio.sleep(delay)
            try:
                async with httpx.AsyncClient(timeout=30.0) as client:
                    r = await getattr(client, method)(url, headers=self._headers, **kwargs)
                if r.status_code == 429 or r.status_code >= 500:
                    if attempt < len(RETRY_DELAYS):
                        continue
                    raise KalibrateError(r.status_code, r.text[:300])
                if not r.is_success:
                    raise KalibrateError(r.status_code, r.text[:300])
                return r.json()
            except httpx.TimeoutException:
                if attempt < len(RETRY_DELAYS):
                    continue
                raise KalibrateError(408, "Timed out after retries")
        raise KalibrateError(0, "Max retries exceeded")
```

### TypeScript / Node (fetch)

```typescript
const BASE = process.env.KALIBRATE_BASE_URL ?? "https://app.kalibrate.work";
const TOKEN = process.env.KALIBRATE_API_TOKEN!;
const RETRY_DELAYS = [1000, 2000, 4000];

class KalibrateError extends Error {
  constructor(public statusCode: number, message: string) {
    super(`Kalibrate ${statusCode}: ${message}`);
  }
}

async function kalibrateRequest(method: string, path: string, body?: unknown): Promise<unknown> {
  const delays = [0, ...RETRY_DELAYS];
  for (let i = 0; i < delays.length; i++) {
    if (delays[i]) await new Promise(r => setTimeout(r, delays[i]));
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(30_000),
    });
    if (res.status === 429 || res.status >= 500) {
      if (i < RETRY_DELAYS.length) continue;
      throw new KalibrateError(res.status, await res.text());
    }
    if (!res.ok) throw new KalibrateError(res.status, await res.text());
    return res.json();
  }
}
```

### Go

```go
var retryDelays = []time.Duration{time.Second, 2 * time.Second, 4 * time.Second}

func kalibrateRequest(ctx context.Context, method, path string, body any) (map[string]any, error) {
    base := os.Getenv("KALIBRATE_BASE_URL")
    if base == "" { base = "https://app.kalibrate.work" }
    token := os.Getenv("KALIBRATE_API_TOKEN")
    client := &http.Client{Timeout: 30 * time.Second}
    delays := append([]time.Duration{0}, retryDelays...)
    for i, d := range delays {
        if d > 0 { time.Sleep(d) }
        var buf io.Reader
        if body != nil {
            b, _ := json.Marshal(body)
            buf = bytes.NewReader(b)
        }
        req, _ := http.NewRequestWithContext(ctx, method, base+path, buf)
        req.Header.Set("Authorization", "Bearer "+token)
        req.Header.Set("Content-Type", "application/json")
        resp, err := client.Do(req)
        if err != nil {
            if i < len(retryDelays) { continue }
            return nil, err
        }
        defer resp.Body.Close()
        if resp.StatusCode == 429 || resp.StatusCode >= 500 {
            if i < len(retryDelays) { continue }
            return nil, fmt.Errorf("kalibrate %d", resp.StatusCode)
        }
        if resp.StatusCode >= 400 {
            return nil, fmt.Errorf("kalibrate %d", resp.StatusCode)
        }
        var result map[string]any
        json.NewDecoder(resp.Body).Decode(&result)
        return result, nil
    }
    return nil, fmt.Errorf("max retries exceeded")
}
```

---

## Step 3: Prompt Management Endpoints

These three endpoints are used by all patterns.

### List prompts — `GET /api/v1/prompts` `[read]`

Returns all prompts in the org. Use for initial bulk sync or discovery.

```
GET /api/v1/prompts
Authorization: Bearer <token>

Response: { "prompts": [ { "id": "...", "name": "...", "version": "1.0.0", ... } ] }
```

Optional query params: `?category=&tag=`

### Create a prompt — `POST /api/v1/prompts` `[write]`

Creates a new prompt and returns its `id` (your `kalibrate_id`) and initial `version: "1.0.0"`.

**Request body:**

| Field | Required | Notes |
|---|---|---|
| `name` | yes | Human-readable label |
| `model` | yes | e.g. `"gpt-4.1"`, `"claude-sonnet-4-6"` |
| `body` | no | System message. Use `{{variable_name}}` for placeholders |
| `user_message` | no | Example user turn; also supports `{{placeholders}}` |
| `description` | no | |
| `tags` | no | `string[]` |
| `temperature` | no | float, default `0.7` |
| `max_tokens` | yes | integer ≥ 1. Despite reading as optional, the API rejects the request without it: `400 {"errors":{"MaxTokens":"failed on 'gte'"}}`. Default to `4096`. |

```json
POST /api/v1/prompts
{
  "name": "agenda.call_summary",
  "model": "gpt-4.1",
  "body": "You are a meeting assistant. Summarize the following call for {{client_name}}:\n\n{{transcript}}",
  "temperature": 0.7,
  "max_tokens": 4096,
  "tags": ["agenda"]
}
```

Response: `{ "id": "<uuid>", "version": "1.0.0", ... }`

Store the returned `id` as `kalibrate_id` in your local cache.

### Fetch a prompt — `GET /api/v1/prompts/{id}?environment=production` `[read]`

Fetches the prompt version tagged for the named environment, including its `version` string, `body`, `user_message`, `model`, and `temperature`. Use this environment-qualified read for version sync checks so a local fallback cache matches the version your API executions use.

```
GET /api/v1/prompts/{kalibrate_id}?environment=production

Response: { "id": "...", "version": "1.2.0", "body": "...", "model": "...", "temperature": 0.7, ... }
```

**Default for generated code:** include `environment: "production"` on execution calls and `?environment=production` on prompt reads. The API can resolve requests without an environment, but explicit environments are safer for production clients because they pin the intended tagged version.

---

## Step 4: Local Cache Schema

**Required for patterns A (Execute with Fallback) and B (Store + Pull). Skip for C.**

Store one record per prompt, keyed by `slug`. The slug is your app's internal lookup key (e.g. `"agenda.call_summary"`). The `kalibrate_id` links to Kalibrate.

| Field | Type | Purpose |
|---|---|---|
| `slug` | string | Internal lookup key — `{blueprint}.{purpose}` format recommended |
| `kalibrate_id` | string | UUID from `POST /api/v1/prompts` |
| `body` | string | System message with `{{var}}` placeholders |
| `user_message` | string? | Optional user-turn template |
| `model` | string | e.g. `"gpt-4.1"` |
| `temperature` | float | |
| `variables` | string[] | Extracted placeholder names (for documentation/validation) |
| `version` | string | Kalibrate version string (for sync checks) |
| `updated_at` | datetime | |

**Variable template convention:** `{{variable_name}}` in body/user_message. Pass variables as `{ "variable_name": value }` on execution. For local rendering, do a simple string replace: `{{key}}` → `str(value)`.

**Populating the cache:** After `POST /api/v1/prompts`, write the record immediately. On subsequent runs, check `GET /api/v1/prompts/{id}?environment=production` and upsert if the version has changed (see background sync below).

---

## Step 5: Execute Endpoint

**Required for patterns A and C.**

### `POST /api/v1/prompts/{id}/executions` `[write]`

**Request body:**

| Field | Notes |
|---|---|
| `variables` | Object; fills `{{placeholder}}` tokens. Send this for templated prompts. Names `contexts` / `context_*` are reserved (400 `RESERVED_VARIABLE_NAME`). |
| `contexts` | Array of Context Library documents to compose in: bare slug (`"acme_value_prop"` → published version) or `{ "slug", "version", "as" }` (pinned / rebound). Binds `{{context_<type>}}` and `{{contexts}}` placeholders, or auto-appends under a `## Context` heading. Omit the field entirely and the prompt's **declared links** auto-attach (request refs win on collision); an explicit `[]` opts the request out of them. |
| `metadata` | Free-form object stored with the execution; use for your own tracking. |
| `environment` | Include by default. Resolve the version tagged for a lane (`"production"`, `"staging"`); use `"production"` unless the caller intentionally targets another lane. |
| `overrides` | Per-call params: `model`, `temperature`, `max_tokens`, `top_p`, etc. |

Do not send both `variables` and `user_message` in the same request.

```json
POST /api/v1/prompts/{kalibrate_id}/executions
{
  "environment": "production",
  "variables": {
    "client_name": "Alice",
    "transcript": "..."
  },
  "metadata": { "request_id": "req_abc123" }
}
```

**Response fields to extract:**

| Field | Purpose |
|---|---|
| `execution_id` | Store if you need to attach feedback later |
| `output.text` | The model's output — this is what you return to callers |
| `usage` | `{ prompt_tokens, completion_tokens, total_tokens }` |
| `cost.estimated` | Float in USD |
| `performance.latency_ms` | Integer |

```json
{
  "success": true,
  "execution_id": "7c9e6679-...",
  "output": { "text": "Here is the call summary..." },
  "usage": { "prompt_tokens": 150, "completion_tokens": 200, "total_tokens": 350 },
  "cost": { "estimated": 0.0025 },
  "performance": { "latency_ms": 1200 }
}
```

---

## Step 6: Pattern-Specific Wiring

Generate code for **only the pattern the user chose** in Step 1.

---

### Pattern A — Execute with Fallback *(recommended)*

**Flow:**

```
execute(slug, variables):
  1. Look up slug in local cache
     → if not found: raise PromptNotFoundError (hard fail — prompt was never loaded)
  2. POST /api/v1/prompts/{kalibrate_id}/executions  { environment: "production", variables }
     → on success: return output.text
                   fire background task: sync_version_if_changed(record, kalibrate_id, "production")
     → on KalibrateError: log warning, fall through to step 3
  3. Render body/user_message locally (replace {{key}} → value)
     Call your LLM directly (model + temperature from cached record)
     Return the output
```

**Background version sync (runs after every successful execution, non-blocking):**

```
sync_version_if_changed(cached_record, kalibrate_id, environment):
  1. GET /api/v1/prompts/{kalibrate_id}?environment={environment}
  2. If response.version == cached_record.version: return (nothing to do)
  3. Validate: body length reasonable, model string valid
  4. Upsert updated record to local cache
  5. Log: "synced {slug}: {old_version} → {new_version}"
  On any error: log warning and return (never let sync failures surface to callers)
```

**Why this pattern:** Kalibrate executions are tracked, costed, and version-pinned. The local cache is a true fallback — it's always current for the same environment your API clients execute against because sync runs on the success path. A Kalibrate outage degrades gracefully to your own LLM with the last-known prompt for that environment.

**Python example:**

```python
import asyncio
from typing import Optional

_background_tasks: set = set()

class PromptNotFoundError(Exception):
    pass

def _render(template: str, variables: dict) -> str:
    for k, v in variables.items():
        template = template.replace("{{" + k + "}}", str(v))
    return template

async def _sync_version_if_changed(cached, kalibrate_id: str, environment: str = "production") -> None:
    try:
        data = await kalibrate_client.get_prompt(kalibrate_id, environment=environment)
        if not data.get("version") or data["version"] == cached.version:
            return
        # validate before writing
        body = data.get("body", cached.body)
        if len(body) > 100_000:
            return
        await upsert_prompt_record(cached.slug, body=body, version=data["version"], ...)
    except KalibrateError as e:
        logger.warning(f"Version sync failed for {cached.slug}: {e}")
    except Exception:
        logger.exception(f"Unexpected error in version sync for {cached.slug}")

async def execute_prompt(slug: str, variables: dict, metadata: Optional[dict] = None, environment: str = "production") -> str:
    prompt = await get_prompt_by_slug(slug)
    if prompt is None:
        raise PromptNotFoundError(slug)

    try:
        result = await kalibrate_client.execute(prompt.kalibrate_id, variables, metadata, environment=environment)
        task = asyncio.create_task(_sync_version_if_changed(prompt, prompt.kalibrate_id, environment))
        _background_tasks.add(task)
        task.add_done_callback(_background_tasks.discard)
        return result["output"]["text"]
    except KalibrateError as e:
        logger.warning(f"Kalibrate execution failed for {slug} (status={e.status_code}), using fallback")
        body = _render(prompt.body, variables)
        messages = [{"role": "system", "content": body}]
        if prompt.user_message:
            messages.append({"role": "user", "content": _render(prompt.user_message, variables)})
        completion = your_llm_client.chat.completions.create(
            model=prompt.model, messages=messages, temperature=prompt.temperature
        )
        return completion.choices[0].message.content or ""
```

---

### Pattern B — Store + Pull

**Flow:**

```
execute(slug, variables):
  1. Look up slug in local cache
     → if not found: raise PromptNotFoundError
  2. Render body/user_message locally (replace {{key}} → value)
  3. Call your LLM directly
  4. (Optional) Fire background sync task to keep cache current
```

**When to sync:** either on each cache hit (background, same environment-qualified version-check logic as Pattern A) or on a scheduled job that calls `GET /api/v1/prompts` to bulk-refresh records, then reads each active prompt with `GET /api/v1/prompts/{id}?environment=production` before updating the production fallback cache.

**TypeScript example:**

```typescript
async function executePrompt(slug: string, variables: Record<string, string>): Promise<string> {
  const prompt = await getPromptBySlug(slug);
  if (!prompt) throw new Error(`Prompt not found: ${slug}`);

  const render = (t: string) => t.replace(/\{\{(\w+)\}\}/g, (_, k) => variables[k] ?? "");
  const messages: { role: string; content: string }[] = [
    { role: "system", content: render(prompt.body) },
  ];
  if (prompt.userMessage) {
    messages.push({ role: "user", content: render(prompt.userMessage) });
  }

  const result = await openai.chat.completions.create({
    model: prompt.model,
    messages,
    temperature: prompt.temperature,
  });
  return result.choices[0].message.content ?? "";
}
```

---

### Pattern C — Execute Only

**Flow:**

```
execute(kalibrate_id, variables):
  1. POST /api/v1/prompts/{kalibrate_id}/executions  { environment: "production", variables }
  2. Return output.text
```

No local cache. Callers must supply `kalibrate_id` directly (store it in config or app code) and should include the intended environment on every execution.

```typescript
async function executePrompt(kalibrateId: string, variables: Record<string, string>, environment = "production"): Promise<string> {
  const data = await kalibrateRequest("POST", `/api/v1/prompts/${kalibrateId}/executions`, { environment, variables }) as any;
  return data?.output?.text ?? "";
}
```

---

## Step 7: Verification Checklist

Walk the user through these checks before considering the integration complete.

**All patterns:**
- [ ] `GET /api/v1/prompts` returns a list of prompts (auth is working)
- [ ] `POST /api/v1/prompts` with a test prompt returns an `id`
- [ ] `POST /api/v1/prompts/{id}/executions` with `environment: "production"` and `variables` returns `output.text`

**Pattern A (Execute with Fallback) additionally:**
- [ ] Simulate a Kalibrate failure (wrong token, or mock a 500) → confirm the fallback path fires and returns output from the local LLM
- [ ] Manually bump the prompt version in the Kalibrate UI → execute once → confirm `updated_at` changed in your local cache

**Pattern B (Store + Pull) additionally:**
- [ ] Update the prompt body in Kalibrate → trigger a sync → confirm the local cache reflects the new body

**Pattern C (Execute Only):**
- [ ] Verify behavior on a Kalibrate 503 — confirm your callers handle the error appropriately

---

## Reference: Key Endpoints Summary

| Endpoint | Method | Access | Purpose |
|---|---|---|---|
| `/api/v1/prompts` | GET | read | List all org prompts |
| `/api/v1/prompts` | POST | write | Create a prompt → get `kalibrate_id` |
| `/api/v1/prompts/{id}?environment=production` | GET | read | Fetch prompt details for the environment-tagged version |
| `/api/v1/prompts/{id}` | PUT | write | Update a prompt |
| `/api/v1/prompts/{id}/executions` | POST | write | Execute a prompt with `environment` + variables |
| `/api/v1/prompts/{id}/executions/stream` | POST | write | Execute with SSE streaming |
| `/api/v1/prompts/{id}/versions` | GET | read | List versions of a prompt |
| `/api/v1/contexts/{slug}` | GET | read | Fetch a Context Library document's published version (`?version=N` pins) |
| `/api/v1/contexts/{slug}/feedback/by-version` | GET | read | Per-version 👍/👎 rollup for a context |
| `/api/v1/environments` | GET | read | List environments (production, staging, etc.) |
| `/api/v1/executions/{id}/feedback` | PUT | write | Attach rating feedback to an execution |
| `/health` | GET | public | Liveness check |

Auth: `Authorization: Bearer <KALIBRATE_API_TOKEN>`. PATs (`pat_...`) are the right credential for server-to-server integrations — create under **Settings → API Access Tokens**. `read` scope for GET-only integrations; `read_write` for anything that creates or executes.
