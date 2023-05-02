import { defineConfig } from 'vite'; // eslint-disable-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react'; // eslint-disable-line import/no-extraneous-dependencies
import tsconfigPaths from 'vite-tsconfig-paths'; // eslint-disable-line import/no-extraneous-dependencies

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
    // proxy: {
    //   "/hello": "http://localhost:9000",
    //   "/api": "http://localhost:9000",
    // },
  },
  plugins: [react(), tsconfigPaths()],
});
