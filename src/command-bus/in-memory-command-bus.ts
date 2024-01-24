import { Command, CommandHandler, ICommandBus } from "./command-bus.js";

export class InMemoryCommandBus implements ICommandBus {
  private commandToHandlerMap = new Map<
    string,
    CommandHandler<
      Command<string, Record<string, unknown>>,
      Record<string, unknown>
    >
  >();

  public register<C extends Command<string, Record<string, unknown>>>(
    command: C,
    handler: CommandHandler<C, Record<string, unknown>>
  ) {
    if (this.commandToHandlerMap.has(command.name)) {
      throw new Error(
        `A command with the name "${command.name}" has already been registered in this command bus. This implementation only allows a 1:1 relationship between command and handler.`
      );
    }
    this.commandToHandlerMap.set(command.name, handler);
  }

  public async execute<R extends Record<string, unknown>>(
    command: Command<string, Record<string, unknown>>
  ) {
    const handler = this.commandToHandlerMap.get(command.name);
    if (!handler) {
      throw new Error(
        `No handler was found for the command name "${command.name}"`
      );
    }

    return handler.handle(command) as unknown as R;
  }
}
