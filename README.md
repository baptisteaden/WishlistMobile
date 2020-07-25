# Wishlist Mobile

⚠️ Under construction ⚠️
Small social media centered on gifts you make to your family/friends:

- Each person maitain a wish list for any occasion (birthday, christmas, etc)
- People can consult, mark as 'shopped' and write comments on gifts
- All theses activities are not visible for the person wishing the gifts

Tools: React Native, Node.js, express, Typescript, sqlite, Heroku, Git

Get started todo list:

- [x] Install and setup react native
- [x] First connection between the native app & the express API server
- [x] Setup & first connection to an sqlite db
- [x] Move code in `SignIn.js`
- [x] Code `Home.js` skeleton = topbar with icons: home, my wishlist, friends
- [x] Make frkin BottomNavigation work...........................
- [x] Make frkin React Navigation work...........................
- [x] Form to add a gift to MyWishlist
- [x] Code `MyWishlist.js`: working add button + listing
- [x] setListData on goBack to actually see the new wish
- [x] Temporar deletion onLongPress
- [x] More details on the wishlist listing
- [x] Be able to update a gift onPress
- [x] See how people do and try to have a decent server architecture
- [x] Contexts for username / theme
- [x] Generic List component + some front-end refactoring
- [x] And then... Moving to `Friends` I guess? :)
- [x] Implement `shopped` and `comment section` features

First real life test todo list:

- [x] Authentication (jwt sign/check + authorization header on client)
- [x] `server-deploy` branch? => No, Heroku custom repo for server
- [x] Deploy on netlify => No SQLite integration, so bye serverless, hi PaaS
- [x] .env file on netlify => Heroku but yeah
- [x] Fill db with nice test data (PyTwi account basically)
- [x] Receive requests from outside not just localhost => No CORS problems!🤯
- [x] Generate apk to install for others => it's in `android/app/build/outputs/apk/release`
- [x] Test with PyTwi => Everything's fine 🙂

Future todos:

- [x] Real data in db + empty it on github
- [x] AsyncStorage to stay connected + temp logout button
- [ ] Integrate typescript?
      => finish client side
      => try server side...
      => Heroku integration?
- [ ] Fix REST urls (or just move on to GraphQL?)
- [ ] Move from REST to GraphQL + get started with Apollo client!
- [ ] Secure API (authentication, token, ...)
- [ ] Notifications on `Home`
