import { test } from "@japa/runner";

test.group("Sample test suite", () => {
  test("Sample test makes sure adding two numbers work", ({ assert }) => {
    // Test logic goes here
    assert.equal(1 + 1, 2);
  });
});
