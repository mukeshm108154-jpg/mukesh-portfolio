import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const escapeRe = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const asText = (source) => (typeof source === 'string' ? source : new TextDecoder().decode(source))

// Inline the emitted CSS and JS into index.html so the build is one
// self-contained file. Opening dist/index.html straight from disk gives the
// document a "null" origin, where browsers refuse to load external module
// scripts and crossorigin stylesheets, which left the page completely blank.
function inlineAssets() {
  return {
    name: 'inline-assets',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const html = Object.values(bundle).find(
        (out) => out.type === 'asset' && out.fileName === 'index.html',
      )
      if (!html) return

      let source = asText(html.source)

      for (const [fileName, out] of Object.entries(bundle)) {
        if (out.type !== 'asset' || !fileName.endsWith('.css')) continue
        const tag = new RegExp(`<link[^>]*href="[^"]*${escapeRe(fileName)}"[^>]*>`)
        const css = asText(out.source)
        source = source.replace(tag, () => `<style>${css}</style>`)
        delete bundle[fileName]
      }

      for (const [fileName, out] of Object.entries(bundle)) {
        if (out.type !== 'chunk' || !out.isEntry) continue
        const code = out.code.replace(/<\/script/gi, '<\\/script')
        const tag = new RegExp(`<script[^>]*src="[^"]*${escapeRe(fileName)}"[^>]*>\\s*</script>`)
        // Function replacement: the bundle contains `$&` sequences that would
        // otherwise be expanded as replacement patterns.
        source = source.replace(tag, () => `<script type="module">\n${code}\n</script>`)
        delete bundle[fileName]
      }

      html.source = source
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), inlineAssets()],
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1400,
    rollupOptions: {
      output: {
        // One bundle, so nothing is fetched at runtime from a file:// page.
        codeSplitting: false,
      },
    },
  },
})
