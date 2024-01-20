import { test } from "@japa/runner";
import { CustomError } from "../../src/custom-error/custom-error.js";

test.group("Custom Error tests", () => {
  test("The Error metadata is fully accessible when serializing", ({
    assert,
  }) => {
    const error = new SampleCustomError("hola", { hola: "adios" });
    assert.deepEqual(error.toJSON().metadata, {
      hola: "adios",
    });
  });

  test("The Error metadata undefined properties do not appear when serialized", ({
    assert,
  }) => {
    const error = new SampleCustomError("hola", {
      hola: "adios",
      thisShouldNotAppear: undefined,
    });
    assert.deepEqual(error.toJSON().metadata, {
      hola: "adios",
    });
  });
});

class SampleCustomError extends CustomError {
  public name: string = "SampleCustomError";
}
