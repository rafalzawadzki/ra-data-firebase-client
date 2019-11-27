import React from 'react';
import {
  List,
  Edit,
  Create,
  Datagrid,
  TextField,
  EditButton,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField
} from 'react-admin';

import Pagination from '../lib/Pagination';

export const UserList = props => (
  <List title="All users" {...props} pagination={<Pagination />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <TextField source="email" />
      <EditButton />
    </Datagrid>
  </List>
);

export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
      <ImageInput source="avatar" label="User avatar" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <ImageInput source="images" label="Other images" accept="image/*" multiple>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export const UserEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
      <ImageInput source="avatar" label="User avatar" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <ImageInput source="images" label="Other images" accept="image/*" multiple>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
