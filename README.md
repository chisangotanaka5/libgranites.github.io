# LibStone website

Static, responsive website for **LibStone — Black Granite Fabrication, Mutoko, Zimbabwe**.
No build step, no database. Upload the folder contents to any static host.

## Structure
```
index.html              Home (hero, products carousel, services, process, projects, export, contact)
services.html           Services detail page (residential, commercial, architectural, memorial, custom)
404.html                Branded "page not found" (uses root-absolute paths — site must live at the domain root)
script.js               All behaviour + CONFIG (contact details, WhatsApp messages)
css/styles.css          All styling (mobile-first breakpoints: 1100 / 1024 / 900 / 520 px)
assets/                 favicon, app icons, social preview image, and images/ (see below)
manifest.webmanifest    Install / theme metadata
robots.txt, sitemap.xml Search-engine files
.htaccess               Apache/cPanel: HTTPS-ready, 404, gzip, caching, security headers
_headers                Same headers for Netlify / Cloudflare Pages
```
Icons are an inline SVG sprite (no icon-font download).

## Images (`assets/images/`) — not included in this zip
Add these files to `assets/images/` using **exactly** these names:

| Used in | Files |
|---|---|
| Hero (CSS) | `hero-workshop.png`, `hero-finish.jpg` |
| Products carousel | `product-kitchen.jpg`, `product-commercial.jpg`, `product-stairs.jpg`, `product-memorial.jpg`, `product-cladding.jpg` |
| Services (home + services page) | `service-residential.jpg`, `service-commercial.jpg`, `service-architectural.jpg`, `service-memorial.jpg` |
| Services page, "Custom" section | `custom.jpg` |
| Process | `process-block.jpg`, `process-cut.jpg`, `process-shape.jpg`, `process-polish.jpg`, `process-inspect.jpg`, `process-deliver.jpg` |
| Projects | `project-residential.jpg`, `project-commercial.jpg`, `project-memorial.jpg`, `project-architectural.jpg` |
| Export / closing banner | `export.jpg`, `final-cta.jpg` |

Guidance for mobile speed: landscape 3:2 or 16:10, **max ~1600 px wide**, JPEG quality ~75–80,
and aim for **under ~250 KB per image** (hero under ~400 KB). Keep the subject near the centre so it
survives mobile cropping. Review each `alt` text in the HTML against the real photo.

## Contact details
Edit the `CONFIG` object at the top of `script.js`:
`whatsappNumber` (digits only, with country code, no `+`), `contact.phone`, `contact.email`, and the enquiry messages.
These are injected into every WhatsApp / phone / email link on both pages.

## Before launch (placeholders still in the files)
1. **Domain** — replace `YOUR-DOMAIN.example` in `index.html`, `services.html`, `robots.txt`, `sitemap.xml`, `.htaccess`:
   `grep -rl "YOUR-DOMAIN.example" . | xargs sed -i 's#YOUR-DOMAIN.example#www.your-real-domain.co.zw#g'`
2. **WhatsApp number** — currently `263000000000` in `script.js`.
3. **Phone** — currently `+263 XXX XXX XXX` in `script.js` and as fallback text in both HTML files.
4. **Email** — `info@libstone.co.zw` is an assumption; confirm it exists.
5. **Images** — add the files listed above.
6. Final check: `grep -rn "YOUR-DOMAIN\|XXX\|263000000000" . --include=*.html --include=*.js --include=*.xml --include=*.txt`
   should return nothing (apart from the `XXX` guard logic in `script.js`).
7. After SSL is installed, enable the HTTPS rule in `.htaccess`.
Do not upload `README.md` / `SEO-CHECKLIST.md` if you prefer (the `.htaccess` blocks them from being served anyway).

## Run locally
`python3 -m http.server 8000` from this folder, then open http://localhost:8000
(use a server rather than double-clicking `index.html`: the 404 page and root-relative paths expect a web root).
