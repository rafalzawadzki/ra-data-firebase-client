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


For AuthProvider, don't forget to add the user UID to your Firestore DB under /users matching the following structure:

```bash
"users": {
    "UID": {
        "isAdmin": true
    }
}
```

The client also supports `base64` image uploading. 
