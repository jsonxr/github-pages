# Javascript

## Database

- [snaplet](https://docs.snaplet.dev/) - Snaplet gives developers production-accurate PostgreSQL data and preview databases that they can code against. It does this by capturing a 'snapshot' of a database, copying the schema, and providing a JavaScript runtime for transforming, reducing (subsetting) and generating synthetic data. Developers can then share these snapshots with their team for collaborative development.
- [SQL.js](https://sql.js.org/#/) - sql.js is a javascript SQL database. It allows you to create a relational database and query it entirely in the browser.
- [absurd-sql](https://github.com/jlongster/absurd-sql) - It implements a backend for sql.js (sqlite3 compiled for the web) that treats IndexedDB like a disk and stores data in blocks there. [Read blog post](https://jlongster.com/future-sql-web)
- [postgres wasm](https://github.com/snaplet/postgres-wasm) - A PostgreSQL server instance running in a virtual machine running in the browser
by Supabase & Snaplet. Useful for demos. [Read blog post](https://supabase.com/blog/postgres-wasm)

## Schema

- [avro](https://avro.apache.org/docs/) - Avro relies on schemas. When Avro data is read, the schema used when writing it is always present. This permits each datum to be written with no per-value overheads, making serialization both fast and small.
  - [avro-js](https://www.npmjs.com/package/avro-js) - Apache's Pure JavaScript implementation of the Avro specification.

- [Protocol Buffers](https://github.com/protocolbuffers/protobuf) - Protocol Buffers (a.k.a., protobuf) are Google's language-neutral, platform-neutral, extensible mechanism for serializing structured data.
  - [protobuf.js](https://github.com/protobufjs/protobuf.js/) - protobuf.js is a pure JavaScript implementation with TypeScript support for node.js and the browser. It's easy to use, blazingly fast and works out of the box with .proto files!
  - [explanation](https://blog.basyskom.com/2020/protobuf-for-iot) - Sending cost-optimized into the cloud
  - [compared to avro](https://blog.basyskom.com/2021/what-is-apache-avro-compared-to-protobuf)

- [json-schema](https://json-schema.org/)
  - [Experimental: JTD](https://jsontypedef.com/) - JSON Type Definition (JTD), for describing the shape of JavaScript Object Notation (JSON) messages. Its main goals are to enable code generation from schemas as well as portable validation with standardized error indicators. To this end, JTD is intentionally limited to be no more expressive than the type systems of mainstream programming languages.
  - [ajv](https://github.com/ajv-validator/ajv) - Implementation of json-schema
  - [@cfworker/json-schema](https://github.com/cfworker/cfworker/blob/main/packages/json-schema/README.md) - A JSON schema validator that will run on Cloudflare workers.
  - [quicktype.io](https://quicktype.io/) - Convert JSON into typesafe code in any language.
  - [jsonapi](https://jsonapi.org/) - A specification for building apis in json

- [Thrift](https://thrift.apache.org/) - The Apache Thrift software framework, for scalable cross-language services development, combines a software stack with a code generation engine to build services that work efficiently and seamlessly between C++, Java, Python, PHP, Ruby, Erlang, Perl, Haskell, C#, Cocoa, JavaScript, Node.js, Smalltalk, OCaml and Delphi and other languages.

- [yup](https://github.com/jquense/yup) - The original popular schema library
- [zod](https://zod.dev/) - The typescript friendly schema library before yup improved
- [valibot](https://valibot.dev) - leaner/faster version of zod
- [io-ts](https://gcanti.github.io/io-ts/) - random other one i barely looked at

## misc

- [ulid](https://github.com/ulid) - Universally-Unique, Lexicographically-Sortable Identifier
- [jose](https://github.com/panva/jose) - "JSON Web Almost Everything" - JWA, JWS, JWE, JWT, JWK, JWKS for Node.js, Browser, Cloudflare Workers, Deno, and other Web-interoperable runtimes.
- [revealjs](https://revealjs.com/#/2) - Html Presentation framework to show slides on web pages

