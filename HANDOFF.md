# Alan Bacior — Landing Page · Deploy Handoff

A self-contained static landing page. No build step, no framework, no
dependencies. Just HTML, CSS, fonts and images. Any static host works;
these instructions cover **Vercel + a custom domain**.

## What's in this folder
```
index.html                 → the whole page (copy + layout + EN/DE toggle)
styles/colors_and_type.css → brand colors, fonts, type scale
fonts/                      → Montserrat + Inter (self-hosted)
assets/                     → Alan's photos + logo
```
That's everything. Open `index.html` in a browser to preview locally.

## Deploy to Vercel

### Option A — Drag & drop (no tools needed)
1. Go to **https://vercel.com/new**.
2. Sign in (or create a free account).
3. Choose **"Deploy"** → drag this whole folder into the upload area
   (or use "Import" → upload). Vercel auto-detects it as a static site.
4. Click **Deploy**. You get a live `*.vercel.app` URL in ~20 seconds.

### Option B — Vercel CLI (if you have Node installed)
```bash
npm i -g vercel      # once
cd <this-folder>
vercel --prod        # follow the prompts; accept defaults
```

## Doing it inside Claude (recommended for this handoff)
You can let Claude deploy it to *your own* Vercel account:

1. **Unzip** this folder somewhere on your computer (e.g. `~/alan-landing`).
2. **Open Claude in that folder** (Claude Code / the desktop app pointed at
   that directory). This bundle has **no `.vercel/` link**, so nothing is
   tied to anyone else's account — you start clean.
3. **Connect your Vercel account** — either:
   - Turn on the **Vercel connector** in Claude (Settings → Connectors →
     Vercel) and sign in with *your* Vercel login, **or**
   - Let Claude use the Vercel CLI: it will run `vercel login`, which opens
     your browser so you authenticate as yourself.
4. Tell Claude: **"deploy this folder to my Vercel account, production."**
   It creates a brand-new project under *your* account and returns a live URL.
5. Then: **"connect my domain <yourdomain.com>"** — Claude walks the domain
   setup with you (see next section for what happens under the hood).

> The deploy runs under whichever Vercel account YOU authenticate with in
> step 3 — that's what makes it land in your account, not the original one.

## Connect your own domain
1. In the Vercel dashboard, open the project → **Settings → Domains**.
2. Type your domain (e.g. `alanbacior.com`) → **Add**.
3. Vercel shows the DNS records to set. Two paths:
   - **Domain bought at another registrar** (GoDaddy, Namecheap, etc.):
     add the **A record** / **CNAME** Vercel gives you in that registrar's
     DNS settings.
   - **Buy the domain through Vercel**: Settings → Domains → Buy — DNS is
     auto-configured, nothing else to do.
4. Wait for DNS to propagate (minutes to a couple of hours). Vercel issues
   the HTTPS certificate automatically.

## Editing the copy later
- All text lives in `index.html`.
- Both languages are in the `I18N` object near the bottom of `index.html`
  (`en` and `de` blocks) — edit the string, save, redeploy.
- The "Book a call" buttons point to a Calendly link — search `calendly.com`
  in `index.html` and replace with your own booking URL.

## Notes / to-finish
- Testimonial cover photos are placeholders (Unsplash). Replace the image
  URLs in the testimonials section with real client photos.
- Only the 3-month (€3,000) and single-session (€200) offers are shown;
  add the 6-month price if you want it on the page.
