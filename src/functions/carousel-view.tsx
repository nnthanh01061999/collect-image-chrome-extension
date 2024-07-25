import CarouselView from '@/components/content/carousel-view/CarouselView';
import { CAROUSEL_VIEW } from '@/constants';
import { getAllImageInPage } from '@/functions/get-image';
import { injectReact } from '@/functions/inject-react';

export const showCarouselView = () => {
    const { images } = getAllImageInPage();
    if (images.length === 0) return;
    injectReact(CAROUSEL_VIEW, <CarouselView data={images} />);
};
