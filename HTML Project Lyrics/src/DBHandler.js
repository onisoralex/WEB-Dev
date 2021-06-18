const request = window.indexedDB.open("chords", 1);
let db;

request.onerror = (event) => console.error(`Database error: ${event.target.errorCode}`);
request.onsuccess = (event) => { db = event.target.result; };
request.onupgradeneeded = (event) => {
  db = event.target.result; // Save the IDBDatabase interface

  const objectStore = db.createObjectStore("chords", { keyPath: "chord_UID" }); // Create an objectStore for this database
  objectStore.createIndex("name", "name", { unique: false });

  objectStore.transaction.oncomplete = function(event) {
    // Store values in the newly created objectStore.
    let customerObjectStore = db.transaction("chords", "readwrite").objectStore("chords");
    customerData.forEach(function(customer) {
      customerObjectStore.add(customer);
    });
  };
};

// This is what our customer data looks like.
const customerData = [
  {
    ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com",
  },
  {
    ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org",
  },
];

// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
