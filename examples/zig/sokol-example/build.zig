const std = @import("std");
const Build = std.Build;
const OptimizeMode = std.builtin.OptimizeMode;
const sokol = @import("sokol");

pub fn build(b: *Build) !void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const dep_sokol = b.dependency("sokol", .{
        .target = target,
        .optimize = optimize,
        .wgpu = if (target.query.os_tag == .emscripten) true else false,
    });

    // special case handling for native vs web build
    if (target.result.isWasm()) {
        try buildWeb(b, target, optimize, dep_sokol);
    } else {
        try buildNative(b, target, optimize, dep_sokol);
    }
}

// this is the regular build for all native platforms, nothing surprising here
fn buildNative(b: *Build, target: Build.ResolvedTarget, optimize: OptimizeMode, dep_sokol: *Build.Dependency) !void {
    const pacman = b.addExecutable(.{
        .name = "sokol-example",
        .target = target,
        .optimize = optimize,
        .root_source_file = b.path("src/main.zig"),
    });
    pacman.root_module.addImport("sokol", dep_sokol.module("sokol"));
    b.installArtifact(pacman);
    const run = b.addRunArtifact(pacman);
    b.step("run", "Run pacman").dependOn(&run.step);
}

// for web builds, the Zig code needs to be built into a library and linked with the Emscripten linker
fn buildWeb(b: *Build, target: Build.ResolvedTarget, optimize: OptimizeMode, dep_sokol: *Build.Dependency) !void {
    const pacman = b.addStaticLibrary(.{
        .name = "index",
        .target = target,
        .optimize = optimize,
        .root_source_file = b.path("src/main.zig"),
    });
    pacman.root_module.addImport("sokol", dep_sokol.module("sokol"));

    const sokol_backend: sokol.SokolBackend = sokol.SokolBackend.wgpu;

    // create a build step which invokes the Emscripten linker
    const emsdk = dep_sokol.builder.dependency("emsdk", .{
        .backend = sokol_backend,
    });
    const link_step = try sokol.emLinkStep(b, .{
        .lib_main = pacman,
        .target = target,
        .optimize = optimize,
        .emsdk = emsdk,
        .use_webgpu = true,
        .use_webgl2 = false,
        .use_emmalloc = true,
        .use_filesystem = false,
        .shell_file_path = dep_sokol.path("src/sokol/web/shell.html"),
        .extra_args = &.{"-sUSE_OFFSET_CONVERTER=1"},
    });
    // ...and a special run step to start the web build output via 'emrun'
    const run = sokol.emRunStep(b, .{ .name = "sokol-example", .emsdk = emsdk });
    run.step.dependOn(&link_step.step);
    b.step("run", "Run pacman").dependOn(&run.step);
}
