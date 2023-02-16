export class SimpleIterator {
  #data;

  constructor(data: any) {
    this.#data = data;
  }

  [Symbol.iterator]() {
    // Use a new index for each iterator. This makes multiple
    // iterations over the iterable safe for non-trivial cases,
    // such as use of break or nested looping over the same iterable.
    let index = 0;

    return {
      // Note: using an arrow function allows `this` to point to the
      // one of `[@@iterator]()` instead of `next()`
      next: () => {
        if (index < this.#data.length) {
          return { value: this.#data[index++], done: false };
        } else {
          return { done: true };
        }
      },

      throw: (exception: any) => {
        console.log('iterator throw...', exception);
        return { done: true, value: undefined };
      },

      return: (value: any) => {
        console.log('iterator return...', value);
        return { done: true, value };
      },
    };
  }
}
