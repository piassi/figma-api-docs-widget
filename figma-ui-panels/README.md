# Figma UI Panels Directory - HTML Content Management

## Overview

This directory contains the HTML UI panels used by the Figma widget for creating custom UI experiences. Due to Figma's Content Security Policy (CSP) restrictions, we use a build-time embedding system to embed HTML content directly into the widget's TypeScript code.

## Why This Approach?

### The Challenge: Figma's CSP Restrictions

Figma widgets run in a sandboxed environment with strict Content Security Policy (CSP) that:

- Blocks external CDN script loading (e.g., Monaco Editor, CodeMirror)
- Requires `allowedDomains: ["none"]` in manifest.json for security
- Prevents dynamic script imports from external sources

This means popular code editors like Monaco Editor cannot be loaded directly via CDN, as seen in other projects that had to switch from Monaco to simpler alternatives.

### Our Solution: Build-Time HTML Embedding

Instead of trying to work around CSP restrictions or manually copying HTML content, we implemented an automated build-time embedding system that:

1. **Keeps HTML separate** - Edit clean, readable HTML UI panels in `figma-ui-panels/`
2. **Automatic embedding** - Build script reads HTML and generates TypeScript
3. **No manual copying** - Eliminates error-prone copy-paste workflows
4. **Clean separation** - HTML UI panels remain maintainable and version-controlled

## How It Works

### File Structure

```
figma-ui-panels/
├── README.md                    # This documentation
├── json-editor.html            # Source HTML UI panel
├── status-selector.html        # HTTP status selector UI panel
└── ...                         # Other HTML UI panels

widget-src/utils/
└── htmlLoader.ts               # Auto-generated TypeScript (DO NOT EDIT)

scripts/
└── embed-html.js               # Build script for HTML embedding
```

### Build Process

1. **Source**: Edit `figma-ui-panels/json-editor.html` with your HTML/CSS/JavaScript
2. **Embedding**: Build script reads HTML and generates `widget-src/utils/htmlLoader.ts`
3. **Compilation**: esbuild bundles the generated TypeScript with the widget
4. **Usage**: Widget imports and uses the HTML content via `figma.showUI()`

### Build Commands

```bash
# Manual embedding (when needed)
npm run embed-html

# Build with automatic embedding
npm run build

# Watch mode with automatic embedding
npm run watch
```

## References & Inspiration

This approach was inspired by the official Figma plugin ecosystem:

- **[Figma Code Snippet Editor](https://github.com/figma/code-snippet-editor-plugin)** - Official Figma plugin showing HTML content management
- **[Figma Plugin Samples](https://github.com/figma/plugin-samples)** - Official examples of UI integration patterns
- **[Figma Widget Samples](https://github.com/figma/widget-samples)** - Widget-specific examples and best practices

## Development Workflow

### Adding New HTML UI Panels

1. Create new HTML file in `figma-ui-panels/` directory
2. Add corresponding build script logic in `scripts/embed-html.js`
3. Generate TypeScript module in `widget-src/utils/`
4. Import and use in your widget components

### Updating Existing UI Panels

1. Edit the HTML file in `figma-ui-panels/` directory
2. Run `npm run embed-html` or `npm run build`
3. The TypeScript file is automatically regenerated
4. Changes are included in the next widget build

### Best Practices

- **Never edit generated TypeScript files** - They are overwritten on build
- **Keep HTML self-contained** - Include all CSS and JavaScript inline
- **Test in Figma environment** - CSP behavior differs from browser development
- **Use semantic versioning** - Track changes to HTML UI panels in git history

## Security Considerations

This approach maintains Figma's security model while providing flexibility:

- ✅ No external script loading
- ✅ All content is static and verified at build time
- ✅ CSP restrictions are respected
- ✅ Content is version-controlled and auditable

## Troubleshooting

### Common Issues

**TypeScript Import Errors**

- Solution: Run `npm run embed-html` to regenerate the TypeScript files

**HTML Not Updating**

- Solution: Ensure you ran the build script after editing HTML
- Check that `htmlLoader.ts` was regenerated with new content

**CSP Violations**

- Solution: Ensure all scripts and styles are inline
- No external CDN references in HTML UI panels

**Build Script Fails**

- Solution: Check HTML syntax and special characters
- Ensure proper escaping of backticks and template literals
