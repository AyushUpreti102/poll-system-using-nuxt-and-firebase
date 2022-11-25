import {initializeApp, getApps} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {browserLocalPersistence, getAuth, initializeAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAYGkXfHFzO_8kbrAf5wiI40wZmAu9oLhk",
    authDomain: "poll-system-8381c.firebaseapp.com",
    projectId: "poll-system-8381c",
    storageBucket: "poll-system-8381c.appspot.com",
    messagingSenderId: "365253692318",
    appId: "1:365253692318:web:f01d48c8452990fd8ba48f"
};


let app;
if (getApps().length < 1) app = initializeApp(firebaseConfig);
//initialize Firestore
const db = getFirestore(app);
//initialize storage
const storage = getStorage(app);
//initialize auth
const auth = (typeof document !== 'undefined') ? initializeAuth(app, {
  persistence: browserLocalPersistence,
  popupRedirectResolver: undefined,
}) : getAuth(app);
export { db, storage, auth };