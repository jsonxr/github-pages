import { bundle } from '@hyperjump/json-schema/bundle';
import { addSchema } from '@hyperjump/json-schema/draft-2020-12';

import address from './schemas/address.schema.json' assert { type: 'json' };
import contact from './schemas/contact.schema.json' assert { type: 'json' };

console.log(address);
console.log(contact);

addSchema(address);
addSchema(contact);
const bundledSchema = await bundle('https://example.com/contact');
// console.log(bundledSchema);

import { compile } from 'json-schema-to-typescript';

console.log('compiling...');
const result = await compile(bundledSchema, 'Mine', {
  unreachableDefinitions: true,
});
console.log(result);
