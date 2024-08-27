global.chrome = {
    tabs: {
        query: async () => {
            throw new Error('Unimplemented.');
        },
    },
    runtime: {
        getURL: jest.fn((path) => path),
    },
};

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));
