// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import { getMessaging } from "firebase/compat/messaging";

// const firebaseConfig = {
//   apiKey: 'AIzaSyBhEuKwM4tsvp3hQJ6nnh_01f6yGi7YABI',
//   authDomain: 'project-meu-11610.firebaseapp.com',
//   projectId: 'project-meu-11610',
//   storageBucket: 'project-meu-11610.appspot.com',
//   messagingSenderId: '245464727418',
//   appId: '1:245464727418:web:d547f2962120dceec360c3',
//   measurementId: 'G-7FTRQF090W',
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = getMessaging();

// // could put this elsewhere, like a relevant place to prompt for permission
// // ask chatgpt
// messaging.requestPermission().then(() => {
//     console.log('Notification permission granted.');
//   }).catch((error) => {
//     console.log('Unable to get permission to notify.', error);
//   });

// // same with this as well
// messaging.getToken().then((currentToken) => {
//   if (currentToken) {
//     console.log('FCM Token:', currentToken);
//     // You can send this token to your server to associate it with the user
//   } else {
//     console.log('No registration token available.');
//   }
// }).catch((error) => {
//   console.log('An error occurred while retrieving token.', error);
// });

// messaging.onMessage((payload) => {
//     console.log('Received foreground message:', payload);
//     // Handle the received notification and update your UI accordingly
//   });

// export default messaging;
