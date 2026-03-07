/**
 * Typed history helpers for Chrome extensions
 */
/**
 * Search browser history
 * @param query - Search query options
 * @returns Promise resolving to array of history items
 */
export async function searchHistory(query) {
    return chrome.history.search(query);
}
/**
 * Get visits for a specific URL
 * @param url - The URL to get visits for
 * @returns Promise resolving to array of visit items
 */
export async function getVisits(url) {
    return chrome.history.getVisits({ url });
}
/**
 * Add a URL to browser history
 * @param url - The URL to add
 */
export async function addUrl(url) {
    return chrome.history.addUrl({ url });
}
/**
 * Delete a URL from browser history
 * @param url - The URL to delete
 */
export async function deleteUrl(url) {
    return chrome.history.deleteUrl({ url });
}
/**
 * Delete history within a time range
 * @param startTime - Start time in milliseconds since epoch
 * @param endTime - End time in milliseconds since epoch
 */
export async function deleteRange(startTime, endTime) {
    return chrome.history.deleteRange({ startTime, endTime });
}
/**
 * Delete all browsing history
 */
export async function deleteAll() {
    return chrome.history.deleteAll();
}
/**
 * Listen for new visits to URLs
 * @param callback - Function to call when a URL is visited
 * @returns Unsubscribe function
 */
export function onVisited(callback) {
    const listener = (result) => {
        callback(result);
    };
    chrome.history.onVisited.addListener(listener);
    return () => {
        chrome.history.onVisited.removeListener(listener);
    };
}
/**
 * Listen for history removal
 * @param callback - Function to call when history is removed
 * @returns Unsubscribe function
 */
export function onVisitRemoved(callback) {
    const listener = (removed) => {
        callback(removed);
    };
    chrome.history.onVisitRemoved.addListener(listener);
    return () => {
        chrome.history.onVisitRemoved.removeListener(listener);
    };
}
