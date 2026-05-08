// Main app
const { useState: useS2, useEffect: useE2 } = React;

function App() {
  const [lang, setLangState] = useS2(window.Store.getLang());
  const [view, setView] = useS2("today");

  const setLang = (l) => { window.Store.setLang(l); setLangState(l); };

  useE2(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
  }, [lang]);

  return (
    <div className={"app lang-" + lang}>
      <Header lang={lang} setLang={setLang} view={view} setView={setView} />
      <main className="main-content">
        {view === "today" && <TodayView lang={lang} />}
        {view === "plan" && <PlanView lang={lang} />}
        {view === "progress" && <ProgressView lang={lang} />}
        {view === "habits" && <HabitsView lang={lang} />}
      </main>
      <NavBar view={view} setView={setView} lang={lang} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
