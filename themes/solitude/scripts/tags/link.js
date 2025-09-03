'use strict';

const { parse } = require('psl');
// 定义不同域名对应的头像URL
const avatarMap = new Map([
  ['418121.xyz', '/images/avatar.webp'],
  ['github.com', 'https://images.418121.xyz/file/blog/page/git.webp']
]);

// 定义白名单域名
const whitelist = new Set([
  '418121.xyz',
  'yeminxi.github.io'
]);
// 获取URL的根域名
function getRootDomain(url) {
  try {
    const hostname = new URL(url).hostname;
    const parsed = parse(hostname);
    return parsed.domain || hostname;
  } catch {
    return url.split('/')[0]; // Fallback
  }
}

function link(args) {
  try {
    // 参数解析（支持转义逗号）
    const parsedArgs = args.join(' ')
      .split(/(?<!\\),/)
      .map(s => s.replace(/\\,/g, ',').trim());

    const [title = '', sitename = '', rawLink = ''] = parsedArgs;
    const link = rawLink.startsWith('http') ? rawLink : `https://${rawLink}`;

    // 域名处理
    const rootDomain = getRootDomain(link);
    const imgUrl = avatarMap.get(rootDomain) || 
                  `https://api.xinac.net/icon/?url=${encodeURIComponent(rootDomain)}`; //使用api获取网站的ico

    // 白名单校验
    const isSafe = whitelist.has(rootDomain) || rootDomain.endsWith('.418121.xyz');
    const tipMessage = isSafe 
      ? '🛡️ 来自本站地址，本站可确保其安全性，请放心点击跳转'
      : '⚠️ 引用站外地址，不保证站点的可用性和安全性，慎重点';

    return `
<div class="liushen-tag-link">
  <a class="tag-Link" target="_blank" rel="noopener" href="${link}">
    <div class="tag-link-tips">${tipMessage}</div>
    <div class="tag-link-bottom">
      <div class="tag-link-left" 
          style="background-image: url(${imgUrl})"
          onerror="this.style.backgroundImage='url(/images/default-avatar.webp)'"></div>
      <div class="tag-link-right">
        <div class="tag-link-title">${hexo.extend.helper.get('escape_html')(title)}</div>
        <div class="tag-link-sitename">${hexo.extend.helper.get('escape_html')(sitename)}</div>
      </div>
      <i class="fa-solid fa-angle-right"></i>
    </div>
  </a>
</div>`;
  } catch (error) {
    console.error('Link tag error:', error);
    return `<div class="liushen-error">链接卡片生成失败：${error.message}</div>`;
  }
}

hexo.extend.tag.register('link', link, { ends: false });