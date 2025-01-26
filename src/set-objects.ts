export class SetObjects<T> {
  private readonly objectsMap: Map<string, T> = new Map();

  constructor(objects: T[], key?: keyof T) {
    for (const object of objects) {
      this.add(object, key);
    }
  }

  add(object: T, key?: keyof T): this {
    const keyString: string = this.getKeyString(object, key);
    if (!this.hasKeyString(keyString)) {
      this.objectsMap.set(keyString, object);
    }
    return this;
  }

  has(object: T, key?: keyof T): boolean {
    const keyString: string = this.getKeyString(object, key);
    return this.hasKeyString(keyString);
  }

  private getKeyString(object: T, key?: keyof T): string {
    let keyString: string;
    if (key == null) {
      // Fallback if key is not provided
      keyString = JSON.stringify(object);
    } else if (key instanceof String) {
      keyString = key as string;
    } else {
      // Should handle any type of key provided
      keyString = JSON.stringify(object[key]);
    }
    return keyString;
  }

  private hasKeyString(keyString: string): boolean {
    return this.objectsMap.has(keyString);
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.objectsMap.values();
  }
}
