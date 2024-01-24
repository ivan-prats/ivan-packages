import { Command, CommandHandler } from "../../src/command-bus/command-bus.js";
import { test } from "@japa/runner";
import { InMemoryCommandBus } from "../../src/command-bus/in-memory-command-bus.js";

test.group("InMemoryCommandBus tests", (group) => {
  let inMemoryCommandBus = new InMemoryCommandBus();

  group.each.setup(() => {
    inMemoryCommandBus = new InMemoryCommandBus();
  });

  test("Happy path: when registering and executing a command the expected response is returned", async ({
    assert,
  }) => {
    inMemoryCommandBus.register(
      ExclamatorCommand.prototype,
      new ExclamatorCommandHandler()
    );

    const commandResponse =
      await inMemoryCommandBus.execute<IExclamatorCommandHandlerResponse>(
        new ExclamatorCommand({ someString: "hola" })
      );

    assert.equal(commandResponse.someResultString, "hola!");
  });

  test("Happy path: when registering multiple commands, the correct one gets executed and the expected response is returned", async ({
    assert,
  }) => {
    inMemoryCommandBus.register(
      ExclamatorCommand.prototype,
      new ExclamatorCommandHandler()
    );
    inMemoryCommandBus.register(
      QuestionatorCommand.prototype,
      new QuestionatorCommandHandler()
    );

    const firstResponse =
      await inMemoryCommandBus.execute<IExclamatorCommandHandlerResponse>(
        new ExclamatorCommand({ someString: "hola" })
      );
    assert.equal(firstResponse.someResultString, "hola!");

    const secondResponse =
      await inMemoryCommandBus.execute<IQuestionatorCommandHandlerResponse>(
        new QuestionatorCommand({ someString: "hola" })
      );
    assert.equal(secondResponse.someResultString, "hola?");
  });
});

type ExclamatorCommandPayload = { someString: string };

class ExclamatorCommand extends Command<
  "ExclamatorCommand",
  ExclamatorCommandPayload
> {
  public get name() {
    return "ExclamatorCommand" as const;
  }

  constructor(public payload: ExclamatorCommandPayload) {
    super(payload);
  }
}

type IExclamatorCommandHandlerResponse = { someResultString: string };

class ExclamatorCommandHandler extends CommandHandler<
  ExclamatorCommand,
  IExclamatorCommandHandlerResponse
> {
  public async handle(
    command: ExclamatorCommand
  ): Promise<IExclamatorCommandHandlerResponse> {
    return {
      someResultString: command.payload.someString + "!",
    };
  }
}
type QuestionatorCommandPayload = { someString: string };

class QuestionatorCommand extends Command<
  "QuestionatorCommand",
  QuestionatorCommandPayload
> {
  public get name() {
    return "QuestionatorCommand" as const;
  }

  constructor(public payload: QuestionatorCommandPayload) {
    super(payload);
  }
}
type IQuestionatorCommandHandlerResponse = { someResultString: string };

class QuestionatorCommandHandler extends CommandHandler<
  QuestionatorCommand,
  IQuestionatorCommandHandlerResponse
> {
  public async handle(
    command: QuestionatorCommand
  ): Promise<IQuestionatorCommandHandlerResponse> {
    return {
      someResultString: command.payload.someString + "?",
    };
  }
}
