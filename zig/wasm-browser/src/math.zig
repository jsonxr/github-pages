extern fn print(i32) void;
extern fn hello(i32) void;

export fn add(a: i32, b: i32) void {
    print(a + b);
    hello(a + b);
}
