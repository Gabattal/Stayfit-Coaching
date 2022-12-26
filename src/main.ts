import { createApp } from "vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createPinia } from "pinia";
import { VueFire, VueFireAuth } from "vuefire";
import { router } from "./router";
import { firebaseApp } from "./firebase";

import App from "./App.vue";

const vuetify = createVuetify({
    components,
    directives
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
