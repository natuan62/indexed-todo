import { ref, unref, toRaw, onBeforeMount } from 'vue';
import { Todo } from '../types/types';

const useIndexedDB = (table: string) => {
  const database = ref();

  const connect = async () => {
    return new Promise((resolve, reject) => {
      if (database.value) {
        resolve(database.value);
      }
      //--- START CODE

      //--- END CODE
    });
  };

  const get = async (): Promise<Todo[]> => {
    database.value = await connect();
    return new Promise((resolve, reject) => {
      //--- START CODE

      //--- END CODE
    });
  };

  const create = (data: Todo) => {
    const rawData = toRaw(data);
    return new Promise((resolve, reject) => {
      //--- START CODE
      
      //--- END CODE
    });
  };

  const count = async (): Promise<number> => {
    database.value = await connect();
    return new Promise((resolve, reject) => {
      const transaction = database.value.transaction('users', 'readonly');
      const objectStore = transaction.objectStore('users');
      const countRequest = objectStore.count();
      countRequest.onsuccess = (event: any) => {
        console.log('countRequest.result', countRequest.result);
        resolve(countRequest.result as number);
      };
    });
  };

  const getById = async (id: number): Promise<Todo> => {
    database.value = await connect();
    return new Promise((resolve, reject) => {
      const transaction = database.value.transaction('users', 'readonly');
      const store = transaction.objectStore('users');
      const request = store.get(id);
      request.onsuccess = (event: any) => {
        console.log('getById() onsuccess', request.result);
        resolve(request.result as Todo);
      };
      request.onerror = () => {
        console.log('getById() error');
        reject({});
      };
    });
  };

  const set = (data: Todo) => {
    return new Promise((resolve, reject) => {
      const rawData = toRaw(data);
      const request = database.value.transaction(['users'], 'readwrite').objectStore('users').put(rawData);
      request.onsuccess = function (event: any) {
        const result = { ...rawData, id: event.target.result };
        console.log('set() successfully', result);
        resolve(result);
      };
      request.onerror = function (event: any) {
        console.log('set() failed');
      };
    });
  };

  const remove = (id: number) => {
    return new Promise((resolve, reject) => {
      const request = database.value.transaction(['users'], 'readwrite').objectStore('users').delete(id);
      request.onsuccess = function (event: any) {
        console.log('remove() successfully', event);
      };
    });
  };

  return {
    connect,
    create,
    get,
    getById,
    count,
    set,
    remove,
  };
};

export default useIndexedDB;
