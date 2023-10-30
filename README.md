# SIMPLE OPENPROJECT TO GOOGLE CHAT BY WEBHOOK

This simple project to convert data from OpenProject and push Message to Google Chat

Simple run by
```
npm install
DOMAIN=YOUR_DOMAIN LOGO=YOUR_CUSTOM LOGO npm run start 
```

# Docker
Just build Docker image 
```
docker build -t yourtag .
```

And run container


# Config webhook on OpenProject by following pattern

```
https://yourwebhook.com/?spaces=GOOGLE_CHAT_SPACE_UD&key=GOOGLE_CHAT_KEY&token=GOOGLE_CHAT_TOKEN
```