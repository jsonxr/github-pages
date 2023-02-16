import { SimpleIterator } from './SimpleIterator';

const simple = new SimpleIterator([1, 2, 3, 4, 5]);

for (const val of simple) {
  console.log(val); // 1 2 3 4 5
}
