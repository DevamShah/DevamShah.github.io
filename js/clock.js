/* ============================================
   CLOCK — Epoch timer + live clock
   ============================================ */

function updateClock() {
  const start = new Date(2015, 6, 1); // July 2015
  const now = new Date();
  const diff = now - start;
  const totalSec = Math.floor(diff / 1000);

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
  if (months < 0) { years--; months += 12; }

  const secsToday = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

  document.getElementById('clockYears').textContent = years;
  document.getElementById('clockMonths').textContent = months;
  document.getElementById('clockDays').textContent = days;
  document.getElementById('clockSecs').textContent = secsToday.toLocaleString();

  // Epoch — live now
  const nowEpoch = Math.floor(now.getTime() / 1000);
  document.getElementById('epochNow').textContent = nowEpoch.toLocaleString();
}

updateClock();
setInterval(updateClock, 1000);
