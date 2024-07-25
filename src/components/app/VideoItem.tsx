import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChromeActionEnum, Video } from '@/types';
import { sendChromeMessage } from '@/util';
import { Target } from 'lucide-react';

interface Props {
    data: Video;
}

function VideoItem(props: Props) {
    const { data } = props;

    const handleScrollInto = () => {
        sendChromeMessage({
            type: ChromeActionEnum.SCROLL_INTO_VIDEO,
            data: data.src,
        });
    };

    return (
        <div className={cn(['flex', 'bg-white'])}>
            <div className='grid w-full grid-cols-[548px,36px] items-center px-2'>
                <p id={data.src} className='whitespace-break-spaces break-all'>
                    {data.src}
                </p>
                <Button
                    title='Scroll into image'
                    size='sm'
                    variant='ghost'
                    onClick={handleScrollInto}
                >
                    <Target size={16} />
                </Button>
            </div>
        </div>
    );
}

export default VideoItem;
