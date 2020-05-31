
![](public/iss-sm.png)
# Track ISS

Web page to track position of International Space Station. Position is auto updated and displayed in standard
longitude and latitude coordinations, they are also converted to Google Plus code format. Additionally, a nearest city and country are displayed.

Check current position of ISS here: **[jan25/track-iss](https://jan25.github.io/track-iss)**.

I wrote this app being fascinated while watching live crew demo-2 launch in June'20.

## Develop and deploy
```
// Run at localhost:3000
npm run start

// Build and deploy to gh pages
npm run predeploy
npm run deploy
```

> Note: Because of 3rd party CORS proxy, remote requests are rate limited which may cause 'Not Available' responses.

---
**Credits to**

http://open-notify.org/

https://github.com/google/open-location-code

https://simplemaps.com/data/world-cities

<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
