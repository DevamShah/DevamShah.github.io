/* CLOCK — Epoch timer + live clock */
(function () {
  'use strict';

  var yearsEl = document.getElementById('clockYears');
  var monthsEl = document.getElementById('clockMonths');
  var daysEl = document.getElementById('clockDays');
  var secsEl = document.getElementById('clockSecs');
  var epochEl = document.getElementById('epochNow');
  if (!yearsEl) return;

  function updateClock() {
    var start = new Date(2015, 6, 1);
    var now = new Date();
    var years = now.getFullYear() - start.getFullYear();
    var months = now.getMonth() - start.getMonth();
    var days = now.getDate() - start.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    var secsToday = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

    yearsEl.textContent = years;
    monthsEl.textContent = months;
    daysEl.textContent = days;
    secsEl.textContent = secsToday.toLocaleString();
    if (epochEl) epochEl.textContent = Math.floor(now.getTime() / 1000).toLocaleString();
  }

  updateClock();
  setInterval(updateClock, 1000);
})();
