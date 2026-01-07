import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./app/store.jsx";
import "./fonts.css";
import "./index.css";
import "./styles/day_picker.style.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
