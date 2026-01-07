# 🔐 Universal Captcha Token Viewer

Universal Captcha Token Viewer is a **Manifest V3 browser extension** that allows you to **render captchas and extract captcha tokens** from supported providers directly inside your browser.

This tool is intended for **developers, testers, and educational use**.

✔ Chrome  
✔ Microsoft Edge  
✔ Kiwi Browser (Android)

---

## 📌 What This Extension Does

1. Matches websites based on configured domains
2. Replaces the page with a captcha container
3. Loads the selected captcha provider dynamically
4. Captures the generated captcha token
5. Allows one-click copy to clipboard

---

## ✨ Features

- Extract captcha tokens in real time
- Domain-based captcha injection
- Wildcard domain support (`*`)
- Enable / disable captcha per site
- Supports multiple captcha providers
- Import & export configurations (JSON)
- One-click token copy
- Clean dark dashboard UI
- Lightweight & fast (Manifest V3)

---

## 🧠 Supported Captcha Providers

- hCaptcha
- reCAPTCHA v2
- reCAPTCHA v3 (action supported)
- Cloudflare Turnstile

---

## 📁 Project Structure

```text
.
├── manifest.json        # Extension manifest (MV3)
├── content.js           # Injects captcha UI on matched domains
├── page.js              # Loads captcha scripts & captures tokens
├── dashboard.html       # Popup dashboard UI
├── optional.js          # Dashboard logic (storage, import/export)
├── icon128.png          # Extension icon
