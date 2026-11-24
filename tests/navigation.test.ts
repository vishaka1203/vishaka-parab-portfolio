import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { Navigation } from "../src/components/navigation";

test("Home navigation targets the hero from every page", () => {
  const html = renderToString(createElement(Navigation));
  assert.match(html, /<a[^>]*href="\/#home"[^>]*>Home<\/a>/);
});
