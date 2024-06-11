import Minimap from '@/components/content/minimap/Minimap';
import { IMAGE_MINIMAP } from '@/constants';
import { getAllUniqueImageInPage } from '@/functions/get-image';
import { injectReact } from '@/functions/inject-react';
import { Image } from '@/types';

export const getImagesWithPosition = (images: Image[], bodyHeight: number) => {
    return images.reduce(
        (prev, cur) => {
            const percent = ((cur?.top || 0) / bodyHeight) * 100;
            const position = Math.floor(percent / 10);

            return [
                ...prev.slice(0, position),
                prev[position] ? [...(prev[position] || []), cur] : [],
                ...prev.slice(position + 1),
            ];
        },
        Array(10)
            .fill(1)
            .map(() => [] as Image[])
    );
};

export const showImageMinimap = () => {
    const data = getAllUniqueImageInPage();
    if (data.length === 0) return;
    injectReact(
        IMAGE_MINIMAP,
        <Minimap data={data} />,
        'css/image-minimap.css'
    );
};
