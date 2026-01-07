document.addEventListener("DOMContentLoaded", () => {

  function getElementById(id) {
    return document.getElementById(id)
  }

  function loadConfigurations() {
    chrome.storage.sync.get({ configs: [] }, result => {
      const sitesListElement = getElementById("sitesList")
      if (!sitesListElement) return

      sitesListElement.innerHTML = ""

      result.configs.forEach((config, index) => {
        const listItem = document.createElement("li")
        listItem.className = "site-item"

        listItem.innerHTML = `
          <span>
            <strong>${config.domain}</strong><br>
            ${config.type}<br>
            <small>${config.sitekey}</small>
          </span>
          <div style="display:flex;gap:8px">
            <button class="toggle-button">
              ${config.enabled === false ? "🔴 OFF" : "🟢 ON"}
            </button>
            <button class="remove-btn">Delete</button>
          </div>
        `

        listItem.querySelector(".toggle-button").onclick = () => {
          config.enabled = !config.enabled
          chrome.storage.sync.set({ configs: result.configs }, loadConfigurations)
        }

        listItem.querySelector(".remove-btn").onclick = () => {
          result.configs.splice(index, 1)
          chrome.storage.sync.set({ configs: result.configs }, loadConfigurations)
        }

        sitesListElement.appendChild(listItem)
      })
    })
  }

  const addConfigurationButton = getElementById("addConfigurationButton")
  const exportButton = getElementById("exportButton")
  const importButton = getElementById("importButton")
  const fileInput = getElementById("fileInput")

  addConfigurationButton.onclick = () => {
    chrome.storage.sync.get({ configs: [] }, result => {
      result.configs.push({
        domain: getElementById("domainInput").value.trim(),
        type: getElementById("captchaTypeSelect").value,
        sitekey: getElementById("siteKeyInput").value.trim(),
        action: getElementById("actionInput").value.trim(),
        enabled: true
      })

      chrome.storage.sync.set({ configs: result.configs }, () => {
        getElementById("domainInput").value = ""
        getElementById("siteKeyInput").value = ""
        getElementById("actionInput").value = ""
        loadConfigurations()
      })
    })
  }

  exportButton.onclick = () => {
    chrome.storage.sync.get({ configs: [] }, result => {
      const jsonBlob = new Blob(
        [JSON.stringify(result.configs, null, 2)],
        { type: "application/json" }
      )

      const downloadUrl = URL.createObjectURL(jsonBlob)
      const anchor = document.createElement("a")
      anchor.href = downloadUrl
      anchor.download = "captcha-sites.json"
      anchor.click()
      URL.revokeObjectURL(downloadUrl)
    })
  }

  importButton.onclick = () => {
    fileInput.click()
  }

  fileInput.onchange = event => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsedData = JSON.parse(reader.result)
        if (!Array.isArray(parsedData)) throw new Error()

        chrome.storage.sync.set(
          { configs: parsedData },
          loadConfigurations
        )
      } catch {
        alert("Invalid JSON file")
      }
    }
    reader.readAsText(file)
  }

  loadConfigurations()
})
