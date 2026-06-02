const test = require("node:test");
const assert = require("node:assert/strict");
const { isAboutFoodyFlyPrompt } = require("./Genai");

test("matches the reported prompt variant", () => {
  assert.equal(isAboutFoodyFlyPrompt("tell me about it's"), true);
});

test("matches FoodyFly intro prompts", () => {
  assert.equal(isAboutFoodyFlyPrompt("Tell me about FoodyFly"), true);
});

test("does not match food recommendation prompts", () => {
  assert.equal(isAboutFoodyFlyPrompt("suggest spicy paneer"), false);
});
