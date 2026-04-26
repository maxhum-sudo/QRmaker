# QRmaker

Simplest possible QR code maker:

- Enter a link
- Generate a QR code
- Download as PNG

Runs entirely in the browser (static site).

## Run locally

From the project folder:

```bash
python3 -m http.server 5173
```

Then open `http://localhost:5173`.

## Deploy to GitHub Pages (project site)

1. Create a GitHub repo (example: `QRmaker`).
2. Push these files to the `main` branch (repo root).
3. In GitHub: **Settings → Pages**
   - **Source**: Deploy from a branch
   - **Branch**: `main` / `(root)`
4. Wait for the deployment to finish.

Your site will be at:

- `https://<user>.github.io/QRmaker/`

