// UI components — Header, NavBar, RestTimer, ExerciseCard, SetRow, Progress views
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// === Helpers ===
const fmtDate = (iso, lang) => {
  const d = new Date(iso + "T00:00:00");
  const m = window.STR.monthNames[lang][d.getMonth()];
  const day = window.langDigits(d.getDate(), lang);
  return `${m} ${day}`;
};

// === Header ===
function Header({ lang, setLang, view, setView }) {
  return (
    <header className="hdr">
      <div className="hdr-row">
        <div className="hdr-title">
          <span className="hdr-mark">⏚</span>
          <span>{t("appTitle", lang)}</span>
        </div>
        <button
          className="lang-toggle"
          onClick={() => setLang(lang === "fa" ? "en" : "fa")}
          aria-label="Toggle language"
        >
          {lang === "fa" ? "EN" : "FA"}
        </button>
      </div>
    </header>
  );
}

// === Bottom Nav ===
function NavBar({ view, setView, lang }) {
  const tabs = [
    { id: "today", label: t("today", lang), icon: "●" },
    { id: "plan", label: t("plan", lang), icon: "▢" },
    { id: "progress", label: t("progress", lang), icon: "◯" },
    { id: "habits", label: t("habits", lang), icon: "✦" },
  ];
  return (
    <nav className="navbar">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={"nav-btn" + (view === tab.id ? " active" : "")}
          onClick={() => setView(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

// === Rest Timer (per-exercise, optional) ===
function RestTimer({ lang, defaultSec = 90, onClose }) {
  const [secs, setSecs] = useState(defaultSec);
  const [running, setRunning] = useState(true);
  const total = defaultSec;
  useEffect(() => {
    if (!running) return;
    if (secs <= 0) { setRunning(false); return; }
    const id = setTimeout(() => setSecs(s => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secs, running]);

  const pct = ((total - secs) / total) * 100;
  const finished = secs <= 0;

  return (
    <div className={"timer " + (finished ? "done" : "")}>
      <div className="timer-bar"><div className="timer-fill" style={{ width: pct + "%" }} /></div>
      <div className="timer-row">
        <div className="timer-num">{window.langDigits(secs, lang)}<span className="timer-unit">s</span></div>
        <div className="timer-actions">
          {!finished && (
            <button className="btn-mini" onClick={() => setRunning(r => !r)}>
              {running ? "❚❚" : "▶"}
            </button>
          )}
          <button className="btn-mini" onClick={onClose}>✕</button>
        </div>
      </div>
    </div>
  );
}

// === Set Row ===
function SetRow({ idx, set, prev, onChange, lang }) {
  const onW = (e) => onChange({ w: e.target.value });
  const onR = (e) => onChange({ r: e.target.value });
  const onDone = () => onChange({ done: !set.done });
  return (
    <div className={"set-row" + (set.done ? " set-done" : "")}>
      <div className="set-idx">{window.langDigits(idx + 1, lang)}</div>
      <input
        className="set-input"
        type="number"
        inputMode="decimal"
        placeholder={prev ? String(prev.w) : "—"}
        value={set.w}
        onChange={onW}
      />
      <span className="set-x">×</span>
      <input
        className="set-input"
        type="number"
        inputMode="numeric"
        placeholder={prev ? String(prev.r) : "—"}
        value={set.r}
        onChange={onR}
      />
      <button className={"set-check" + (set.done ? " checked" : "")} onClick={onDone} aria-label="Mark set done">
        {set.done ? "✓" : ""}
      </button>
    </div>
  );
}

// === Exercise Card (expandable) ===
function ExerciseCard({ ex, lang, dateKey, dayKey, onUpdate, sessionEx, idx }) {
  const [open, setOpen] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [timerSec, setTimerSec] = useState(window.Store.getTimerPref() || 90);
  const setsCount = ex.sets || (ex.reps_en ? 1 : 0);
  const totalSets = setsCount;

  const sets = sessionEx?.sets || [];
  const doneCount = sets.filter(s => s.done).length;
  const status = doneCount === 0 ? "notDone" : doneCount >= totalSets ? "complete" : "partial";

  const prev = window.Store.getBestPrev(ex.id, dateKey);

  const handleSet = (i, patch) => {
    onUpdate(ex.id, i, patch);
    if (patch.done && window.Store.getTimerPref() > 0) {
      setTimerSec(window.Store.getTimerPref());
      setShowTimer(true);
    }
  };

  return (
    <div className={"ex-card " + (open ? "open " : "") + status}>
      <button className="ex-head" onClick={() => setOpen(o => !o)}>
        <div className="ex-head-l">
          <div className="ex-num">{window.langDigits(idx + 1, lang)}</div>
          <div className="ex-title-grp">
            <div className="ex-name">{lang === "fa" ? ex.name_fa : ex.name_en}</div>
            <div className="ex-meta">
              {totalSets ? `${window.langDigits(totalSets, lang)} ${t("sets", lang)} · ${lang === "fa" ? ex.reps_fa : ex.reps_en}` : (lang === "fa" ? ex.reps_fa : ex.reps_en)}
            </div>
          </div>
        </div>
        <div className="ex-head-r">
          {totalSets > 0 && <div className="ex-prog">{window.langDigits(doneCount, lang)}/{window.langDigits(totalSets, lang)}</div>}
          <span className="chevron">{open ? "−" : "+"}</span>
        </div>
      </button>

      {open && (
        <div className="ex-body">
          <div className="ex-anim-wrap">
            <window.ExerciseAnim anim={ex.anim} size={200} />
            {ex.youtube ? (
              <a className="video-slot video-slot-link" href={ex.youtube} target="_blank" rel="noopener noreferrer">
                <div className="video-pl">▶</div>
                <div className="video-pl-text">
                  {lang === "fa"
                    ? (ex.youtube.includes("instagram") ? "تماشا در اینستاگرام" : ex.youtube.includes("facebook") ? "تماشا در فیسبوک" : "تماشا در یوتیوب")
                    : (ex.youtube.includes("instagram") ? "Watch on Instagram" : ex.youtube.includes("facebook") ? "Watch on Facebook" : "Watch on YouTube")
                  }
                </div>
              </a>
            ) : (
              <div className="video-slot">
                <div className="video-pl">▶</div>
                <div className="video-pl-text">{t("videoPlaceholder", lang)}</div>
              </div>
            )}
          </div>

          <p className="ex-instr">{lang === "fa" ? ex.instr_fa : ex.instr_en}</p>

          {ex.cue_en && (
            <div className="ex-cue">
              <span className="ex-cue-label">{t("cue", lang)}</span>
              <span>{lang === "fa" ? ex.cue_fa : ex.cue_en}</span>
            </div>
          )}

          {ex.equipment_en && (
            <div className="ex-equipment">
              <span className="lbl">{t("equipment", lang)}</span>
              <span>{lang === "fa" ? ex.equipment_fa : ex.equipment_en}</span>
            </div>
          )}

          {totalSets > 0 && (
            <div className="ex-sets">
              <div className="ex-sets-head">
                <span>{t("set", lang)}</span>
                <span>{t("weight", lang)}</span>
                <span></span>
                <span>{t("reps", lang)}</span>
                <span>{t("done", lang)}</span>
              </div>
              {Array.from({ length: totalSets }).map((_, i) => (
                <SetRow
                  key={i}
                  idx={i}
                  set={sets[i] || { w: "", r: "", done: false }}
                  prev={prev}
                  lang={lang}
                  onChange={(patch) => handleSet(i, patch)}
                />
              ))}
              {prev ? (
                <div className="ex-prev">
                  <span className="lbl">{t("prevSession", lang)}</span>
                  <span>{window.langDigits(prev.w, lang)}{t("weight", lang)} × {window.langDigits(prev.r, lang)}</span>
                </div>
              ) : (
                <div className="ex-prev dim">{t("noPrev", lang)}</div>
              )}

              <div className="rest-controls">
                <span className="lbl">{t("startTimer", lang)}</span>
                <div className="timer-pills">
                  {[60, 90, 120].map(s => (
                    <button
                      key={s}
                      className={"pill" + (timerSec === s ? " active" : "")}
                      onClick={() => { setTimerSec(s); window.Store.setTimerPref(s); setShowTimer(true); }}
                    >{window.langDigits(s, lang)}s</button>
                  ))}
                  <button
                    className={"pill" + (window.Store.getTimerPref() === 0 ? " active" : "")}
                    onClick={() => { window.Store.setTimerPref(0); setShowTimer(false); }}
                  >off</button>
                </div>
              </div>
              {showTimer && <RestTimer lang={lang} defaultSec={timerSec} onClose={() => setShowTimer(false)} />}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// === Section (warmup/main/cooldown wrap) ===
function Section({ title, children, kicker }) {
  return (
    <section className="sec">
      <div className="sec-head">
        {kicker && <span className="sec-kicker">{kicker}</span>}
        <h2 className="sec-title">{title}</h2>
      </div>
      <div className="sec-body">{children}</div>
    </section>
  );
}

Object.assign(window, { Header, NavBar, RestTimer, ExerciseCard, SetRow, Section, fmtDate });
