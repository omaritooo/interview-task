import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import router from "./router/index.ts";
import "primeicons/primeicons.css";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.use(ToastService).component("Toast", Toast);
app.mount("#app");
