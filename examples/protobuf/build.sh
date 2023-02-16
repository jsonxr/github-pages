#!/bin/sh

# Path to this plugin
PROTOC_GEN_TS_PATH="$PWD/node_modules/.bin/protoc-gen-ts"
#cat $PROTOC_GEN_TS_PATH

# Directory to write generated code to (.js and .d.ts files)
OUT_DIR="./src/models/proto"


protoc \
    -I=src/models/proto \
  --plugin=./node_modules/.bin/protoc-gen-ts_proto \
    --ts_proto_out="${OUT_DIR}" \
  CalenderEvent.proto Person.proto

# protoc \
#     -I=src/models/proto \
#     --plugin="protoc-gen-ts_proto=${PROTOC_GEN_TS_PATH}" \
#     --ts_proto_out="${OUT_DIR}" \
#     addressBook.proto


#     #--js_out="import_style=commonjs,binary:${OUT_DIR}" \