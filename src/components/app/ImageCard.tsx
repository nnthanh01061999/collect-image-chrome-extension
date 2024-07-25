import ExifrPopover from '@/components/app/ExifrPopover';
import SocialSharePopover from '@/components/app/SocialSharePopover';
import Show from '@/components/condition/Show';
import { Button } from '@/components/ui/button';
import { markImage } from '@/functions';
import { cn } from '@/lib/utils';
import { ChromeActionEnum, Image } from '@/types';
import { downLoadImage, sendChromeMessage } from '@/util';
import {
    Bookmark,
    Check,
    Download,
    ExternalLink,
    Info,
    Share2,
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
                'group relative h-full min-h-20 cursor-pointer overflow-hidden rounded-md border border-input p-3',
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
                    className='h-full w-full object-contain'
                    src={imageSrc}
                    alt={data.alt}
                    onError={onLoadError}
                />
            </div>
            <div
                className={cn([
                    'border-t-1 absolute inset-x-0 -bottom-full grid w-full gap-1 p-0.5 shadow-sm transition-all group-hover:bottom-0',
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
                        title='View image'
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
                        title='Scroll to image'
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
                        <Bookmark size={16} />
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
                <span className='absolute right-0 top-0 rounded-bl-md border border-input bg-background p-1'>
                    <Check size={16} />
                </span>
            </Show>

            <Show when={!!data.error || false}>
                <span className='absolute inset-x-0 top-1/2 -translate-y-1/2 bg-destructive p-1 text-center text-white opacity-80'>
                    {data.error}
                </span>
            </Show>
            <span className='absolute left-0 top-0 grid grid-flow-col gap-1 rounded-br-md border border-l-0 border-t-0 border-input bg-background p-1'>
                <ExifrPopover url={data.src}>
                    <Info size={16} />
                </ExifrPopover>
                <SocialSharePopover url={data.src}>
                    <Share2 size={16} />
                </SocialSharePopover>
            </span>
        </div>
    );
}

export default ImageCard;
