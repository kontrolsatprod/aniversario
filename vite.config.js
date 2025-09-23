// templates/landing-classica/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "./",                 // <- IMPORTANTE p/ funcionar em /especial/slug
    plugins: [react()],
    root: "src",
    publicDir: "../public",
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        sourcemap: false,
        rollupOptions: {
            input: "/src/main.jsx",
            output: {
                entryFileNames: "app.js",                 // nomes fixos
                assetFileNames: (chunk) => {
                    if (chunk.name && chunk.name.endsWith(".css")) return "app.css";
                    return "assets/[name][extname]";
                },
                chunkFileNames: "chunks/[name].js",
            },
        },
    },
});
