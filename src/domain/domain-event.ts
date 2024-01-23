type Primitive = number | string | boolean | null;
type Payload = Record<string, Primitive | Record<string, Primitive>>;

export type SerializedDomainEvent = {
  name: string;
  emitter: string;
  emitted_at: string;
  entity_id: string;
  entity_type: string;
  payload: Payload;
};

export abstract class DomainEvent<N extends string, P extends Payload> {
  public abstract name: N;
  public abstract emitter: string;
  public abstract entityType: string;

  constructor(
    public readonly entityId: string,
    public readonly payload: P,
    public readonly emittedAt: Date = new Date()
  ) {}

  public serialize(): SerializedDomainEvent {
    return JSON.parse(
      JSON.stringify({
        name: this.name,
        emitter: this.emitter,
        emitted_at: this.emittedAt.toISOString(),
        entity_id: this.entityId,
        entity_type: this.entityType,
        payload: this.payload,
      })
    );
  }

  public toJSON(): SerializedDomainEvent {
    return this.serialize();
  }

  public abstract fromObject(
    object: Record<string, unknown>
  ): DomainEvent<string, Payload>;
}
