(() => {
  chrome.storage.sync.get({ configs: [] }, result => {
    const currentHostname = location.hostname

    const matchedConfig = result.configs.find(config =>
      config.enabled !== false &&
      (
        config.domain === "*" ||
        currentHostname === config.domain ||
        currentHostname.endsWith("." + config.domain)
      )
    )

    if (!matchedConfig) return

    document.documentElement.innerHTML = `
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            margin:0;
            background:#0a0a0a;
            color:#fff;
            display:flex;
            align-items:center;
            justify-content:center;
            height:100vh
          }
          .box {
            background:#111;
            padding:20px;
            border-radius:12px;
            width:360px;
            text-align:center
          }
          textarea {
            width:100%;
            height:80px;
            margin-top:10px;
            background:#000;
            color:#0f0
          }
          button {
            width:100%;
            margin-top:10px;
            padding:10px;
            background:#667eea;
            color:#fff;
            border:none
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h3>🔐 Captcha Token</h3>
          <div id="captcha"></div>
          <textarea id="tokenBox" readonly></textarea>
          <button id="copyBtn" disabled>📋 Copy</button>
        </div>
      </body>
      </html>
    `

    const pageScript = document.createElement("script")
    pageScript.src = chrome.runtime.getURL("src/page.js")

    pageScript.onload = () => {
      pageScript.remove()
      window.dispatchEvent(
        new CustomEvent("captchaConfig", { detail: matchedConfig })
      )
    }

    document.head.appendChild(pageScript)
  })
})()
