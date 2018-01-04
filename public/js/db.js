export async function store(storeName) {
    const db = await getDb();

    return {
        put: function (obj) {
            const objectStore = getObjStore(db, storeName);
            const request = objectStore.put(obj);

            return new Promise((resolve, reject) => {
                request.onsuccess = _ => {
                    obj.id = request.result;
                    resolve(obj);
                };
                request.onerror = reject;
            });
        },
        putAll: function (objs) {
            return Promise.all(objs.map(this.put));
        },
        getAll: function () {
            const objectStore = getObjStore(db, storeName);
            const request = objectStore.getAll();

            return new Promise((resolve, reject) => {
                request.onerror = reject;
                request.onsuccess = _ => resolve(request.result);
            });
        }
    }

}

function getObjStore(db, storeName) {
    const transaction = db.transaction([storeName], "readwrite");
    return transaction.objectStore(storeName);
}

function getDb() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('cash-control', 1);
        request.onerror = reject;
        request.onsuccess = _ => resolve(request.result);
        request.onupgradeneeded = createObjStores;
    })
}

function createObjStores(event) {
    const db = event.target.result;
    createStore(db, "transactions");
}

function createStore(db, storeName) {
    db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
}