import * as Benchmark from "benchmark";
import { SetObjects } from "./src/set-objects";

/**
 * This file contains a benchmark suite to compare the performance of two functions:
 * - filterListWithUniqueId: The classic prod function that I come accross too often
 * - createSetObjects: Uses the SetObjects class to create a set of objects with unique ids.
 *
 * The benchmark suite tests these functions with varying sizes of mock object arrays (10, 100, 1000, 10000, 100000, 1000000).
 *
 * To run the benchmark:
 * 1. Execute: npx tsc benchmark.ts --downlevelIteration
 * 2. Execute: node benchmark.js
 */

interface MockObject {
  id: number;
}

function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateMockObjects(count: number): MockObject[] {
  return shuffle(
    [...Array(count).keys()].map((i) => {
      return {
        id: i % 1000,
      };
    })
  );
}

function filterListWithUniqueId(objects: MockObject[]): MockObject[] {
  const result: MockObject[] = [];
  for (const object of objects) {
    if (!result.some((elem) => elem.id === object.id)) {
      result.push(object);
    }
  }
  return result;
}

function createSetObjects(objects: MockObject[]): MockObject[] {
  return [...new SetObjects(objects, (object) => object.id)];
}

const mockObjects10: MockObject[] = generateMockObjects(10);
const mockObjects100: MockObject[] = generateMockObjects(100);
const mockObjects1000: MockObject[] = generateMockObjects(1000);
const mockObjects10000: MockObject[] = generateMockObjects(10000);
const mockObjects100000: MockObject[] = generateMockObjects(100000);
const mockObjects1000000: MockObject[] = generateMockObjects(1000000);

// Create a new benchmark suite
const suite = new Benchmark.Suite();

// Add tests to the suite
suite
  // filterListWithUniqueId
  .add("filterListWithUniqueId 10", () => {
    filterListWithUniqueId(mockObjects10);
  })
  .add("filterListWithUniqueId 100", () => {
    filterListWithUniqueId(mockObjects100);
  })
  .add("filterListWithUniqueId 1000", () => {
    filterListWithUniqueId(mockObjects1000);
  })
  .add("filterListWithUniqueId 10000", () => {
    filterListWithUniqueId(mockObjects10000);
  })
  .add("filterListWithUniqueId 100000", () => {
    filterListWithUniqueId(mockObjects100000);
  })
  .add("filterListWithUniqueId 1000000", () => {
    filterListWithUniqueId(mockObjects1000000);
  })

  // createSetObjects
  .add("createSetObjects 10", () => {
    createSetObjects(mockObjects10);
  })
  .add("createSetObjects 100", () => {
    createSetObjects(mockObjects100);
  })
  .add("createSetObjects 1000", () => {
    createSetObjects(mockObjects1000);
  })
  .add("createSetObjects 10000", () => {
    createSetObjects(mockObjects10000);
  })
  .add("createSetObjects 100000", () => {
    createSetObjects(mockObjects100000);
  })
  .add("createSetObjects 1000000", () => {
    createSetObjects(mockObjects1000000);
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
