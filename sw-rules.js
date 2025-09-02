module.exports.config = {
  /** @type {?ServiceWorkerConfig|boolean} */
  serviceWorker: {
    escape: 1,
    cacheName: 'SolitudeCache',
    debug: false,
  },
  register: {
    onsuccess: undefined,
    onerror: () =>
      console.error(
        'Service Worker 注册失败！可能是由于您的浏览器不支持该功能！'
      ),
    builder: (root, framework, pluginConfig) => {
      const { onerror, onsuccess } = pluginConfig.register;
      return `
            <script>
                (() => {
                    const sw = navigator.serviceWorker;
                    const error = ${onerror && onerror.toString()};
                    if (!sw?.register('${new URL(root).pathname}sw.js')
                        ${onsuccess ? `?.then(${onsuccess.toString()})` : ""}
                        ?.catch(error)
                    ) error()
                })()
            </script>`;
    },
  },
  /** @type {?DomConfig|boolean} */
  dom: {
    /** @type {?VoidFunction} */
    onsuccess: () => {
      caches
        .match('https://id.v3/')
        .then((res) => {
          if (res)
            res.json().then((json) => {
              utils &&
                utils.snackbarShow(
                  `已刷新缓存，更新为${json.escape + '.' + json.global + '.' + json.local
                  }版本最新内容`,
                  false,
                  2500
                );
            });
          else console.info('未找到缓存');
        })
        .catch((error) => console.error('缓存匹配出错', error));
    },
  },
  /** @type {?VersionJsonConfig|boolean} */
  json: {
    /** @type {number} */
    maxHtml: 15,
    /** @type {number} */
    charLimit: 1024,
    /** @type {string[]} */
    merge: [],
    exclude: {
      /** @type {RegExp[]} */
      localhost: [],
      /** @type {RegExp[]} */
      other: [],
    },
  },
  /** @type {?ExternalMonitorConfig|boolean} */
  external: {
    /** @type {number} */
    timeout: 5000,
    /** 拉取文件时地并发限制 */
    concurrencyLimit: 100,
    /** @type {({head: string, tail: string}|function(string):string[])[]} */
    js: [],
    /** @type {RegExp[]} */
    stable: [
      /^https:\/\/npm\.elemecdn\.com\/[^/@]+\@[^/@]+\/[^/]+\/[^/]+$/,
      /^https:\/\/cdn\.cbd\.int\/[^/@]+\@[^/@]+\/[^/]+\/[^/]+$/,
      /^https:\/\/cdn\.jsdelivr\.net\/npm\/[^/@]+\@[^/@]+\/[^/]+\/[^/]+$/,
    ],
    replacer: (srcUrl) => {
      if (srcUrl.startsWith('https://cdn.jsdelivr.net/npm/')) {
        const pathname = new URL(srcUrl).pathname;
        return [
          srcUrl,
          `https://cdn.cbd.int/${pathname}`,
          `https://npm.elemecdn.com/${pathname}`,
          `https://fastly.jsdelivr.net/npm/${pathname}`,
        ];
      } else {
        return srcUrl;
      }
    },
  },
};

module.exports.cacheRules = {
  simple: {
    clean: true,
    search: false,
    match: (url, $eject) =>
      url.host === $eject.domain && ['/404.html'].includes(url.pathname),
  },
  cdn: {
    clean: true,
    match: (url) =>
      [
        'cdn.cbd.int',
        'lf26-cdn-tos.bytecdntp.com',
        'lf6-cdn-tos.bytecdntp.com',
        'lf3-cdn-tos.bytecdntp.com',
        'lf9-cdn-tos.bytecdntp.com',
        'cdn.staticfile.org',
        'npm.elemecdn.com',
      ].includes(url.host) &&
      url.pathname.match(/\.(js|css|woff2|woff|ttf|cur)$/),
  },
};

module.exports.getSpareUrls = (srcUrl) => {
  if (srcUrl.startsWith('https://npm.elemecdn.com')) {
    return {
      timeout: 3000,
      list: [
        srcUrl,
        `https://fastly.jsdelivr.net/${new URL(srcUrl).pathname}`,
      ],
    };
  }
};

module.exports.ejectValues = (hexo, rules) => {
  return {
    domain: {
      prefix: 'const',
      value: new URL(hexo.config.url).host,
    },
  };
};

module.exports.skipRequest = (request) => request.url.startsWith("https://i0.hdslb.com") ||
  request.url.startsWith('https://meting.qjqq.cn') ||
  request.url.startsWith('https://api.i-meto.com');
