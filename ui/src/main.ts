import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

const { VITE_API_URL } = import.meta.env;
axios.defaults.baseURL = VITE_API_URL;

app.use(createPinia());
app.use(router);

app.mount("#app");
