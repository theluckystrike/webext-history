/**
 * Typed history helpers for Chrome extensions
 */
interface SearchQuery {
    text: string;
    startTime?: number;
    endTime?: number;
    maxResults?: number;
}
/**
 * Search browser history
 * @param query - Search query options
 * @returns Promise resolving to array of history items
 */
declare function searchHistory(query: SearchQuery): Promise<chrome.history.HistoryItem[]>;
/**
 * Get visits for a specific URL
 * @param url - The URL to get visits for
 * @returns Promise resolving to array of visit items
 */
declare function getVisits(url: string): Promise<chrome.history.VisitItem[]>;
/**
 * Add a URL to browser history
 * @param url - The URL to add
 */
declare function addUrl(url: string): Promise<void>;
/**
 * Delete a URL from browser history
 * @param url - The URL to delete
 */
declare function deleteUrl(url: string): Promise<void>;
/**
 * Delete history within a time range
 * @param startTime - Start time in milliseconds since epoch
 * @param endTime - End time in milliseconds since epoch
 */
declare function deleteRange(startTime: number, endTime: number): Promise<void>;
/**
 * Delete all browsing history
 */
declare function deleteAll(): Promise<void>;
/**
 * Listen for new visits to URLs
 * @param callback - Function to call when a URL is visited
 * @returns Unsubscribe function
 */
declare function onVisited(callback: (result: chrome.history.HistoryItem) => void): () => void;
/**
 * Listen for history removal
 * @param callback - Function to call when history is removed
 * @returns Unsubscribe function
 */
declare function onVisitRemoved(callback: (removed: {
    allHistory: boolean;
    urls?: string[];
}) => void): () => void;

export { type SearchQuery, addUrl, deleteAll, deleteRange, deleteUrl, getVisits, onVisitRemoved, onVisited, searchHistory };
