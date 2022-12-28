import { createApp } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createPinia } from "pinia";
import { VueFire, VueFireAuth } from "vuefire";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { router } from "./router";
import { firebaseApp } from "./firebase";
import "@mdi/font/css/materialdesignicons.css";

import App from "./App.vue";

const customTheme = {
    colors: {
        background: "#1f262e",
        error: "#B00020",
        info: "#2196F3",
        primary: "#6200EE",
        "primary-darken-1": "#3700B3",
        secondary: "#03DAC6",
        "secondary-darken-1": "#018786",
        success: "#4CAF50",
        surface: "#1f262e",
        warning: "#FB8C00"
    },
    dark: true
};

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        aliases,
        defaultSet: "mdi",
        sets: {
            mdi
        }
    },
    theme: {
        defaultTheme: "customTheme",
        themes: {
            customTheme
        }
    }
});

const pinia = createPinia();

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(pinia);
app
    .use(VueFire, {
        firebaseApp,
        modules: [
            VueFireAuth()
        ]
    });
app.mount("#app");
