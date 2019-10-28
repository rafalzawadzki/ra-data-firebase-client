import realtimeSaga from 'ra-realtime';
import { SnapshotFlag } from './methods.js';

const observeRequest = dataProvider => (type, resource, params) => {
   
    return {
        subscribe(observer) {
        
            params[SnapshotFlag] = true;
          
            const query = dataProvider(type, resource, params);
            const cancelSnapshots = query.onSnapshot(
              snaphot => {
                observer.next(snapshot.docs)// New data received, notify the observer
              },
              error => {
                observer.error(error)); // Ouch, an error occured, notify the observer
              }
            )

            const subscription = {
                unsubscribe() {
                    // Clean up after ourselves
                    cancelSnapshots();
                    // Notify the saga that we cleaned up everything
                    observer.complete();
                }
            };

            return subscription;
        },
    };
};

export default dataProvider => realtimeSaga(observeRequest(dataProvider));
