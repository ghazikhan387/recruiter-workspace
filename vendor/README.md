# Recruiter Workspace — Vendored Dependencies

This directory contains the project's only third-party runtime dependency,
committed directly to the repository so the app runs with **zero build step
and zero package installation**.

## alpine.min.js

- **Library:** Alpine.js
- **Version:** 3.14.9
- **File:** `alpine.min.js` (CDN build, `dist/cdn.min.js`)
- **Source:** https://cdn.jsdelivr.net/npm/alpinejs@3.14.9/dist/cdn.min.js
  (byte-identical to `dist/cdn.min.js` in the official `alpinejs@3.14.9` npm
  tarball)
- **SHA-256:** `3ed1eed252488921df65e363d6715deb04d7f92aaedb9e52199fdf73cb1e0ad3`
- **License:** MIT (Copyright 2019 Caleb Porzio and contributors)
- **Purpose:** Lightweight reactive bindings for the application shell
  (navigation highlight, view switching). Required by ARCHITECTURE.md.

To upgrade deliberately, re-download the pinned CDN file, verify its SHA-256
against the corresponding npm tarball, and update this note.
