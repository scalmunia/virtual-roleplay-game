import { getFirestore } from 'firebase/firestore';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';

import './App.css';
import Campaings from './views/Campaings';

function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <Campaings />
    </FirestoreProvider>
  )
}

export default App
