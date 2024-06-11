import { VIEW_IMAGE } from '@/constants';
import { getId } from '@/functions/get-id';
import { closeReact } from '@/functions/inject-react';
import { useCallback, useEffect } from 'react';

type TViewImageProps = {
    src: string;
};

const id = getId(VIEW_IMAGE);

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
        <div id={id} onClick={() => closeReact(VIEW_IMAGE)}>
            <img
                className='content'
                src={src}
                alt={src}
                onClick={(e) => e.stopPropagation()}
            />
            <button
                className='close-button'
                onClick={() => closeReact(VIEW_IMAGE)}
            >
                Close
            </button>
        </div>
    );
}

export default ViewImage;
