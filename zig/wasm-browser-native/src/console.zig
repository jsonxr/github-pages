const std = @import("std");
const builtin = @import("builtin");

pub const std_options = .{
    // Set the log level to info
    .log_level = .info,
};

const Level = enum {
    log,
    warn,
    err,
    info,
};

fn print(level: Level, comptime format: []const u8, args: anytype) void {
    if (builtin.target.isWasm()) {
        var buffer: [4096]u8 = undefined; // Temporary buffer used by console
        const console_log = @import("js_exports.zig").console_log;
        const console_error = @import("js_exports.zig").console_error;

        const result = std.fmt.bufPrint(&buffer, format, args) catch {
            const failure = "Failed to format";
            console_error(failure.ptr, failure.len);
            console_error(format.ptr, format.len);
            return;
        };

        switch (level) {
            .err => console_error(result.ptr, result.len),
            else => console_log(result.ptr, result.len),
        }
    } else {
        switch (level) {
            .err => std.log.err(format, args),
            else => std.log.info(format, args),
        }
    }
}

pub const console = struct {
    pub fn log(comptime format: []const u8, args: anytype) void {
        print(.log, format, args);
    }

    pub fn err(comptime format: []const u8, args: anytype) void {
        print(.err, format, args);
    }
};
