import { Button } from '@/components/ui/button';
import { IMAGE_MINIMAP } from '@/constants';
import { getImagesWithPosition, scrollIntoImage, viewImage } from '@/functions';
import { debounce } from '@/functions/debounce';
import { closeReact } from '@/functions/inject-react';
import { useResize } from '@/hooks';
import { Image } from '@/types';
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react';

type TMinimapProps = {
    data: Image[];
};

function Minimap(props: TMinimapProps) {
    const { data = [] } = props;

    const bodyHeight = (document.querySelector('body')?.scrollHeight ||
        0) as number;

    const [position, setPosition] = useState<number>(0);
    const { ref, size } = useResize({ width: 136, height: bodyHeight });

    const viewportHeight = window.innerHeight;

    const dataWithPosition = useMemo(
        () => getImagesWithPosition(data, bodyHeight),
        [bodyHeight, data]
    );

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeReact(IMAGE_MINIMAP);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    useLayoutEffect(() => {
        const listener = () => {
            const position = Math.floor((window.scrollY / bodyHeight) * 100);
            setPosition(position);
        };
        const debounceListener = debounce(listener, 10);

        window.addEventListener('scroll', debounceListener);
        return () => {
            window.removeEventListener('scroll', debounceListener);
        };
    }, [bodyHeight]);

    return (
        <div
            ref={ref}
            style={{
                width: size.width,
            }}
            className='fixed top-0 right-0 min-w-34 w-auto h-full bg-black/50 z-[999999] flex justify-center items-center cursor-col-resize'
        >
            <div className='grid relative w-full h-full gap-0.5'>
                {dataWithPosition?.map((group, index) => (
                    <div
                        key={index}
                        className='grid grid-cols-[repeat(auto-fill,minmax(min(25%,64px),1fr))] absolute right-0 items-start z-[2] h-[10%] overflow-auto w-full py-0.5'
                        style={{ top: `${index * 10}%` }}
                    >
                        {group?.map((item) => (
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
                ))}
            </div>
            <Button
                className='absolute w-5 h-5 rounded-r-none top-0 right-full text-[8px]'
                onClick={() => closeReact(IMAGE_MINIMAP)}
            >
                X
            </Button>
            <div
                className='fixed bg-black/30 min-w-34 right-0 z-[1] p-1'
                style={{
                    width: size.width,
                    height: `${
                        (viewportHeight / bodyHeight) * viewportHeight
                    }px`,
                    top: `${position}%`,
                }}
            />
        </div>
    );
}

export default Minimap;
