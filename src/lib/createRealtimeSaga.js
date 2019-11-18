import realtimeSaga from 'ra-realtime';
import Methods from './methods.js';

const observeRequest = (dataProvider, onDataUpdated) => (type, resource, params) => {
  return {
    subscribe(observer) {
      const snapshotParams = Object.assign({}, params);

      snapshotParams[Methods.snapshotFlag] = true;

      let isFirst = true;

      const cancelSnapshotsPromise = dataProvider(type, resource, snapshotParams).then(query => {
        return query.onSnapshot(
          snapshot => {
            if (!isFirst) {
              if (onDataUpdated) onDataUpdated(type, resource);

              // New data received, notify the observer
              if (snapshot.docs) {
                const docs = snapshot.docs.slice(params.pagination.perPage * (params.pagination.page - 1));

                observer.next({
                  data: docs.map(doc => {
                    const data = doc.data();

                    data.id = data.id || doc.id;

                    return data
                  }),
                  total: docs.length
                });
              } else {

                const data = snapshot.data();

                data.id = data.id || snapshot.id;

                observer.next({ data });
              }
            }

            isFirst = false;
          },
          error => {
            observer.error(error); // Ouch, an error occured, notify the observer
          }
        );
      });

      const subscription = {
        unsubscribe() {
          // Clean up after ourselves
          cancelSnapshotsPromise.then(cancelSnapshots => {
            cancelSnapshots();
            // Notify the saga that we cleaned up everything
            observer.complete();
          });
        }
      };

      return subscription;
    }
  };
};

export default (dataProvider, onDataUpdated) => realtimeSaga(observeRequest(dataProvider, onDataUpdated));
