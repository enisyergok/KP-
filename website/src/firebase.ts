// Firebase yapılandırması ve başlatma
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  getDocs, 
  onSnapshot, 
  serverTimestamp, 
  DocumentData, 
  QuerySnapshot, 
  enableIndexedDbPersistence,
  FirestoreError
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "kpi-analiz-sistemi.firebaseapp.com",
  projectId: "kpi-analiz-sistemi",
  storageBucket: "kpi-analiz-sistemi.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef",
  measurementId: "G-XXXXXXXXXX"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Firebase servislerine referanslar
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const rtdb = getDatabase(app);

// Çevrimdışı kalıcılık etkinleştirme
enableIndexedDbPersistence(db)
  .catch((err: FirestoreError) => {
    if (err.code === 'failed-precondition') {
      console.log('Çoklu sekme açık olduğu için kalıcılık etkinleştirilemedi');
    } else if (err.code === 'unimplemented') {
      console.log('Tarayıcı kalıcılığı desteklemiyor');
    }
  });

// Firebase işlevleri
export interface KpiData {
  [key: string]: any;
}

export const saveKpiDataToFirebase = async (kpiData: KpiData) => {
  try {
    const kpiCollection = collection(db, 'kpiRecords');
    const docRef = await addDoc(kpiCollection, {
      ...kpiData,
      timestamp: serverTimestamp()
    });
    console.log("KPI verisi başarıyla kaydedildi, ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("KPI verisi kaydedilirken hata oluştu: ", error);
    throw error;
  }
};

export const getKpiDataFromFirebase = async () => {
  try {
    const kpiCollection = collection(db, 'kpiRecords');
    const q = query(kpiCollection, orderBy('timestamp', 'desc'), limit(50));
    const querySnapshot = await getDocs(q);
    
    const kpiRecords: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      kpiRecords.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return kpiRecords;
  } catch (error) {
    console.error("KPI verileri çekilirken hata oluştu: ", error);
    throw error;
  }
};

export const listenToKpiUpdates = (callback: (records: DocumentData[]) => void) => {
  const kpiCollection = collection(db, 'kpiRecords');
  const q = query(kpiCollection, orderBy('timestamp', 'desc'), limit(10));
  
  return onSnapshot(q, 
    (querySnapshot: QuerySnapshot<DocumentData>) => {
      const kpiRecords: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        kpiRecords.push({
          id: doc.id,
          ...doc.data()
        });
      });
      callback(kpiRecords);
    }, 
    (error: FirestoreError) => {
      console.error("Gerçek zamanlı dinleme hatası: ", error);
    }
  );
};

// Firebase Authentication durumunu izleme
export const listenToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export default app;
