import ExifrInfo from '@/components/comps/ExifrInfo';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { PropsWithChildren, useState } from 'react';

type TExifrPopoverProps = {
    url: string;
};
function ExifrPopover({
    children,
    ...props
}: PropsWithChildren<TExifrPopoverProps>) {
    const { url } = props;
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
                {children}
            </PopoverTrigger>
            <PopoverContent align='start' side='bottom' avoidCollisions={false}>
                <div className='grid max-w-60 w-fit'>
                    <ExifrInfo url={url} enabled={open} />
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default ExifrPopover;
