# source for [lawabidingcitizen.online](lawabidingcitizen.online)

## instructions

- clone or download the repo
- npm install
- For development: `npm run dev`
- For production: `npm run build` then to preview what was built `npm run preview`

## Development mode and debugging
First `npm run dev`
Then in vscode press F5, otherwise just open a browser at http://localhost:3000/

## Production build
First `npm run build`
A `dist` folder is created and contains the distribution. 
You can `npm run preview` it on your development machine.
Production preview runs at http://localhost:5000/ . The terminal will display external URLs if you want to test from a phone or tablet.

## File Structure

### /index.html
This file is used as a template by vite to create the actual **index.html** that will be served to the client.

### /public
This folder contains your html asset. The files in this folder are served by the test webserver as root files.

### /src 
This is where you should place all your application code.

### /src/main.ts
This is the entry point of the app. 

### /src/AppOne.ts
A sample app that copy the code from the babylon.js playground.
