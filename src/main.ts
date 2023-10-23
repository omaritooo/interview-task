import { createApp, Directive } from "vue";
import "./style.css";
import App from "./App.vue";

import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Tailwind from "primevue/passthrough/tailwind";
import Button from "primevue/button";
import router from "./router/index.ts";
import Ripple from "primevue/ripple";
import BaseInput from "./components/Base/BaseInput.vue";
import BaseDataTable from "./components/Base/BaseDataTable.vue";
import Dropdown from "primevue/dropdown";
import Toolbar from "primevue/toolbar";
import "primeicons/primeicons.css";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.directive("ripple", Ripple as Directive);
app.use(router);
app.use(ToastService as any);
// @ts-ignore
app.use(PrimeVue, {
  ripple: true,
  unstyled: false,
  pt: Tailwind,
  ptOptions: { mergeProps: true },
} as any);

app.component("ButtonComponent", Button);
app.component("BaseInput", BaseInput);
app.component("BaseDataTable", BaseDataTable);
app.component("DropdownComponent", Dropdown);
app.component("ToolbarComponent", Toolbar);
app.component("ToastComponent", Toast);

app.mount("#app");
