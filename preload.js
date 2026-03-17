// 这是一个简单的 Node.js 脚本示例，用于在云端打包前下载数据
const fs = require('fs');
const https = require('https');
const path = require('path');

// 假设你要预加载卡面图片和部分 JSON 数据
const resourcesToPreload = [
  { url: 'https://sekai-world.github.io/sekai-master-db-diff/cards.json', dest: 'public/data/cards.json' },
  // 添加你需要的图片或其他数据的 URL
];

resourcesToPreload.forEach(res => {
  const destPath = path.resolve(__dirname, res.dest);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  const file = fs.createWriteStream(destPath);
  https.get(res.url, response => {
    response.pipe(file);
    console.log(`Downloaded: ${res.dest}`);
  });
});
