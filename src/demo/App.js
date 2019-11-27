import React from 'react';
import { Admin, Resource } from 'react-admin';
// import { RestProvider, AuthProvider, base64Uploader } from '../lib';
import { RestProvider, base64Uploader, createRealtimeSaga } from '../lib';

import { PostList, PostEdit, PostCreate } from './Posts';
import { UserList, UserEdit, UserCreate } from './Users';

let firebaseConfig = {
  apiKey: 'AIzaSyASpb1daoPZdpzY_-d1mkzgO-sxoBw6i9o',
  authDomain: 'react-admin-firestore-client.firebaseapp.com',
  databaseURL: 'https://react-admin-firestore-client.firebaseio.com',
  projectId: 'react-admin-firestore-client',
  storageBucket: '',
  messagingSenderId: '796768771332'
};

firebaseConfig = {
  apiKey: 'AIzaSyBPTNjD4I30GyYSpD4ixjY2ZQC7pGCyFEA',
  authDomain: 'mlbot-257017.firebaseapp.com',
  databaseURL: 'https://mlbot-257017.firebaseio.com',
  projectId: 'mlbot-257017',
  storageBucket: 'mlbot-257017.appspot.com',
  messagingSenderId: '995641416070',
  appId: '1:995641416070:web:aec2eea9eebd6b98b93407',
  measurementId: 'G-G324D9KTNP'
};

const trackedResources = [{ name: 'posts' }, { name: 'users' }];

// const authConfig = {
//   userProfilePath: '/users/',
//   userAdminProp: 'isAdmin'
// };

// to run this demo locally, please feel free to disable authProvider to bypass login page

const dataProvider = base64Uploader(RestProvider(firebaseConfig, { trackedResources }));
const realtimeSaga = createRealtimeSaga(dataProvider);

const App = () => (
  <Admin dataProvider={dataProvider} customSagas={[]}>
    <Resource name=".posts" list={PostList} edit={PostEdit} create={PostCreate} />
    <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} />
  </Admin>
);
export default App;
