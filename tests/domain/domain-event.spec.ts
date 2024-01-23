import { DomainEvent } from "../../src/domain/domain-event.js";

type SampleDomainEventPayload = { some_string: string; some_number: number };

class SampleDomainEvent extends DomainEvent<
  "sample-domain-event",
  SampleDomainEventPayload
> {
  public name = "sample-domain-event" as const;
  public emitter = "some_emitter";
  public entityType = "some_entity";

  public fromObject(object: Record<string, unknown>): SampleDomainEvent {
    return new SampleDomainEvent("1234", {
      some_number: 1,
      some_string: "1",
    });
  }
}
