# Line 聊天機器人簡單範例
可參考 [Line 官方文件](https://developers.line.me/bot-api/getting-started-with-bot-api-trial)

## 申請開發帳號 
Line developer account 去 [Line Business Center](https://business.line.me)

## 使用

```
git clone https://github.com/hsin421/line-bot.git
```

把 `config.js` 裡面的三個 key 換成自己的

再來先裝必要的套件

```
npm install
```


裝好之後，就

```
npm start
```

可以啟動伺服器，但local server 沒什麼用要 deploy 然後建立webhook才行。建議使用 [Heroku](https://heroku.com)。


內建的webhook位置是 `https://YOUR-WEBHOOK-URL/callback` 記得LINE需要webhook使用`https`


請參考以下教學，但教學裡使用LINE API舊版，新版文件以上面官方資料為主

## 教學
[[教學] Line API](http://huli.logdown.com/posts/726082-line-bot-api-tutorial)

