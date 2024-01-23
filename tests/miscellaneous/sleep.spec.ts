import { test } from "@japa/runner";
import { sleep } from "../../src/miscellaneous/sleep.js";

test.group("Sleep misc method tests", () => {
  test("Method returns after waiting the specified time", async ({
    assert,
  }) => {
    await Promise.race([
      sleep(100),
      new Promise((_resolve, reject) => {
        setTimeout(
          () => reject("This promise should have not been rejected"),
          101
        );
      }),
    ]);

    await assert.rejects(async () => {
      await Promise.race([
        sleep(100),
        new Promise((_resolve, reject) => {
          setTimeout(
            () => reject(new Error("This promise should have been rejected")),
            99
          );
        }),
      ]);
    }, "This promise should have been rejected");
  });
});
