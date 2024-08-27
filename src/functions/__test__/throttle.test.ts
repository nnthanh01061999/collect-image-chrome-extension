import { throttle } from '@/functions/throttle';

it('should execute the function when called with no arguments', (done) => {
    const fn = jest.fn();
    const throttledFn = throttle(fn, 100);
    throttledFn();
    setTimeout(() => {
        expect(fn).toHaveBeenCalled();
        done();
    }, 150);
});
