import ReillyDOM from "./lib/reilly/ReillyDOM.js";
import Reilly from "./lib/reilly/Reilly.js";
import App from "./App.js";

ReillyDOM.render(Reilly.createElement(App), document.getElementById("root"));
