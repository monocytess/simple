import {defineConfig} from "vite";
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // resolve: {
  // 	alias: {
  // 		"@": fileURLToPath(new URL("./src", import.meta.url))
  // 	}
  // }
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  }
});