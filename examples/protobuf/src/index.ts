import { CalenderEvent, Person, PhoneType } from './models';

{
  const json: Person = {
    name: 'Bob Smith',
    phones: [{ type: PhoneType.MOBILE, number: '+13033033003' }],
  };
  const person = Person.fromJSON(json);
  const buffer = Person.encode(json).finish();

  console.log(JSON.stringify(person));
  console.log('json:', JSON.stringify(json).length);
  console.log('proto:', buffer.length);
}

{
  const CDT = '-05:00'; // 03/13 - 11/06
  const json: CalenderEvent = {
    title: 'Spring Church Picnic',
    datetime: new Date(`2022-04-23T11:00:00${CDT}`),
    description:
      'Joins us at the Holly by the Sea Recreation Center Pavilion, 11 a.m. to 2 p.m., for our Spring Picnic and BBQ.',
    duration: 3,
    photo: '01GS16BWG5RBD63B16G05QCRGH',
  };
  const obj = CalenderEvent.fromJSON(json);
  const buffer = CalenderEvent.encode(json).finish();

  console.log(JSON.stringify(obj));
  console.log('json:', JSON.stringify(obj).length);
  console.log('proto:', buffer.length);
}
