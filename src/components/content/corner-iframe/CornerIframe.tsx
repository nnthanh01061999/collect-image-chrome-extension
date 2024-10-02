import { InputSearch } from '@/components/input/InputSearch';
import { CORNER_IFRAME } from '@/constants';
import { closeReact } from '@/functions/inject-react';
import { useCallback, useEffect, useRef, useState } from 'react';

function CornerIframe() {
    const [url, setUrl] = useState<string>();
    const ref = useRef<HTMLDivElement>(null);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeReact(CORNER_IFRAME);
        }
        if (event.key === 'Backspace') {
            setUrl(undefined);
        }
    }, []);

    useEffect(() => {
        const element = ref.current;
        window.addEventListener('keydown', handleKeyDown);
        element?.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            element?.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown, ref]);

    return (
        <div
            ref={ref}
            className='fixed bottom-0 left-0 z-[999999] w-fit cursor-nesw-resize resize overflow-auto border bg-white p-4 active:cursor-grabbing'
        >
            {!url ? (
                <InputSearch value={url} onChange={setUrl} />
            ) : (
                <iframe className='h-full w-full' title={url} src={url} />
            )}
        </div>
    );
}

export default CornerIframe;
