/// <reference types="histoire" />
import * as path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

const alias = {
    "@": path.resolve(__dirname, "src")
};

// https://vitejs.dev/config/
export default defineConfig({
    histoire: {
        setupFile: "./src/histoire-setup.ts"
    },
    plugins: [
        vue(),
        VitePWA({ registerType: "autoUpdate" })
    ],
    resolve: {
        alias
    }
});
