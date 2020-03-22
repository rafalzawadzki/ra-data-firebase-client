import React from 'react';
import { Admin, Resource } from 'react-admin';
import { RestProvider, AuthProvider, base64Uploader } from '../lib';

import { PostList, PostEdit, PostCreate } from './Posts';
import { UserList, UserEdit, UserCreate } from './Users';

const firebaseConfig = {
  apiKey: 'AIzaSyASpb1daoPZdpzY_-d1mkzgO-sxoBw6i9o',
  authDomain: 'react-admin-firestore-client.firebaseapp.com',
  databaseURL: 'https://react-admin-firestore-client.firebaseio.com',
  projectId: 'react-admin-firestore-client',
  storageBucket: '',
  messagingSenderId: '796768771332'
};

const trackedResources = [{ name: 'posts' }, { name: 'users' }];

const authConfig = {
  userProfilePath: '/users/',
  userAdminProp: 'isAdmin'
};

// to run this demo locally, please feel free to disable authProvider to bypass login page

const dataProvider = base64Uploader(RestProvider(firebaseConfig, { trackedResources }));
const App = () => (
  <Admin dataProvider={dataProvider} authProvider={AuthProvider(authConfig)}>
    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
    <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} />
  </Admin>
);
export default App;
