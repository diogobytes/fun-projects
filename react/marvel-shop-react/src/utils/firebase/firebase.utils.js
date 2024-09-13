import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, writeBatch } from 'firebase/firestore';
const firebaseConfig = {

    apiKey: "",
  
    authDomain: "marvel-comics-shop-db.firebaseapp.com",
  
    projectId: "marvel-comics-shop-db",
  
    storageBucket: "marvel-comics-shop-db.appspot.com",
  
    messagingSenderId: "714492416397",
  
    appId: "1:714492416397:web:5d4914bfa81e58838f2dc4",
  
    measurementId: "G-5SE39MBWLC"
  
};
  
  
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(); 
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) =>{
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);

    });

    await batch.commit();
    console.log('done');

}  
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()]= items;
        return acc;
    }, {});
    return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
  
   // if user exists
    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
    try {
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation
        });
    } catch(e) {
        console.log('error creating the user', e.message);
    }
}

   // return userDocRef
  
    return userDocRef;
}
export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
    
}

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);
}
export const signOutUser = () => signOut(auth);
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);

