import "./assets/main.css";

import { createApp } from "vue";
import type { App as Application, Component } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const app: Application = createApp(App as Component);

app.use(createPinia());

app.mount("#app");
