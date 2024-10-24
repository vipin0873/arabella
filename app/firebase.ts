import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, serverTimestamp, getDocs, updateDoc, doc, where, query, orderBy, onSnapshot, setDoc, deleteDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLh7MYW3ZQTGEkePlKdCPXySOr_qA2fWs",
  authDomain: "arabella-f5f9c.firebaseapp.com",
  projectId: "arabella-f5f9c",
  storageBucket: "arabella-f5f9c.appspot.com",
  messagingSenderId: "410487191740",
  appId: "1:410487191740:web:c31cd9fb3d36fe9dedb8b9",
  measurementId: "G-MWZX7K1DQQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

export const submitQuote = async (quote : Quote) => {
  try {
    const docRef = await addDoc(collection(db, 'quotes'), {
      ...quote,
      timestamp: serverTimestamp(),
      status: 'unread',
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting quote:', error);
    return { success: false };
  }
};

export const getQuotes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'quotes'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
};

export const updateQuoteStatus = async (quoteId: string, newStatus: string) => {
  try {
    const quotesRef = collection(db, 'quotes');
    const q = query(quotesRef, where('id', '==', quoteId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const quoteDoc = querySnapshot.docs[0];
      await updateDoc(quoteDoc.ref, { status: newStatus });
      return true;
    } else {
      console.error('Quote not found:', quoteId);
      return false;
    }
  } catch (error) {
    console.error('Error updating quote status:', error);
    return false;
  }
};

export const adminLogin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, error };
  }
};

export const adminLogout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error);
    return { success: false, error };
  }
};

export async function submitMessage(message: any) {
  try {
    const docRef = await addDoc(collection(db, 'messages'), message);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting message:', error);
    return { success: false, error };
  }
}
export const updateMessageStatus = async (messageId: string, newStatus: string) => {
  try {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, where('id', '==', messageId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const messageDoc = querySnapshot.docs[0];
      await updateDoc(messageDoc.ref, { status: newStatus });
      return true;
    } else {
      console.error('Message not found:', messageId);
      return false;
    }
  } catch (error) {
    console.error('Error updating quote status:', error);
    return false;
  }
};

export async function getMessages() {
  const messagesRef = collection(db, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export const subscribeToQuotes = (callback: (quotes: Quote[]) => void) => {
  const quotesRef = collection(db, 'quotes');
  const q = query(quotesRef, orderBy('timestamp', 'desc'));
  return onSnapshot(q, (querySnapshot) => {
    const quotes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Quote[];
    callback(quotes);
  });
};

export const subscribeToMessages = (callback: (messages: any[]) => void) => {
  const messagesRef = collection(db, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'desc'));
  return onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(messages);
  });
};

// Fetch FAQs
export const getFAQs = async () => {
  try {
    const faqsRef = collection(db, 'faqs');
    const querySnapshot = await getDocs(faqsRef);
    const faqs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log("Fetched FAQs:", faqs);
    return faqs;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
};

// Create or Update FAQ
export const setFAQ = async (faqId: string | null, data: { question: string, answer: string }) => {
  try {
    let docRef;
    if (faqId) {
      docRef = doc(db, 'faqs', faqId);
      await setDoc(docRef, data, { merge: true });
    } else {
      docRef = await addDoc(collection(db, 'faqs'), data);
    }
    console.log("FAQ set successfully:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error setting FAQ:', error);
    return { success: false, error };
  }
};

// Delete FAQ
export const deleteFAQ = async (faqId: string) => {
  try {
    const faqRef = doc(db, 'faqs', faqId);
    await deleteDoc(faqRef);
    console.log("FAQ deleted successfully:", faqId);
    return { success: true };
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return { success: false, error };
  }
};

// Subscribe to FAQs
export const subscribeToFAQs = (callback: (faqs: any[]) => void) => {
  const faqsRef = collection(db, 'faqs');
  return onSnapshot(faqsRef, (querySnapshot) => {
    const faqs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("FAQs updated:", faqs);
    callback(faqs);
  });
};
