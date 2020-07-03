# Wishlist Mobile

⚠️ Under construction ⚠️
Small social media centered on gifts you make to your family/friends:

- Each person maitain a wish list for any occasion (birthday, christmas, etc)
- People can consult, mark as 'shopped' and write comments on gifts
- All theses activities are not visible for the person wishing the gifts

This is a mobile app using React Native on the front-end and express for the back-end API. A web app using the same API + Vue.js might also come up later so stay tuned!

Todo list:

- [x] Install and setup react native
- [x] First connection between <th></th>e native app & the express API server
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
- [ ] Implement `shopped` and `comment section` features
      => suppression comment

- [ ] Move from REST to GraphQL + get started with Apollo client!
- [ ] Integrate typescript?
- [ ] Secure API (authentication, token, ...)
- [ ] Notifications on `Home`
