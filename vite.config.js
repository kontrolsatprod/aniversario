import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    root: "src",
    publicDir: "../public", // /mock/... fica acessível no dev
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        sourcemap: false,
        rollupOptions: {
            output: {
                entryFileNames: "app.js",
                assetFileNames: (a) => (a.name?.endsWith(".css") ? "app.css" : "assets/[name][extname]"),
                chunkFileNames: "chunks/[name].js",
            },
        },
    },
});
