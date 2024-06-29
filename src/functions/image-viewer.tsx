import ImageViewer from '@/components/content/image-viewer/ImageViewer';
import { IMAGE_VIEWER } from '@/constants';
import { getAllImageInPage } from '@/functions/get-image';
import { injectReact } from '@/functions/inject-react';

export const showImageViewer = () => {
    const { images } = getAllImageInPage();
    if (images.length === 0) return;
    injectReact(IMAGE_VIEWER, <ImageViewer data={images} />);
};
