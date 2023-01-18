import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
import { getAuth, onAuthStateChanged } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBev8b-LDPzooFFokHA_5skUILARRz1WEE",
  authDomain: "rehearsal-de93d.firebaseapp.com",
  projectId: "rehearsal-de93d",
  storageBucket: "rehearsal-de93d.appspot.com",
  messagingSenderId: "69397025105",
  appId: "1:69397025105:web:1ca69760f5b27b29f08370",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);



// let user;
// const getUser = async () => {

//   if (auth.currentUser) {
//     const docRef = await doc(db, "users", auth.currentUser.uid);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       user = { ...docSnap.data(), id: docSnap.id };
//       console.log("DATABASE USER:", user)
//       return user
//     } else {
//       console.log("No such document!");
//     }
//   }else{
//     console.log("no user logged in")
//   }
// };
// getUser()

// get current user data
let user;
const getUser = async () => {
  if (auth.currentUser) {
    const docRef = await doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
       user =  { ...docSnap.data(), id: docSnap.id };
       console.log(user)
    } else {
      console.log("No such document!");
    }
  }
};
getUser();

onAuthStateChanged(auth, (user)=> {
  if (user) {
    // User is signed in.
    console.log(auth.currentUser)
    getUser()
  } else {
    // No user is signed in.
    console.log(user.email)
  }
});


export { auth, db, getUser, user };
