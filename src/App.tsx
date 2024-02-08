import Empty from '@/components/comps/Empty';
import ImageTab from '@/components/comps/ImageTab';
import VideoItem from '@/components/comps/VideoItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ChromeActionEnum, ChromeResponse, Image, Video } from '@/types';
import { checkImage, sendChromeMessage } from '@/util';
import { useCallback, useEffect, useMemo, useState } from 'react';

function App() {
    const [images, setImages] = useState<Image[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [collecting, setCollecting] = useState<boolean>(false);

    const [selectedImage, setSelectedImage] = useState<string[]>([]);

    const onSelect = useCallback(
        (item: string) => {
            selectedImage.includes(item)
                ? setSelectedImage([
                      ...selectedImage.filter((itm) => itm !== item),
                  ])
                : setSelectedImage([...selectedImage, item]);
        },
        [selectedImage]
    );

    const onDownloadError = (src: string) => {
        setImages((prevImage) =>
            prevImage.map((item) =>
                item.src === src
                    ? { ...item, error: 'Error download images!' }
                    : item
            )
        );
    };

    const handleSelectAllImage = useCallback(() => {
        if (selectedImage.length === images.length) {
            setSelectedImage([]);
        } else {
            setSelectedImage([...images.map((item) => item.src)]);
        }
    }, [images, selectedImage.length]);

    const handleShowAllImage = () => {
        setCollecting(true);
        sendChromeMessage({
            type: ChromeActionEnum.COLLECT_IMAGE,
            callback: (tabs, response: ChromeResponse) => {
                const url = new URL(tabs[0].url ?? '');
                const domain = url.hostname;

                let images = response.images?.map((item) => {
                    return {
                        ...item,
                        src: checkImage(item.src, domain, tabs[0].url),
                    };
                });

                images = [
                    ...((new Map(
                        images?.map((item) => [item['src'], item])
                    ).values() as any) || []),
                ];

                setImages(images);
                setSelectedImage(images.map((item) => item.src));
                setCollecting(false);
            },
        });
    };

    useEffect(() => {
        sendChromeMessage({
            type: ChromeActionEnum.GET_DOM,
            callback: (tabs, response: ChromeResponse) => {
                const url = new URL(tabs[0].url ?? '');
                const domain = url.hostname;

                let images = response.images?.map((item) => {
                    return {
                        ...item,
                        src: checkImage(item.src, domain, tabs[0].url),
                    };
                });

                images = [
                    ...((new Map(
                        images?.map((item) => [item['src'], item])
                    ).values() as any) || []),
                ];

                setImages(images);
                setVideos(response?.videos ?? []);
                setSelectedImage(images.map((item) => item.src));
            },
        });
        return () => {
            chrome.storage.local.set({ images: [] });
        };
    }, []);

    const tabs = useMemo(
        () => [
            {
                value: 'image',
                title: 'Image',
                content: (
                    <ImageTab
                        loading={collecting}
                        images={images}
                        selectedImage={selectedImage}
                        onDownloadError={onDownloadError}
                        handleShowAllImage={handleShowAllImage}
                        handleSelectAllImage={handleSelectAllImage}
                        onSelect={onSelect}
                    />
                ),
            },
            {
                value: 'video',
                title: 'Video',
                content: (
                    <div className='grid gap-2'>
                        <ScrollArea className='max-h-[492px] pe-4'>
                            {videos.length ? (
                                <div className={cn('grid gap-2')}>
                                    {videos.map((video) => (
                                        <VideoItem
                                            key={video.src}
                                            data={video}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <Empty />
                            )}
                        </ScrollArea>
                    </div>
                ),
            },
        ],
        [
            collecting,
            handleSelectAllImage,
            images,
            onSelect,
            selectedImage,
            videos,
        ]
    );

    return (
        <div className='p-2 w-[632px] h-[584px]'>
            <Tabs defaultValue='image' className='w-full'>
                <TabsList>
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value}>
                            {tab.title}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value}>
                        {tab.content}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}

export default App;
