// vite.config.js (raiz)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "./",
    plugins: [react()],
    root: "src",
    publicDir: "../public",
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        sourcemap: false,
        rollupOptions: {
            output: {
                entryFileNames: "app.js",
                assetFileNames: (asset) => {
                    // quando o Vite extrai CSS, o nome costuma vir como "style.css"
                    if (asset.name && asset.name.endsWith(".css")) return "app.css";
                    return "assets/[name][extname]";
                },
                chunkFileNames: "chunks/[name].js",
            },
        },
    },
});
