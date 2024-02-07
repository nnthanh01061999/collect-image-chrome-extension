import Show from '@/components/condition/Show';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChromeActionEnum, Image } from '@/types';
import { downLoadImage, sendChromeMessage } from '@/util';
import { Check, Download, ExternalLink, Target } from 'lucide-react';

interface Props {
    data: Image;
    selected: boolean;
    onSelect: () => void;
    onDownloadError: (src: string) => void;
}

function ImageItem(props: Props) {
    const { data, selected, onSelect, onDownloadError } = props;

    const handleOpenImage = () => {
        chrome.windows.create({ url: data.src, incognito: true });
    };

    const handleScrollInto = () => {
        sendChromeMessage({
            type: ChromeActionEnum.SCROLL_INTO_IMAGE,
            data: data.src,
        });
    };

    return (
        <div
            className={cn([
                'flex space-y-1',
                selected ? 'bg-accent' : 'bg-white',
            ])}
            onClick={onSelect}
        >
            <div className='p-2 w-full grid-cols-[440px,36px,36px,36px,36px] grid items-start'>
                <p
                    id={data.src}
                    className='whitespace-break-spaces cursor-pointer break-all'
                >
                    {data.src}
                </p>
                <Button
                    title='Download'
                    size='sm'
                    variant='ghost'
                    onClick={downLoadImage(data, onDownloadError)}
                >
                    <Download size={16} />
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
                <Show when={selected}>
                    <Button size='sm' variant='ghost'>
                        <Check size={16} />
                    </Button>
                </Show>
            </div>

            <Show when={!!data.error || false}>
                <div className='flex'>
                    <span className='absolute inset-x-0 left-1/2 -translate-y-1/2 bg-background p-1'>
                        {data.error}
                    </span>
                </div>
            </Show>
        </div>
    );
}

export default ImageItem;
