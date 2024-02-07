import { Video } from '@/types';

export const scrollIntoVideo = (src: string) => {
    Array.from(document.getElementsByTagName<'video'>('video'))
        .filter((link) => !link.getAttribute('id')?.includes('preview'))
        .map((link) => {
            if (link.getAttribute('src')) {
                return {
                    src: link.getAttribute('src') ?? '',
                    type: link.getAttribute('type') ?? '',
                    element: link,
                };
            } else {
                return Array.from(
                    link.getElementsByTagName<'source'>('source')
                ).map((source: any) => ({
                    src: source.getAttribute('src') ?? '',
                    type: source.getAttribute('type') ?? '',
                    element: link,
                }));
            }
        })
        .reduce(
            (prev: (Video & { element: HTMLVideoElement })[], cur) => [
                ...prev,
                ...(Array.isArray(cur) ? cur : [cur]),
            ],
            []
        )
        .forEach((video) => {
            if (video.src === src)
                video.element.scrollIntoView({
                    behavior: 'smooth',
                });
        });
};
