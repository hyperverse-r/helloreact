# hello-react

React frontend for the [htmxr hello example](https://hello.demo.breant.art/).

## Context

The `hello` htmxr example is an interactive histogram (Old Faithful) served by an R/plumber2 server. It exposes a single endpoint:

```
GET /plot?bins=30  →  image/svg+xml
```

This project demonstrates that an htmxr application is **nothing more than an HTTP API** — it returns web content (HTML, SVG, fragments) that any client can consume. The htmx client embedded in the page is just one consumer among many.

By replacing htmx with React, we get the exact same result: a slider that calls `/plot?bins=N` and displays the returned SVG. The R server does not know — and does not care — who is calling it.

This is the key insight: **htmxr is not a framework that locks you into a specific frontend**. It is a server that speaks HTTP and returns web content. Any frontend that can make HTTP requests and render HTML/SVG can connect to it.

## Stack

- **Vite + React + TypeScript**
- Bootstrap 5 via CDN (identical to the htmxr version)
- `/api/*` proxy → `https://hello.demo.breant.art/*` (dev and prod)

## Run locally

```bash
npm install
npm run dev   # → http://localhost:5173
```

## Deploy to Vercel

```bash
vercel deploy
```

The `vercel.json` file configures the proxy to the R server — no CORS configuration needed.

## Comparison with the htmxr version

| | htmxr | React |
|---|---|---|
| Client-side code | ~5 HTML attributes | ~30 lines of TSX |
| JS dependencies | htmx (~14 KB) | React + ReactDOM (~144 KB) |
| Debounce | `delay:300ms` in `hx-trigger` | `setTimeout` in `useEffect` |
| SVG injection | `hx-swap="innerHTML"` | `dangerouslySetInnerHTML` |
| State | in the DOM | `useState` |

The htmxr version delegates all interaction logic to the server and HTML attributes. The React version reimplements that logic on the client side.
