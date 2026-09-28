# hymmshot.com

Website for the HymmShot family of Windows screenshot tools.

- `index.html` — family home page
- `hymmscroll/` — HymmScroll product page (scrolling screenshots)
- `hymmstack/` — HymmStack product page (multi-area capture)
- `about.html` — about the studio and contact
- `docs.html`, `security.html`, `privacy.html`, `changelog.html` — support pages
- `assets/` — stylesheet, icons, share images, screenshots
- `hymmscroll-demo.mp4`, `hymmstack-demo.mp4` — product demos
- `sitemap.xml`, `robots.txt` — search-engine discovery
- `llms.txt` and `*.md` — plain-text summaries for AI assistants and answer engines

Store links used on the site:
- HymmScroll: https://apps.microsoft.com/detail/9n6580jqmpw8
- HymmStack: https://apps.microsoft.com/detail/9p1lzh1rvsdb

Published with GitHub Pages from this repository. The live repository should retain its `CNAME` mapping for `hymmshot.com`; the supplied ZIP did not contain that file, so this rebuild does not invent one.


## Deployment note

The supplied site package does not currently contain a `CNAME` file, although GitHub Pages is documented here as using `hymmshot.com`. Verify the repository domain configuration before deployment; this rebuild intentionally does not invent or overwrite a `CNAME`.
