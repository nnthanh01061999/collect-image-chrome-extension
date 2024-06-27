import { VIEW_IMAGE } from '@/constants';
import { closeReact } from '@/functions/inject-react';
import { useCallback, useEffect } from 'react';

type TViewImageProps = {
    src: string;
};

function ViewImage(props: TViewImageProps) {
    const { src } = props;

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeReact(VIEW_IMAGE);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div
            className='fixed inset-0 bg-black/50 z-[99999999] flex justify-center items-center'
            onClick={() => closeReact(VIEW_IMAGE)}
        >
            <img
                className='contain w-auto h-auto cursor-pointer max-h-screen'
                src={src}
                alt={src}
                onClick={(e) => e.stopPropagation()}
            />
            <button
                className='absolute top-4 right-4'
                onClick={() => closeReact(VIEW_IMAGE)}
            >
                Close
            </button>
        </div>
    );
}

export default ViewImage;
