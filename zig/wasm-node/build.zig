const std = @import("std");

pub fn build(b: *std.Build) void {
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
    b.installArtifact(wasm_module);

    const run_cmd = b.addSystemCommand(&[_][]const u8{ "node", "main.js" });
    const run_step = b.step("run", "Run the app");
    run_step.dependOn(&run_cmd.step);
}
