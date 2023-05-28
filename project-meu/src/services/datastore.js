import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBhEuKwM4tsvp3hQJ6nnh_01f6yGi7YABI',
  authDomain: 'project-meu-11610.firebaseapp.com',
  projectId: 'project-meu-11610',
  storageBucket: 'project-meu-11610.appspot.com',
  messagingSenderId: '245464727418',
  appId: '1:245464727418:web:d547f2962120dceec360c3',
  measurementId: 'G-7FTRQF090W',
};

// Initialize firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
