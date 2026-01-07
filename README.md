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
```
├── manifest.json       # Extension manifest (MV3)
├── content.js          # Injects captcha UI on matched domains
├── page.js             # Loads captcha scripts & captures tokens
├── dashboard.html      # Popup dashboard UI
├── optional.js         # Dashboard logic (storage, import/export)
├── icon128.png         # Extension icon
```


---

## ⚙️ Installation

### 🖥 Desktop (Chrome / Edge)

1. Download or clone this repository  
2. Extract the ZIP file  
3. Open your browser and go to: `chrome://extensions`  
4. Enable Developer Mode  
5. Click **Load unpacked**  
6. Select the extracted project folder  

The extension will be installed successfully.

### 📱 Android (Kiwi Browser)

1. Download the ZIP file  
2. Open Kiwi Browser  
3. Open the Extensions menu  
4. Tap **(+ ZIP / CRX)**  
5. Select the downloaded ZIP file  

The extension will appear in the extensions list.

---

## 🚀 Usage Guide (Step-by-Step)

**Step 1: Open Dashboard**  
Click the extension icon. The Captcha Configuration Dashboard will open.

**Step 2: Add a New Site Configuration**  
Fill in the following fields:

| Field       | Description                                      |
|-------------|--------------------------------------------------|
| Domain      | e.g., `example.com`, `sub.example.com`, or `*`   |
| Captcha Type| hCaptcha / reCAPTCHA v2 / reCAPTCHA v3 / Turnstile|
| Site Key    | Captcha site key                                 |
| Action      | Required only for reCAPTCHA v3                   |

Click **Add Configuration** to save.

**Step 3: Enable / Disable Site**  
Use the 🟢 ON / 🔴 OFF toggle. Disabled sites will be ignored.

**Step 4: Visit Target Website**  
Open the configured domain in the browser. The page will be replaced with a captcha UI.

**Step 5: Solve Captcha**  
Complete the captcha normally. The token will appear automatically in the textbox.

**Step 6: Copy Token**  
Click 📋 **Copy**. The token is copied to the clipboard.

---

## 📤 Import & Export Configurations

**Export**  
Open the dashboard → Click ⬇ **Export JSON** → Save the configuration file.

**Import**  
Open the dashboard → Click ⬆ **Import JSON** → Select a valid JSON file. Configurations will be restored.

---

## 🔐 Permissions Used

```json
"permissions": [
  "clipboardWrite",
  "storage"
]
```

clipboardWrite → Copy captcha tokens
storage → Save site configurations

## ⚠️ Disclaimer
This extension is provided for educational, testing, and development purposes only.
You are responsible for how you use this tool.
Do not use it to violate website terms of service or applicable laws.
