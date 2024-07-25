import { Button } from '@/components/ui/button';
import { IMAGE_VIEWER } from '@/constants';
import { closeReact, scrollIntoImage, viewImage } from '@/functions';
import { cn } from '@/lib/utils';
import { Assign, Image } from '@/types';
import { HTMLProps, useCallback, useEffect } from 'react';

type TImageViewerProps = Assign<
    HTMLProps<HTMLDivElement>,
    {
        data: Image[];
        showClose?: boolean;
    }
>;

function ImageViewer(props: TImageViewerProps) {
    const { data = [], showClose = true, className, ...rest } = props;

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
        <div
            {...rest}
            className={cn([
                'fixed right-0 top-0 z-[999999] flex h-full w-[50%] cursor-col-resize items-center justify-center bg-black/50',
                className,
            ])}
        >
            <div className='grid h-full w-full grid-cols-1 gap-0.5 overflow-auto'>
                {data?.map((item) => (
                    <img
                        className='h-auto w-full cursor-pointer object-contain'
                        key={item.src}
                        src={item.src}
                        alt={item.alt}
                        onClick={() => scrollIntoImage(item.src)}
                        onDoubleClick={() => viewImage(item.src)}
                    />
                ))}
            </div>
            {showClose && (
                <Button
                    className='absolute right-full top-0 h-5 w-5 rounded-r-none text-[8px]'
                    onClick={() => closeReact(IMAGE_VIEWER)}
                >
                    X
                </Button>
            )}
        </div>
    );
}

export default ImageViewer;
