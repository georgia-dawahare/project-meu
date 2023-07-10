# MeU Backend

app for couples in long-distance relationships

## Architecture
Frontend: React Native
Backend: Express and Firebase

## Backend Deployment
Firebase Hosting

Deploy to Firebase using the command: `firebase deploy`

Project Console: https://console.firebase.google.com/project/project-meu-11610/overview
Hosting URL: https://project-meu-11610.web.app

** A note on deployment: the backend is currently hosted on Render, but this is often slow. To switch to running the server locallyL
1. complete steps 1-4 of backend local setup
2. Go to project-meu/src/constants/constants.js
3. Comment out the line: `const apiUrl = 'https://meu-forever.onrender.com';`
4. Uncomment the line: `const apiUrl = 'http://localhost:9090';`
5. Go to project-meu-backend/src/services/firestore.js
6. Comment out the line: `import serviceAccount from '/etc/secrets/credentials.json';`
7. Uncomment the line: `import serviceAccount from '../../credentials.json'`
8. Complete step 5 of backend local setup

## Setup Backend Locally
1. Clone repo by running `git clone https://github.com/dartmouth-cs52-23s/project-meu.git` in your terminal and `cd project-meu-backend`
2. Run `npm install` and `npm run build` to install/build all of the necessary dependencies.
3. Install the [Firebase CLI](https://firebase.google.com/docs/cli) by running `npm install -g firebase-tools`.
4. Install firebase by running `npm install firebase`
    - Then, login to the `meu.project.52@gmail.com` account by running `firebase login`.
4. Running this application locally requires to run the Firebase Admin SDK. Follow [the docs](https://firebase.google.com/docs/admin/setup) here to generate a JSON file containing a service account private key, and save that JSON file as `credentials.json` to the root directory of this project.
    - Note that for security purposes, this file should never be checked into Git.
5. In a separate terminal window, run `npm run start` to start the server locally.

## Designs
[Link to the project Figma](https://www.figma.com/file/PYeh3GKvg4VwmsTEXIc0Bs/Tim_Soo_Kaylie_Final-project?type=design&node-id=2722%3A11215&t=bPEOBP3huvstSb1E-1)

## Authors
* Chipo Chibbamulilo '26
* Georgia Dawahare '23
* Katherine Pommerening '25
* Kaylie Sampson '25
* Soo Park 'GR
* Tim Yang 'GR
