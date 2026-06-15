import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://eplsbwyavmgigdttpxui.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwbHNid3lhdm1naWdkdHRweHVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NDkwNDcsImV4cCI6MjA5NzEyNTA0N30.ppNo0QhMKvqNB6zxZvFanAXNTIqmvpMdaokohnUb5Kc";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadData() {
  try {
    const { data } = await supabase.from("lockin_data").select("data").eq("id", "main").single();
    return data?.data || {};
  } catch { return {}; }
}

async function saveData(data) {
  try {
    await supabase.from("lockin_data").upsert({ id: "main", data, updated_at: new Date().toISOString() });
  } catch {}
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const START_DATE = "2026-06-15";
const END_DATE = "2026-12-01";
const TOTAL_DAYS = 169;

const HABITS = [
  { id: "work",    label: "10h+ Work Block",     icon: "⚡", xp: 2000, color: "#F5A623" },
  { id: "train",   label: "Train",                icon: "🥊", xp: 2000, color: "#E74C3C" },
  { id: "eat",     label: "Ate Clean",             icon: "🥚", xp: 2000, color: "#2ECC71" },
  { id: "content", label: "3 Pieces of Content",  icon: "📲", xp: 2000, color: "#9B59B6" },
  { id: "clean",   label: "No Bad Habits",         icon: "🧠", xp: 2000, color: "#00BCD4",
    sublabel: "No porn · No junk · No scrolling" },
];

const TOTAL_XP_PER_DAY = HABITS.reduce((s, h) => s + h.xp, 0);
const MAX_6M_XP = TOTAL_DAYS * TOTAL_XP_PER_DAY;

// ─── QUOTES ──────────────────────────────────────────────────────────────────
const QUOTES = [
  { text: "The temporary satisfaction of quitting is outweighed by the eternal suffering of mediocrity.", author: "Goggins" },
  { text: "Speed is irrelevant if you're going in the wrong direction. You're going the right direction. Move faster.", author: "Zeland" },
  { text: "Arrogance is what poor people call ambition.", author: "Tate" },
  { text: "Work until your bank account looks like a phone number.", author: "Unknown" },
  { text: "The man who moves a mountain begins by carrying away small stones.", author: "Confucius" },
  { text: "Most people are other people. Their thoughts are someone else's opinions.", author: "Oscar Wilde" },
  { text: "The obstacle is the way.", author: "Marcus Aurelius" },
  { text: "You don't rise to the level of your goals. You fall to the level of your systems.", author: "James Clear" },
  { text: "Discipline is doing what you hate to do, but doing it like you love it.", author: "Mike Tyson" },
  { text: "If you have no critics you'll likely have no success.", author: "Malcolm X" },
  { text: "Attack each day with an enthusiasm unknown to mankind.", author: "Harbaugh" },
  { text: "The secret to success is to start before you're ready.", author: "Marie Forleo" },
  { text: "Rich men don't need to ask permission.", author: "Tate" },
  { text: "What you seek is seeking you.", author: "Rumi" },
  { text: "The only way out is through.", author: "Frost" },
  { text: "Don't stop when you're tired. Stop when you're done.", author: "Goggins" },
  { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
  { text: "Success is rented, not owned. Rent is due every day.", author: "Rory Vaden" },
  { text: "The outer world is a reflection of the inner world.", author: "Zeland" },
  { text: "Your current safe boundaries were once unknown frontiers.", author: "Unknown" },
  { text: "Be the hardest worker in the room. Every room.", author: "The Rock" },
  { text: "Pain is temporary. Quitting lasts forever.", author: "Lance Armstrong" },
  { text: "You are the average of the five people you spend the most time with.", author: "Jim Rohn" },
  { text: "A man who stands for nothing will fall for anything.", author: "Malcolm X" },
  { text: "The matrix wants you comfortable. Get uncomfortable.", author: "Tate" },
  { text: "Rome wasn't built in a day, but they were laying bricks every hour.", author: "Unknown" },
  { text: "You have to be willing to suffer more than anyone else.", author: "Goggins" },
  { text: "The pendulum swings both ways. Detach from the outcome.", author: "Zeland" },
  { text: "Make your move before you're ready.", author: "Shaa Wasmund" },
  { text: "The cave you fear to enter holds the treasure you seek.", author: "Joseph Campbell" },
  { text: "Champions aren't made in gyms. They're made from what they have inside.", author: "Ali" },
  { text: "Wealth is the slave of a wise man and the master of a fool.", author: "Seneca" },
  { text: "The successful warrior is the average man with laser-like focus.", author: "Bruce Lee" },
  { text: "Every action you take is a vote for the type of person you wish to become.", author: "James Clear" },
  { text: "Inaction breeds doubt and fear. Action breeds confidence.", author: "Carnegie" },
  { text: "Your life is your message to the world. Make sure it's inspiring.", author: "Unknown" },
  { text: "It's not who you are that holds you back. It's who you think you're not.", author: "Unknown" },
  { text: "I fear not the man who has practiced 10,000 kicks once, but the man who has practiced one kick 10,000 times.", author: "Bruce Lee" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Roosevelt" },
  { text: "Money doesn't buy happiness, but poverty doesn't buy anything.", author: "Tate" },
  { text: "Stay hard.", author: "Goggins" },
  { text: "The space between where you are and where you want to be is called work.", author: "Hormozi" },
  { text: "An investment in knowledge pays the best interest.", author: "Franklin" },
  { text: "If you're not growing, you're dying.", author: "Tony Robbins" },
  { text: "Intention without action is a daydream.", author: "Zeland" },
  { text: "The harder you work, the luckier you get.", author: "Gary Player" },
  { text: "Someone who is busier than you is working out right now.", author: "Unknown" },
  { text: "Absorb what is useful, discard what is not, add what is uniquely your own.", author: "Bruce Lee" },
  { text: "Most men live lives of quiet desperation. Don't be most men.", author: "Thoreau" },
  { text: "You are built for greatness. Act like it.", author: "Unknown" },
  { text: "Stop being afraid of what could go wrong and start being excited about what could go right.", author: "Tony Robbins" },
  { text: "Your comfort zone is your prison.", author: "Tate" },
  { text: "Waste no more time arguing what a good man should be. Be one.", author: "Marcus Aurelius" },
  { text: "The man on top of the mountain didn't fall there.", author: "Vince Lombardi" },
  { text: "Losers quit when they fail. Winners fail until they succeed.", author: "Robert Kiyosaki" },
  { text: "Control your attention and you control your reality.", author: "Zeland" },
  { text: "Don't talk about it. Be about it.", author: "Unknown" },
  { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { text: "The mind is the athlete. The body is simply the means it uses.", author: "Unknown" },
  { text: "Every morning you have two choices: continue to sleep with your dreams, or wake up and chase them.", author: "Unknown" },
  { text: "Suffer the pain of discipline or suffer the pain of regret.", author: "Jim Rohn" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "The cost of discipline is always less than the cost of regret.", author: "Unknown" },
  { text: "Success is not for the chosen few. It is for the few who choose it.", author: "Andy Frisella" },
  { text: "Poverty is a mindset. Wealth is a decision.", author: "Tate" },
  { text: "Do it now, sometimes later becomes never.", author: "Unknown" },
  { text: "Hard choices, easy life. Easy choices, hard life.", author: "Jerzy Gregorek" },
  { text: "Stop waiting for the right moment. Create it.", author: "Unknown" },
  { text: "Conquer yourself before you try to conquer the world.", author: "Marcus Aurelius" },
  { text: "Every next level of your life will demand a different version of you.", author: "Unknown" },
  { text: "You have to earn the right to be proud.", author: "Goggins" },
  { text: "The outer circumstances of your life are a mirror of your inner world.", author: "Zeland" },
  { text: "Push yourself because no one else is going to do it for you.", author: "Unknown" },
  { text: "Great things never came from comfort zones.", author: "Unknown" },
  { text: "There is no elevator to success. You have to take the stairs.", author: "Unknown" },
  { text: "The grind is part of the goal.", author: "Hormozi" },
  { text: "Don't wish it were easier. Wish you were better.", author: "Jim Rohn" },
  { text: "Self-discipline is the definition of self-love.", author: "Will Smith" },
  { text: "If you can control your mind, you can control your life.", author: "Unknown" },
  { text: "The way you do anything is the way you do everything.", author: "T. Harv Eker" },
  { text: "Your future is created by what you do today, not tomorrow.", author: "Robert Kiyosaki" },
  { text: "Excuses are the nails that build the house of failure.", author: "Unknown" },
  { text: "What you do every day matters more than what you do once in a while.", author: "Gretchen Rubin" },
  { text: "One day or day one. You decide.", author: "Unknown" },
  { text: "The only person you should try to be better than is who you were yesterday.", author: "Unknown" },
  { text: "Success is a series of small wins stacked on each other.", author: "Hormozi" },
  { text: "A disciplined mind leads to happiness, an undisciplined mind leads to suffering.", author: "Dalai Lama" },
  { text: "The man who has no imagination has no wings.", author: "Ali" },
  { text: "Pressure makes diamonds.", author: "Unknown" },
  { text: "Talent is cheaper than table salt. What separates the talented from the successful is hard work.", author: "Stephen King" },
  { text: "Don't count the days. Make the days count.", author: "Ali" },
  { text: "You are what you repeatedly do. Excellence is a habit.", author: "Aristotle" },
  { text: "There are no shortcuts to any place worth going.", author: "Beverly Sills" },
  { text: "Every champion was once a contender who refused to give up.", author: "Rocky" },
  { text: "Winners are not people who never fail but people who never quit.", author: "Unknown" },
  { text: "It's not about perfect. It's about effort.", author: "Jillian Michaels" },
  { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Churchill" },
  { text: "Motivation gets you started. Discipline keeps you going.", author: "Unknown" },
  { text: "Your dream is on the other side of your discipline.", author: "Unknown" },
  { text: "Men who win do what they said they were going to do.", author: "Tate" },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Gandhi" },
  { text: "If you want something you've never had, you must do something you've never done.", author: "Thomas Jefferson" },
  { text: "An hour of pain in exchange for a lifetime of power.", author: "Unknown" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Stop managing your time. Start managing your energy.", author: "Tony Schwartz" },
  { text: "The more you sweat in peace, the less you bleed in war.", author: "Unknown" },
  { text: "Action is the real measure of intelligence.", author: "Napoleon Hill" },
  { text: "Go to war with yourself every single morning.", author: "Goggins" },
  { text: "Without ambition one starts nothing. Without work one finishes nothing.", author: "Emerson" },
  { text: "You attract what you are, not what you want.", author: "Zeland" },
  { text: "A lion does not concern himself with the opinions of sheep.", author: "George RR Martin" },
  { text: "The wealthiest places in the world are graveyards. Full of ideas never acted on.", author: "Myles Munroe" },
  { text: "Doubt kills more dreams than failure ever will.", author: "Suzy Kassem" },
  { text: "You are one decision away from a completely different life.", author: "Unknown" },
  { text: "Train your mind to be stronger than your emotions.", author: "Unknown" },
  { text: "The harder the battle, the sweeter the victory.", author: "Les Brown" },
  { text: "It always seems impossible until it's done.", author: "Mandela" },
  { text: "Real men build. Real men provide. Real men lead.", author: "Tate" },
  { text: "Success is not owned. It's leased. And rent is due every day.", author: "J.J. Watt" },
  { text: "Show up every day. Even when you don't feel like it. Especially when you don't.", author: "Unknown" },
  { text: "Energy flows where attention goes.", author: "Zeland" },
  { text: "You get what you tolerate.", author: "Tony Robbins" },
  { text: "Pray, but move your feet.", author: "African Proverb" },
  { text: "Every day is a bank account. Time is the currency.", author: "Christopher Rice" },
  { text: "Sacrifice today for the version of yourself you want to be.", author: "Unknown" },
  { text: "Strength does not come from physical capacity. It comes from an indomitable will.", author: "Gandhi" },
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { text: "Nothing will work unless you do.", author: "Maya Angelou" },
  { text: "Be obsessed or be average.", author: "Grant Cardone" },
  { text: "Your habits will determine your future.", author: "Jack Canfield" },
  { text: "When you feel like stopping, think about why you started.", author: "Unknown" },
  { text: "You can't cheat the grind. It knows how much you've invested.", author: "Unknown" },
  { text: "The chains of habit are too light to be felt until they're too heavy to be broken.", author: "Warren Buffett" },
  { text: "Earn it. Every single day.", author: "Unknown" },
  { text: "The body achieves what the mind believes.", author: "Unknown" },
  { text: "Don't be afraid to be great.", author: "Ali" },
  { text: "Work hard in silence. Let success make the noise.", author: "Frank Ocean" },
  { text: "What you plant now, you will harvest later.", author: "Og Mandino" },
  { text: "I would rather die on my feet than live on my knees.", author: "Zapata" },
  { text: "Be a man of action, not a man of words.", author: "Unknown" },
  { text: "You will never always be motivated. You have to learn to be disciplined.", author: "Unknown" },
  { text: "Stop explaining yourself. Your results will speak.", author: "Tate" },
  { text: "Every rep is a deposit into your future self.", author: "Unknown" },
  { text: "Consistency is what transforms average into excellence.", author: "Unknown" },
  { text: "You don't need more time. You need more focus.", author: "Unknown" },
  { text: "When you want to succeed as badly as you want to breathe, then you'll be successful.", author: "Eric Thomas" },
  { text: "The goal is not to be better than the other man but your previous self.", author: "Muhammad Ali" },
  { text: "Character is what you do when nobody's watching.", author: "Wooden" },
  { text: "He who is not courageous enough to take risks will accomplish nothing in life.", author: "Ali" },
  { text: "Your reputation is built in public. Your character is built in private.", author: "Unknown" },
  { text: "Set goals so big they scare you a little and excite you a lot.", author: "Unknown" },
  { text: "Every morning you don't get up is someone else pulling ahead.", author: "Unknown" },
  { text: "Sleep is not for those who are broke.", author: "Unknown" },
  { text: "The price of excellence is discipline. The cost of mediocrity is disappointment.", author: "William Arthur Ward" },
  { text: "Success is not a matter of theory but of common sense with uncommon levels of discipline.", author: "Hormozi" },
  { text: "Semen retention multiplies your drive, focus, and magnetism.", author: "Unknown" },
  { text: "You don't need luck. You need reps.", author: "Unknown" },
  { text: "Day 169. You made it. Now go build the life you earned.", author: "You" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function todayStr() { return new Date().toISOString().slice(0, 10); }
function dayIndex(d) { return Math.floor((new Date(d) - new Date(START_DATE)) / 86400000); }
function daysElapsed() { return Math.max(0, Math.min(TOTAL_DAYS, dayIndex(todayStr()) + 1)); }
function daysRemaining() { return Math.max(0, TOTAL_DAYS - daysElapsed()); }
function monthLabel(d) { return new Date(d).toLocaleString("default", { month: "short" }); }

function allDates() {
  const dates = [], cur = new Date(START_DATE), end = new Date(END_DATE);
  while (cur <= end) { dates.push(cur.toISOString().slice(0, 10)); cur.setDate(cur.getDate() + 1); }
  return dates;
}

function calcStats(data) {
  let totalXP = 0, perfectDays = 0, longestStreak = 0, tmpStreak = 0, currentStreak = 0;
  const today = todayStr();
  const dates = allDates().filter(d => d <= today);
  for (const d of dates) {
    const day = data[d] || {};
    totalXP += HABITS.reduce((s, h) => s + (day[h.id] ? h.xp : 0), 0);
    if (HABITS.every(h => day[h.id])) { perfectDays++; longestStreak = Math.max(longestStreak, ++tmpStreak); }
    else tmpStreak = 0;
  }
  for (const d of [...dates].reverse()) {
    if (HABITS.every(h => (data[d] || {})[h.id])) currentStreak++;
    else break;
  }
  return { totalXP, perfectDays, currentStreak, longestStreak };
}

function habitProgress(habitId, data) {
  const today = todayStr();
  const dates = allDates().filter(d => d <= today);
  const habit = HABITS.find(h => h.id === habitId);
  const earned = dates.reduce((s, d) => s + (data[d]?.[habitId] ? habit.xp : 0), 0);
  const total6m = TOTAL_DAYS * habit.xp;
  return { earned, total6m, pct: total6m > 0 ? (earned / total6m) * 100 : 0 };
}

function getLevel(xp) { return Math.floor(xp / 10000) + 1; }
function getLevelProgress(xp) { return (xp % 10000) / 10000; }
function getQuote(dateStr) {
  const idx = Math.max(0, Math.min(dayIndex(dateStr), QUOTES.length - 1));
  return QUOTES[idx];
}

function getWeekStart(dateStr) {
  const d = new Date(dateStr), day = d.getDay();
  d.setDate(d.getDate() - day + (day === 0 ? -6 : 1));
  return d.toISOString().slice(0, 10);
}

function getWeeklySummary(data) {
  const today = todayStr(), weekStart = getWeekStart(today);
  const days = [];
  const s = new Date(weekStart);
  for (let i = 0; i < 7; i++) { const d = new Date(s); d.setDate(s.getDate() + i); days.push(d.toISOString().slice(0, 10)); }
  const past = days.filter(d => d >= START_DATE && d <= today && d <= END_DATE);
  let perfect = 0, totalEarned = 0;
  const misses = Object.fromEntries(HABITS.map(h => [h.id, 0]));
  for (const d of past) {
    const day = data[d] || {};
    if (HABITS.every(h => day[h.id])) perfect++;
    totalEarned += HABITS.reduce((s, h) => s + (day[h.id] ? h.xp : 0), 0);
    HABITS.forEach(h => { if (!day[h.id]) misses[h.id]++; });
  }
  const worst = HABITS.reduce((a, b) => misses[a.id] > misses[b.id] ? a : b);
  return { days: past.length, perfect, totalEarned, worst, misses };
}

function getCountdown() {
  const diff = new Date("2026-12-01T00:00:00") - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
  return { days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000) };
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
function ProgressBar({ pct, color, height = 8, label, sublabel }) {
  return (
    <div style={{ width: "100%" }}>
      {(label || sublabel) && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          {label && <span style={{ fontSize: 12, color: "#888", letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</span>}
          {sublabel && <span style={{ fontSize: 12, color, fontWeight: 700 }}>{sublabel}</span>}
        </div>
      )}
      <div style={{ background: "#1a1a1a", borderRadius: height, height, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${Math.min(100, pct)}%`, borderRadius: height,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)", boxShadow: `0 0 8px ${color}55` }} />
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, color }) {
  return (
    <div style={{ background: "#111", border: "1px solid #1d1d1d", borderRadius: 12,
      padding: "14px 16px", display: "flex", flexDirection: "column", gap: 3, flex: 1, minWidth: 110 }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ fontSize: 20, fontWeight: 800, color: color || "#fff", fontFamily: "monospace", letterSpacing: "-0.02em" }}>{value}</span>
      <span style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
    </div>
  );
}

function HeatmapCell({ date, data, today, onClick }) {
  const checked = HABITS.filter(h => (data[date] || {})[h.id]).length;
  const isFuture = date > today;
  const colors = ["#1f1f1f","#4a1a00","#7a2f00","#c45300","#e08000","#F5A623"];
  return (
    <div onClick={() => !isFuture && onClick(date)}
      title={isFuture ? date : `${date}: ${checked}/5`}
      style={{ width: 12, height: 12, borderRadius: 2, flexShrink: 0, cursor: isFuture ? "default" : "pointer",
        background: isFuture ? "#1a1a1a" : colors[checked],
        border: date === today ? "1px solid #F5A623" : "1px solid transparent",
        transition: "all 0.15s" }} />
  );
}

// ─── DAILY TASKS ─────────────────────────────────────────────────────────────
function DailyTasks({ activeDate, data, setData }) {
  const saved = data[activeDate]?.tasks || { main: ["", "", ""], extra: [] };
  const [main, setMain] = useState(saved.main.length === 3 ? saved.main : ["", "", ""]);
  const [extra, setExtra] = useState(saved.extra || []);
  const [mainDone, setMainDone] = useState(data[activeDate]?.tasksDone?.main || [false, false, false]);
  const [extraDone, setExtraDone] = useState(data[activeDate]?.tasksDone?.extra || []);
  const [savePulse, setSavePulse] = useState(false);

  useEffect(() => {
    const t = data[activeDate]?.tasks || { main: ["", "", ""], extra: [] };
    const td = data[activeDate]?.tasksDone || { main: [false, false, false], extra: [] };
    setMain(t.main?.length === 3 ? t.main : ["", "", ""]);
    setExtra(t.extra || []);
    setMainDone(td.main?.length === 3 ? td.main : [false, false, false]);
    setExtraDone(td.extra || []);
  }, [activeDate]);

  const persist = useCallback((newMain, newExtra, newMainDone, newExtraDone) => {
    setData(prev => {
      const next = { ...prev, [activeDate]: { ...(prev[activeDate] || {}),
        tasks: { main: newMain, extra: newExtra },
        tasksDone: { main: newMainDone, extra: newExtraDone } } };
      saveData(next);
      return next;
    });
    setSavePulse(true);
    setTimeout(() => setSavePulse(false), 1000);
  }, [activeDate, setData]);

  const updateMain = (i, val) => { const n = [...main]; n[i] = val; setMain(n); persist(n, extra, mainDone, extraDone); };
  const toggleMain = (i) => { const n = [...mainDone]; n[i] = !n[i]; setMainDone(n); persist(main, extra, n, extraDone); };
  const updateExtra = (i, val) => { const n = [...extra]; n[i] = val; setExtra(n); persist(main, n, mainDone, extraDone); };
  const toggleExtra = (i) => { const n = [...extraDone]; n[i] = !n[i]; setExtraDone(n); persist(main, extra, mainDone, n); };
  const addExtra = () => { const n = [...extra, ""]; const nd = [...extraDone, false]; setExtra(n); setExtraDone(nd); persist(main, n, mainDone, nd); };
  const removeExtra = (i) => { const n = extra.filter((_, j) => j !== i); const nd = extraDone.filter((_, j) => j !== i); setExtra(n); setExtraDone(nd); persist(main, n, mainDone, nd); };

  const doneCount = mainDone.filter(Boolean).length + extraDone.filter(Boolean).length;
  const totalCount = main.filter(t => t.trim()).length + extra.filter(t => t.trim()).length;

  return (
    <div style={{ background: "#0d0d0d", border: "1px solid #1d1d1d", borderRadius: 14, overflow: "hidden", marginBottom: 20 }}>
      <div style={{ padding: "14px 18px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em" }}>🎯 Today's Tasks</span>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {savePulse && <span style={{ fontSize: 10, color: "#2ECC71" }}>✓</span>}
          {totalCount > 0 && <span style={{ fontSize: 11, color: "#555", fontFamily: "monospace" }}>{doneCount}/{totalCount}</span>}
        </div>
      </div>
      <div style={{ borderTop: "1px solid #181818" }}>
        {main.map((task, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10,
            padding: "10px 16px", borderBottom: i < 2 ? "1px solid #141414" : "none" }}>
            <div onClick={() => task.trim() && toggleMain(i)}
              style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                border: `2px solid ${mainDone[i] ? "#F5A623" : "#2a2a2a"}`,
                background: mainDone[i] ? "#F5A623" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: task.trim() ? "pointer" : "default", transition: "all 0.15s",
                fontSize: 12, color: "#000", fontWeight: 700 }}>
              {mainDone[i] && "✓"}
            </div>
            <div style={{ width: 18, height: 18, borderRadius: 4, background: "#1a1a1a",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, color: "#444", fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <input value={task} onChange={e => updateMain(i, e.target.value)}
              placeholder={i === 0 ? "Most important thing today..." : i === 1 ? "Second priority..." : "Third priority..."}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none",
                color: mainDone[i] ? "#444" : "#ccc", fontSize: 14, fontFamily: "'Inter', -apple-system, sans-serif",
                textDecoration: mainDone[i] ? "line-through" : "none", caretColor: "#F5A623" }} />
          </div>
        ))}
      </div>
      {extra.length > 0 && (
        <div style={{ borderTop: "1px solid #181818" }}>
          {extra.map((task, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10,
              padding: "8px 16px", borderBottom: i < extra.length - 1 ? "1px solid #141414" : "none" }}>
              <div onClick={() => task.trim() && toggleExtra(i)}
                style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                  border: `1.5px solid ${extraDone[i] ? "#555" : "#252525"}`,
                  background: extraDone[i] ? "#333" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: task.trim() ? "pointer" : "default", transition: "all 0.15s",
                  fontSize: 10, color: "#888" }}>
                {extraDone[i] && "✓"}
              </div>
              <input value={task} onChange={e => updateExtra(i, e.target.value)}
                placeholder="Extra task..."
                style={{ flex: 1, background: "transparent", border: "none", outline: "none",
                  color: extraDone[i] ? "#333" : "#888", fontSize: 13,
                  fontFamily: "'Inter', -apple-system, sans-serif",
                  textDecoration: extraDone[i] ? "line-through" : "none", caretColor: "#555" }} />
              <div onClick={() => removeExtra(i)}
                style={{ fontSize: 14, color: "#2a2a2a", cursor: "pointer", padding: "0 2px", lineHeight: 1, userSelect: "none" }}>×</div>
            </div>
          ))}
        </div>
      )}
      <div style={{ borderTop: "1px solid #141414", padding: "10px 16px" }}>
        <button onClick={addExtra}
          style={{ background: "none", border: "none", color: "#333", fontSize: 12,
            cursor: "pointer", padding: 0, letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> add task
        </button>
      </div>
      <style>{`input::placeholder { color: #2a2a2a; }`}</style>
    </div>
  );
}

// ─── NOTES ───────────────────────────────────────────────────────────────────
function DailyNote({ activeDate, data, setData }) {
  const [note, setNote] = useState(data[activeDate]?.note || "");
  const [evening, setEvening] = useState(data[activeDate]?.evening || "");
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setNote(data[activeDate]?.note || "");
    setEvening(data[activeDate]?.evening || "");
  }, [activeDate]);

  const saveField = useCallback((field, val) => {
    setData(prev => {
      const next = { ...prev, [activeDate]: { ...(prev[activeDate] || {}), [field]: val } };
      saveData(next); return next;
    });
    setPulse(true); setTimeout(() => setPulse(false), 1000);
  }, [activeDate, setData]);

  const taStyle = { width: "100%", background: "transparent", border: "none", color: "#bbb",
    fontSize: 13, lineHeight: 1.6, padding: "4px 0 0", resize: "none", outline: "none",
    fontFamily: "'Inter', -apple-system, sans-serif", boxSizing: "border-box" };

  return (
    <div style={{ background: "#0d0d0d", border: "1px solid #1d1d1d", borderRadius: 14, overflow: "hidden", marginBottom: 20 }}>
      <div style={{ padding: "14px 18px 10px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em" }}>📝 Notes</span>
        {pulse && <span style={{ fontSize: 10, color: "#2ECC71" }}>✓</span>}
      </div>
      <div style={{ borderTop: "1px solid #181818", padding: "10px 18px 14px" }}>
        <textarea value={note} onChange={e => setNote(e.target.value)}
          onBlur={e => saveField("note", e.target.value)}
          placeholder="Thoughts, ideas, revelations, decisions..."
          rows={3} style={{ ...taStyle, caretColor: "#F5A623" }} />
      </div>
      <div style={{ borderTop: "1px solid #181818", padding: "10px 18px 14px" }}>
        <div style={{ fontSize: 10, color: "#9B59B677", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
          🌙 Evening Review
        </div>
        <textarea value={evening} onChange={e => setEvening(e.target.value)}
          onBlur={e => saveField("evening", e.target.value)}
          placeholder="Win, loss, or lesson from today."
          rows={3} style={{ ...taStyle, caretColor: "#9B59B6" }} />
      </div>
      <style>{`textarea::placeholder { color: #252525; font-style: italic; }`}</style>
    </div>
  );
}

// ─── WEIGHT TRACKER ──────────────────────────────────────────────────────────
function WeightTracker({ data, setData, activeDate }) {
  const [val, setVal] = useState(data[activeDate]?.weight || "");
  const [pulse, setPulse] = useState(false);
  useEffect(() => { setVal(data[activeDate]?.weight || ""); }, [activeDate]);

  const save = useCallback((v) => {
    if (!v) return;
    setData(prev => {
      const next = { ...prev, [activeDate]: { ...(prev[activeDate] || {}), weight: v } };
      saveData(next); return next;
    });
    setPulse(true); setTimeout(() => setPulse(false), 1200);
  }, [activeDate, setData]);

  const today = todayStr();
  const pts = allDates().filter(d => d <= today && data[d]?.weight)
    .map(d => ({ date: d, kg: parseFloat(data[d].weight) })).filter(p => !isNaN(p.kg));

  const START_KG = 75, TARGET_KG = 90;
  const cW = 300, cH = 90;
  const allKg = [START_KG, TARGET_KG, ...pts.map(p => p.kg)];
  const minKg = Math.min(...allKg) - 1, maxKg = Math.max(...allKg) + 1;
  const toX = d => (dayIndex(d) / TOTAL_DAYS) * cW;
  const toY = kg => cH - ((kg - minKg) / (maxKg - minKg)) * cH;
  const polyline = pts.length > 1 ? pts.map(p => `${toX(p.date)},${toY(p.kg)}`).join(" ") : null;
  const current = pts.length ? pts[pts.length - 1].kg : START_KG;
  const progress = Math.min(100, Math.max(0, ((current - START_KG) / (TARGET_KG - START_KG)) * 100));

  return (
    <div style={{ background: "#0d0d0d", border: "1px solid #1d1d1d", borderRadius: 14, padding: 18, marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em" }}>💪 Body Weight</span>
        <span style={{ fontSize: 12, color: "#E74C3C", fontFamily: "monospace" }}>{current}kg → 90kg</span>
      </div>
      <div style={{ overflowX: "auto", marginBottom: 14 }}>
        <svg width={cW} height={cH + 2} style={{ display: "block" }}>
          <line x1={0} y1={toY(TARGET_KG)} x2={cW} y2={toY(TARGET_KG)} stroke="#E74C3C" strokeWidth={1} strokeDasharray="4,3" opacity={0.35} />
          <line x1={0} y1={toY(START_KG)} x2={cW} y2={toY(START_KG)} stroke="#333" strokeWidth={1} strokeDasharray="2,3" opacity={0.4} />
          <text x={3} y={toY(TARGET_KG) - 3} fontSize={8} fill="#E74C3C" opacity={0.5}>90kg</text>
          <text x={3} y={toY(START_KG) - 3} fontSize={8} fill="#444">75kg</text>
          {polyline && <polyline points={polyline} fill="none" stroke="#E74C3C" strokeWidth={2} strokeLinejoin="round" />}
          {pts.map((p, i) => <circle key={i} cx={toX(p.date)} cy={toY(p.kg)} r={2.5} fill="#E74C3C" />)}
          <line x1={toX(today)} y1={0} x2={toX(today)} y2={cH} stroke="#F5A623" strokeWidth={1} opacity={0.3} />
        </svg>
      </div>
      <ProgressBar pct={progress} color="#E74C3C" height={6} label={`${current}kg`} sublabel={`${progress.toFixed(0)}% to goal`} />
      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <input type="number" step="0.1" value={val} onChange={e => setVal(e.target.value)}
          onBlur={e => save(e.target.value)}
          placeholder={`Log weight for ${activeDate === todayStr() ? "today" : activeDate} (kg)`}
          style={{ flex: 1, background: "#111", border: "1px solid #222", borderRadius: 8,
            color: "#ccc", fontSize: 13, padding: "8px 12px", outline: "none",
            fontFamily: "'Inter', -apple-system, sans-serif" }} />
        <button onClick={() => save(val)}
          style={{ background: "#E74C3C18", border: "1px solid #E74C3C33", color: "#E74C3C",
            borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
          {pulse ? "✓" : "Log"}
        </button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [activeDate, setActiveDate] = useState(todayStr());
  const [view, setView] = useState("today");
  const [saved, setSaved] = useState(false);
  const [countdown, setCountdown] = useState(getCountdown());

  useEffect(() => {
    loadData().then(d => { setData(d); setLoaded(true); });
  }, []);

  const today = todayStr();
  const stats = calcStats(data);
  const elapsed = daysElapsed();
  const overallPct = (stats.totalXP / MAX_6M_XP) * 100;
  const level = getLevel(stats.totalXP);
  const levelPct = getLevelProgress(stats.totalXP) * 100;
  const quote = getQuote(activeDate);

  useEffect(() => {
    const t = setInterval(() => setCountdown(getCountdown()), 60000);
    return () => clearInterval(t);
  }, []);

  const toggleHabit = useCallback((habitId) => {
    setData(prev => {
      const next = { ...prev, [activeDate]: { ...(prev[activeDate] || {}), [habitId]: !(prev[activeDate]?.[habitId]) } };
      saveData(next); return next;
    });
    setSaved(true); setTimeout(() => setSaved(false), 1200);
  }, [activeDate]);

  const dayData = data[activeDate] || {};
  const checkedCount = HABITS.filter(h => dayData[h.id]).length;
  const dayXP = HABITS.reduce((s, h) => s + (dayData[h.id] ? h.xp : 0), 0);
  const isToday = activeDate === today;
  const isFuture = activeDate > today;

  const dates = allDates();
  const weeks = []; let week = [];
  const firstDay = new Date(START_DATE).getDay();
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) week.push(null);
  for (const d of dates) { week.push(d); if (week.length === 7) { weeks.push(week); week = []; } }
  if (week.length) { while (week.length < 7) week.push(null); weeks.push(week); }
  const mLabels = []; let lastM = null;
  for (let wi = 0; wi < weeks.length; wi++) {
    const d = weeks[wi].find(x => x);
    if (d) { const m = monthLabel(d); if (m !== lastM) { mLabels.push({ wi, label: m }); lastM = m; } }
  }

  const TABS = ["today", "heatmap", "body", "stats"];
  const TAB_LABELS = { today: "Today", heatmap: "Heatmap", body: "Body", stats: "Stats" };

  if (!loaded) return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#333", fontSize: 13, letterSpacing: "0.15em" }}>LOADING...</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e8e8e8",
      fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif", padding: "0 0 80px" }}>

      <div style={{ padding: "18px 20px 0", background: "#0d0d0d", borderBottom: "1px solid #1a1a1a", marginBottom: 18 }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 9, color: "#333", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 3 }}>LOCKDOWN · 169 DAYS</div>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}>
                LVL <span style={{ color: "#F5A623" }}>{level}</span>
                <span style={{ fontSize: 13, color: "#444", fontWeight: 400, marginLeft: 10 }}>${stats.totalXP.toLocaleString()}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {[{ v: countdown.days, l: "D" }, { v: countdown.hours, l: "H" }, { v: countdown.minutes, l: "M" }].map(({ v, l }) => (
                <div key={l} style={{ background: "#111", border: "1px solid #1d1d1d", borderRadius: 8, padding: "5px 9px", textAlign: "center", minWidth: 38 }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: "#F5A623", fontFamily: "monospace", lineHeight: 1 }}>{String(v).padStart(2, "0")}</div>
                  <div style={{ fontSize: 8, color: "#333", letterSpacing: "0.1em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <ProgressBar pct={levelPct} color="#F5A623" height={4} />
          <div style={{ display: "flex", justifyContent: "space-between", margin: "3px 0 10px" }}>
            <span style={{ fontSize: 9, color: "#2a2a2a" }}>LVL {level}</span>
            <span style={{ fontSize: 9, color: "#2a2a2a" }}>Day {elapsed}/{TOTAL_DAYS} · {overallPct.toFixed(1)}%</span>
            <span style={{ fontSize: 9, color: "#2a2a2a" }}>LVL {level + 1}</span>
          </div>
          <div style={{ display: "flex" }}>
            {TABS.map(v => (
              <button key={v} onClick={() => setView(v)} style={{ flex: 1, padding: "9px 0", background: "none",
                border: "none", borderBottom: view === v ? "2px solid #F5A623" : "2px solid transparent",
                color: view === v ? "#F5A623" : "#333", fontSize: 11, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", transition: "all 0.15s" }}>
                {TAB_LABELS[v]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 18px" }}>

        {view === "today" && (
          <div>
            <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderLeft: "3px solid #F5A62366",
              borderRadius: 10, padding: "12px 16px", marginBottom: 18 }}>
              <div style={{ fontSize: 13, color: "#777", lineHeight: 1.55, fontStyle: "italic" }}>"{quote.text}"</div>
              <div style={{ fontSize: 10, color: "#383838", marginTop: 5, textTransform: "uppercase", letterSpacing: "0.08em" }}>— {quote.author}</div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <button onClick={() => { const d = new Date(activeDate); d.setDate(d.getDate() - 1); const s = d.toISOString().slice(0, 10); if (s >= START_DATE) setActiveDate(s); }}
                style={{ background: "#111", border: "1px solid #1d1d1d", color: "#555", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 15 }}>‹</button>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>
                  {isToday
                    ? `TODAY · ${new Date(activeDate + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" }).toUpperCase()}`
                    : new Date(activeDate + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }).toUpperCase()}
                </div>
                {!isToday && <button onClick={() => setActiveDate(today)} style={{ fontSize: 10, color: "#F5A623", background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: 2 }}>→ Back to today</button>}
              </div>
              <button onClick={() => { const d = new Date(activeDate); d.setDate(d.getDate() + 1); const s = d.toISOString().slice(0, 10); if (s <= END_DATE) setActiveDate(s); }}
                style={{ background: "#111", border: "1px solid #1d1d1d", color: "#555", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 15 }}>›</button>
            </div>

            {isFuture ? (
              <>
                <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderLeft: "3px solid #F5A62333",
                  borderRadius: 10, padding: "12px 16px", marginBottom: 18 }}>
                  <div style={{ fontSize: 12, color: "#444" }}>
                    Planning ahead for <span style={{ color: "#F5A623" }}>
                      {new Date(activeDate + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: "#2a2a2a", marginTop: 3 }}>Habits unlock when the day arrives. Tasks and notes save now.</div>
                </div>
                <DailyTasks activeDate={activeDate} data={data} setData={setData} />
                <DailyNote activeDate={activeDate} data={data} setData={setData} />
              </>
            ) : (
              <>
                <div style={{ background: "#0f0f0f", border: "1px solid #1d1d1d", borderRadius: 14,
                  padding: "16px 20px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 10, color: "#333", textTransform: "uppercase", letterSpacing: "0.1em" }}>Day $</div>
                    <div style={{ fontSize: 34, fontWeight: 900, color: checkedCount === 5 ? "#F5A623" : "#fff", fontFamily: "monospace", letterSpacing: "-0.03em" }}>${dayXP.toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: "#333" }}>of $10,000</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 44, lineHeight: 1 }}>{["⬜","🔥","💪","⚡","👊","👑"][checkedCount]}</div>
                    <div style={{ fontSize: 11, color: "#444", marginTop: 3 }}>{checkedCount}/5</div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                  {HABITS.map(habit => {
                    const checked = !!dayData[habit.id];
                    return (
                      <button key={habit.id} onClick={() => toggleHabit(habit.id)} style={{
                        display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
                        background: checked ? `${habit.color}0e` : "#0d0d0d",
                        border: `1px solid ${checked ? habit.color + "66" : "#1a1a1a"}`,
                        borderRadius: 12, cursor: "pointer", transition: "all 0.2s", width: "100%", textAlign: "left" }}>
                        <div style={{ width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                          border: `2px solid ${checked ? habit.color : "#2a2a2a"}`,
                          background: checked ? habit.color : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.2s", fontSize: 13, color: "#000", fontWeight: 700 }}>
                          {checked && "✓"}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <span style={{ fontSize: 16 }}>{habit.icon}</span>
                            <span style={{ fontSize: 14, fontWeight: 600, color: checked ? "#ddd" : "#666" }}>{habit.label}</span>
                          </div>
                          {habit.sublabel && <div style={{ fontSize: 10, color: checked ? habit.color + "99" : "#2a2a2a", marginTop: 1 }}>{habit.sublabel}</div>}
                          <div style={{ fontSize: 10, color: checked ? habit.color : "#333", marginTop: 1, fontFamily: "monospace" }}>+${habit.xp.toLocaleString()}</div>
                        </div>
                        {checked && <div style={{ fontSize: 9, color: habit.color, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>DONE</div>}
                      </button>
                    );
                  })}
                </div>

                {saved && <div style={{ textAlign: "center", color: "#2ECC71", fontSize: 11, marginBottom: 12 }}>✓ Saved</div>}

                <DailyTasks activeDate={activeDate} data={data} setData={setData} />
                <DailyNote activeDate={activeDate} data={data} setData={setData} />

                <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 14, padding: 18 }}>
                  <div style={{ fontSize: 10, color: "#333", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>6-Month Progress</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {HABITS.map(habit => {
                      const prog = habitProgress(habit.id, data);
                      return (
                        <div key={habit.id}>
                          <ProgressBar pct={prog.pct} color={habit.color} height={8}
                            label={`${habit.icon} ${habit.label}`} sublabel={`${prog.pct.toFixed(1)}%`} />
                          <div style={{ fontSize: 9, color: "#2a2a2a", marginTop: 2, fontFamily: "monospace" }}>
                            ${prog.earned.toLocaleString()} / ${prog.total6m.toLocaleString()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {view === "heatmap" && (
          <div>
            <div style={{ fontSize: 10, color: "#333", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>169-Day Map</div>
            <div style={{ overflowX: "auto", paddingBottom: 6 }}>
              <div style={{ minWidth: weeks.length * 16 + "px" }}>
                <div style={{ display: "flex", marginBottom: 4, height: 13 }}>
                  {weeks.map((_, wi) => { const lbl = mLabels.find(m => m.wi === wi); return <div key={wi} style={{ width: 16, flexShrink: 0, fontSize: 9, color: "#444" }}>{lbl ? lbl.label : ""}</div>; })}
                </div>
                {[0,1,2,3,4,5,6].map(dow => (
                  <div key={dow} style={{ display: "flex", gap: 2, marginBottom: 2, alignItems: "center" }}>
                    <div style={{ width: 18, fontSize: 9, color: "#2a2a2a", flexShrink: 0 }}>{["M","","W","","F","","S"][dow]}</div>
                    {weeks.map((wk, wi) => {
                      const d = wk[dow];
                      if (!d) return <div key={wi} style={{ width: 12, height: 12, flexShrink: 0 }} />;
                      return <HeatmapCell key={wi} date={d} data={data} today={today} onClick={date => { setActiveDate(date); setView("today"); }} />;
                    })}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 9, color: "#333" }}>0</span>
              {["#1f1f1f","#4a1a00","#7a2f00","#c45300","#e08000","#F5A623"].map((c, i) => <div key={i} style={{ width: 11, height: 11, borderRadius: 2, background: c }} />)}
              <span style={{ fontSize: 9, color: "#333" }}>5/5</span>
              <span style={{ fontSize: 9, color: "#2a2a2a", marginLeft: 6 }}>tap to edit</span>
            </div>
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 10, color: "#333", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>By Month</div>
              {["Jun","Jul","Aug","Sep","Oct","Nov"].map((mon, mi) => {
                const monthDates = dates.filter(d => new Date(d).getMonth() === (5 + mi) % 12 && d <= today);
                if (!monthDates.length) return null;
                let monXP = 0, monPerfect = 0;
                for (const d of monthDates) {
                  const day = data[d] || {};
                  monXP += HABITS.reduce((s, h) => s + (day[h.id] ? h.xp : 0), 0);
                  if (HABITS.every(h => day[h.id])) monPerfect++;
                }
                const monPct = (monXP / (monthDates.length * TOTAL_XP_PER_DAY)) * 100;
                return (
                  <div key={mon} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{mon} 2026</span>
                      <span style={{ fontSize: 11, color: "#F5A623", fontFamily: "monospace" }}>${monXP.toLocaleString()} · {monPerfect}🔥</span>
                    </div>
                    <ProgressBar pct={monPct} color="#F5A623" height={6} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === "body" && (
          <div>
            <div style={{ fontSize: 10, color: "#333", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>75kg → 90kg by Dec 1</div>
            <WeightTracker data={data} setData={setData} activeDate={activeDate} />
            {(() => {
              const pts = allDates().filter(d => d <= today && data[d]?.weight)
                .map(d => ({ date: d, kg: parseFloat(data[d].weight) }))
                .filter(p => !isNaN(p.kg)).reverse().slice(0, 14);
              if (!pts.length) return <div style={{ textAlign: "center", color: "#2a2a2a", padding: "30px 0", fontSize: 13 }}>No weight logged yet.</div>;
              return (
                <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 14, overflow: "hidden" }}>
                  <div style={{ padding: "14px 18px 10px", fontSize: 10, color: "#333", textTransform: "uppercase", letterSpacing: "0.1em" }}>Recent Logs</div>
                  {pts.map((p, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 18px", borderTop: "1px solid #141414" }}>
                      <span style={{ fontSize: 12, color: "#555" }}>{new Date(p.date + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}</span>
                      <span style={{ fontSize: 15, fontWeight: 700, color: "#E74C3C", fontFamily: "monospace" }}>{p.kg}kg</span>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        {view === "stats" && (
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
              <StatCard icon="⚡" value={"$" + stats.totalXP.toLocaleString()} label="Total $" color="#F5A623" />
              <StatCard icon="🔥" value={stats.currentStreak} label="Streak" color="#E74C3C" />
              <StatCard icon="👑" value={stats.perfectDays} label="Perfect" color="#9B59B6" />
              <StatCard icon="🏆" value={stats.longestStreak} label="Best Run" color="#2ECC71" />
            </div>

            {(() => {
              const ws = getWeeklySummary(data);
              if (!ws.days) return null;
              const pct = (ws.perfect / ws.days) * 100;
              return (
                <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 14, padding: 18, marginBottom: 16 }}>
                  <div style={{ fontSize: 10, color: "#333", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>This Week</div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 80, background: "#111", borderRadius: 10, padding: "10px 14px" }}>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#F5A623", fontFamily: "monospace" }}>{ws.perfect}/{ws.days}</div>
                      <div style={{ fontSize: 9, color: "#333", textTransform: "uppercase", letterSpacing: "0.08em" }}>Perfect Days</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 80, background: "#111", borderRadius: 10, padding: "10px 14px" }}>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#F5A623", fontFamily: "monospace" }}>${ws.totalEarned.toLocaleString()}</div>
                      <div style={{ fontSize: 9, color: "#333", textTransform: "uppercase", letterSpacing: "0.08em" }}>Week $</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 80, background: "#111", borderRadius: 10, padding: "10px 14px" }}>
                      <div style={{ fontSize: 20 }}>{ws.worst.icon}</div>
                      <div style={{ fontSize: 9, color: "#E74C3C", marginTop: 2 }}>Missed {ws.misses[ws.worst.id]}x</div>
                      <div style={{ fontSize: 9, color: "#333", textTransform: "uppercase", letterSpacing: "0.06em" }}>Fix This</div>
                    </div>
                  </div>
                  <ProgressBar pct={pct} color={pct >= 80 ? "#2ECC71" : pct >= 50 ? "#F5A623" : "#E74C3C"} height={5} label="Week" sublabel={`${pct.toFixed(0)}%`} />
                </div>
              );
            })()}

            <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 14, padding: 18, marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: "#333", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Consistency</div>
              <div style={{ fontSize: 38, fontWeight: 900, color: "#fff", fontFamily: "monospace", letterSpacing: "-0.03em" }}>
                {elapsed > 0 ? ((stats.perfectDays / elapsed) * 100).toFixed(0) : 0}<span style={{ fontSize: 18, color: "#444" }}>%</span>
              </div>
              <div style={{ fontSize: 11, color: "#333", marginBottom: 12 }}>perfect · {stats.perfectDays} of {elapsed} days</div>
              <ProgressBar pct={elapsed > 0 ? (stats.perfectDays / elapsed) * 100 : 0} color="#F5A623" height={7} />
            </div>

            <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 14, padding: 18, marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: "#333", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Per Habit</div>
              {HABITS.map(habit => {
                const prog = habitProgress(habit.id, data);
                const daysDone = elapsed > 0 ? prog.earned / habit.xp : 0;
                const rate = elapsed > 0 ? (daysDone / elapsed) * 100 : 0;
                return (
                  <div key={habit.id} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{habit.icon} {habit.label}</span>
                      <span style={{ fontSize: 11, color: habit.color, fontFamily: "monospace" }}>{Math.round(daysDone)}/{elapsed}d · {rate.toFixed(0)}%</span>
                    </div>
                    <ProgressBar pct={rate} color={habit.color} height={7} />
                  </div>
                );
              })}
            </div>

            <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 14, padding: 18, marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: "#333", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Projection</div>
              {elapsed > 0 ? (
                <>
                  <div style={{ fontSize: 26, fontWeight: 900, color: "#F5A623", fontFamily: "monospace", letterSpacing: "-0.02em" }}>
                    ${Math.round((stats.totalXP / elapsed) * TOTAL_DAYS).toLocaleString()}
                  </div>
                  <div style={{ fontSize: 11, color: "#333", marginBottom: 10 }}>at your current rate by Dec 1</div>
                  <div style={{ fontSize: 11, color: "#444" }}>Max possible: <span style={{ color: "#888" }}>${MAX_6M_XP.toLocaleString()}</span></div>
                  <div style={{ fontSize: 11, color: "#444", marginTop: 4 }}>Projected perfect days: <span style={{ color: "#888" }}>{Math.round((stats.perfectDays / elapsed) * TOTAL_DAYS)}</span></div>
                </>
              ) : <div style={{ color: "#2a2a2a", fontSize: 13 }}>Start checking habits to see projections.</div>}
            </div>

            <div style={{ background: "linear-gradient(135deg, #140d00 0%, #0c0900 100%)", border: "1px solid #2a1800", borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 10, color: "#F5A623", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12, opacity: 0.6 }}>Dec 1, 2026</div>
              {[
                { icon: "💰", text: "20K+ MRR. Recurring clients. Never stress about rent again." },
                { icon: "🥊", text: "90 KG. Boxing every day. Built like a threat." },
                { icon: "🚗", text: "Driver's license. 30K saved. Mercedes ready." },
                { icon: "👨‍👩‍👦", text: "Mom and grandma taken care of. For good." },
                { icon: "🔥", text: "169 days of proof. Zero excuses." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: i < 4 ? 10 : 0, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
