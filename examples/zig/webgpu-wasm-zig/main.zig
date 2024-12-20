const std = @import("std");

const c = @cImport({
    @cInclude("emscripten.h");
    @cInclude("emscripten/html5.h");
    @cInclude("emscripten/html5_webgpu.h");
    @cInclude("webgpu/webgpu.h");
    @cInclude("GLFW/glfw3.h");
    //@cInclude("glfw3webgpu.h");
});

const State = struct {
    // canvas
    canvas: struct {
        name: []const u8 = "",
        width: u32 = 0,
        height: u32 = 0,
    } = .{},

    // wgpu
    wgpu: struct {
        instance: c.WGPUInstance = null,
        device: c.WGPUDevice = null,
        queue: c.WGPUQueue = null,
        swapchain: c.WGPUSwapChain = null,
        pipeline: c.WGPURenderPipeline = null,
    } = .{},

    // resources
    res: struct {
        vbuffer: c.WGPUBuffer = null,
        ibuffer: c.WGPUBuffer = null,
        ubuffer: c.WGPUBuffer = null,
        bindgroup: c.WGPUBindGroup = null,
    } = .{},

    vars: struct {
        w: u32 = 0,
        h: u32 = 0,
        count: u32 = 1,
    } = .{},
};

var state = State{};

//--------------------------------------------------
// vertex and fragment shaders
//--------------------------------------------------

const shader_source =
    \\  @vertex
    \\  fn vs_main(@builtin(vertex_index) in_vertex_index: u32) -> @builtin(position) vec4f {
    \\      var p = vec2f(0.0, 0.0);
    \\      if (in_vertex_index == 0u) {
    \\          p = vec2f(-0.5, -0.5);
    \\      } else if (in_vertex_index == 1u) {
    \\        p = vec2f(0.5, -0.5);
    \\      } else {
    \\          p = vec2f(0.0, 0.5);
    \\      }
    \\      return vec4f(p, 0.0, 1.0);
    \\  }
    \\
    \\  @fragment
    \\  fn fs_main() -> @location(0) vec4f {
    \\      return vec4f(0.0, 0.4, 1.0, 1.0);
    \\  }
;

//--------------------------------------------------
//
// main
//
//--------------------------------------------------

pub fn main() !void {

    // In native, how do we open window???
    // glfwInit();
    // glfwWindowHint(GLFW_CLIENT_API, GLFW_NO_API);
    // glfwWindowHint(GLFW_RESIZABLE, GLFW_FALSE);
    // window = glfwCreateWindow(640, 480, "Learn WebGPU", nullptr, nullptr);

    //-----------------
    // init
    //-----------------
    state.canvas.name = "canvas";
    state.wgpu.instance = c.wgpuCreateInstance(null);
    defer c.wgpuInstanceRelease(state.wgpu.instance);
    state.wgpu.device = c.emscripten_webgpu_get_device();
    defer c.wgpuDeviceRelease(state.wgpu.device);
    state.wgpu.queue = c.wgpuDeviceGetQueue(state.wgpu.device);
    defer c.wgpuQueueRelease(state.wgpu.queue);

    _ = resize(0, null, null);
    _ = c.emscripten_set_resize_callback(2, null, false, resize); // use `EMSCRIPTEN_EVENT_TARGET_WINDOW` const

    //-----------------
    // Setup pipeline
    //-----------------

    // Compile shaders
    const shader_module = createShader(shader_source, "triangle");
    defer c.wgpuShaderModuleRelease(shader_module);

    const blend_state = c.WGPUBlendState{
        .color = .{
            .operation = c.WGPUBlendOperation_Add,
            .srcFactor = c.WGPUBlendFactor_SrcAlpha,
            .dstFactor = c.WGPUBlendFactor_OneMinusSrcAlpha,
        },
        .alpha = .{
            .operation = c.WGPUBlendOperation_Add,
            .srcFactor = c.WGPUBlendFactor_Zero,
            .dstFactor = c.WGPUBlendFactor_One,
        },
    };

    const color_target = c.WGPUColorTargetState{
        .format = c.WGPUTextureFormat_BGRA8Unorm,
        .blend = &blend_state,
        .writeMask = c.WGPUColorWriteMask_All,
    };

    const fragment_state = c.WGPUFragmentState{
        .module = shader_module,
        .entryPoint = "fs_main",
        .constantCount = 0,
        .constants = null,
        .targetCount = 1,
        .targets = &color_target,
    };

    const pipeline_desc = c.WGPURenderPipelineDescriptor{
        .layout = null,
        .vertex = .{
            .bufferCount = 1,
            .buffers = null, //.buffers = &vertex_buffer_layout,
            .module = shader_module,
            .entryPoint = "vs_main",
            .constantCount = 0,
            .constants = null,
        },
        .primitive = .{
            .topology = c.WGPUPrimitiveTopology_TriangleList,
            .stripIndexFormat = c.WGPUIndexFormat_Undefined,
            .frontFace = c.WGPUFrontFace_CCW,
            .cullMode = c.WGPUCullMode_None,
        },
        .fragment = &fragment_state,
        .depthStencil = null,
        .multisample = .{
            .count = 1,
            .mask = 0xFFFFFFFF,
            .alphaToCoverageEnabled = 0,
        },
    };

    state.wgpu.pipeline = c.wgpuDeviceCreateRenderPipeline(state.wgpu.device, &pipeline_desc);

    defer c.wgpuRenderPipelineRelease(state.wgpu.pipeline);

    //c.wgpuBindGroupLayoutRelease(bindgroup_layout);
    //c.wgpuPipelineLayoutRelease(pipeline_layout);
    //c.wgpuShaderModuleRelease(shader_triangle);

    //-----------------
    // Main loop
    //-----------------

    c.emscripten_set_main_loop(draw, 0, true);

    //-----------------
    // Quit
    //-----------------

    //c.wgpuRenderPipelineRelease(state.wgpu.pipeline);
    c.wgpuSwapChainRelease(state.wgpu.swapchain);
}

//--------------------------------------------------
// callbacks and functions
//--------------------------------------------------

fn draw() callconv(.C) void {
    // c.emscripten_console_logf("count: %d\n", state.vars.count);
    // state.vars.count += 1;

    // Create Texture View
    const back_buffer = c.wgpuSwapChainGetCurrentTextureView(state.wgpu.swapchain);
    defer c.wgpuTextureViewRelease(back_buffer);

    const render_pass_color_attachment = c.WGPURenderPassColorAttachment{
        .view = back_buffer,
        .resolveTarget = null,
        .loadOp = c.WGPULoadOp_Clear,
        .storeOp = c.WGPUStoreOp_Store,
        .clearValue = c.WGPUColor{ .r = 0.2, .g = 0.2, .b = 0.3, .a = 1.0 },
        .depthSlice = c.WGPU_DEPTH_SLICE_UNDEFINED,
    };

    const render_pass_desc = c.WGPURenderPassDescriptor{
        .label = "my render pass",
        .colorAttachmentCount = 1,
        .colorAttachments = &render_pass_color_attachment,
        .depthStencilAttachment = null,
        .timestampWrites = null,
    };

    // // Create Command Encoder
    const encoder_desc = c.WGPUCommandEncoderDescriptor{
        .label = "My command encoder",
    };
    const cmd_encoder = c.wgpuDeviceCreateCommandEncoder(state.wgpu.device, &encoder_desc);
    defer c.wgpuCommandEncoderRelease(cmd_encoder);

    const render_pass = c.wgpuCommandEncoderBeginRenderPass(cmd_encoder, &render_pass_desc);
    defer c.wgpuRenderPassEncoderRelease(render_pass);
    c.wgpuRenderPassEncoderSetPipeline(render_pass, state.wgpu.pipeline);
    c.wgpuRenderPassEncoderDraw(render_pass, 3, 1, 0, 0);
    c.wgpuRenderPassEncoderEnd(render_pass);

    const cmd_buffer_descriptor = &c.WGPUCommandBufferDescriptor{
        .label = "Command buffer",
    };
    const cmd_buffer = c.wgpuCommandEncoderFinish(cmd_encoder, cmd_buffer_descriptor);
    defer c.wgpuCommandBufferRelease(cmd_buffer);

    c.wgpuQueueSubmit(state.wgpu.queue, 1, &cmd_buffer);
}

fn resize(event_type: i32, ui_event: ?*const c.EmscriptenUiEvent, user_data: ?*anyopaque) callconv(.C) bool {
    _ = event_type;
    _ = ui_event;
    _ = user_data; // unused

    var w: f64 = 0;
    var h: f64 = 0;
    _ = c.emscripten_get_element_css_size(state.canvas.name.ptr, &w, &h);

    state.canvas.width = @intFromFloat(w);
    state.canvas.height = @intFromFloat(h);
    _ = c.emscripten_set_canvas_element_size(state.canvas.name.ptr, @intCast(state.canvas.width), @intCast(state.canvas.height));
    //c.emscripten_console_logf("canvas.size: %d x %d\n", state.canvas.width, state.canvas.height);

    if (state.wgpu.swapchain != null) {
        c.wgpuSwapChainRelease(state.wgpu.swapchain);
        state.wgpu.swapchain = null;
    }

    state.wgpu.swapchain = createSwapchain();

    return true;
}

fn createSwapchain() c.WGPUSwapChain {
    const surface = c.wgpuInstanceCreateSurface(state.wgpu.instance, &c.WGPUSurfaceDescriptor{
        .nextInChain = @ptrCast(&c.WGPUSurfaceDescriptorFromCanvasHTMLSelector{
            .chain = .{ .sType = c.WGPUSType_SurfaceDescriptorFromCanvasHTMLSelector },
            .selector = state.canvas.name.ptr,
        }),
    });

    return c.wgpuDeviceCreateSwapChain(state.wgpu.device, surface, &c.WGPUSwapChainDescriptor{
        .usage = c.WGPUTextureUsage_RenderAttachment,
        .format = c.WGPUTextureFormat_BGRA8Unorm,
        .width = @intCast(state.canvas.width),
        .height = @intCast(state.canvas.height),
        .presentMode = c.WGPUPresentMode_Fifo,
    });
}

fn createShader(code: [*:0]const u8, label: [*:0]const u8) c.WGPUShaderModule {
    const wgsl = c.WGPUShaderModuleWGSLDescriptor{
        .chain = .{ .sType = c.WGPUSType_ShaderModuleWGSLDescriptor },
        .code = code,
    };
    const shaderDesc: c.WGPUShaderModuleDescriptor = .{
        .nextInChain = @ptrCast(&wgsl),
        .label = label,
    };

    return c.wgpuDeviceCreateShaderModule(state.wgpu.device, &shaderDesc);
}

fn createBuffer(data: ?*const anyopaque, size: usize, usage: c.WGPUBufferUsage) c.WGPUBuffer {
    const buffer = c.wgpuDeviceCreateBuffer(state.wgpu.device, &c.WGPUBufferDescriptor{
        .usage = @as(c.enum_WGPUBufferUsage, c.WGPUBufferUsage_CopyDst) | usage,
        .size = size,
    });
    c.wgpuQueueWriteBuffer(state.wgpu.queue, buffer, 0, data, size);
    return buffer;
}
