/**
 * Command
 * Usage example:
 *
 * type ExclamatorCommandPayload = { someString: string };
 *
 * class ExclamatorCommand extends Command<
    "ExclamatorCommand",
    ExclamatorCommandPayload >
  {

    public get name() {
      return "ExclamatorCommand" as const;
    }

    constructor(public payload: ExclamatorCommandPayload) {
      super(payload);
    }
  }
 */
export abstract class Command<
  N extends string,
  P extends Record<string, unknown>
> {
  public abstract readonly name: N;
  constructor(public readonly payload: P) {}
}

/**
 * Command handler
 * Usage example:
 *
 * type IExclamatorCommandHandlerResponse = { someResultString: string };
 *
 * class ExclamatorCommandHandler extends CommandHandler<
    ExclamatorCommand,
    IExclamatorCommandHandlerResponse>

    {
    public async handle( command: ExclamatorCommand ):
    Promise< IExclamatorCommandHandlerResponse > {
      throw new Error('To implement');
    }
  }

 */
export abstract class CommandHandler<
  C extends Command<string, Record<string, unknown>>,
  R extends Record<string, unknown>
> {
  public abstract handle(command: C): Promise<R>;
}

export interface ICommandBus {
  register: <C extends Command<string, Record<string, unknown>>>(
    command: C,
    handler: CommandHandler<C, Record<string, unknown>>
  ) => void;

  execute: <R extends Record<string, unknown>>(
    command: Command<string, Record<string, unknown>>
  ) => Promise<R>;
}
