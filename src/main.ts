import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { routes } from "./configs/routes/routes";

const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(vuetify).use(pinia).use(router).mount("#app");
