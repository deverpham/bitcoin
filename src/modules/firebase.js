const firebase = require("firebase");
var config = {
  apiKey: "AIzaSyDbaeTmG3kK_hC3CqVsb7MXEWNZSU9JvJM",
  authDomain: "sexapi-52b2c.firebaseapp.com",
  databaseURL: "https://sexapi-52b2c.firebaseio.com",
  projectId: "sexapi-52b2c",
  storageBucket: "sexapi-52b2c.appspot.com",
  messagingSenderId: "394222519043"
};

/**
 * The complete Triforce, or one or more components of the Triforce.
 * @typedef {Object} Database
 * @property {Model} projects - Projects table.
 * @property {Model} settings - Projects table.
 * @property {Model} training - Projects table.
 * @property {Model} logs - Projects table.
 */

/**
 * Firebase Module
 * @class
 */
class FirebaseDatabase {
  /**
   * constructor
   */
  constructor() {
    /**
     * @type {Database}
     */
    this.table = {};
  }
  /**
   * Init new functions
   * @return {Promise} a promise functions
   */
  init() {
    return new Promise(async resolve => {
      try {
        this.app = firebase.initializeApp(config);
        this.app
          .auth()
          .then(listener => {
            console.log(listener);
          })
          .catch(err => {
            console.log(err, "err");
          });
        if (listener) {
          console.log(listener);
          listener.onAuthStateChanged(user => {
            this.onDbInit();
            listener = undefined;
            resolve();
          });
        } else {
          this.onDbInit();
          resolve();
        }
      } catch (err) {
        console.log(err);
        this.onDbInit();
        resolve();
      }
    });
  }

  /**
   * create a module
   * @param {string} name name of model
   * @return {Model}
   */
  model(name) {
    const model = new Model(this.app, name);
    return model;
  }
  /**
   * Callback when DB INIT
   */
  onDbInit() {}
}
/**
 * Return Model
 */
class Model {
  /**
   * constructor to connect model
   * @param {object} db
   * @param {string} name
   */
  constructor(db, name) {
    this.original = name;
    this.db = db;
    this.ref = db.database().ref(name);
  }
  child(name) {
    return new Model(this.db, this.original + name);
  }
  /**
   *  fetch data model
   * @return {Promise}
   */
  fetch() {
    return new Promise(async resolve => {
      this.ref.once("value").then(records => {
        const returnArray = [];
        records = records.val();
        if (!records) {
          resolve(returnArray);
          return;
        }
        const ids = Object.keys(records);

        ids.map(id => {
          returnArray.push(Object.assign({ id }, records[id]));
        });
        resolve(returnArray);
      });
    });
  }
  /**
   * return a object by pointer
   * @return {Promise}
   */
  fetchLikeObject() {
    return new Promise(async resolve => {
      this.ref.once("value").then(records => {
        records = records.val();
        resolve(records);
      });
    });
  }
  /**
   * create a record
   * @param {object} record
   * @return {object}
   */
  create(record) {
    return new Promise(resolve => {
      const space = this.ref.push();
      space.set(record, () => resolve(record));
    });
  }
  /**
   * Create a record with id
   * @param {string} id
   * @param {object} data
   * @return {Promise}
   */
  createWithId(id, data) {
    return new Promise(resolve => {
      const newProduct = this.ref.child(id);
      newProduct.set(data, resolve);
    });
  }
  /**
   * Get Record By Id
   * @param {string} id
   * @return {Promise}
   */
  getById(id) {
    return new Promise(resolve => {
      this.ref
        .child(id)
        .once("value", record => resolve(Object.assign({ id }, record.val())));
    });
  }
  /**
   * Delete Record By Id
   * @param {string} id
   * @return {Promise}
   */
  destroy(id) {
    return new Promise(resolve => {
      this.ref
        .child(id)
        .remove()
        .then(err => {
          resolve();
        });
    });
  }
  selfDesTroy() {
    return new Promise(resolve => {
      this.ref.remove().then(err => {
        resolve();
      });
    });
  }
  /**
   * Update A Record
   * @param {string} id
   * @param {object} data
   * @return {Promise}
   */
  update(id, data) {
    return new Promise(resolve => {
      this.ref.child(id).set(data, () => {
        resolve(data);
      });
    });
  }
  /**
   * Find By Some Thing
   * @param {*} url
   * @return {Object}
   */
  findByUrl(url) {
    return new Promise(async resolve => {
      const records = await this.fetch();
      const returnArray = [];
      records.map(record => {
        if (record.url == url) returnArray.push(record);
      });
      resolve(returnArray);
    });
  }
}

module.exports = new FirebaseDatabase();
