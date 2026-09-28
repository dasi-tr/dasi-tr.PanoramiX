# HymmShot site rebuild notes

Rebuilt September 28, 2026 from the supplied static-site package.

## Main changes
- Replaced the abstract home-page capture diagrams with real product imagery already included in the repository.
- Reworked the home page around HymmShot as a growing family of focused Windows capture tools, with HymmScroll and HymmStack as the current products.
- Kept the site fully static for GitHub Pages; no framework or build system was added.
- Fixed Microsoft Store analytics so HymmScroll and HymmStack clicks are tracked separately.
- Fixed video analytics for both product demos and made tracking support multiple videos.
- Replaced the manifest/app icons with the HymmShot family mark.
- Rebuilt Privacy, Security, Documentation and Changelog pages in the current HymmShot design system.
- Documentation now covers both products; Changelog clearly separates known HymmScroll release information from HymmStack.
- Added both official Store links to family footers and Security.
- Preserved the existing product videos without crop, zoom or reframing.
- Added a README warning that the supplied package contains no CNAME file.

## Deployment check
Before replacing the live GitHub Pages content, verify the repository's custom-domain/CNAME configuration.

## HymmScroll demo video update
- Replaced the previous `hymmscroll-demo.mp4` with the edited 31-second product demo.
- Removed source audio/music in the edited video.
- The edited demo cuts the tray/startup clutter, accidental screen switch, and long processing wait.
- Added concise on-screen product captions.
- Added `assets/hymmscroll-demo-poster.jpg`, generated from the clean edited demo.
- The homepage keeps the real product screenshots; the full video remains on the HymmScroll product page.


## Round 2 (2026-09-28)
- Replaced HymmScroll imagery on the home page with verified HymmScroll screenshots supplied for the product.
- Removed legacy pre-release wording from visible copy, FAQ schema, AI-facing Markdown and changelog content.
- Updated HymmShot positioning from a fixed two-tool brand to a growing family of focused screenshot tools.
- Simplified sitemap.xml to canonical HTML pages for Google indexing while keeping llms.txt and Markdown discovery files available to AI agents.
- Added VideoObject structured data for the HymmScroll demo video.

## Final audience/copy pass
- Added WhatsApp Web explicitly as a HymmScroll use case.
- Broadened HymmScroll and HymmStack positioning beyond technical users to legal, content/editorial, research, support and everyday workflows.
- Replaced the fixed “four screenshots” wording with a general “series of screenshots” message.
- Mirrored the audience/use-case changes in AI-facing Markdown and llms.txt.

- Homepage HymmScroll imagery: replaced marketing-slide screenshots with clean product frames from the original recording so HymmScroll and HymmStack cards use the same visual treatment (product UI only, no baked-in headline).
