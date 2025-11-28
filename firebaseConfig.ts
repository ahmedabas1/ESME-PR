
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-YR2kNFhRsP_X5MdX2DLlsh-yMDj9UYs",
  authDomain: "esme-63855.firebaseapp.com",
  projectId: "esme-63855",
  storageBucket: "esme-63855.firebasestorage.app",
  messagingSenderId: "373637660564",
  appId: "1:373637660564:web:2b2fbc769003d473619981"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore
export const db = getFirestore(app);
