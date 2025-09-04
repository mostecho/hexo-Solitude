const YML = require('yamljs')
const fs = require('fs')

const blacklist = ["Hexo", "张洪Heo", "Solitude"]; // 由于某种原因，不想订阅的列表

let friends = [],
    data_f = YML.parse(fs.readFileSync('source/_data/links.yml').toString().replace(/(?<=rss:)\s*\n/g, ' ""\n'));

data_f.links.forEach((entry, index) => {
    let lastIndex = 2;
    if (index < lastIndex) {
        const filteredLinkList = entry.link_list.filter(linkItem => !blacklist.includes(linkItem.name));
        friends = friends.concat(filteredLinkList);
    }
});

// 根据规定的格式构建 JSON 数据
const friendData = {
    friends: friends.map(item => {
        return [item.name, item.link, item.avatar];
    })
};

// 将 JSON 对象转换为字符串
const friendJSON = JSON.stringify(friendData, null, 2);

// 写入 friend.json 文件
fs.writeFileSync('./source/friend.json', friendJSON);

console.log('friend.json 文件已生成。');
