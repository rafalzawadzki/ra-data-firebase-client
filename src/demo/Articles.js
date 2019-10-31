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

export const ArticleList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <EditButton />
    </Datagrid>
  </List>
);

export const ArticleEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="title" />
      <ImageInput source="image" label="Related Image" accept="image/*" multiple>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);

export const ArticleCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <ImageInput source="image" label="Related Image" accept="image/*" multiple>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);
