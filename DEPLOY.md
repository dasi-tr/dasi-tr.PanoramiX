# Publish the HymmShot website

1. Open the website repository on GitHub.
2. Upload all files and folders from this package to the repository root.
3. Replace existing files when GitHub asks.
4. Commit to the `main` branch with a message such as `Rename site to HymmShot and improve SEO`.
5. In **Settings → Pages**, confirm the site is built from the `main` branch and the custom domain is `hymmshot.com`.
6. After deployment, open `https://hymmshot.com/robots.txt` and `https://hymmshot.com/sitemap.xml` to confirm the new files are live.
7. In Google Search Console, submit `https://hymmshot.com/sitemap.xml` and request indexing for the homepage.

Important: this package does not rename the GitHub repository or the release ZIP because doing so can break existing URLs. Those can be migrated later with redirects and a new release asset.
