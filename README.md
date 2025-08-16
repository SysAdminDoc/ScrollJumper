# ScrollJumper · Right-click Scrollbar: Jump Top/Bottom

A lightweight, power-user friendly userscript that enhances scrolling behavior.  
Right-click on the scrollbar to instantly jump between the top and bottom of a page or scrollable element.

<p align="center">
  <img alt="ScrollJumper icon" src="https://raw.githubusercontent.com/SysAdminDoc/ScrollJumper/refs/heads/main/assets/ScrollJumperIcon.png" width="96">
</p>

- 🖱️ Right-click **at the top** → scrolls to the **bottom**
- 🖱️ Right-click **at the bottom** → scrolls to the **top**
- 🧩 Works on the **main page** and **nested scrollable elements**
- ⚡ No dependencies, minimal footprint

---

## ✨ Features

- 🧭 Smart targeting: prefers the scrollable container under your pointer near its scrollbar, otherwise falls back to the page
- ↔️ Horizontal support: right-click near the bottom scrollbar to jump **left** or **right**
- 📌 Sticky header/footer offsets: land precisely below/above fixed bars (global or per-site)
- 🎛️ Settings GUI: in-page modal for configuration, no persistent on-page toolbar
- ⌨️ Hotkeys: quick jumps and settings toggle
- 🔖 Bookmarks and 🕘 History: save a spot and jump back to it; step back to prior positions
- 🧠 Site-specific rules: whitelist/blacklist selectors, feature overrides, schedules, and custom metadata
- 🧾 JSON export/import: move your setup between browsers and machines
- 🧪 Overlay scrollbar helpers: width override and edge padding for precise hit-testing
- 🗂️ Same-origin iframe and Shadow DOM support

---

## 📥 Installation

1. Install a userscript manager:
   - Tampermonkey (Chrome, Edge, Safari, Firefox)
   - Violentmonkey (Chrome, Edge, Firefox)
   - Greasemonkey (Firefox)
2. Open the raw userscript to install or update:
   - https://raw.githubusercontent.com/SysAdminDoc/ScrollJumper/refs/heads/main/src/ScrollJumper.user.js
3. Approve the requested permissions in your userscript manager.

Updates are pulled automatically from the same URL.

---

## 🚀 Quick Start

- Right-click on the **vertical scrollbar** area to jump between **top** and **bottom**.  
- Right-click on the **bottom horizontal scrollbar** area to jump between **left** and **right**.  
- Press **Alt + Shift + S** to open the settings modal.  
- Tune jump percentage, sticky header/footer offsets, scrollbar detection width, and per-site rules.

---

## 🧠 How It Works

- **Hit test**: right-clicks near scrollbars are detected inside a configurable band next to page/element scrollbars.  
- **Target choice**: nested scrollables under the pointer are targeted first; otherwise the page.  
- **Split logic**: at top goes to bottom, at bottom goes to top, otherwise picks the nearest end based on pointer position.

---

## 🎚️ Settings & Customization

Open via **Alt + Shift + S** or the userscript menu.

**Global options**
- Enabled, Smooth scroll, Jump percent
- Edge padding, Minimum bar width, Scrollbar width override
- Top/Bottom epsilon
- Sticky header/footer offsets

**Feature toggles**
- Nested elements, Horizontal support, Bookmarks, History
- Double-click, Long-press, Middle-click toggle
- Iframe support, Shadow DOM awareness, Overlay adaptation
- Diagnostics (console notices)

**Site-specific**
- Enable override for current host
- Header/footer overrides
- Scrollbar width/edge padding overrides
- Whitelist/Blacklist selectors (CSV)
- Per-site feature toggles
- Optional schedules (days/time windows)
- Custom rule JSON (freeform)

**Actions**
- Save/Clear site rule
- Save bookmark, Jump bookmark, History back
- Export JSON, Import JSON
- Pause this tab

---

## ⌨️ Hotkeys

- **Alt + Shift + S** — Open/close settings  
- **Alt + Home** — Jump to top  
- **Alt + End** — Jump to bottom  
- **Alt + ↑ / Alt + ↓** — Jump up/down by configured percentage  

**Mouse modifiers (near a scrollbar)**
- Hold **Alt** — jump by percentage
- Hold **Ctrl** — jump to middle
- Hold **Shift** — smooth toggle

**Optional gestures**
- Double right-click → force top  
- Long right-press → force bottom  
- Middle-click near scrollbar → toggle ends

All are configurable in Features.

---

## 🧩 Site Rules

Per-site rules override global settings for that host. Configure on the site itself from the settings modal.

You can specify:
- Sticky header/footer offsets  
- Scrollbar width override and edge padding  
- Whitelist/Blacklist selectors  
- Per-site feature toggles  
- Schedules (days/times)  
- A freeform `custom` object for your own metadata

💡 **Tip for overlay scrollbars:** if your OS reports zero-width scrollbars, set a scrollbar width override (for example 12) and optionally increase edge padding.

---

## 🔄 JSON Export & Import

- **Export JSON** copies your entire configuration — global settings, site rules, and bookmarks — to the clipboard.  
- **Import JSON** restores a previously exported configuration.

Perfect for syncing across profiles, browsers, and machines.

---

## 🧰 Compatibility

- Chromium and Firefox with Tampermonkey or Violentmonkey  
- Greasemonkey supported with storage, clipboard, and menu APIs  
- Same-origin iframes supported (browser restrictions apply for cross-origin)  
- Shadow DOM targeting supported  

If you need to run on `chrome-extension://` URLs, your userscript manager and browser policy must allow it. Many managers do not inject into extension pages for security reasons.

---

## 🧯 Troubleshooting

- **Permissions-Policy / Origin-trial warnings** — emitted by the site, safe to ignore.  
- **`net::ERR_BLOCKED_BY_CLIENT`** — ad/privacy blockers stopping site telemetry; unrelated to ScrollJumper.  
- **Laggy on heavy pages** — try disabling Smooth scroll, lowering Jump percent, disabling Nested elements for that site, relaxing end detection (increase epsilons), and increasing Scrollbar width override and Edge padding.  
- **Targets a code editor instead of the page** — add a site-level blacklist selector such as `.CodeMirror, .monaco-editor, textarea`.  
- **Exclude a site** — use your userscript manager’s exclude list or Pause this tab from settings.

---

## 🗺️ File Structure

- `src/ScrollJumper.user.js` — main userscript
- `assets/ScrollJumperIcon.png` — icon asset
- `README.md` — this document
- `LICENSE` — GPL-3.0

---

## 📜 Changelog

**3.0.1**  
- Fix helper reference that could cause an error on right-click  
- Minor stability and UI polish

**3.0.0**  
- Full rewrite with in-page settings interface  
- Site rules, schedules, custom JSON, bookmarks, history  
- Horizontal support and nested element targeting

---

## 🔐 Security & Permissions

- Uses userscript storage for configuration  
- Optional clipboard access for exporting JSON  
- No bundled third-party libraries  
- No network calls by the script itself  
- Your configuration stays in your userscript manager storage

---

## 🤝 Contributing

Issues and pull requests are welcome. Ideas for a quick Exclude-site toggle and profile-sync presets are on the roadmap.

- Repository: https://github.com/SysAdminDoc/ScrollJumper
- Say hi, file an issue, or share site-specific rule presets!

---
