document.addEventListener('DOMContentLoaded', function() {
    function loadUmamiStats() {
        // 请替换为你的实际值
        const umamiToken = "ji3nS1vN3nOCmz42bXxK5mIk3pzNegxB7GjDedyVz4KPOoe9ZHXEN9wm++HxYIRWmh8VJUa7Cj0VnLXnOMDigfHVW0n3YqayBBji2Mfm9jibD8Yqxf1a4GOP5liHDhOXHBziUJpLo1XNrYoctWhRxuMdohf+U60KIH4s4UC0tHZV8lk6+6Q7n5TntVEamHY4oNXjRQmlNftZIa/a6RlGq+XVihSv+YE27nhBjqXmHxjUqbBgAW0hCVT5RudrDhumF5GRUx58dCqrcELnstvF/CAwgOQ5OcqZpL8eX2TTAVGbK3J0PddEAvP3SUzeqf69Tq+F1RpdNsi8xJWXJxcwDJN4pmgSgbPoStInFe7zmRcEUWg5GFGbs7mxt5Tq";
        const websiteId = "a88d93ae-6c6e-46cf-a6cd-5a6a01b0caae";
        const umamiBaseUrl = "https://www.umami.monstecho.top";

        const nowMs = Date.now();
        const todayStartMs = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
        const monthStartMs = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();

        const endpoints = {
            today: `${umamiBaseUrl}/api/websites/${websiteId}/stats?startAt=${todayStartMs}&endAt=${nowMs}`,
            month: `${umamiBaseUrl}/api/websites/${websiteId}/stats?startAt=${monthStartMs}&endAt=${nowMs}`,
            total: `${umamiBaseUrl}/api/websites/${websiteId}/stats?startAt=0&endAt=${nowMs}`,
            yesterday: `${umamiBaseUrl}/api/websites/${websiteId}/stats?startAt=${todayStartMs - 86400000}&endAt=${todayStartMs - 1}`
        };

        const headers = {
            'Authorization': `Bearer ${umamiToken}`,
            'Content-Type': 'application/json'
        };

        Promise.all([
            fetch(endpoints.today, { headers }).then(r => r.json()).catch(() => ({})),
            fetch(endpoints.month, { headers }).then(r => r.json()).catch(() => ({})),
            fetch(endpoints.total, { headers }).then(r => r.json()).catch(() => ({})),
            fetch(endpoints.yesterday, { headers }).then(r => r.json()).catch(() => ({}))
        ]).then(([todayData, monthData, totalData, yesterdayData]) => {
            // prefer pageviews for PV, visitors for UV, fallback to visits if needed
            const todayPv = todayData.pageviews?.value ?? todayData.visits?.value ?? 0;
            const todayUv = todayData.visitors?.value ?? todayData.visits?.value ?? 0;
            const monthPv = monthData.pageviews?.value ?? monthData.visits?.value ?? 0;
            const totalPv = totalData.pageviews?.value ?? totalData.visits?.value ?? 0;
            const yesterdayPv = yesterdayData.pageviews?.value ?? yesterdayData.visits?.value ?? 0;
            const yesterdayUv = yesterdayData.visitors?.value ?? yesterdayData.visits?.value ?? 0;

            // 填充常见 ID（兼容 tutorial 提供的 ID）
            const setIfExist = (id, val) => {
                const el = document.getElementById(id) || document.querySelector(`#${id}`);
                if (el) el.innerText = val;
            };

            setIfExist('todayPv', todayPv);
            setIfExist('todayUv', todayUv);
            setIfExist('monthPv', monthPv);
            setIfExist('totalPv', totalPv);

            // 也兼容原来脚本使用的 id/key（如果你页面使用这些 id）
            setIfExist('today_pv', todayPv);
            setIfExist('today_uv', todayUv);
            setIfExist('last_month_pv', monthPv);
            setIfExist('last_year_pv', totalPv); // 若需年数据，请替换为实际年端点
            setIfExist('yesterday_pv', yesterdayPv);
            setIfExist('yesterday_uv', yesterdayUv);

            // 如果页面没有预定义结构但存在 container#statistic，生成一行摘要
            const container = document.getElementById('statistic');
            if (container && container.innerHTML.trim() === '') {
                container.innerHTML = `<div>今日人数 <span id="todayUv">${todayUv}</span> | 今日访问量 <span id="todayPv">${todayPv}</span> | 本月访问量 <span id="monthPv">${monthPv}</span> | 总访问量 <span id="totalPv">${totalPv}</span></div>`;
            }
        }).catch(err => {
            console.error('umami stats load failed', err);
        });
    }

    loadUmamiStats();
    document.addEventListener('pjax:complete', loadUmamiStats);
});
