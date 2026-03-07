import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  searchHistory,
  getVisits,
  addUrl,
  deleteUrl,
  deleteRange,
  deleteAll,
  onVisited,
  onVisitRemoved,
} from '../index';

// Mock chrome.history
const mockHistoryItem: chrome.history.HistoryItem = {
  id: '1',
  url: 'https://example.com',
  title: 'Example',
  lastVisitTime: Date.now(),
  visitCount: 1,
};

const mockVisitItem: chrome.history.VisitItem = {
  id: '1',
  visitId: '1',
  url: 'https://example.com',
  visitTime: Date.now(),
  referrerId: '0',
};

const mockRemovedResult: chrome.history.RemovedResult = {
  allHistory: false,
  urls: ['https://example.com'],
};

beforeEach(() => {
  vi.clearAllMocks();
  
  global.chrome = {
    history: {
      search: vi.fn().mockResolvedValue([mockHistoryItem]),
      getVisits: vi.fn().mockResolvedValue([mockVisitItem]),
      addUrl: vi.fn().mockResolvedValue(undefined),
      deleteUrl: vi.fn().mockResolvedValue(undefined),
      deleteRange: vi.fn().mockResolvedValue(undefined),
      deleteAll: vi.fn().mockResolvedValue(undefined),
      onVisited: {
        addListener: vi.fn(),
        removeListener: vi.fn(),
      },
      onVisitRemoved: {
        addListener: vi.fn(),
        removeListener: vi.fn(),
      },
    },
  } as unknown as typeof chrome;
});

describe('searchHistory', () => {
  it('should search history with query options', async () => {
    const query = { text: 'example', maxResults: 10 };
    const result = await searchHistory(query);
    expect(chrome.history.search).toHaveBeenCalledWith(query);
    expect(result).toEqual([mockHistoryItem]);
  });

  it('should search history with time range', async () => {
    const startTime = Date.now() - 86400000;
    const endTime = Date.now();
    const query = { startTime, endTime };
    const result = await searchHistory(query);
    expect(chrome.history.search).toHaveBeenCalledWith(query);
    expect(result).toEqual([mockHistoryItem]);
  });
});

describe('getVisits', () => {
  it('should get visits for a URL', async () => {
    const url = 'https://example.com';
    const result = await getVisits(url);
    expect(chrome.history.getVisits).toHaveBeenCalledWith({ url });
    expect(result).toEqual([mockVisitItem]);
  });
});

describe('addUrl', () => {
  it('should add a URL to history', async () => {
    const url = 'https://example.com';
    await addUrl(url);
    expect(chrome.history.addUrl).toHaveBeenCalledWith({ url });
  });
});

describe('deleteUrl', () => {
  it('should delete a URL from history', async () => {
    const url = 'https://example.com';
    await deleteUrl(url);
    expect(chrome.history.deleteUrl).toHaveBeenCalledWith({ url });
  });
});

describe('deleteRange', () => {
  it('should delete history in time range', async () => {
    const startTime = Date.now() - 86400000;
    const endTime = Date.now();
    await deleteRange(startTime, endTime);
    expect(chrome.history.deleteRange).toHaveBeenCalledWith({ startTime, endTime });
  });
});

describe('deleteAll', () => {
  it('should delete all browsing history', async () => {
    await deleteAll();
    expect(chrome.history.deleteAll).toHaveBeenCalled();
  });
});

describe('onVisited', () => {
  it('should add and remove listener', () => {
    const callback = vi.fn();
    const unsubscribe = onVisited(callback);
    expect(chrome.history.onVisited.addListener).toHaveBeenCalled();
    unsubscribe();
    expect(chrome.history.onVisited.removeListener).toHaveBeenCalled();
  });

  it('should call callback when URL is visited', () => {
    const callback = vi.fn();
    const addListenerMock = chrome.history.onVisited.addListener as ReturnType<typeof vi.fn>;
    onVisited(callback);
    
    // Get the listener that was passed to addListener
    const listener = addListenerMock.mock.calls[0][0];
    
    // Call the listener directly with the mock data
    listener(mockHistoryItem);
    
    // The callback should have been called
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(mockHistoryItem);
  });
});

describe('onVisitRemoved', () => {
  it('should add and remove listener', () => {
    const callback = vi.fn();
    const unsubscribe = onVisitRemoved(callback);
    expect(chrome.history.onVisitRemoved.addListener).toHaveBeenCalled();
    unsubscribe();
    expect(chrome.history.onVisitRemoved.removeListener).toHaveBeenCalled();
  });

  it('should call callback when history is removed', () => {
    const callback = vi.fn();
    const addListenerMock = chrome.history.onVisitRemoved.addListener as ReturnType<typeof vi.fn>;
    onVisitRemoved(callback);
    
    // Get the listener that was passed to addListener
    const listener = addListenerMock.mock.calls[0][0];
    
    // Call the listener directly with the mock data
    listener(mockRemovedResult);
    
    // The callback should have been called
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(mockRemovedResult);
  });
});
