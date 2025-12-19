document.addEventListener('DOMContentLoaded', function() {
    function loadUmamiStats() {
        // ！！！请务必修改以下变量为你的实际值 ！！！
        const umamiToken = "ji3nS1vN3nOCmz42bXxK5mIk3pzNegxB7GjDedyVz4KPOoe9ZHXEN9wm++HxYIRWmh8VJUa7Cj0VnLXnOMDigfHVW0n3YqayBBji2Mfm9jibD8Yqxf1a4GOP5liHDhOXHBziUJpLo1XNrYoctWhRxuMdohf+U60KIH4s4UC0tHZV8lk6+6Q7n5TntVEamHY4oNXjRQmlNftZIa/a6RlGq+XVihSv+YE27nhBjqXmHxjUqbBgAW0hCVT5RudrDhumF5GRUx58dCqrcELnstvF/CAwgOQ5OcqZpL8eX2TTAVGbK3J0PddEAvP3SUzeqf69Tq+F1RpdNsi8xJWXJxcwDJN4pmgSgbPoStInFe7zmRcEUWg5GFGbs7mxt5Tq";
        const websiteId = "a88d93ae-6c6e-46cf-a6cd-5a6a01b0caae";
        const umamiBaseUrl = "https://www.umami.monstecho.top"; // 你的 Umami 实例地址

        // 获取当前时间和各个时间段的起始时间戳（毫秒）
        const now = new Date();
        const nowMs = now.getTime();

        // 今日开始时间 (UTC+8 午夜)
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const todayStartMs = todayStart.getTime();

        // 昨日开始和结束时间
        const yesterdayStart = new Date(todayStart);
        yesterdayStart.setDate(yesterdayStart.getDate() - 1);
        const yesterdayStartMs = yesterdayStart.getTime();
        const yesterdayEndMs = todayStartMs - 1;

        // 本月开始时间
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthStartMs = monthStart.getTime();

        // 今年开始时间
        const yearStart = new Date(now.getFullYear(), 0, 1);
        const yearStartMs = yearStart.getTime();

        // 定义需要获取的数据端点
        const endpoints = {
            today: `${umamiBaseUrl}/api/websites/${websiteId}/stats?startAt=${todayStartMs}&endAt=${nowMs}`,
            yesterday: `${umamiBaseUrl}/api/websites/${websiteId}/stats?startAt=${yesterdayStartMs}&endAt=${yesterdayEndMs}`,
            month: `${umamiBaseUrl}/api/websites/${websiteId}/stats?startAt=${monthStartMs}&endAt=${nowMs}`,
            year: `${umamiBaseUrl}/api/websites/${websiteId}/stats?startAt=${yearStartMs}&endAt=${nowMs}`,
        };

        // 配置请求头
        const headers = {
            'Authorization': `Bearer ${umamiToken}`,
            'Content-Type': 'application/json'
        };

        // 并发获取所有数据
        Promise.all([
            fetch(endpoints.today, { headers }).then(res => res.json()),
            fetch(endpoints.yesterday, { headers }).then(res => res.json()),
            fetch(endpoints.month, { headers }).then(res => res.json()),
            fetch(endpoints.year, { headers }).then(res => res.json())
        ])
        .then(([todayData, yesterdayData, monthData, yearData]) => {
            // 数据处理
            const stats = {
                'today_uv': todayData.visitors?.value || 0,
                'today_pv': todayData.visits?.value || 0,
                'yesterday_uv': yesterdayData.visits?.value || 0,
                'yesterday_pv': yesterdayData.visits?.value || 0,
                'last_month_pv': monthData.visits?.value || 0,
                'last_year_pv': yearData.visits?.value || 0,
                // 'today_truepv': todayData.pageviews?.value || 0,
                // 'yesterday_truepv': yesterdayData.pageviews?.value || 0,
                // 'last_month_truepv': monthData.pageviews?.value || 0,
            };

            // 获取显示统计数据的容器
            let container = document.getElementById("statistic");
            if (!container) return;

            // 定义标题映射
            const titles = {
                "today_uv": "今日人数",
                "today_pv": "今日访问",
                "yesterday_uv": "昨日人数",
                "yesterday_pv": "昨日访问",
                "last_month_pv": "最近一个月访问",
                "last_year_pv": "最近一年访问",
                // "today_truepv": "今日浏览",
                // "yesterday_truepv": "昨日浏览",
                // "last_month_truepv": "最近一个月浏览",
            };

            // 清空容器（防止重复加载时重复添加）
            container.innerHTML = '';

            // 遍历数据并插入到页面中
            for (let key in stats) {
                if (stats.hasOwnProperty(key) && titles[key]) {
                    container.innerHTML += `<div><span>${titles[key]}</span><span id="${key}">${stats[key]}</span></div>`;
                }
            }
        })
        .catch(error => {
            console.error('获取统计数据失败:', error);
            // 可以选择显示一个错误信息
            // document.getElementById("statistic").innerHTML = "<div>统计数据加载失败</div>";
        });
    }

    // 首次加载
    loadUmamiStats();

    // 兼容 Hexo PJAX：监听 pjax:complete 事件
    document.addEventListener('pjax:complete', function() {
        loadUmamiStats();
    });
});