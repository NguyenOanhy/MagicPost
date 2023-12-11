// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from  "firebase/auth";
import { getStorage} from 'firebase/storage';
import { getFirestore, doc, getDoc, addDoc, collection} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVN0qideIoZHsfEgppqT5gUHzAv_yEdfI",
  authDomain: "magic-post-caaa0.firebaseapp.com",
  projectId: "magic-post-caaa0",
  storageBucket: "magic-post-caaa0.appspot.com",
  messagingSenderId: "701789804167",
  appId: "1:701789804167:web:addc5761a74acd45034a22",
  measurementId: "G-0Q8N5E4094"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();


const getDocumentById = async (documentId, dbName) => {
  try {
    const docRef = doc(db, dbName, documentId);
    const documentSnapshot = await getDoc(docRef);

    if (documentSnapshot.exists()) {
      const data = documentSnapshot.data();
      console.log(data);
      console.log("Succesfully get document", documentId);
      return data;
    } else {
      console.log("Document not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    return null;
  }
};


const getCurrentUser = () => {
  try {
    return auth.currentUser;
  } catch (error) {
    console.error("Error getting current user: ", error);
    return null;
  }
};

const getCurrentUserEmail = () => {
  try {
    const currentUser = getCurrentUser();
    return currentUser ? currentUser.email : null;
  } catch (error) {
    console.error("Error getting current user email: ", error);
    return null;
  }
};

//them data vao firebase
const addDataToFirestore = async (m_name, m_content, m_image, dbName) => {
  try {
    const collectionRef = collection(db, dbName);
    const currentTimeStamp = new Date().getTime();
    let m_uid = null;
    if (auth.currentUser === null) {
      m_uid = null;
    } else {
      m_uid = auth.currentUser.uid;
    }
    const docRef = await addDoc(collectionRef, {
      name: m_name,
      data: m_content,
      uid: m_uid,
      timestamp: currentTimeStamp,
      image: m_image
      // tag: m_tag,
      // like: randomLike,
      // dislike: randomDislike
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

//them user vao firebase
const addUserToFirestore = async (m_name, m_phone, m_position, m_birth, m_email, m_auth, dbName) => {
  try {
    const collectionRef = collection(db, dbName);
    const currentTimeStamp = new Date().getTime();
    const userRef = await addDoc(collectionRef, {
      name: m_name,
      phone: m_phone,
      position: m_position,
      birth: m_birth,
      email: m_email,
      date: currentTimeStamp,
      authority: m_auth
    });
    console.log("User ID: ", userRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

//them user vao firebase
const addOrderToFirestore = async (m_consignor, m_consignee, m_product, m_shipping_detail, dbName) => {
  try {
    const collectionRef = collection(db, dbName);
    const currentTimeStamp = new Date().getTime();
    const userRef = await addDoc(collectionRef, {
      consignor: m_consignee,
      consignee: m_consignee,
      product: m_product,
      shipping_detail: m_shipping_detail
    });
    console.log("User ID: ", userRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export { storage, auth, db, getDocumentById, getCurrentUserEmail, getCurrentUser, addDataToFirestore, addUserToFirestore, addOrderToFirestore};