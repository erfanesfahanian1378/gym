// i18n strings
window.STR = {
  appTitle: { en: "Gym Plan", fa: "برنامه باشگاه" },
  today: { en: "Today", fa: "امروز" },
  plan: { en: "Plan", fa: "برنامه" },
  progress: { en: "Progress", fa: "پیشرفت" },
  habits: { en: "Habits", fa: "عادت‌ها" },
  pickDay: { en: "Pick today's workout", fa: "تمرین امروزت رو انتخاب کن" },
  day: { en: "Day", fa: "روز" },
  duration: { en: "min", fa: "دقیقه" },
  warmup: { en: "Warm‑up", fa: "گرم کردن" },
  main: { en: "Main", fa: "اصلی" },
  cardio: { en: "Cardio Finisher", fa: "کاردیوی پایانی" },
  cooldown: { en: "Cool‑down", fa: "سرد کردن" },
  sets: { en: "sets", fa: "ست" },
  reps: { en: "reps", fa: "تکرار" },
  set: { en: "Set", fa: "ست" },
  weight: { en: "kg", fa: "کیلو" },
  done: { en: "Done", fa: "انجام شد" },
  startTimer: { en: "Start rest", fa: "شروع استراحت" },
  stopTimer: { en: "Stop", fa: "توقف" },
  timer60: { en: "60s", fa: "۶۰ث" },
  timer90: { en: "90s", fa: "۹۰ث" },
  timer120: { en: "120s", fa: "۱۲۰ث" },
  cue: { en: "Cue", fa: "نکته" },
  equipment: { en: "Equipment", fa: "تجهیزات" },
  history: { en: "History", fa: "تاریخچه" },
  expectations: { en: "Expectations — 4 to 6 weeks", fa: "انتظارات — ۴ تا ۶ هفته" },
  longterm: { en: "After 3 to 6 months", fa: "بعد از ۳ تا ۶ ماه" },
  videoPlaceholder: { en: "Drop a YouTube link here later", fa: "لینک یوتیوب رو بعدا اینجا بذار" },
  loggedSets: { en: "Logged sets", fa: "ست‌های ثبت‌شده" },
  notDone: { en: "Not started", fa: "شروع نشده" },
  partial: { en: "In progress", fa: "در حال انجام" },
  complete: { en: "Complete", fa: "تکمیل شده" },
  resetDay: { en: "Reset this day", fa: "ریست این روز" },
  bestSet: { en: "Best set", fa: "بهترین ست" },
  noHistory: { en: "No sessions logged yet. Pick a day and start.", fa: "هنوز جلسه‌ای ثبت نشده. یه روز رو انتخاب کن و شروع کن." },
  weekTitle: { en: "This week", fa: "این هفته" },
  prevSession: { en: "Previous best", fa: "بهترین قبلی" },
  noPrev: { en: "First time — set your baseline", fa: "اولین بار — مبنای خودت رو بساز" },
  exercises: { en: "exercises", fa: "حرکت" },
  totalDuration: { en: "Estimated", fa: "زمان تقریبی" },
  reset: { en: "Reset", fa: "ریست" },
  watchVideo: { en: "Video", fa: "ویدیو" },
  showAnim: { en: "Animation", fa: "انیمیشن" },
  startSession: { en: "Start session", fa: "شروع جلسه" },
  continueSession: { en: "Continue session", fa: "ادامه جلسه" },
  daysOfWeek: {
    en: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    fa: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
  },
  monthNames: {
    en: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    fa: ["ژان","فور","مار","آور","می","ژوئن","ژوئی","اوت","سپ","اکت","نوا","دس"],
  },
  sessionLogged: { en: "Session saved", fa: "جلسه ذخیره شد" },
  postureMatters: { en: "Posture comes first", fa: "پاسچر اولویت داره" },
  postureNote: {
    en: "Tuck the tailbone forward before every heavy set. Press the back firmly into the pad on machine work. Stop if it sharp pains.",
    fa: "قبل هر ست سنگین لگن رو ببر جلو. روی دستگاه‌ها پشتت رو محکم بچسبون به پد. درد تیز شد، وایسا.",
  },
};
window.t = (key, lang) => {
  const v = window.STR[key];
  if (!v) return key;
  return v[lang] || v.en || key;
};
window.langDigits = (n, lang) => {
  if (lang !== "fa") return String(n);
  const m = "۰۱۲۳۴۵۶۷۸۹";
  return String(n).replace(/\d/g, (d) => m[+d]);
};
