<h1 align="center">Xbox Live System</h1>
<p align="center">
    <img src="https://img.shields.io/npm/dm/xbox-live-system.svg">
    <img src="https://badge.fury.io/js/xbox-live-system.svg">
    <img src="https://snyk.io/test/github/AtomScript/xbox-live-system/badge.svg">
</p>

## Install
```bash
npm i xbox-live-system
```

## Getting started
First, have your account token, if you don't have a token, try it to get your token:
```javascript
const xls = require("xbox-live-system");

//This method is based on Async/await.
const token = await xls.Token("<your email>", "<your password>");
```
Note: The account cannot have 2-step verification. Preferably, use only an account that has only a password as security.

Attention: the token, email and password must be kept secret, do not share or display it to anyone.
The token is reset every 24 hours. Then you will need to obtain another token again after 24 hours.

## Logging in with your token
```javascript
const xl = new xls.Account(`XBL3.0 x=${token[1]};${token[0]}`;
```
this done, if there is no error, you can now manipulate data.


<h1 align="center">Manipulating data</h1>
<h2 align="center"> People </h2>

### Finding user by gamertag
```javascript
xl.people.find("<gamertag>").then(user =>{
  console.log(user);
});
```

### Getting user by xuid
```javascript
xl.people.get("<xuid>").then(user =>{
  console.log(user);
});
```

### Getting user profile
```javascript
xl.people.profile.get("<xuid>").then(user =>{
  console.log(user);
});
```

### Getting user setting
```javascript
xl.people.setting.get("<xuid>").then(user =>{
  console.log(user);
});
```

### Getting user summary
```javascript
xl.people.summary.get("<xuid>").then(user =>{
  console.log(user);
});
```

### Getting user achievement
```javascript
xl.people.achievement.get("<xuid>").then(user =>{
  console.log(user);
});
```

### Getting user setting
```javascript
xl.people.setting.get("<xuid>").then(user =>{
  console.log(user);
});
```

### Getting user activity
```javascript
xl.people.activity.get("<xuid>").then(user =>{
  console.log(user);
});
```

### Getting user screenshot
```javascript
xl.people.screenshot.get("<xuid>").then(user =>{
  console.log(user);
});
```

### Getting user games
```javascript
xl.people.games.get("<xuid>").then(user =>{
  console.log(user);
});
```


<h2 align="center"> Club </h2>

### Finding club by name
```javascript
xl.club.find("<club name>").then(console.log);
```

### Getting club by id
```javascript
xl.club.get("<club id>").then(console.log);
```

<h2 align="center"> Chat </h2>

### Getting inbox
```javascript
xl.chat.inbox.get().then(console.log);
```

### Getting chat auth
```javascript
xl.chat.auth.get("<xuid>").then(console.log);
```

### Getting message
```javascript
xl.chat.message.get("<xuid>").then(console.log);
```

### Sending message
```javascript
xl.chat.message.send("<message>").then(console.log);
```


<h2 align="center"> Me </h2>

### Getting account privacy settings
```javascript
xl.me.account.privacy.settings.get().then(console.log);
```

### Getting profile
```javascript
xl.me.profile.get().then(console.log);
```

### Getting friends
```javascript
xl.me.profile.friends.get().then(console.log);
```

### Getting followers
```javascript
xl.me.followers.get().then(console.log);
```

### Getting family
```javascript
xl.me.profile.family.get("<xuid>").then(console.log);
```

### Getting groups
```javascript
xl.me.groups.get().then(console.log);
```

### Getting reports
```javascript
xl.me.reports.get().then(console.log);
```

### Getting games titles id
```javascript
xl.me.games.titlesId.get().then(console.log);
```
