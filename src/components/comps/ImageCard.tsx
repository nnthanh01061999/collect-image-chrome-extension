import Show from '@/components/condition/Show';
import { Button } from '@/components/ui/button';
import { markImage } from '@/functions/mark-image';
import { cn } from '@/lib/utils';
import { ChromeActionEnum, Image } from '@/types';
import { downLoadImage, sendChromeMessage } from '@/util';
import {
    Check,
    Download,
    ExternalLink,
    Save,
    Target,
    Trash,
    View,
} from 'lucide-react';
import { useState } from 'react';

interface Props {
    cols: number;
    data: Image;
    selected: boolean;
    mark?: boolean;
    onSelect: () => void;
    onDownloadError: (src: string) => void;
    unMarkImage?: (src: string) => void;
}

function ImageCard(props: Props) {
    const {
        cols,
        data,
        selected,
        mark = false,
        onSelect,
        onDownloadError,
        unMarkImage,
    } = props;

    const [imageSrc, setImageSrc] = useState(data.src);

    const handleOpenImage = () => {
        chrome.windows.create({ url: data.src, incognito: true });
    };

    const onLoadError = () => {
        setImageSrc('./images/no-image.png');
    };

    const handleScrollInto = () => {
        sendChromeMessage({
            type: ChromeActionEnum.SCROLL_INTO_IMAGE,
            data: data.src,
        });
    };

    const handleViewImage = () => {
        sendChromeMessage({
            type: ChromeActionEnum.VIEW_IMAGE,
            data: data.src,
        });
    };

    const onMarkImage = () => markImage(data);

    const onUnMarkImage = () => unMarkImage?.(data.src);

    return (
        <div
            className={cn([
                'relative h-full group p-3 rounded-md border overflow-hidden cursor-pointer border-input min-h-20',
                selected ? 'shadow-sm' : '',
                selected ? 'bg-accent' : 'bg-white',
                data.error ? 'opacity-70' : 'opacity-100',
            ])}
            onClick={onSelect}
        >
            <div
                className={cn([
                    'block',
                    data.error ? 'opacity-50' : 'opacity-100',
                ])}
            >
                <img
                    className='object-contain w-full h-full'
                    src={imageSrc}
                    alt={data.alt}
                    onError={onLoadError}
                />
            </div>
            <div
                className={cn([
                    'absolute grid inset-x-0 -bottom-full group-hover:bottom-0 shadow-sm p-0.5 transition-all w-full gap-1  border-t-1',
                    selected ? 'bg-accent' : 'bg-white',
                    mark
                        ? cols < 3
                            ? 'grid-cols-5'
                            : 'grid-cols-3'
                        : 'grid-cols-3',
                ])}
                onClick={(e) => e.stopPropagation()}
            >
                <Button
                    title='Download'
                    size='sm'
                    variant='ghost'
                    onClick={downLoadImage(data, onDownloadError)}
                >
                    <Download size={16} />
                </Button>
                {mark && (
                    <Button
                        title='Scroll into image'
                        size='sm'
                        variant='ghost'
                        onClick={handleViewImage}
                    >
                        <View size={16} />
                    </Button>
                )}
                <Button
                    title='View image in new tab'
                    size='sm'
                    variant='ghost'
                    onClick={handleOpenImage}
                >
                    <ExternalLink size={16} />
                </Button>
                {mark && (
                    <Button
                        title='Scroll into image'
                        size='sm'
                        variant='ghost'
                        onClick={handleScrollInto}
                    >
                        <Target size={16} />
                    </Button>
                )}
                {mark ? (
                    <Button
                        title='Mark'
                        size='sm'
                        variant='ghost'
                        onClick={onMarkImage}
                    >
                        <Save size={16} />
                    </Button>
                ) : (
                    <Button
                        title='UnMark'
                        size='sm'
                        variant='ghost'
                        onClick={onUnMarkImage}
                    >
                        <Trash size={16} />
                    </Button>
                )}
            </div>
            <Show when={selected}>
                <span className='absolute right-0 top-0 bg-background rounded-bl-md p-1 border-input border'>
                    <Check size={16} />
                </span>
            </Show>
            <Show when={!!data.error || false}>
                <span className='absolute inset-x-0 text-center top-1/2 -translate-y-1/2 p-1 opacity-80 bg-destructive text-white'>
                    {data.error}
                </span>
            </Show>
        </div>
    );
}

export default ImageCard;
