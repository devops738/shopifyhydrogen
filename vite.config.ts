import {reactRouter} from '@react-router/dev/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [...oxygen(), reactRouter()],
  build: {assetsInlineLimit: 0},
});
