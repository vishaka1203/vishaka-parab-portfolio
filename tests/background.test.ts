import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { PortfolioBackground } from "../src/components/portfolio-background";

test("decorative background renders safely without browser globals", () => {
  const html = renderToString(createElement(PortfolioBackground));
  assert.match(html, /aria-hidden="true"/);
  assert.doesNotMatch(html, /tabindex|<button|<a /i);
});
