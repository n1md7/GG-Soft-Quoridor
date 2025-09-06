import { ItemPayload, Store } from '@src/core/interfaces/store.interface.ts';

export class StoreManager {
  constructor(private readonly name: string) {}

  getBy(name: string) {
    name = this.serializeName(name);

    const item = this.getStore()?.[name];

    if (item) return item;

    return this.updateBy({ name, modes: {} });
  }

  updateBy({ name, modes, avatar }: ItemPayload) {
    name = this.serializeName(name);

    const store = this.getStore() ?? {};
    const item = store[name] ?? {
      name,
      avatar: avatar ?? '😀', // TODO: This needs rework
      modes: {
        easy: Infinity,
        medium: Infinity,
        hard: Infinity,
      },
    };
    const updatedAt = Date.now();

    if (modes.easy) item.modes.easy = { value: modes.easy, updatedAt };
    if (modes.medium) item.modes.medium = { value: modes.medium, updatedAt };
    if (modes.hard) item.modes.hard = { value: modes.hard, updatedAt };

    store[name] = item;

    this.save(store);

    return item;
  }

  private save(store: Store) {
    localStorage.setItem(this.name, this.serialize(store));
  }

  private getStore() {
    const data = this.readRawData();

    if (!data) return null;

    return this.deserialize(data);
  }

  private readRawData() {
    return localStorage.getItem(this.name);
  }

  private serialize(data: Store) {
    return JSON.stringify(data);
  }

  private deserialize(data: string) {
    try {
      return JSON.parse(data) as Store;
    } catch (error) {
      const message = this.getErrorMessage(error);
      throw new (class DeserializationError extends Error {
        constructor() {
          super(`Failed to deserialize store. Error: ${message}; Data: "${data}"`);
        }
      })();
    }
  }

  private getErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : String(error);
  }

  private serializeName(name: string) {
    return name.trim().toLowerCase().replace(/\s+/g, '_').slice(0, 16);
  }
}
