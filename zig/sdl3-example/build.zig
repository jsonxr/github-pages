const std = @import("std");

// Although this function looks imperative, note that its job is to
// declaratively construct a build graph that will be executed by an external
// runner.
pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const exe = b.addExecutable(.{
        .name = "my-project",
        .root_source_file = b.path("src/main.zig"),
        .target = target,
        .optimize = optimize,
    });

    const sdl_dep = b.dependency("sdl3", .{
        .optimize = .ReleaseFast,
        .target = target,
    });
    exe.linkLibrary(sdl_dep.artifact("SDL3"));

    b.installArtifact(exe);
}
