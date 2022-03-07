import { key } from "./store/store";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/store";
import "./styles/index.css";
import "mosha-vue-toastify/dist/style.css";
import { plugin, defaultConfig } from "@formkit/vue";

createApp(App)
  .use(
    plugin,
    defaultConfig({
      config: {
        classes: {
          input:
            "w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline mt-6",
          label: "block mb-2 text-sm font-bold text-gray-700",
        },
      },
    })
  )
  .use(store, key)
  .use(router)
  .mount("#app");
