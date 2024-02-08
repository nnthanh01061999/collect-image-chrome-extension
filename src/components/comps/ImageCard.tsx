import Show from '@/components/condition/Show';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChromeActionEnum, Image } from '@/types';
import { downLoadImage, sendChromeMessage } from '@/util';
import { Check, Download, ExternalLink, Target, View } from 'lucide-react';
import { useState } from 'react';

interface Props {
    data: Image;
    selected: boolean;
    onSelect: () => void;
    onDownloadError: (src: string) => void;
}

function ImageCard(props: Props) {
    const { data, selected, onSelect, onDownloadError } = props;

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

    return (
        <div
            className={cn([
                'relative h-full group p-3 rounded-md border overflow-hidden cursor-pointer border-input',
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
                    'absolute inset-x-0 -bottom-full group-hover:bottom-0 shadow-sm p-0.5 transition-all w-full gap-1 grid grid-cols-4 border-t-1',
                    selected ? 'bg-accent' : 'bg-white',
                ])}
            >
                <Button
                    title='Download'
                    size='sm'
                    variant='ghost'
                    onClick={downLoadImage(data, onDownloadError)}
                >
                    <Download size={16} />
                </Button>
                <Button
                    title='Scroll into image'
                    size='sm'
                    variant='ghost'
                    onClick={handleViewImage}
                >
                    <View size={16} />
                </Button>
                <Button
                    title='View image in new tab'
                    size='sm'
                    variant='ghost'
                    onClick={handleOpenImage}
                >
                    <ExternalLink size={16} />
                </Button>
                <Button
                    title='Scroll into image'
                    size='sm'
                    variant='ghost'
                    onClick={handleScrollInto}
                >
                    <Target size={16} />
                </Button>
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
