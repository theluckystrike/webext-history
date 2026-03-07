// src/index.ts
async function searchHistory(query) {
  return chrome.history.search(query);
}
async function getVisits(url) {
  return chrome.history.getVisits({ url });
}
async function addUrl(url) {
  return chrome.history.addUrl({ url });
}
async function deleteUrl(url) {
  return chrome.history.deleteUrl({ url });
}
async function deleteRange(startTime, endTime) {
  return chrome.history.deleteRange({ startTime, endTime });
}
async function deleteAll() {
  return chrome.history.deleteAll();
}
function onVisited(callback) {
  const listener = (result) => {
    callback(result);
  };
  chrome.history.onVisited.addListener(listener);
  return () => {
    chrome.history.onVisited.removeListener(listener);
  };
}
function onVisitRemoved(callback) {
  const listener = (removed) => {
    callback(removed);
  };
  chrome.history.onVisitRemoved.addListener(listener);
  return () => {
    chrome.history.onVisitRemoved.removeListener(listener);
  };
}
export {
  addUrl,
  deleteAll,
  deleteRange,
  deleteUrl,
  getVisits,
  onVisitRemoved,
  onVisited,
  searchHistory
};
