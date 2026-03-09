# @theluckystrike/webext-history

[![CI](https://github.com/theluckystrike/webext-history/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-history/actions)
[![npm](https://img.shields.io/npm/v/@theluckystrike/webext-history)](https://www.npmjs.com/package/@theluckystrike/webext-history)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Last commit](https://img.shields.io/github/last-commit/theluckystrike/webext-history)](https://github.com/theluckystrike/webext-history/commits/main)
[![Stars](https://img.shields.io/github/stars/theluckystrike/webext-history)](https://github.com/theluckystrike/webext-history)

Typed history helpers for Chrome extensions. Part of [@zovo/webext](https://github.com/theluckystrike/webext-toolkit).

## Installation

```bash
npm install @theluckystrike/webext-history
```

```bash
pnpm add @theluckystrike/webext-history
```

## Usage

```typescript
import {
  searchHistory,
  getVisits,
  addUrl,
  deleteUrl,
  deleteRange,
  deleteAll,
  onVisited,
  onVisitRemoved,
} from '@theluckystrike/webext-history';
```

## API Reference

### searchHistory

Search browser history.

```typescript
async function searchHistory(
  query: { 
    text: string; 
    startTime?: number; 
    endTime?: number; 
    maxResults?: number 
  }
): Promise<chrome.history.HistoryItem[]>
```

**Example:**
```typescript
const results = await searchHistory({ 
  text: 'example.com',
  maxResults: 10 
});
```

### getVisits

Get visits for a specific URL.

```typescript
async function getVisits(url: string): Promise<chrome.history.VisitItem[]>
```

**Example:**
```typescript
const visits = await getVisits('https://example.com');
```

### addUrl

Add a URL to browser history.

```typescript
async function addUrl(url: string): Promise<void>
```

**Example:**
```typescript
await addUrl('https://example.com');
```

### deleteUrl

Delete a URL from browser history.

```typescript
async function deleteUrl(url: string): Promise<void>
```

**Example:**
```typescript
await deleteUrl('https://example.com');
```

### deleteRange

Delete history within a time range.

```typescript
async function deleteRange(startTime: number, endTime: number): Promise<void>
```

**Example:**
```typescript
const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
await deleteRange(oneWeekAgo, Date.now());
```

### deleteAll

Delete all browsing history.

```typescript
async function deleteAll(): Promise<void>
```

**Example:**
```typescript
await deleteAll();
```

### onVisited

Listen for new visits to URLs.

```typescript
function onVisited(
  callback: (result: chrome.history.HistoryItem) => void
): () => void // Returns unsubscribe function
```

**Example:**
```typescript
const unsubscribe = onVisited((result) => {
  console.log('Visited:', result.url);
});

// Later, unsubscribe to stop listening
unsubscribe();
```

### onVisitRemoved

Listen for history removal.

```typescript
function onVisitRemoved(
  callback: (removed: { allHistory: boolean; urls?: string[] }) => void
): () => void // Returns unsubscribe function
```

**Example:**
```typescript
const unsubscribe = onVisitRemoved((removed) => {
  if (removed.allHistory) {
    console.log('All history was cleared');
  } else {
    console.log('Removed URLs:', removed.urls);
  }
});

// Later, unsubscribe to stop listening
unsubscribe();
```

## Project Structure

```
webext-history/
├── src/
│   ├── index.ts           # Main source with all history helpers
│   └── __tests__/
│       └── index.test.ts   # Unit tests
├── package.json           # Package configuration
├── tsconfig.json          # TypeScript configuration
├── LICENSE                # MIT license
├── CHANGELOG.md           # Version history
└── README.md              # This file
```

## License

MIT

---

Built at [zovo.one](https://zovo.one) by [theluckystrike](https://github.com/theluckystrike)
