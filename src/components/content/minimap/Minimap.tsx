import ImageViewer from '@/components/content/image-viewer/ImageViewer';
import { Button } from '@/components/ui/button';
import { IMAGE_MINIMAP } from '@/constants';
import { getImagesWithPosition, scrollIntoImage, viewImage } from '@/functions';
import { debounce } from '@/functions/debounce';
import { closeReact } from '@/functions/inject-react';
import { useResize } from '@/hooks';
import { cn } from '@/lib/utils';
import { Image } from '@/types';
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

type CustomProperties = {
    '--right': string;
};

type MainContentStyleProps = React.CSSProperties & CustomProperties;

type TMinimapProps = {
    data: Image[];
};

function Minimap(props: TMinimapProps) {
    const { data = [] } = props;

    const bodyHeight = (document.querySelector('body')?.scrollHeight ||
        0) as number;

    const viewerRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState<number>(0);
    const [openViewer, setOpenViewer] = useState<boolean>(false);
    const { ref, size } = useResize({ width: 136, height: bodyHeight });

    const viewportHeight = window.innerHeight;

    const dataWithPosition = useMemo(
        () => getImagesWithPosition(data, bodyHeight),
        [bodyHeight, data],
    );

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeReact(IMAGE_MINIMAP);
        }
    }, []);

    const handleClose = useCallback(() => {
        if (openViewer) {
            setOpenViewer(false);
            return;
        }
        closeReact(IMAGE_MINIMAP);
    }, [openViewer]);

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
            className='fixed right-0 top-0 z-[999999] flex h-full w-auto min-w-34 cursor-col-resize items-center justify-center bg-black/50'
        >
            <div className='relative grid h-full w-full gap-0.5'>
                {dataWithPosition?.map((group, index) => (
                    <div
                        key={index}
                        className='absolute right-0 z-[2] grid h-[10%] w-full grid-cols-[repeat(auto-fill,minmax(min(25%,64px),1fr))] items-start overflow-auto py-0.5'
                        style={{ top: `${index * 10}%` }}
                    >
                        {group?.map((item) => (
                            <img
                                className='h-auto w-full cursor-pointer object-contain'
                                key={item.src}
                                src={item.src}
                                alt={item.alt}
                                onClick={() =>
                                    scrollIntoImage(
                                        item.src,
                                        openViewer
                                            ? viewerRef.current
                                            : undefined,
                                    )
                                }
                                onDoubleClick={() => viewImage(item.src)}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <Button
                className={cn([
                    'top-0 h-5 w-5 rounded-r-none text-[8px]',
                    openViewer ? 'fixed right-1/2' : 'absolute right-full',
                ])}
                onClick={handleClose}
            >
                X
            </Button>
            {!openViewer && (
                <Button
                    className='absolute right-full top-5 h-5 w-5 rounded-r-none text-[8px]'
                    onClick={() => setOpenViewer((prev) => !prev)}
                >
                    {chrome.i18n.getMessage('review')}
                </Button>
            )}
            {openViewer && (
                <ImageViewer
                    ref={viewerRef}
                    data={data}
                    style={
                        {
                            '--right': `${size.width}px`,
                        } as MainContentStyleProps
                    }
                    showClose={false}
                    className='right-[max(var(--right),136px)] w-[calc(50%-var(--right))] max-w-[calc(50%-136px)]'
                />
            )}
            <div
                className='fixed right-0 z-[1] min-w-34 bg-black/30 p-1'
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
