// vite.config.js />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { nodeExternals } from 'rollup-plugin-node-externals'

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/scripts/index.ts'),
			name: 'Bin',
			fileName: 'bin',
			formats: ['es'],
		},
	},
  plugins: [
    nodeExternals(),
  ],
});
