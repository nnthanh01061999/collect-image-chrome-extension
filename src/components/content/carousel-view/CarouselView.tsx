import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { CAROUSEL_VIEW } from '@/constants';
import { closeReact } from '@/functions';
import { cn } from '@/lib/utils';
import { Assign, Image } from '@/types';
import { HTMLProps, useCallback, useEffect, useState } from 'react';

type TCarouselViewProps = Assign<
    HTMLProps<HTMLDivElement>,
    {
        data: Image[];
    }
>;

function CarouselView(props: TCarouselViewProps) {
    const { data = [], className, ...rest } = props;

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeReact(CAROUSEL_VIEW);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div
            {...rest}
            className={cn([
                'fixed right-0 top-0 z-[999999] flex h-full w-full cursor-col-resize items-center justify-center bg-black/50',
                className,
            ])}
        >
            <div className='fixed left-1/2 top-3 -translate-x-1/2 rounded-sm bg-primary py-2 text-center text-sm text-black'>
                Slide {current} of {count}
            </div>
            <Carousel setApi={setApi} className='max-w-[90vw]'>
                <CarouselContent>
                    {data?.map((item) => (
                        <CarouselItem
                            key={item.src}
                            className='flex basis-full items-center justify-center'
                        >
                            <img
                                className='h-auto max-h-screen w-full cursor-pointer object-contain'
                                src={item.src}
                                alt={item.alt}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext />
                <CarouselPrevious />
            </Carousel>

            <Button
                className='absolute right-4 top-4'
                onClick={() => closeReact(CAROUSEL_VIEW)}
            >
                Close
            </Button>
        </div>
    );
}

export default CarouselView;
