const std = @import("std");

pub fn build(b: *std.Build) void {
    // copy static files
    const staticFiles = b.addInstallDirectory(.{
        .source_dir = b.path("public"),
        .install_dir = std.Build.InstallDir.bin,
        .install_subdir = "",
    });

    // wasm_module
    const wasm_module = b.addExecutable(std.Build.ExecutableOptions{
        .name = "math",
        .optimize = .ReleaseSmall,
        .target = b.resolveTargetQuery(.{
            .cpu_arch = .wasm32,
            .os_tag = .freestanding,
        }),
        .root_source_file = b.path("src/math.zig"),
    });
    wasm_module.rdynamic = true;
    wasm_module.entry = .disabled;
    wasm_module.import_symbols = true;

    wasm_module.step.dependOn(&staticFiles.step);

    // install
    b.installArtifact(wasm_module);

    // run
    const server_cmd = b.addSystemCommand(&[_][]const u8{ "npx", "http-server", "./zig-out/bin", "-S", "-C", "localhost.crt", "-K", "localhost.key" });
    const run_cmd = b.addSystemCommand(&[_][]const u8{ "open", "https://127.0.0.1:8080" });
    const run_step = b.step("run-web", "Run the app");
    run_step.dependOn(&staticFiles.step);
    run_step.dependOn(&wasm_module.step);
    run_step.dependOn(&server_cmd.step);
    run_step.dependOn(&run_cmd.step);
}
