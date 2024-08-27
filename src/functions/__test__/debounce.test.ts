import { debounce } from '@/functions';

// function executes after specified delay
it('should execute function after specified delay', (done) => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);
    debouncedFn();
    expect(mockFn).not.toHaveBeenCalled();
    setTimeout(() => {
        expect(mockFn).toHaveBeenCalled();
        done();
    }, 150);
});
