import { openDB, type IDBPDatabase } from 'idb';

const DB_NAME = 'weboffice';
const STORE_META = 'meta';

let dbPromise: Promise<IDBPDatabase> | null = null;
const registeredStores = new Set<string>();

export const registerStore = (storeName: string) => {
  registeredStores.add(storeName);
};

const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        registeredStores.forEach(store => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store, { keyPath: 'id' });
          }
        });
        if (!db.objectStoreNames.contains(STORE_META)) {
          db.createObjectStore(STORE_META);
        }
      },
    });
  }
  return dbPromise;
};

export const isCacheValid = async (storeName: string, ttlMs: number): Promise<boolean> => {
  const db = await getDB();
  const cachedAt = await db.get(STORE_META, `${storeName}CachedAt`);
  if (!cachedAt) return false;
  return Date.now() - cachedAt < ttlMs;
};

export const saveToCache = async <T>(storeName: string, items: T[]): Promise<void> => {
  const db = await getDB();
  const tx = db.transaction([storeName, STORE_META], 'readwrite');
  await tx.objectStore(storeName).clear();
  for (const item of items) {
    tx.objectStore(storeName).put(item);
  }
  tx.objectStore(STORE_META).put(Date.now(), `${storeName}CachedAt`);
  await tx.done;
};

export const getFromCache = async <T>(storeName: string): Promise<T[]> => {
  const db = await getDB();
  return db.getAll(storeName);
};
