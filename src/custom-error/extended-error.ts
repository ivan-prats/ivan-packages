import { CustomError } from "./custom-error.js";

export class ExtendedError extends CustomError {
  public name = "ExtendedError" as const;

  constructor(
    message: string,
    metadata: Record<string, unknown>,
    public readonly cause: Error | CustomError
  ) {
    super(message, metadata);
  }

  public toJSON() {
    return {
      ...super.toJSON(),
      type: this.name,
      cause:
        "toJSON" in this.cause
          ? this.cause.toJSON()
          : {
              name: this.cause.name,
              message: this.cause.message,
              stack: this.cause.stack,
            },
    };
  }

  public static fromUnknown(
    message: string,
    metadata: Record<string, unknown>,
    unknownError: unknown
  ) {
    if (unknownError instanceof Error) {
      return new ExtendedError(
        message,
        {
          ...metadata,
          rawError: unknownError,
        },
        unknownError
      );
    }

    if (
      typeof unknownError === "object" &&
      unknownError !== null &&
      "message" in unknownError &&
      typeof (unknownError as Record<string, unknown>).message === "string" &&
      "stack" in unknownError &&
      typeof (unknownError as Record<string, unknown>).stack === "string" &&
      "name" in unknownError &&
      typeof (unknownError as Record<string, unknown>).name === "string"
    ) {
      return new ExtendedError(
        message,
        {
          ...metadata,
          rawError: unknownError,
        },
        unknownError as Error
      );
    }

    const error = new Error(
      "Unknown infrastructure error, check rawError metadata"
    );
    if (typeof unknownError === "object" && unknownError !== null) {
      return new ExtendedError(
        message,
        {
          ...metadata,
          rawError: unknownError,
        },
        Object.assign(error, unknownError)
      );
    }

    return new ExtendedError(
      message,
      {
        ...metadata,
        rawError: unknownError,
      },
      error
    );
  }
}
