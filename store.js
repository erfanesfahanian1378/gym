// Storage layer — sessions persisted in localStorage
// Keys:
//   gym:lang -> "en" | "fa"
//   gym:sessions -> { [yyyy-mm-dd]: { dayKey, exercises: { [exId]: { sets: [{w,r,done}], notes } }, completedAt } }
//   gym:current -> { date, dayKey } | null

const SK = {
  lang: "gym:lang",
  sessions: "gym:sessions",
  current: "gym:current",
  timerPref: "gym:timerPref",
};

window.Store = {
  getLang() { return localStorage.getItem(SK.lang) || "fa"; },
  setLang(l) { localStorage.setItem(SK.lang, l); },

  getSessions() {
    try { return JSON.parse(localStorage.getItem(SK.sessions) || "{}"); }
    catch { return {}; }
  },
  saveSessions(s) { localStorage.setItem(SK.sessions, JSON.stringify(s)); },

  getCurrent() {
    try { return JSON.parse(localStorage.getItem(SK.current) || "null"); }
    catch { return null; }
  },
  setCurrent(c) {
    if (!c) localStorage.removeItem(SK.current);
    else localStorage.setItem(SK.current, JSON.stringify(c));
  },

  getTimerPref() { return parseInt(localStorage.getItem(SK.timerPref) || "0", 10); },
  setTimerPref(s) { localStorage.setItem(SK.timerPref, String(s)); },

  todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  },

  getOrCreateSession(dateKey, dayKey) {
    const all = window.Store.getSessions();
    if (!all[dateKey]) {
      all[dateKey] = { dayKey, exercises: {}, startedAt: Date.now() };
      window.Store.saveSessions(all);
    } else if (all[dateKey].dayKey !== dayKey) {
      // overwrite if different day chosen
      all[dateKey] = { dayKey, exercises: {}, startedAt: Date.now() };
      window.Store.saveSessions(all);
    }
    return all[dateKey];
  },

  updateSet(dateKey, dayKey, exId, setIdx, patch) {
    const all = window.Store.getSessions();
    if (!all[dateKey]) all[dateKey] = { dayKey, exercises: {}, startedAt: Date.now() };
    if (!all[dateKey].exercises[exId]) all[dateKey].exercises[exId] = { sets: [] };
    const ex = all[dateKey].exercises[exId];
    while (ex.sets.length <= setIdx) ex.sets.push({ w: "", r: "", done: false });
    ex.sets[setIdx] = { ...ex.sets[setIdx], ...patch };
    window.Store.saveSessions(all);
    return all[dateKey];
  },

  resetSession(dateKey) {
    const all = window.Store.getSessions();
    delete all[dateKey];
    window.Store.saveSessions(all);
  },

  // best previous set for an exercise (max weight × reps from prior sessions)
  getBestPrev(exId, beforeDateKey) {
    const all = window.Store.getSessions();
    let best = null;
    Object.entries(all).forEach(([date, s]) => {
      if (date >= beforeDateKey) return;
      const ex = s.exercises[exId];
      if (!ex) return;
      ex.sets.forEach(st => {
        const w = parseFloat(st.w); const r = parseInt(st.r,10);
        if (!isNaN(w) && !isNaN(r) && st.done) {
          const score = w * r;
          if (!best || score > best.score) best = { w, r, date, score };
        }
      });
    });
    return best;
  },
};
