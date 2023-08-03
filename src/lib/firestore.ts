import { getFirestore } from 'firebase/firestore';
import { app } from './firebase';

export const db = getFirestore(app);

export {
  doc,
  collection,
  getDocs,
  setDoc,
  writeBatch,
  deleteDoc,
} from 'firebase/firestore';