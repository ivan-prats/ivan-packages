export abstract class CustomError extends Error {
  abstract readonly name: string;

  constructor(
    message: string,
    public readonly metadata: Record<string, unknown> = {}
  ) {
    super(message);

    this.metadata = metadata;

    // fix the extended error prototype chain (set it as the actual class name of the error)
    Object.setPrototypeOf(this, new.target.prototype);

    if (Error.captureStackTrace) {
      // This clips the constructor invocation from the stack trace.
      // It's not absolutely essential, but it does make the stack trace a little nicer.
      Error.captureStackTrace(this, this.constructor);
    }

    Object.defineProperty(this, "stack", { enumerable: true });
  }

  public toJSON(): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    Object.getOwnPropertyNames(this).forEach((propertyName) => {
      if (typeof this[propertyName as keyof CustomError] === undefined) {
        return;
      }

      result[propertyName] = this[propertyName as keyof CustomError];
    });

    const validJsonResult = JSON.parse(JSON.stringify(result));
    return validJsonResult;
  }
}
