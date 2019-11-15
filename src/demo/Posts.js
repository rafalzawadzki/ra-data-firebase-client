import React from 'react';
import {
  List,
  Edit,
  Create,
  Datagrid,
  ReferenceField,
  TextField,
  EditButton,
  DisabledInput,
  LongTextInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
    Filter
} from 'react-admin';

import Pagination from '../lib/Pagination';

const PostListFilter = props => (
    <Filter {...props}>
      <TextInput label="test" source=" .price>"/>
    </Filter>
);

export const PostList = props => (
  <List {...props} pagination={<Pagination/>} filters={<PostListFilter/>}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField label="User" source="userId" reference="users" allowEmpty>
        <TextField source="name" />
      </ReferenceField>
      <TextField source="title" />
      <TextField source="body" />
      <EditButton />
    </Datagrid>
  </List>
);

export const PostEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <ReferenceInput label="User" source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="title" />
      <LongTextInput source="body" />
      <ImageInput source="image" label="Related Image" accept="image/*" multiple>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);

export const PostCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="title" />
      <LongTextInput source="body" />
    </SimpleForm>
  </Create>
);

/*
MACRO:
PIB
TX JUROS
CONSUMO
DEFICIT PUBLICO
CAMBIO
EMPREGO
INFLACAO

SETORIAL:

BALANCA DE PAGAMENTOS
PAUTA DE IN/OUT

CONTABILIDADE SA'S

EXTRATIVISTA
MINERAL
PAPEL-CELULOSE
*/
