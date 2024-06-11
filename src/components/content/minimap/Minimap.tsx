import { IMAGE_MINIMAP } from '@/constants';
import { getImagesWithPosition, scrollIntoImage, viewImage } from '@/functions';
import { debounce } from '@/functions/debounce';
import { getId } from '@/functions/get-id';
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

const id = getId(IMAGE_MINIMAP);

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
            id={id}
            ref={ref}
            style={{
                width: size.width,
            }}
        >
            <div className='content'>
                {dataWithPosition?.map((group, index) => (
                    <div
                        key={index}
                        className='group-image'
                        style={{ top: `${index * 10}%` }}
                    >
                        {group?.map((item) => (
                            <img
                                className='image'
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
            <button
                className='close-button'
                onClick={() => closeReact(IMAGE_MINIMAP)}
            >
                X
            </button>
            <div
                className='viewport'
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
