// Backup / export — packs everything this app saved on the device into one JSON file
// that the new (Cloudflare) app can import.
//
// File format (shared with the new app):
// {
//   format: "erfan-gym-backup", version: 1, source: "gym-v5", exportedAt: ISO string,
//   data: { lang, sessions, current, timerPref },
//   raw:  { every localStorage key starting with "gym:" exactly as stored }
// }

(function () {
  const FORMAT = "erfan-gym-backup";

  function buildBackup() {
    const raw = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith("gym:")) raw[k] = localStorage.getItem(k);
    }
    return {
      format: FORMAT,
      version: 1,
      source: "gym-v5",
      exportedAt: new Date().toISOString(),
      data: {
        lang: window.Store.getLang(),
        sessions: window.Store.getSessions(),
        current: window.Store.getCurrent(),
        timerPref: window.Store.getTimerPref(),
      },
      raw,
    };
  }

  function toText() {
    return JSON.stringify(buildBackup(), null, 2);
  }

  function fileName() {
    return `erfan-gym-backup-${window.Store.todayKey()}.json`;
  }

  function download(text, name) {
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }

  // On phones the share sheet is the reliable way to get a file out
  // ("Save to Files", AirDrop, Telegram…). Desktop browsers just download it.
  async function exportFile() {
    const text = toText();
    const name = fileName();
    const touch = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    if (touch && navigator.share && typeof File === "function") {
      const file = new File([text], name, { type: "application/json" });
      if (!navigator.canShare || navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: name });
          return "shared";
        } catch (e) {
          if (e && e.name === "AbortError") return "cancelled";
          // any other share error: fall back to a normal download
        }
      }
    }
    download(text, name);
    return "downloaded";
  }

  async function copyText() {
    const text = toText();
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch { ok = false; }
      ta.remove();
      return ok;
    }
  }

  function sessionCount() {
    return Object.keys(window.Store.getSessions()).length;
  }

  // Small self-removing message at the bottom of the screen
  function toast(msg) {
    const el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    el.textContent = msg;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 300);
    }, 2600);
  }

  window.Backup = { buildBackup, toText, fileName, exportFile, copyText, sessionCount, toast };
})();
