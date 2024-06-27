import ViewImage from '@/components/content/view-image/ViewImage';
import { VIEW_IMAGE } from '@/constants';
import { injectReact } from '@/functions/inject-react';

export const viewImage = (src: string) => {
    if (!src) return;
    injectReact(VIEW_IMAGE, <ViewImage src={src} />);
};
