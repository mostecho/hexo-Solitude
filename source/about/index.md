---
title: 关于页
date: 2025-07-13 22:48:25
comment: false
type: about
---

<div class="tongji">
今日访问人数 <span id="todayUv">0</span> | 今日访问量 <span id="todayPv">0</span> | 本月访问量 <span id="monthPv">0</span> | 总访问量 <span id="totalPv">0</span>
</div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    umiTongji();
  });

  function umiTongji() {
    var umiToken = "ji3nS1vN3nOCmz42bXxK5mIk3pzNegxB7GjDedyVz4KPOoe9ZHXEN9wm++HxYIRWmh8VJUa7Cj0VnLXnOMDigfHVW0n3YqayBBji2Mfm9jibD8Yqxf1a4GOP5liHDhOXHBziUJpLo1XNrYoctWhRxuMdohf+U60KIH4s4UC0tHZV8lk6+6Q7n5TntVEamHY4oNXjRQmlNftZIa/a6RlGq+XVihSv+YE27nhBjqXmHxjUqbBgAW0hCVT5RudrDhumF5GRUx58dCqrcELnstvF/CAwgOQ5OcqZpL8eX2TTAVGbK3J0PddEAvP3SUzeqf69Tq+F1RpdNsi8xJWXJxcwDJN4pmgSgbPoStInFe7zmRcEUWg5GFGbs7mxt5Tq"; //获取到的 token
    var umiId = "a88d93ae-6c6e-46cf-a6cd-5a6a01b0caae"; //获取到的 websiteId
    var umiTime = Date.parse(new Date());
    var todayStart = new Date().setHours(0, 0, 0, 0);
    var monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
    var umiUrl = "https://www.umami.monstecho.top/api/websites/" + umiId + "/stats?startAt=" + todayStart + "&endAt=" + umiTime;

    fetch(umiUrl, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers: {
          'Authorization': 'Bearer ' + umiToken,
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(resdata => {
        document.querySelector('#todayPv').innerHTML = resdata.pageviews.value;
        document.querySelector('#todayUv').innerHTML = resdata.visitors.value;
      });

    umiUrl = "https://www.umami.monstecho.top/api/websites/" + umiId + "/stats?startAt=" + monthStart + "&endAt=" + umiTime;

    fetch(umiUrl, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers: {
          'Authorization': 'Bearer ' + umiToken,
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(resdata => {
        document.querySelector('#monthPv').innerHTML = resdata.pageviews.value;
      });

    umiUrl = "https://www.umami.monstecho.top/api/websites/" + umiId + "/stats?startAt=0&endAt=" + umiTime;

    fetch(umiUrl, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers: {
          'Authorization': 'Bearer ' + umiToken,
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(resdata => {
        document.querySelector('#totalPv').innerHTML = resdata.pageviews.value;
      });
  }
</script>
<style>
  #todayUv, #todayPv, #monthPv, #totalPv {
    color: #00a0ff;
  }
</style>