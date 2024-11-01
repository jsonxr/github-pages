/// "env" can be anything as long as it is passed in as an object in
///
/// pub extern "myenv" fn console_log(ptr: [*]const u8, len: usize) void;
///
///   const myenv = {
///     console_log
///   }
///   const { instance } = await WebAssembly.instantiateStreaming(
///     fetch('example.wasm'),
///     { myenv }
///   );
pub extern "env" fn console_log(ptr: [*]const u8, len: usize) void;

// "env" assumed when not specified?
pub extern fn console_error(ptr: [*]const u8, len: usize) void;
