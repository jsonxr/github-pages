const std = @import("std");

pub fn build_native(b: *std.Build) void {
    // wasm_module
    const exe = b.addExecutable(.{
        .name = "example",
        .optimize = .Debug,
        .target = b.host,
        .root_source_file = b.path("src/main.zig"),
    });
    b.installArtifact(exe);
}

pub fn build_wasm(b: *std.Build) void {
    // copy static files
    const staticFiles = b.addInstallDirectory(.{
        .source_dir = b.path("public"),
        .install_dir = .{ .custom = "web" },
        .install_subdir = "",
    });

    // wasm_module
    const wasm_module = b.addExecutable(.{
        .name = "example",
        .optimize = .ReleaseSmall,
        .target = b.resolveTargetQuery(.{
            .cpu_arch = .wasm32,
            .os_tag = .freestanding,
        }),
        .root_source_file = b.path("src/main.zig"),
    });
    wasm_module.rdynamic = true;
    wasm_module.entry = .disabled;
    wasm_module.import_symbols = true;
    wasm_module.step.dependOn(&staticFiles.step);

    // install

    const install_wasm = b.addInstallArtifact(wasm_module, .{ .dest_dir = .{
        .override = .{ .custom = "web" },
    } });
    b.default_step.dependOn(&install_wasm.step);

    //b.installArtifact(wasm_module);

    // run
    const server_cmd = b.addSystemCommand(&[_][]const u8{ "npx", "http-server", "./zig-out/web", "-S", "-C", "localhost.crt", "-K", "localhost.key" });
    const run_cmd = b.addSystemCommand(&[_][]const u8{ "open", "https://127.0.0.1:8080" });
    const run_step = b.step("run-web", "Run the app");
    run_step.dependOn(&server_cmd.step);
    run_step.dependOn(&run_cmd.step);
}

pub fn build(b: *std.Build) void {
    build_wasm(b);
    build_native(b);
}
