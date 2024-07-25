import { Button } from '@/components/ui/button';
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
            className='fixed inset-0 z-[99999999] flex items-center justify-center bg-black/50'
            onClick={() => closeReact(VIEW_IMAGE)}
        >
            <img
                className='object-left-topcontain h-auto max-h-screen w-auto cursor-pointer'
                src={src}
                alt={src}
                onClick={(e) => e.stopPropagation()}
            />
            <Button
                className='absolute right-4 top-4'
                onClick={() => closeReact(VIEW_IMAGE)}
            >
                Close
            </Button>
        </div>
    );
}

export default ViewImage;
