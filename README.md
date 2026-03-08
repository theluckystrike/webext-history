<div align="center">

# @theluckystrike/webext-history

Typed history helpers for Chrome extensions. Search, add, delete, and monitor browser history with full TypeScript support.

[![npm version](https://img.shields.io/npm/v/@theluckystrike/webext-history)](https://www.npmjs.com/package/@theluckystrike/webext-history)
[![npm downloads](https://img.shields.io/npm/dm/@theluckystrike/webext-history)](https://www.npmjs.com/package/@theluckystrike/webext-history)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@theluckystrike/webext-history)

[Installation](#installation) · [Quick Start](#quick-start) · [API](#api) · [License](#license)

</div>

---

## Features

- **Search** -- query history by text, time range, and max results
- **Visit details** -- get visit history for specific URLs
- **Add + delete** -- programmatically manage history entries
- **Event listeners** -- subscribe to URL visited and removed events
- **Typed** -- full TypeScript support for all history operations
- **Promise-based** -- async/await for every method

## Installation

```bash
npm install @theluckystrike/webext-history
```

<details>
<summary>Other package managers</summary>

```bash
pnpm add @theluckystrike/webext-history
# or
yarn add @theluckystrike/webext-history
```

</details>

## Quick Start

```typescript
import { History } from "@theluckystrike/webext-history";

const results = await History.search({ text: "github", maxResults: 10 });
const visits = await History.getVisits({ url: "https://github.com" });
await History.addUrl({ url: "https://example.com" });
await History.deleteUrl({ url: "https://example.com" });
```

## API

| Method | Description |
|--------|-------------|
| `search(query)` | Search history by text and time range |
| `getVisits(details)` | Get visit details for a URL |
| `addUrl(details)` | Add a URL to history |
| `deleteUrl(details)` | Delete a URL from history |
| `deleteRange(range)` | Delete history within a time range |
| `deleteAll()` | Clear all browsing history |
| `onVisited(callback)` | Listen for page visits |
| `onVisitRemoved(callback)` | Listen for history deletions |

## Permissions

```json
{ "permissions": ["history"] }
```

## Part of @zovo/webext

This package is part of the [@zovo/webext](https://github.com/theluckystrike) family -- typed, modular utilities for Chrome extension development:

| Package | Description |
|---------|-------------|
| [webext-storage](https://github.com/theluckystrike/webext-storage) | Typed storage with schema validation |
| [webext-messaging](https://github.com/theluckystrike/webext-messaging) | Type-safe message passing |
| [webext-tabs](https://github.com/theluckystrike/webext-tabs) | Tab query helpers |
| [webext-cookies](https://github.com/theluckystrike/webext-cookies) | Promise-based cookies API |
| [webext-i18n](https://github.com/theluckystrike/webext-i18n) | Internationalization toolkit |

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License -- see [LICENSE](LICENSE) for details.

---

<div align="center">

Built by [theluckystrike](https://github.com/theluckystrike) · [zovo.one](https://zovo.one)

</div>
