import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { CREATE, changeListParams } from 'react-admin';
import flatten from 'flat';

const snapshotFlag = Symbol('snapshot');

const convertFileToBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const addUploadFeature = requestHandler => (type, resource, params) => {
  if (type === 'UPDATE') {
    if (params.data.image && params.data.image.length) {
      const formerPictures = params.data.image.filter(p => !(p.rawFile instanceof File));
      const newPictures = params.data.image.filter(p => p.rawFile instanceof File);

      return Promise.all(newPictures.map(convertFileToBase64))
        .then(base64Pictures =>
          base64Pictures.map(picture64 => ({
            src: picture64,
            title: `${params.data.title}`
          }))
        )
        .then(transformedNewPictures =>
          requestHandler(type, resource, {
            ...params,
            data: {
              ...params.data,
              image: [...transformedNewPictures, ...formerPictures]
            }
          })
        );
    }
  }
  // for other request types and reources, fall back to the defautl request handler
  return requestHandler(type, resource, params);
};

const getImageSize = file => {
  return new Promise(resolve => {
    const img = document.createElement('img');
    img.onload = function() {
      resolve({
        width: this.width,
        height: this.height
      });
    };
    img.src = file.src;
  });
};

const upload = async (fieldName, submitedData, id, resourceName, resourcePath) => {
  let file = submitedData[fieldName];
  file = Array.isArray(file) ? file[0] : file;
  const rawFile = file.rawFile;

  const result = {};
  if (file && rawFile && rawFile.name) {
    const ref = firebase
      .storage()
      .ref()
      .child(`${resourcePath}/${id}/${fieldName}`);
    const snapshot = await ref.put(rawFile);
    const downloadURL = await snapshot.ref.getDownloadURL();
    result[fieldName] = [{}];
    result[fieldName][0].uploadedAt = new Date();
    result[fieldName][0].src = downloadURL;
    result[fieldName][0].type = rawFile.type;
    if (rawFile.type.indexOf('image/') === 0) {
      try {
        const imageSize = await getImageSize(file);
        result[fieldName][0].width = imageSize.width;
        result[fieldName][0].height = imageSize.height;
      } catch (e) {
        console.error(`Failed to get image dimensions`);
      }
    }
    return result;
  }
  return false;
};

const save = async (
  id,
  data,
  previous,
  resourceName,
  resourcePath,
  firebaseSaveFilter,
  uploadResults,
  isNew,
  timestampFieldNames
) => {
  if (uploadResults) {
    uploadResults.map(uploadResult => (uploadResult ? Object.assign(data, uploadResult) : false));
  }

  if (isNew) {
    Object.assign(data, { [timestampFieldNames.createdAt]: new Date() });
  }

  data = Object.assign(previous, { [timestampFieldNames.updatedAt]: new Date() }, data);

  if (!data.id) {
    data.id = id;
  }

  await firebase
    .firestore()
    .doc(`${resourcePath}/${data.id}`)
    .set(firebaseSaveFilter(data));
  return { data };
};

const del = async (id, resourceName, resourcePath, uploadFields) => {
  if (uploadFields.length) {
    uploadFields.map(fieldName =>
      firebase
        .storage()
        .ref()
        .child(`${resourcePath}/${id}/${fieldName}`)
        .delete()
    );
  }

  await firebase
    .firestore()
    .doc(`${resourcePath}/${id}`)
    .delete();
  return { data: id };
};

const delMany = async (ids, resourceName, previousData) => {
  await ids.map(id =>
    firebase
      .firestore()
      .doc(`${resourceName}/${id}`)
      .delete()
  );
  return { data: ids };
};

const getItemID = (params, type, resourceName, resourcePath, resourceData) => {
  let itemId = params.data.id || params.id || params.data.key || params.key;
  if (!itemId) {
    itemId = firebase
      .firestore()
      .collection(resourcePath)
      .doc().id;
  }

  if (!itemId) {
    throw new Error('ID is required');
  }

  if (resourceData && resourceData[itemId] && type === CREATE) {
    throw new Error('ID already in use');
  }

  return itemId;
};

const getOne = async (params, resourceName, resourceData) => {
  if (params.id) {
    const query = firebase
      .firestore()
      .collection(resourceName)
      .doc(params.id);

    if (params[snapshotFlag]) return query;

    const result = await query.get();

    if (result.exists) {
      const data = result.data();

      if (data && data.id == null) {
        data['id'] = result.id;
      }
      return { data: data };
    } else {
      throw new Error('Id not found');
    }
  } else {
    throw new Error('Id not found');
  }
};

/**
 * params example:
 * pagination: { page: 1, perPage: 5 },
 * sort: { field: 'title', order: 'ASC' },
 * filter: { author_id: 12 }
 */

const listCache = {};

const getList = async (params, resourceName, resourceData) => {
  if (params.pagination) {
    let values = [];

    console.log(listCache);
    let query = firebase.firestore();

    if (resourceName.startsWith('.')) {
      query = query.collectionGroup(resourceName.substring(1))
    } else {
      query = query.collection(resourceName)
    }

    query = query.limit(params.pagination.perPage + 1);//+1 to know if there is next page

    console.log(params.filter);
    params.filter = flatten(params.filter);
    console.log(params.filter);

    Object.keys(params.filter).forEach(rawField => {

      let op = '==';
      let field = rawField;
      console.log(op);
      console.log(field);

      if (rawField.startsWith(' .')) {
        if (rawField.endsWith('<')) {
          op = "<";
          field = rawField.slice(2, -'<'.length);
          query = query.orderBy(field)
        } else if (rawField.endsWith('<=')) {
          op = "<=";
          field = rawField.slice(2, -'<='.length);
          query = query.orderBy(field)
        } else if (rawField.endsWith('==')) {
          op = "==";
          field = rawField.slice(2, -'=='.length);
        } else if (rawField.endsWith('>')) {
          op = ">";
          field = rawField.slice(2, -'>'.length);
          query = query.orderBy(field)
        } else if (rawField.endsWith('>=')) {
          op = ">=";
          field = rawField.slice(2, -'>='.length);
          query = query.orderBy(field)
        } else if (rawField.endsWith(':array-contains')) {
          op = "array-contains";
          field = rawField.slice(2, -':array-contains'.length);
        }
      }

      console.log(op);
      console.log(field);

      query = query.where(field, op, params.filter[rawField]);
    });

    // if (params.sort) query = query.orderBy(params.sort.field, params.sort.order.toLowerCase());

    if (params.pagination.page > 1) {

      const startAt = listCache[resourceName];

      if (startAt) {
        query = query.startAt(startAt);
      } else {

        params.pagination.page = 1;

        changeListParams(resourceName, params);//how to dispatch this?
        return {data: [], total: 0}
      }
    }

    if (params[snapshotFlag]) return query;

    let snapshots = await query.get();

    for (const snapshot of snapshots.docs.slice(0, params.pagination.perPage)) {
      const data = snapshot.data();
      if (data && data.id == null) {
        data['id'] = snapshot.id;
      }
      if (resourceName.startsWith('.')) {
        data['.path'] = snapshot.ref.path
      }
      values.push(data);
    }

    listCache[resourceName] = snapshots.docs.pop();
    
    return { data: values, total: snapshots.docs.length };
  } else {
    throw new Error('Error processing request');
  }
};

const getMany = async (params, resourceName, resourceData) => {
  let data = [];

  const collection = firebase.firestore().collection(resourceName);

  const snapshots = await Promise.all(params.ids.map(id => collection.doc(id).get()));

  snapshots.forEach(docRef => {
    data.push(docRef.data());
  });

  return { data };
};

const getManyReference = async (params, resourceName, resourceData) => {
  if (params.target) {
    if (!params.filter) params.filter = {};
    params.filter[params.target] = params.id;
    let { data, total } = await getList(params, resourceName, resourceData);
    return { data, total };
  } else {
    throw new Error('Error processing request');
  }
};

export default {
  upload,
  save,
  del,
  delMany,
  getItemID,
  getOne,
  getList,
  getMany,
  getManyReference,
  addUploadFeature,
  convertFileToBase64,
  snapshotFlag
};
