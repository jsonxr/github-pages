- [Utility of nested objects](https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3)  Let typescript turn

  ```typescript
  type NestedKeyOf<ObjectType extends object> =
    {[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
      ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
      : `${Key}`
    }[keyof ObjectType & (string | number)];
  declare function sortBy<T extends object>(person: T, sort: NestedKeyOf<T>)

  const person = {
    name: 'bob',
    age: 30,
    dog: {
      owner: {
        name: 'mydog'
      }
    }
  }
  sortBy(person, "") // <- typescript shows valid options
  ```
