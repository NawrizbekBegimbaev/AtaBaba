// Patches rollup to use WASM bindings instead of native .node binaries
// This is needed when Windows Application Control policy blocks .node files
import { copyFileSync, cpSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const wasmNative = join(root, 'node_modules/@rollup/wasm-node/dist/native.js');
const rollupNative = join(root, 'node_modules/rollup/dist/native.js');
const wasmDir = join(root, 'node_modules/@rollup/wasm-node/dist/wasm-node');
const rollupWasmDir = join(root, 'node_modules/rollup/dist/wasm-node');

if (existsSync(wasmNative) && existsSync(rollupNative)) {
  copyFileSync(wasmNative, rollupNative);
  if (existsSync(wasmDir) && !existsSync(rollupWasmDir)) {
    cpSync(wasmDir, rollupWasmDir, { recursive: true });
  }
  console.log('✓ Patched rollup to use WASM bindings');
} else {
  console.log('⚠ @rollup/wasm-node not found, skipping patch');
}
