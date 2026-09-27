/**
 * js/dom.js
 * ------------------------------------------------------------------
 * Generic DOM construction helpers shared by all page modules.
 *
 * SECURITY CONVENTION (DEVELOPMENT_RULES.md Rule 16): nodes are built
 * exclusively via createElement/setAttribute/createTextNode. Dynamic
 * text NEVER goes through innerHTML — this is the pattern the future
 * template-variable substitution (PRD §13) must keep using to avoid
 * stored XSS.
 * ------------------------------------------------------------------
 */

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class') {
      node.className = value;
    } else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2), value);
    } else if (value !== undefined && value !== null) {
      node.setAttribute(key, String(value));
    }
  }
  for (const child of [].concat(children)) {
    if (child == null) continue;
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}
