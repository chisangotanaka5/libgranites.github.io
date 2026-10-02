# LibStone SEO & launch checklist

## Already in place
- Unique `<title>`, meta description, canonical URL and Open Graph / Twitter tags on `index.html` and `services.html`
- JSON-LD: `LocalBusiness` + service catalogue (home) and `BreadcrumbList` (services)
- `robots.txt`, `sitemap.xml` (home + services), `manifest.webmanifest`, favicon (SVG + PNG), Apple touch icon, 192/512 app icons
- `og-libstone.jpg` (1200×630) social preview
- Branded `404.html` (noindex)
- One `<h1>` per page, skip-to-content link, keyboard-friendly menu (Esc closes), visible focus states, alt text on all images
- `prefers-reduced-motion` respected (no autoplay carousel, no reveal animations)
- Lazy-loaded below-the-fold images with width/height hints (no layout shift)

## Replace before launch
See "Before launch" in `README.md` — domain, WhatsApp number, phone, email, real photos.

## After launch
- Verify the domain in Google Search Console and Bing Webmaster Tools; submit `/sitemap.xml`
- Request indexing of the home and services pages
- Keep one canonical host (HTTPS + www or non-www) and redirect the other to it
- Create / claim a Google Business Profile for LibStone (Mutoko) and use the same name, phone and website
- Test the live site on a real phone (Chrome + Safari) and with PageSpeed Insights; compress any image over ~250 KB

## Content SEO
Strengthen copy naturally around: black granite fabrication Zimbabwe, granite countertops Zimbabwe,
granite fabrication Mutoko, granite memorials Zimbabwe, architectural granite, granite export Zimbabwe.
Use them only where the page genuinely describes the service.

## Image SEO
Descriptive filenames are for new images only (existing filenames are wired into the code).
When real photos arrive, update each `alt` to describe what is actually shown. Prefer WebP/AVIF if the host supports it.

## Structured-data caution
The JSON-LD deliberately omits unverified claims (ratings, years in business, certifications, opening hours,
capacity, export destinations, awards). Add phone / email / hours / geo only once confirmed.

## Not included (add only if needed)
- Privacy policy / cookie notice — not required today (no forms, analytics or cookies), but add one the moment analytics or a contact form is added.
- Contact form — needs a backend or a form service; the site currently routes all enquiries through WhatsApp.
