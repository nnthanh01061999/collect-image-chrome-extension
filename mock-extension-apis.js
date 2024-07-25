global.chrome = {
    tabs: {
        query: async () => {
            throw new Error('Unimplemented.');
        },
    },
};

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));
