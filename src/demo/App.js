import React from 'react';
import { Admin, Resource } from 'react-admin';
import {
  RestProvider,
  AuthProvider,
  // base64Uploader,
  storageUploader
} from '../lib';

import { ArticleList, ArticleEdit, ArticleCreate } from './Articles';

const firebaseConfig = {
  apiKey: 'AIzaSyAF0MOEZ6GppP620lBcJNJt5yJL8YuaPBE',
  authDomain: 'react-admin-firebase-ed1c2.firebaseapp.com',
  databaseURL: 'https://react-admin-firebase-ed1c2.firebaseio.com',
  projectId: 'react-admin-firebase-ed1c2',
  storageBucket: 'react-admin-firebase-ed1c2.appspot.com',
  messagingSenderId: '1025840448802',
  appId: '1:1025840448802:web:d210968b17200f77ce117b',
  measurementId: 'G-LEHM5781PT',
  storagePath: 'image'
};

const trackedResources = [{ name: 'articles', isPublic: true }, { name: 'users', isPublic: true }];

const authConfig = {
  userProfilePath: '/users/',
  userAdminProp: 'isAdmin'
};

// to run this demo locally, please feel free to disable authProvider to bypass login page

const dataProvider = storageUploader(RestProvider(firebaseConfig, { trackedResources }));
const App = () => (
  <Admin dataProvider={dataProvider} authProvider={AuthProvider(authConfig)}>
    <Resource name="articles" list={ArticleList} edit={ArticleEdit} create={ArticleCreate} />
  </Admin>
);

export default App;
