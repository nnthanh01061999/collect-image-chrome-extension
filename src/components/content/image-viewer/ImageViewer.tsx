import { Button } from '@/components/ui/button';
import { IMAGE_VIEWER } from '@/constants';
import { scrollIntoImage, viewImage } from '@/functions';
import { closeReact } from '@/functions';
import { Image } from '@/types';
import { useCallback, useEffect } from 'react';

type TImageViewerProps = {
    data: Image[];
};

function ImageViewer(props: TImageViewerProps) {
    const { data = [] } = props;

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeReact(IMAGE_VIEWER);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className='fixed top-0 right-0 min-w-[50%] w-auto h-full bg-black/50 z-[999999] flex justify-center items-center cursor-col-resize'>
            <div className='grid grid-cols-1 w-full h-full gap-0.5'>
                {data?.map((item) => (
                    <img
                        className='object-contain w-full h-auto cursor-pointer'
                        key={item.src}
                        src={item.src}
                        alt={item.alt}
                        onClick={() => scrollIntoImage(item.src)}
                        onDoubleClick={() => viewImage(item.src)}
                    />
                ))}
            </div>
            <Button
                className='absolute w-5 h-5 rounded-r-none top-0 right-full text-[8px]'
                onClick={() => closeReact(IMAGE_VIEWER)}
            >
                X
            </Button>
        </div>
    );
}

export default ImageViewer;
