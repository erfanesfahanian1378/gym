// Pages: TodayView, PlanView, ProgressView, HabitsView
const PLAN = window.PLAN;

function DayPicker({ lang, onPick, currentDayKey }) {
  return (
    <div className="day-picker">
      <div className="dp-label">{t("pickDay", lang)}</div>
      <div className="dp-grid">
        {[1, 2, 3, 4].map(k => {
          const d = PLAN.days[k];
          return (
            <button
              key={k}
              className={"dp-card" + (currentDayKey === k ? " active" : "")}
              onClick={() => onPick(k)}
            >
              <div className="dp-tag">{lang === "fa" ? d.tag_fa : d.tag_en}</div>
              <div className="dp-day">{t("day", lang)} {window.langDigits(k, lang)}</div>
              <div className="dp-title">{lang === "fa" ? d.title_fa : d.title_en}</div>
              <div className="dp-meta">
                {window.langDigits(d.main.length, lang)} {t("exercises", lang)} · {window.langDigits(d.duration, lang)} {t("duration", lang)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TodayView({ lang }) {
  const [current, setCurrentState] = useState(window.Store.getCurrent());
  const [, force] = useState(0);
  const dateKey = current?.date || window.Store.todayKey();
  const dayKey = current?.dayKey;

  const setCurrent = (dk) => {
    const c = { date: window.Store.todayKey(), dayKey: dk };
    window.Store.setCurrent(c);
    window.Store.getOrCreateSession(c.date, dk);
    setCurrentState(c);
  };

  // re-read on every render so set inputs reflect latest localStorage
  const session = dayKey ? window.Store.getOrCreateSession(dateKey, dayKey) : null;

  const onUpdate = (exId, setIdx, patch) => {
    window.Store.updateSet(dateKey, dayKey, exId, setIdx, patch);
    force(x => x + 1);
  };

  const reset = () => {
    if (!confirm(lang === "fa" ? "این روز ریست بشه؟" : "Reset this day?")) return;
    window.Store.resetSession(dateKey);
    force(x => x + 1);
  };

  const switchDay = () => { window.Store.setCurrent(null); setCurrentState(null); };

  if (!dayKey) {
    return (
      <div className="page">
        <div className="hero">
          <div className="hero-date">{fmtDate(dateKey, lang)}</div>
          <h1 className="hero-h">{t("pickDay", lang)}</h1>
        </div>
        <DayPicker lang={lang} onPick={setCurrent} />
        <PostureNote lang={lang} />
      </div>
    );
  }

  const day = PLAN.days[dayKey];
  const allExs = day.main;
  const sessExs = session?.exercises || {};
  const totalSets = allExs.reduce((a, e) => a + (e.sets || 0), 0);
  const doneSets = allExs.reduce((a, e) => {
    const sx = sessExs[e.id]?.sets || [];
    return a + sx.filter(s => s.done).length;
  }, 0);
  const pct = totalSets > 0 ? Math.round((doneSets / totalSets) * 100) : 0;

  return (
    <div className="page">
      <div className="hero">
        <div className="hero-row">
          <div className="hero-date">{fmtDate(dateKey, lang)}</div>
          <button className="btn-ghost" onClick={switchDay}>↺ {t("day", lang)}</button>
        </div>
        <div className="hero-tag">{lang === "fa" ? day.tag_fa : day.tag_en} · {t("day", lang)} {window.langDigits(dayKey, lang)}</div>
        <h1 className="hero-h">{lang === "fa" ? day.title_fa : day.title_en}</h1>
        <div className="hero-meta">
          {window.langDigits(allExs.length, lang)} {t("exercises", lang)} · {window.langDigits(day.duration, lang)} {t("duration", lang)}
        </div>
        <div className="hero-progress">
          <div className="hp-bar"><div className="hp-fill" style={{ width: pct + "%" }} /></div>
          <div className="hp-num">{window.langDigits(pct, lang)}%</div>
        </div>
      </div>

      <Section kicker="01" title={t("warmup", lang)}>
        {day.warmup.map((ex, i) => (
          <ExerciseCard
            key={ex.id} ex={ex} idx={i} lang={lang} dateKey={dateKey} dayKey={dayKey}
            sessionEx={sessExs[ex.id]} onUpdate={onUpdate}
          />
        ))}
      </Section>

      <Section kicker="02" title={t("main", lang)}>
        {day.main.map((ex, i) => (
          <ExerciseCard
            key={ex.id} ex={ex} idx={i} lang={lang} dateKey={dateKey} dayKey={dayKey}
            sessionEx={sessExs[ex.id]} onUpdate={onUpdate}
          />
        ))}
      </Section>

      {day.cardio && (
        <Section kicker="03" title={t("cardio", lang)}>
          <ExerciseCard
            ex={{ ...day.cardio, sets: 0, reps_en: day.cardio.duration_en, reps_fa: day.cardio.duration_fa }}
            idx={0} lang={lang} dateKey={dateKey} dayKey={dayKey}
            sessionEx={sessExs[day.cardio.id]} onUpdate={onUpdate}
          />
        </Section>
      )}

      <Section kicker="04" title={t("cooldown", lang)}>
        {day.cooldown.map((ex, i) => (
          <ExerciseCard
            key={ex.id} ex={{ ...ex, sets: 0 }} idx={i} lang={lang} dateKey={dateKey} dayKey={dayKey}
            sessionEx={sessExs[ex.id]} onUpdate={onUpdate}
          />
        ))}
      </Section>

      <div className="page-foot">
        <button className="btn-ghost danger" onClick={reset}>{t("resetDay", lang)}</button>
      </div>
    </div>
  );
}

function PostureNote({ lang }) {
  return (
    <div className="posture-note">
      <div className="pn-mark">⚠</div>
      <div>
        <div className="pn-title">{t("postureMatters", lang)}</div>
        <div className="pn-body">{t("postureNote", lang)}</div>
      </div>
    </div>
  );
}

function PlanView({ lang }) {
  const [openDay, setOpenDay] = useState(1);
  const day = PLAN.days[openDay];

  return (
    <div className="page">
      <div className="hero">
        <h1 className="hero-h">{t("plan", lang)}</h1>
        <div className="hero-meta">{lang === "fa" ? PLAN.meta.goals_fa : PLAN.meta.goals_en}</div>
      </div>

      <div className="day-tabs day-tabs-4">
        {[1, 2, 3, 4].map(k => (
          <button
            key={k}
            className={"day-tab" + (openDay === k ? " active" : "")}
            onClick={() => setOpenDay(k)}
          >
            <span className="dt-num">{window.langDigits(k, lang)}</span>
            <span className="dt-label">{lang === "fa" ? PLAN.days[k].tag_fa : PLAN.days[k].tag_en}</span>
          </button>
        ))}
      </div>

      <div className="plan-overview">
        <h2 className="po-title">{lang === "fa" ? day.title_fa : day.title_en}</h2>
        <div className="po-meta">{window.langDigits(day.duration, lang)} {t("duration", lang)}</div>

        <div className="po-section">
          <div className="po-kicker">{t("warmup", lang)}</div>
          {day.warmup.map(ex => (
            <div key={ex.id} className="po-row">
              <span className="po-name">{lang === "fa" ? ex.name_fa : ex.name_en}</span>
              <span className="po-meta-r">{lang === "fa" ? ex.reps_fa : ex.reps_en}</span>
            </div>
          ))}
        </div>

        <div className="po-section">
          <div className="po-kicker">{t("main", lang)}</div>
          {day.main.map(ex => (
            <div key={ex.id} className="po-row">
              <span className="po-name">{lang === "fa" ? ex.name_fa : ex.name_en}</span>
              <span className="po-meta-r">
                {window.langDigits(ex.sets, lang)} × {lang === "fa" ? ex.reps_fa : ex.reps_en}
              </span>
            </div>
          ))}
        </div>

        <div className="po-section">
          <div className="po-kicker">{t("cardio", lang)}</div>
          <div className="po-row">
            <span className="po-name">{lang === "fa" ? day.cardio.name_fa : day.cardio.name_en}</span>
            <span className="po-meta-r">{lang === "fa" ? day.cardio.duration_fa : day.cardio.duration_en}</span>
          </div>
        </div>

        <div className="po-section">
          <div className="po-kicker">{t("cooldown", lang)}</div>
          {day.cooldown.map(ex => (
            <div key={ex.id} className="po-row">
              <span className="po-name">{lang === "fa" ? ex.name_fa : ex.name_en}</span>
              <span className="po-meta-r">{lang === "fa" ? ex.reps_fa : ex.reps_en}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// === Progress View ===
function ProgressView({ lang }) {
  const sessions = window.Store.getSessions();
  const sessionEntries = Object.entries(sessions).sort((a, b) => b[0].localeCompare(a[0]));

  // weekly calendar — last 14 days
  const today = new Date();
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    days.push({ key, d });
  }

  // exercise progression — show top 4 main lifts
  const trackedIds = ["lat-pulldown", "rdl", "hipthrust", "incline-press", "shoulder-press", "goblet", "box-jump", "broad-jump"];
  const progressions = trackedIds.map(id => {
    const ex = findExercise(id);
    if (!ex) return null;
    const points = [];
    Object.entries(sessions).sort((a, b) => a[0].localeCompare(b[0])).forEach(([date, s]) => {
      const sx = s.exercises[id];
      if (!sx) return;
      let best = 0;
      sx.sets.forEach(set => {
        const w = parseFloat(set.w);
        const r = parseInt(set.r, 10);
        if (!isNaN(w) && !isNaN(r) && set.done) {
          const score = w * r;
          if (score > best) best = score;
        }
      });
      if (best > 0) points.push({ date, score: best, w: sx.sets.reduce((m, s) => Math.max(m, parseFloat(s.w) || 0), 0) });
    });
    return { id, ex, points };
  }).filter(p => p && p.points.length > 0);

  return (
    <div className="page">
      <div className="hero">
        <h1 className="hero-h">{t("progress", lang)}</h1>
      </div>

      <Section title={t("weekTitle", lang)}>
        <div className="cal-strip">
          {days.map(({ key, d }) => {
            const s = sessions[key];
            const isToday = key === window.Store.todayKey();
            return (
              <div key={key} className={"cal-cell " + (s ? "filled " : "") + (isToday ? "today" : "")}>
                <div className="cal-dow">{window.STR.daysOfWeek[lang][(d.getDay() + 1) % 7]}</div>
                <div className="cal-num">{window.langDigits(d.getDate(), lang)}</div>
                {s && <div className="cal-tag">{lang === "fa" ? PLAN.days[s.dayKey]?.tag_fa : PLAN.days[s.dayKey]?.tag_en}</div>}
              </div>
            );
          })}
        </div>
      </Section>

      {progressions.length > 0 && (
        <Section title={lang === "fa" ? "پیشرفت وزنه‌ها" : "Weight progression"}>
          {progressions.map(p => (
            <ProgressionChart key={p.id} ex={p.ex} points={p.points} lang={lang} />
          ))}
        </Section>
      )}

      <Section title={t("history", lang)}>
        {sessionEntries.length === 0 && <div className="empty">{t("noHistory", lang)}</div>}
        {sessionEntries.map(([date, s]) => {
          const day = PLAN.days[s.dayKey];
          if (!day) return null;
          const setCount = Object.values(s.exercises).reduce((a, ex) => a + ex.sets.filter(x => x.done).length, 0);
          const totalSets = day.main.reduce((a, e) => a + (e.sets || 0), 0);
          return (
            <div key={date} className="hist-row">
              <div className="hist-l">
                <div className="hist-date">{fmtDate(date, lang)}</div>
                <div className="hist-title">{lang === "fa" ? day.title_fa : day.title_en}</div>
              </div>
              <div className="hist-r">{window.langDigits(setCount, lang)}/{window.langDigits(totalSets, lang)} {t("sets", lang)}</div>
            </div>
          );
        })}
      </Section>

      <Section title={t("expectations", lang)}>
        <ul className="exp-list">
          {window.PLAN.expectations_4_6[lang].map((line, i) => (
            <li key={i}><span className="exp-bullet">○</span>{line}</li>
          ))}
        </ul>
        <div className="exp-long">
          <div className="exp-long-kicker">{t("longterm", lang)}</div>
          <p>{window.PLAN.expectations_3_6[lang]}</p>
        </div>
      </Section>
    </div>
  );
}

function findExercise(id) {
  for (const k of [1, 2, 3, 4]) {
    const day = PLAN.days[k];
    for (const ex of [...day.warmup, ...day.main, ...day.cooldown]) {
      if (ex.id === id) return ex;
    }
    if (day.cardio?.id === id) return day.cardio;
  }
  return null;
}

function ProgressionChart({ ex, points, lang }) {
  const max = Math.max(...points.map(p => p.score), 1);
  const w = 280, h = 60;
  const step = points.length > 1 ? w / (points.length - 1) : 0;
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (p.score / max) * (h - 8) - 4}`).join(" ");
  const last = points[points.length - 1];
  return (
    <div className="prog-chart">
      <div className="pc-head">
        <span className="pc-name">{lang === "fa" ? ex.name_fa : ex.name_en}</span>
        <span className="pc-last">{window.langDigits(last.w, lang)}{t("weight", lang)}</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="pc-svg">
        <path d={path} className="pc-line" />
        {points.map((p, i) => (
          <circle key={i} cx={i * step} cy={h - (p.score / max) * (h - 8) - 4} r="3" className="pc-dot" />
        ))}
      </svg>
      <div className="pc-meta">
        {window.langDigits(points.length, lang)} {lang === "fa" ? "جلسه" : "sessions"}
      </div>
    </div>
  );
}

// === Habits View ===
function HabitsView({ lang }) {
  return (
    <div className="page">
      <div className="hero">
        <h1 className="hero-h">{t("habits", lang)}</h1>
        <div className="hero-meta">
          {lang === "fa"
            ? "این عادت‌های روزانه از خود تمرین مهم‌ترن"
            : "These daily habits matter more than the workout itself"}
        </div>
      </div>

      <Section title={lang === "fa" ? "روزانه" : "Daily"}>
        <ol className="habit-list">
          {PLAN.habits.map((h, i) => (
            <li key={i} className="habit-item">
              <div className="habit-num">{window.langDigits(i + 1, lang)}</div>
              <div className="habit-text">{lang === "fa" ? h.fa : h.en}</div>
            </li>
          ))}
        </ol>
      </Section>

      <PostureNote lang={lang} />

      <Section title={lang === "fa" ? "این حرکات رو نکن (فعلا)" : "Don't do these (for now)"}>
        <div className="dont-list">
          {[
            { en: "Heavy Conventional Deadlift", fa: "ددلیفت سنگین معمولی", why_en: "Back doesn't have control yet", why_fa: "کمر کنترل کافی نداره" },
            { en: "Standing Barbell Overhead Press", fa: "پرس بالاسر هالتر ایستاده", why_en: "Arches lower back", why_fa: "کمر رو قوس میده" },
            { en: "Roman Chair Hyperextension", fa: "هایپراکستنشن", why_en: "Worsens lordosis", why_fa: "گودی کمر رو بدتر میکنه" },
            { en: "Classic Sit-ups", fa: "دراز و نشست کلاسیک", why_en: "Tightens hip flexors", why_fa: "فلکسور لگن رو سفت میکنه" },
          ].map((d, i) => (
            <div key={i} className="dont-row">
              <div className="dont-x">✕</div>
              <div>
                <div className="dont-name">{lang === "fa" ? d.fa : d.en}</div>
                <div className="dont-why">{lang === "fa" ? d.why_fa : d.why_en}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

Object.assign(window, { TodayView, PlanView, ProgressView, HabitsView, DayPicker, PostureNote });
