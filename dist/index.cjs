"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  addUrl: () => addUrl,
  deleteAll: () => deleteAll,
  deleteRange: () => deleteRange,
  deleteUrl: () => deleteUrl,
  getVisits: () => getVisits,
  onVisitRemoved: () => onVisitRemoved,
  onVisited: () => onVisited,
  searchHistory: () => searchHistory
});
module.exports = __toCommonJS(index_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addUrl,
  deleteAll,
  deleteRange,
  deleteUrl,
  getVisits,
  onVisitRemoved,
  onVisited,
  searchHistory
});
