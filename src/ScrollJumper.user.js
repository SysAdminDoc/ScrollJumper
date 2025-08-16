// ==UserScript==
// @name         ScrollJumper
// @namespace    https://github.com/SysAdminDoc/ScrollJumper
// @version      1.1.1
// @author       Matthew Parker
// @description  Right-click on a scrollbar: if you're at the top, jump to the bottom; if you're at the bottom, jump to the top. Works for the page and nested scrollable elements.
// @match        *://*/*
// @icon         https://raw.githubusercontent.com/SysAdminDoc/ScrollJumper/refs/heads/main/assets/icons/favicon.ico
// @grant        none
// @license      GPL-3.0
// @run-at       document-end
// @namespace    https://github.com/SysAdminDoc/ScrollJumper
// ==/UserScript==

(function () {
  'use strict';

  /**
   * Detect the scrollbar width of the current environment.
   * Some platforms use overlay scrollbars; return a reasonable fallback (15) if zero.
   */
  const fallbackSBW = 15;
  const scrollBarWidth = getScrollBarWidth() || fallbackSBW;

  // Slight padding so a click that’s clearly on the bar still counts.
  const EDGE_PADDING = 8;

  document.addEventListener('contextmenu', function (e) {
    // First: check if the right-click is on the main window's right scrollbar.
    const onWindowScrollbar = isPointOnRightScrollbar(
      e.clientX,
      e.clientY,
      window.innerWidth,
      window.innerHeight,
      scrollBarWidth,
      EDGE_PADDING
    );

    if (onWindowScrollbar) {
      // Decide direction based on current scroll position of the document.
      const { atTop, atBottom, maxScroll } = getScrollState(window);
      if (atTop) {
        window.scrollTo({ top: maxScroll, left: 0, behavior: 'auto' });
      } else if (atBottom) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // If not on the window scrollbar, look for a nested scrollable element
    // whose own RIGHT scrollbar area was clicked.
    const targetScrollable = findScrollableUnderPointer(e, scrollBarWidth, EDGE_PADDING);
    if (targetScrollable) {
      const { atTop, atBottom, maxScroll } = getScrollState(targetScrollable);
      if (atTop) {
        targetScrollable.scrollTo({ top: maxScroll, left: 0, behavior: 'auto' });
      } else if (atBottom) {
        targetScrollable.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
      e.preventDefault();
      e.stopPropagation();
    }
  });

  /**
   * Determine if the pointer is on the right scrollbar area of a box.
   */
  function isPointOnRightScrollbar(clientX, clientY, boxWidth, boxHeight, sbw, padding) {
    // If overlay scrollbars report width 0, use fallback.
    const w = sbw || fallbackSBW;
    const withinX = clientX >= boxWidth - w - padding && clientX <= boxWidth + padding;
    const withinY = clientY >= 0 && clientY <= boxHeight;
    return withinX && withinY;
  }

  /**
   * Find the closest scrollable ancestor whose right scrollbar area contains the pointer.
   * We climb the DOM from the event target and test each element.
   */
  function findScrollableUnderPointer(event, sbw, padding) {
    let el = event.target;
    while (el && el !== document.documentElement) {
      if (isElementScrollable(el)) {
        const rect = el.getBoundingClientRect();
        // Check if the click is inside this element horizontally and vertically
        const insideY = event.clientY >= rect.top && event.clientY <= rect.bottom;
        const insideX = event.clientX >= rect.left && event.clientX <= rect.right;
        if (insideX && insideY) {
          // Check if the click is on the element's right scrollbar region
          const onRightSB =
            event.clientX >= rect.right - (sbw || fallbackSBW) - padding &&
            event.clientX <= rect.right + padding;
          if (onRightSB) {
            return el;
          }
        }
      }
      el = el.parentElement;
    }
    return null;
  }

  /**
   * Whether an element can scroll vertically.
   */
  function isElementScrollable(el) {
    if (!(el instanceof Element)) return false;
    const style = getComputedStyle(el);
    const canScrollY =
      (style.overflowY === 'auto' || style.overflowY === 'scroll' || style.overflowY === 'overlay') &&
      el.scrollHeight > el.clientHeight;
    return canScrollY;
  }

  /**
   * Get current scroll state for window or an element.
   */
  function getScrollState(target) {
    const EPS = 2; // small tolerance for float rounding and subpixel layouts
    let scrollTop, clientHeight, scrollHeight;

    if (target === window) {
      const docEl = document.documentElement;
      // Prefer documentElement for standards mode
      scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : docEl.scrollTop;
      clientHeight = docEl.clientHeight;
      scrollHeight = docEl.scrollHeight;
    } else {
      scrollTop = target.scrollTop;
      clientHeight = target.clientHeight;
      scrollHeight = target.scrollHeight;
    }

    const maxScroll = Math.max(0, scrollHeight - clientHeight);
    const atTop = scrollTop <= EPS;
    const atBottom = scrollTop >= maxScroll - EPS;
    return { atTop, atBottom, maxScroll };
  }

  /**
   * Compute scrollbar width by measuring a forced-scroll element.
   */
  function getScrollBarWidth() {
    // Create an off-screen container with forced scrollbars
    const outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    outer.style.left = '-9999px';
    outer.style.width = '100px';
    outer.style.height = '100px';
    outer.style.overflow = 'scroll';
    outer.style.visibility = 'hidden';

    const inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '100%';
    outer.appendChild(inner);
    document.body.appendChild(outer);

    const width = outer.offsetWidth - inner.offsetWidth;
    outer.remove();
    return width;
  }
})();
