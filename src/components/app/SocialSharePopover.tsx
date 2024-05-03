import SocialShare, { TSocial } from '@/components/app/SocialShare';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { PropsWithChildren } from 'react';

const shareSocial: TSocial[] = ['facebook', 'twitter', 'telegram'];

type TSocialSharePopoverProps = {
    url: string;
};

function SocialSharePopover({
    children,
    ...props
}: PropsWithChildren<TSocialSharePopoverProps>) {
    const { url } = props;
    return (
        <Popover>
            <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
                {children}
            </PopoverTrigger>
            <PopoverContent avoidCollisions={false} className='w-fit'>
                <div className='grid grid-flow-col gap-1'>
                    {shareSocial.map((social) => (
                        <SocialShare key={social} url={url} social={social} />
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default SocialSharePopover;
