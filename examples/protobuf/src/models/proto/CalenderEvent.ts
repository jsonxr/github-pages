/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "oikogen";

export interface CalenderEvent {
  title: string;
  description: string;
  datetime: Date | undefined;
  duration: number;
  photo?: string | undefined;
}

function createBaseCalenderEvent(): CalenderEvent {
  return { title: "", description: "", datetime: undefined, duration: 0, photo: undefined };
}

export const CalenderEvent = {
  encode(message: CalenderEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.datetime !== undefined) {
      Timestamp.encode(toTimestamp(message.datetime), writer.uint32(26).fork()).ldelim();
    }
    if (message.duration !== 0) {
      writer.uint32(32).int32(message.duration);
    }
    if (message.photo !== undefined) {
      writer.uint32(42).string(message.photo);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CalenderEvent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCalenderEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.datetime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.duration = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.photo = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CalenderEvent {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      datetime: isSet(object.datetime) ? fromJsonTimestamp(object.datetime) : undefined,
      duration: isSet(object.duration) ? globalThis.Number(object.duration) : 0,
      photo: isSet(object.photo) ? globalThis.String(object.photo) : undefined,
    };
  },

  toJSON(message: CalenderEvent): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.datetime !== undefined) {
      obj.datetime = message.datetime.toISOString();
    }
    if (message.duration !== 0) {
      obj.duration = Math.round(message.duration);
    }
    if (message.photo !== undefined) {
      obj.photo = message.photo;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CalenderEvent>, I>>(base?: I): CalenderEvent {
    return CalenderEvent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CalenderEvent>, I>>(object: I): CalenderEvent {
    const message = createBaseCalenderEvent();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.datetime = object.datetime ?? undefined;
    message.duration = object.duration ?? 0;
    message.photo = object.photo ?? undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
