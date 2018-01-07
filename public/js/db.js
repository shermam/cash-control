export async function store(storeName) {
    const db = await getDb();

    return {
        put: async function (obj) {
            const id = await execTransaction(db, storeName, 'put', obj);
            obj.id = id;
            return obj;
        },
        putAll: function (objs) {
            return Promise.all(objs.map(this.put));
        },
        getAll: function () {
            return execTransaction(db, storeName, 'getAll');
        },
        clear: function () {
            return execTransaction(db, storeName, 'clear');
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

function execTransaction(db, storeName, transactionName, params) {
    const objectStore = getObjStore(db, storeName);
    const request = objectStore[transactionName](params);

    return new Promise((resolve, reject) => {
        request.onerror = reject;
        request.onsuccess = _ => resolve(request.result);
    });
}