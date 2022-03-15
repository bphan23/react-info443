/* global chrome */

import type {BrowserTheme} from 'react-devtools-shared/src/devtools/views/DevTools';

const IS_EDGE = navigator.userAgent.indexOf('Edg') >= 0;
const IS_FIREFOX = navigator.userAgent.indexOf('Firefox') >= 0;
const IS_CHROME = IS_EDGE === false && IS_FIREFOX === false;

export type BrowserName = 'Chrome' | 'Firefox' | 'Edge';

export function getBrowserName(): BrowserName {
  let selectedBrowserName;
  try {
    if (IS_EDGE) {
      selectedBrowserName = 'Edge';
    } else if (IS_FIREFOX) {
      selectedBrowserName = 'Firefox';
    } else {
      selectedBrowserName = 'Chrome';
    }
    return selectedBrowserName;
  } catch {
    return 'Expected browser name to be one of Chrome, Edge or Firefox.';
  }
}

export function getBrowserTheme(): BrowserTheme {
  if (IS_CHROME) {
    // chrome.devtools.panels added in Chrome 18.
    // chrome.devtools.panels.themeName added in Chrome 54.
    return chrome.devtools.panels.themeName === 'dark' ? 'dark' : 'light';
  } else {
    // chrome.devtools.panels.themeName added in Firefox 55.
    // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.panels/themeName
    if (chrome.devtools && chrome.devtools.panels) {
      switch (chrome.devtools.panels.themeName) {
        case 'dark':
          return 'dark';
        default:
          return 'light';
      }
    }
  }
}
