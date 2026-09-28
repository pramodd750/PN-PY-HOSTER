# ⚡ Pro VPS Panel

A powerful VPS hosting panel built with Flask. Run Python, Node.js, and Shell scripts 24/7 with live logs, module installer, and instant deployment.

**Owner:** shappno / shappno_codex

## ✨ Features

- 🐍 Multi-Runtime (`.py`, `.js`, `.mjs`, `.cjs`, `.sh`)
- 📡 Real-time live logs
- 📦 pip / npm module installer
- 🔐 Per-user isolation
- ⚡ Instant deploy / restart / stop
- 🎛️ Owner control panel
- 💰 Editable pricing plans
- 🔗 Auto-login links

## 🚀 Deploy on Render.com

### Method 1: Using render.yaml (Recommended)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Blueprint
3. Connect your GitHub repo
4. Render will auto-read `render.yaml` and deploy

### Method 2: Manual Web Service

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Settings:
   - **Environment:** Python 3
   - **Build Command:** `./build.sh`
   - **Start Command:** `./start.sh`
5. Add Environment Variables:
   - `SECRET_KEY` = random hex string
   - `OWNER_USER` = `PN`
   - `OWNER_PASS` = `7722`
   - `NODE_VERSION` = `20.11.0`
6. Click **Create Web Service**

## 🖥️ Local Development

```bash
pip install -r requirements.txt
python app.py
