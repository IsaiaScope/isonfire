import { resolve } from 'path';
import { defineConfig } from 'vite';
import { nodeExternals } from 'rollup-plugin-node-externals';
import pkg from './package.json' assert { type: 'json' };

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/scripts/index.ts'),
			name: 'Bin',
			fileName: 'bin',
			formats: ['cjs'], // Use CommonJS format for CLI tools
		},
		outDir: 'dist',
	},
	plugins: [nodeExternals()],
	define: {
		PKG_VERSION: `"${pkg.version}"`,
		PKG_NAME: `"${pkg.name}"`,
	},
});
