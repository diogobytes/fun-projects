"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onAuthStateChangedListener = exports.signOutUser = exports.signInAuthUserWithEmailAndPassword = exports.createAuthUserWithEmailAndPassword = exports.createUserDocumentFromAuth = exports.getCategoriesAndDocuments = exports.addCollectionAndDocuments = exports.db = exports.signInWithGooglePopup = exports.auth = void 0;

var _app = require("firebase/app");

var _auth = require("firebase/auth");

var _firestore = require("firebase/firestore");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var firebaseConfig = {
  apiKey: "AIzaSyA5Al7yntpvg4GqCeSKCzgERw-wiCbhvi0",
  authDomain: "marvel-comics-shop-db.firebaseapp.com",
  projectId: "marvel-comics-shop-db",
  storageBucket: "marvel-comics-shop-db.appspot.com",
  messagingSenderId: "714492416397",
  appId: "1:714492416397:web:5d4914bfa81e58838f2dc4",
  measurementId: "G-5SE39MBWLC"
};
var firebaseApp = (0, _app.initializeApp)(firebaseConfig);
var googleProvider = new _auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});
var auth = (0, _auth.getAuth)();
exports.auth = auth;

var signInWithGooglePopup = function signInWithGooglePopup() {
  return (0, _auth.signInWithPopup)(auth, googleProvider);
};

exports.signInWithGooglePopup = signInWithGooglePopup;
var db = (0, _firestore.getFirestore)();
exports.db = db;

var addCollectionAndDocuments = function addCollectionAndDocuments(collectionKey, objectsToAdd) {
  var collectionRef, batch;
  return regeneratorRuntime.async(function addCollectionAndDocuments$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          collectionRef = (0, _firestore.collection)(db, collectionKey);
          batch = (0, _firestore.writeBatch)(db);
          objectsToAdd.forEach(function (object) {
            var docRef = (0, _firestore.doc)(collectionRef, object.title.toLowerCase());
            batch.set(docRef, object);
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(batch.commit());

        case 5:
          console.log('done');

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.addCollectionAndDocuments = addCollectionAndDocuments;

var getCategoriesAndDocuments = function getCategoriesAndDocuments() {
  var collectionRef, q, querySnapshot, categoryMap;
  return regeneratorRuntime.async(function getCategoriesAndDocuments$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          collectionRef = (0, _firestore.collection)(db, 'categories');
          q = (0, _firestore.query)(collectionRef);
          _context2.next = 4;
          return regeneratorRuntime.awrap((0, _firestore.getDocs)(q));

        case 4:
          querySnapshot = _context2.sent;
          categoryMap = querySnapshot.docs.reduce(function (acc, docSnapshot) {
            var _docSnapshot$data = docSnapshot.data(),
                title = _docSnapshot$data.title,
                items = _docSnapshot$data.items;

            acc[title.toLowerCase()] = items;
            return acc;
          }, {});
          return _context2.abrupt("return", categoryMap);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getCategoriesAndDocuments = getCategoriesAndDocuments;

var createUserDocumentFromAuth = function createUserDocumentFromAuth(userAuth, additionalInformation) {
  var userDocRef, userSnapshot, displayName, email, createdAt;
  return regeneratorRuntime.async(function createUserDocumentFromAuth$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userDocRef = (0, _firestore.doc)(db, 'users', userAuth.uid);
          console.log(userDocRef);
          _context3.next = 4;
          return regeneratorRuntime.awrap((0, _firestore.getDoc)(userDocRef));

        case 4:
          userSnapshot = _context3.sent;

          if (userSnapshot.exists()) {
            _context3.next = 16;
            break;
          }

          displayName = userAuth.displayName, email = userAuth.email;
          createdAt = new Date();
          _context3.prev = 8;
          _context3.next = 11;
          return regeneratorRuntime.awrap((0, _firestore.setDoc)(userDocRef, _objectSpread({
            displayName: displayName,
            email: email,
            createdAt: createdAt
          }, additionalInformation)));

        case 11:
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](8);
          console.log('error creating the user', _context3.t0.message);

        case 16:
          return _context3.abrupt("return", userDocRef);

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[8, 13]]);
};

exports.createUserDocumentFromAuth = createUserDocumentFromAuth;

var createAuthUserWithEmailAndPassword = function createAuthUserWithEmailAndPassword(email, password) {
  return regeneratorRuntime.async(function createAuthUserWithEmailAndPassword$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!(!email || !password)) {
            _context4.next = 2;
            break;
          }

          return _context4.abrupt("return");

        case 2:
          _context4.next = 4;
          return regeneratorRuntime.awrap((0, _auth.createUserWithEmailAndPassword)(auth, email, password));

        case 4:
          return _context4.abrupt("return", _context4.sent);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.createAuthUserWithEmailAndPassword = createAuthUserWithEmailAndPassword;

var signInAuthUserWithEmailAndPassword = function signInAuthUserWithEmailAndPassword(email, password) {
  return regeneratorRuntime.async(function signInAuthUserWithEmailAndPassword$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!(!email || !password)) {
            _context5.next = 2;
            break;
          }

          return _context5.abrupt("return");

        case 2:
          _context5.next = 4;
          return regeneratorRuntime.awrap((0, _auth.signInWithEmailAndPassword)(auth, email, password));

        case 4:
          return _context5.abrupt("return", _context5.sent);

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.signInAuthUserWithEmailAndPassword = signInAuthUserWithEmailAndPassword;

var signOutUser = function signOutUser() {
  return (0, _auth.signOut)(auth);
};

exports.signOutUser = signOutUser;

var onAuthStateChangedListener = function onAuthStateChangedListener(callback) {
  return (0, _auth.onAuthStateChanged)(auth, callback);
};

exports.onAuthStateChangedListener = onAuthStateChangedListener;
//# sourceMappingURL=firebase.utils.dev.js.map
