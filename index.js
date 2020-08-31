import App from "./components/App.js";

try {
  new App();
} catch (err) {
  console.log(`Cannot start App component..${err}`);
}
