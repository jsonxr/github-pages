const c = @cImport({
    @cInclude("SDL2/SDL.h");
});

pub const WindowOptions = struct {
    title: [*:0]const u8 = "Hello World",
    x: ?u16 = null,
    y: ?u16 = null,
    width: u16 = 800,
    height: u16 = 600,
};

pub const Window = struct {
    options: WindowOptions,

    pub fn init(options: WindowOptions) Window {
        return Window{ .options = options };
    }
    pub fn deinit(_: Window) void {}
    pub fn start(self: Window) !void {
        if (c.SDL_Init(c.SDL_INIT_VIDEO & c.SDL_INIT_AUDIO) != 0) {
            c.SDL_Log("Unable to initialize SDL: %s", c.SDL_GetError());
            return error.SDLInitializationFailed;
        }
        defer c.SDL_Quit();

        const x: c_int = self.options.x orelse c.SDL_WINDOWPOS_UNDEFINED;
        const y: c_int = self.options.y orelse c.SDL_WINDOWPOS_UNDEFINED;

        const screen = c.SDL_CreateWindow(self.options.title, x, y, self.options.width, self.options.height, c.SDL_WINDOW_OPENGL) orelse
            {
            c.SDL_Log("Unable to create window: %s", c.SDL_GetError());
            return error.SDLInitializationFailed;
        };
        defer c.SDL_DestroyWindow(screen);
        // const renderer = c.SDL_CreateRenderer(screen, -1, 0) orelse {
        //     c.SDL_Log("Unable to create renderer: %s", c.SDL_GetError());
        //     return error.SDLInitializationFailed;
        // };
        // defer c.SDL_DestroyRenderer(renderer);

        var quit = false;

        while (!quit) {
            var event: c.SDL_Event = undefined;
            while (c.SDL_PollEvent(&event) != 0) {
                switch (event.type) {
                    c.SDL_QUIT => {
                        quit = true;
                    },
                    else => {},
                }
            }

            // _ = c.SDL_RenderClear(renderer);
            // c.SDL_RenderPresent(renderer);

            c.SDL_Delay(10);
        }
    }
};
