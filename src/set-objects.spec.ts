import { SetObjects } from "./set-objects";

interface MockObjectIdNumber {
  id: number;
}
interface MockObjectIdString {
  id: string;
}
interface MockObjectIdArray<T> {
  id: T[];
}
interface MockObjectIdObject<T extends Object> {
  id: T;
}

describe("constructor", () => {
  it("should handle an empty list", () => {
    const objects: never[] = [];
    const expected: never[] = [];
    const result: never[] = [...new SetObjects(objects)];
    expect(result).toEqual(expected);
  });

  it("should handle a list of objects with id of type number", () => {
    const objects: MockObjectIdNumber[] = [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 1,
      },
      {
        id: 2,
      },
    ];

    const expected: MockObjectIdNumber[] = [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ];

    const result: MockObjectIdNumber[] = [...new SetObjects(objects)];

    expect(result).toEqual(expected);
  });

  it("should handle a list of objects with id of type string", () => {
    const objects: MockObjectIdString[] = [
      {
        id: '1',
      },
      {
        id: '2',
      },
      {
        id: '3',
      },
      {
        id: '1',
      },
      {
        id: '2',
      },
    ];

    const expected: MockObjectIdString[] = [
      {
        id: '1',
      },
      {
        id: '2',
      },
      {
        id: '3',
      },
    ];

    const result: MockObjectIdString[] = [...new SetObjects(objects)];
    
    expect(result).toEqual(expected);
  });

  it("should handle a list of objects with id of type array", () => {
    const objects: MockObjectIdArray<string>[] = [
      {
        id: ['1'],
      },
      {
        id: ['2'],
      },
      {
        id: ['3'],
      },
      {
        id: ['1'],
      },
      {
        id: ['1', '1'],
      },
      {
        id: ['2'],
      },
    ];

    const expected: MockObjectIdArray<string>[] = [
      {
        id: ['1'],
      },
      {
        id: ['2'],
      },
      {
        id: ['3'],
      },
      {
        id: ['1', '1'],
      },
    ];

    const result: MockObjectIdArray<string>[] = [...new SetObjects(objects)];
    
    expect(result).toEqual(expected);
  });

  it("should handle a list of objects with id of type object", () => {
    const objects: MockObjectIdObject<{value: string}>[] = [
      {
        id: {value: '1'},
      },
      {
        id: {value: '2'},
      },
      {
        id: {value: '3'},
      },
      {
        id: {value: '1'},
      },
      {
        id: {value: '11'},
      },
      {
        id: {value: '2'},
      },
    ];

    const expected: MockObjectIdObject<{value: string}>[] = [
      {
        id: {value: '1'},
      },
      {
        id: {value: '2'},
      },
      {
        id: {value: '3'},
      },
      {
        id: {value: '11'},
      },
    ];

    const result: MockObjectIdObject<{value: string}>[] = [...new SetObjects(objects)];
    
    expect(result).toEqual(expected);
  });
});
