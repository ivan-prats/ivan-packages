import { test } from "@japa/runner";
import { ExtendedError } from "../../src/custom-error/extended-error.js";
import { CustomError } from "../../src/custom-error/custom-error.js";

test.group("Extended Error tests", () => {
  test("When the Error is a native Error, The error in the cause is fully accessible when serializing", ({
    assert,
  }) => {
    const innerError = new Error("Inner error");
    const extendedError = new ExtendedError(
      "Hola",
      { some: "metadata" },
      innerError
    );

    assert.deepEqual(extendedError.toJSON().cause, {
      message: innerError.message,
      name: innerError.name,
      stack: innerError.stack,
    });
  });

  test("When the Error is a CustomError, The error in the cause is fully accessible when serializing", ({
    assert,
  }) => {
    const innerError = new SampleCustomError("Inner error", {
      metadataOf: "inner error",
    });
    const extendedError = new ExtendedError(
      "Hola",
      { some: "metadata" },
      innerError
    );

    assert.deepEqual(extendedError.toJSON().cause, innerError.toJSON());
  });

  test("When the Error is another ExtendedError, The error in the cause is fully accessible when serializing, as well as its cause", ({
    assert,
  }) => {
    const innerInnerError = new SampleCustomError("Inner error", {
      metadataOf: "inner inner error",
    });
    const innerError = new ExtendedError(
      "Inner error",
      { metadataOf: "inner error" },
      innerInnerError
    );
    const extendedError = new ExtendedError(
      "Hola",
      { some: "metadata" },
      innerError
    );

    assert.deepEqual(extendedError.toJSON().cause, {
      ...innerError.toJSON(),
      cause: innerInnerError.toJSON(),
    });
  });
});

class SampleCustomError extends CustomError {
  public name: string = "SampleCustomError";
}
