import "./style/index.scss";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createPinia } from "pinia";

const vuetify = createVuetify({
    components,
    directives
});

import { defineSetupVue3 } from "@histoire/plugin-vue";

export const setupVue3 = defineSetupVue3(({ app, story, variant }) => {
    const pinia = createPinia();
    app.use(pinia);
    app.use(vuetify);
});
