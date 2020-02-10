/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable prettier/prettier */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Methods from './methods';

import { GET_LIST, GET_ONE, GET_MANY, GET_MANY_REFERENCE, CREATE, UPDATE, DELETE, DELETE_MANY } from 'react-admin';

/**
 * @param {string[]|Object[]} trackedResources Array of resource names or array of Objects containing name and
 * optional path properties (path defaults to name)
 * @param {Object} firebaseConfig Options Firebase configuration
 */

const BaseConfiguration = {
  initialQuerytimeout: 10000,
  timestampFieldNames: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
};

const RestProvider = (firebaseConfig = {}, options = {}, others={}) => {
  options = Object.assign({}, BaseConfiguration, options);
  const { timestampFieldNames, trackedResources } = options;

  const resourcesStatus = {};
  // const resourcesReferences = {};
  const resourcesData = {};
  const resourcesPaths = {};
  const resourcesUploadFields = {};

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    firebase.firestore().settings({
      timestampsInSnapshots: true
    });
  }

  /* Functions */
  const upload = options.upload || Methods.upload;
  const save = options.save || Methods.save;
  const del = options.del || Methods.del;
  const getItemID = options.getItemID || Methods.getItemID;
  const getOne = options.getOne || Methods.getOne;
  const getMany = options.getMany || Methods.getMany;
  const getManyReference = options.getManyReference || Methods.getManyReference;
  const delMany = options.delMany || Methods.delMany;
  const getList = options.getList || Methods.getList;

  const firebaseSaveFilter = options.firebaseSaveFilter ? options.firebaseSaveFilter : data => data;
  // const firebaseGetFilter = options.firebaseGetFilter ? options.firebaseGetFilter : data => data;

  // Sanitize Resources
  trackedResources.map((resource, index) => {
    if (typeof resource === 'string') {
      resource = {
        name: resource,
        path: resource,
        uploadFields: []
      };
      trackedResources[index] = resource;
    }

    const { name, path, uploadFields } = resource;
    if (!resource.name) {
      throw new Error(`name is missing from resource ${resource}`);
    }
    resourcesUploadFields[name] = uploadFields || [];
    resourcesPaths[name] = path || name;
    resourcesData[name] = {};
  });

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resourceName Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a REST response
   */

  return async (type, resourceName, params) => {
    await resourcesStatus[resourceName];
    let result = null;
    switch (type) {
      case GET_LIST:
<<<<<<< HEAD
        console.log('PARAMETERS TO GET LIST', resourceName, params);
          // if ()
=======
        // //console.log('GET_LIST');
        //console.log('from ra-data-firestore-json ', type, resourceName, params);
>>>>>>> d3180405e2583d254c56ee594117374b4fb96a2e
        result = await getList(params, resourceName, resourcesData[resourceName]);
        /*
        if (resourceName === 'albums' && params.data ===  undefined) {

            // to get the album tracks, if the request is an album, we'll send a request to tracks and for each track with same id as album, we'll make an array of them
            params = {
                pagination: {
                page: 1,
                perPage: 10
              },
              sort : {
                field: "id",
                order: "DESC"
              },
              filter : {}
            };
            let albumTracks = await getList(params, "tracks", resourcesData["tracks"]);
            let album = albumTracks.data.map(album => album.album);
            let albumIdsLength = result.ids.length;
            let tracksIdLength = album.length;
            // console.log('THE ALBUM TRACKS', tracksIdLength);
            let theTracks = [];
            for (let i = 0; i < albumIdsLength; i++) {
                for(let v = 0; v < tracksIdLength; v++) {
                  if (result.ids[i] === album[v]) {
                    // console.log("found this id", album[v]);
                    theTracks.push(album[v]);
                  }
                }
                result.data[i].track_length = theTracks.length;
                // console.log(`the number of tracks for ${result.ids[i]} is ${theTracks.length}`)
                theTracks = [];
            }
                
          }
          */
        
        console.log("RESULT FROM GET LIST REQUEST ", result);
        return result;
      case GET_MANY:
        result = await getMany(params, resourceName, resourcesData[resourceName]);
        // //console.log('GET_MANY');
        return result;

      case GET_MANY_REFERENCE:
        // console.l og('GET_MANY_REFERENCE');
        result = await getManyReference(params, resourceName, resourcesData[resourceName]);
        return result;

      case GET_ONE:
        // //console.log('GET_ONE');
        result = await getOne(params, resourceName, resourcesData[resourceName]);
        return result;

      case DELETE:
<<<<<<< HEAD
        console.log('DELETE', type, resourceName, params);
=======
        // //console.log('DELETE');
>>>>>>> d3180405e2583d254c56ee594117374b4fb96a2e
        const uploadFields = resourcesUploadFields[resourceName] ? resourcesUploadFields[resourceName] : [];
        result = await del(params.id, resourceName, resourcesPaths[resourceName], uploadFields);
        return result;

      case DELETE_MANY:
<<<<<<< HEAD
        console.log('DELETE_MANY', type, resourceName, params);
=======
        // //console.log('DELETE_MANY');
>>>>>>> d3180405e2583d254c56ee594117374b4fb96a2e
        result = await delMany(params.ids, resourceName, resourcesData[resourceName]);
        return result;
      case UPDATE:
      case CREATE:
<<<<<<< HEAD
        console.log('I HAVE BEEN SENT A FILE', type, resourceName, params);
        if (type === "CREATE" && resourceName === "albums") {
            params.id = params.data.artist;
            resourceName = "artists";
            let artist_name = await getOne(params, resourceName, resourcesData[resourceName]);
            delete params.id;
            resourceName = "albums";
            params.data.artist_name = artist_name.data.name;
        };
=======
        //console.log('I HAVE BEEN SENT A FILE', type, resourceName, params);
>>>>>>> d3180405e2583d254c56ee594117374b4fb96a2e
        let itemId = getItemID(params, type, resourceName, resourcesPaths[resourceName], {});
        // //console.log('CHECKS FOR THE ITEMS PASSED TO UPLOAD FUNCTION ', params.data, itemId, resourceName, resourcesPaths[resourceName]);
        const uploads = resourcesUploadFields[resourceName]
          ? resourcesUploadFields[resourceName].map(field =>
              upload(field, params.data, itemId, resourceName, resourcesPaths[resourceName])
            )
          : [];
        const currentData = type === CREATE ? {} : params.previousData; //  data.resourcesData[resourceName][itemId] || {};
        const uploadResults = await Promise.all(uploads);
        result = await save(
          itemId,
          params.data,
          currentData,
          resourceName,
          null,
          firebaseSaveFilter,
          uploadResults,
          type === CREATE,
          timestampFieldNames
        );
        return result;

      default:
        console.error('Undocumented method: ', type);
        return { data: [] };
    }
  };
};

export default RestProvider;
