# ra-data-firestore-client

<!-- [START badges] -->
[![NPM Version](https://img.shields.io/npm/v/ra-data-firestore-client.svg)](https://www.npmjs.com/package/ra-data-firestore-client) 
[![License](https://img.shields.io/npm/l/ra-data-firestore-client.svg)](https://github.com/rafalzawadzki/ra-data-firestore-client/blob/master/LICENSE) 
[![Downloads/week](https://img.shields.io/npm/dm/ra-data-firestore-client.svg)](https://www.npmjs.com/package/ra-data-firestore-client) 
[![Github Issues](https://img.shields.io/github/issues/rafalzawadzki/ra-data-firestore-client.svg)](https://github.com/rafalzawadzki/ra-data-firestore-client)
<!-- [END badges] -->

A Firestore Client for the awesome [react-admin](https://github.com/marmelab/react-admin) framework. 
This library is a modified version of [aymendhaya/ra-data-firebase-client](https://github.com/aymendhaya/ra-data-firebase-client)

Pull requests are welcome! 🤝

## Features
- [x] Supports all DataProvider request types (`GET_LIST`, `GET_MANY_REFERENCE` etc)
- [x] Sorting, filtering, pagination
- [x] AuthProvider with email/password authentication 
- [x] Login enabled to users with admin rights only ([how to set it up](#set-up-admin-account))
- [x] Attaching files (also images) in Base64 to Firestore documents (so react-admin ImageInput & FileInput work)

## Quick demo
Clone the repository & run 

```bash
npm install 
```

```bash
npm run init 
```

```bash
npm run demo 
```
## Use in your project

```bash
npm install ra-data-firestore-client
```
Check [example implementation](https://github.com/rafalzawadzki/ra-data-firestore-client/blob/master/src/demo/App.js).

### Set up admin account
Only the Firebase users with admin flag are able to authenticate on the Login screen.

To elevate users rights, add a boolean field `isAdmin = true` for a user in a Firestore collection `/users/`, like below:

```bash
"users": {
    "<USER_ID>": {
        "isAdmin": true
    }
}
```

The default collection & field name can be changed by adding `authConfig` object to `AuthProvider` constructor:

```javascript
const authConfig = {
  userProfilePath: '/users/',
  userAdminProp: 'isAdmin'
};
```

## Known limitations
- [ ] Filtering list by a text query works for _exact_ values only
- [ ] Realtime updates are not implemented yet ([a draft PR is in progress](https://github.com/rafalzawadzki/ra-data-firestore-client/pull/5))
- [ ] No support for Firebase Storage upload
- [ ] Sorting, filtering and pagination are done in memory after fetching all documents from collection ([a draft PR is in progress](https://github.com/rafalzawadzki/ra-data-firestore-client/pull/5))
