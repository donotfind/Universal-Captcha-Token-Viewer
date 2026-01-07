function loadExternalScript(sourceUrl) {
  return new Promise(resolve => {
    const scriptElement = document.createElement("script")
    scriptElement.src = sourceUrl
    scriptElement.async = true
    scriptElement.defer = true
    scriptElement.onload = resolve
    document.head.appendChild(scriptElement)
  })
}

function handleCaptchaSolved(token) {
  const tokenBox = document.getElementById("tokenBox")
  const copyButton = document.getElementById("copyBtn")

  tokenBox.value = token
  copyButton.disabled = false

  copyButton.onclick = async () => {
    await navigator.clipboard.writeText(token)
    copyButton.textContent = "✅ Copied"
    setTimeout(() => {
      copyButton.textContent = "📋 Copy"
    }, 1200)
  }
}

async function injectHCaptcha(siteKey) {
  await loadExternalScript("https://js.hcaptcha.com/1/api.js?render=explicit")
  window.hcaptcha.render("captcha", {
    sitekey: siteKey,
    callback: handleCaptchaSolved
  })
}

async function injectRecaptchaV2(siteKey) {
  await loadExternalScript(
    "https://www.google.com/recaptcha/api.js?onload=recaptchaV2Loaded&render=explicit"
  )

  window.recaptchaV2Loaded = () => {
    window.grecaptcha.render("captcha", {
      sitekey: siteKey,
      callback: handleCaptchaSolved
    })
  }

  if (window.grecaptcha && window.grecaptcha.render) {
    window.recaptchaV2Loaded()
  }
}

async function injectRecaptchaV3(siteKey, actionName) {
  await loadExternalScript(
    `https://www.google.com/recaptcha/api.js?render=${siteKey}`
  )

  window.grecaptcha.ready(() => {
    window.grecaptcha.execute(siteKey, {
      action: actionName || "submit"
    }).then(handleCaptchaSolved)
  })
}

async function injectCloudflareTurnstile(siteKey) {
  await loadExternalScript(
    "https://challenges.cloudflare.com/turnstile/v0/api.js"
  )

  window.turnstile.render("#captcha", {
    sitekey: siteKey,
    callback: handleCaptchaSolved
  })
}

window.addEventListener("captchaConfig", event => {
  const captchaType = event.detail.type
  const siteKey = event.detail.sitekey
  const actionName = event.detail.action

  if (captchaType === "hcaptcha") {
    injectHCaptcha(siteKey)
  }

  if (captchaType === "recaptcha_v2") {
    injectRecaptchaV2(siteKey)
  }

  if (captchaType === "recaptcha_v3") {
    injectRecaptchaV3(siteKey, actionName)
  }

  if (captchaType === "turnstile") {
    injectCloudflareTurnstile(siteKey)
  }
})
