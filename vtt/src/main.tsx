import React from 'react'
import ReactDOM from 'react-dom/client'
import { FirebaseAppProvider } from 'reactfire'

import App from './App.tsx'
import './index.css'

//pasar a un .env
const firebaseConfig = {
  apiKey: "AIzaSyB1bicCH07oq92KldCZh0e9uAOovvqfK1Q",
  authDomain: "throw-a-dice.firebaseapp.com",
  projectId: "throw-a-dice",
  storageBucket: "throw-a-dice.appspot.com",
  messagingSenderId: "1022754241317",
  appId: "1:1022754241317:web:c728dc7cf396e83f67b8cc"
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>,
)
