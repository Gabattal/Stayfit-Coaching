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
        VitePWA({
            devOptions: {
                enabled: true
            },
            injectRegister: "auto",
            manifest: {
                name: "Stayfit Coaching",
                description: "Stayfit Coaching",
                icons: [
                    {
                        sizes: "192x192",
                        src: "pwa-192x192.png",
                        type: "image/png"
                    },
                    {
                        sizes: "512x512",
                        src: "pwa-512x512.png",
                        type: "image/png"
                    }
                ],
                short_name: "Stayfit",
                theme_color: "#ffffff"
            },
            registerType: "autoUpdate"
        })
    ],
    resolve: {
        alias
    },
    server: {
        host: "127.0.0.1",
        port: 5000
    }
});
