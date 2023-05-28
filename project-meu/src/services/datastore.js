import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCfm6Jyi-tbKDlq_ugvKL749rb5DwMXlnk',
  authDomain: 'project-meu-b7f6c.firebaseapp.com',
  projectId: 'project-meu-b7f6c',
  storageBucket: 'project-meu-b7f6c.appspot.com',
  messagingSenderId: '329302375805',
  appId: '1:329302375805:web:f2f98d9d87f3257b9a2014',
  measurementId: 'G-GGPP83TZWD',
};

// Initialize firebase
const app = initializeApp(config);
const auth = getAuth(app);

export default auth;
