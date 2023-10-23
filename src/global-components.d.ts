import PrimeVue from "primevue/config";
import Tailwind from "primevue/passthrough/tailwind";
import Button from "primevue/button";
import BaseInput from "./components/Base/BaseInput.vue";
import Ripple from "primevue/ripple";

import BaseDataTable from "./components/Base/BaseDataTable.vue";
import Dropdown from "primevue/dropdown";
import Toolbar from "primevue/toolbar";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    PrimeVue: typeof PrimeVue;
    Tailwind: typeof Tailwind;
    Button: typeof Button;
    BaseInput: typeof BaseInput;
    Ripple: typeof Ripple;
    BaseDataTable: typeof BaseDataTable;
    Dropdown: typeof Dropdown;
    Toolbar: typeof Toolbar;
    ToastService: typeof ToastService;
    Toast: typeof Toast;
  }
}
