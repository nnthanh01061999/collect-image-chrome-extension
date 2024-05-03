import ImageTab, { TImageTabProps } from '@/components/app/ImageTab';
import { CHROME_DATA, CHROME_TEMPLATE } from '@/constants';
import { Image } from '@/types';
import { useCallback, useEffect, useState } from 'react';

type TMarkTabProps = Pick<TImageTabProps, 'onDownloadError'>;

function MarkTab(props: TMarkTabProps) {
    const [data, setData] = useState<Image[]>([]);
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

    const handleSelectAllImage = useCallback(() => {
        if (selectedImage.length === data.length) {
            setSelectedImage([]);
        } else {
            setSelectedImage([...data.map((item) => item.src)]);
        }
    }, [data, selectedImage.length]);

    const onClearMark = () => {
        chrome.storage.sync.remove(CHROME_DATA).then(() => setData([]));
    };

    const unMarkImage = (src: string) => {
        const newData = data.filter((item) => item.src !== src);
        setData(newData);
        chrome.storage.sync.set({
            [CHROME_DATA]: JSON.stringify(newData),
        });
    };

    const loadLocalStorage = useCallback(() => {
        if (!chrome.tabs) return;
        chrome.tabs.query(
            {
                active: true,
                currentWindow: true,
            },
            () => {
                chrome.storage.sync
                    .get([CHROME_DATA, CHROME_TEMPLATE])
                    .then((result) => {
                        const data = result?.[CHROME_DATA] || '';
                        const parseData = data ? JSON.parse(data) : [];
                        setData(parseData);
                    });
            }
        );
    }, []);

    useEffect(() => {
        loadLocalStorage();
    }, [loadLocalStorage]);

    return (
        <ImageTab
            {...props}
            images={data}
            selectedImage={selectedImage}
            onSelect={onSelect}
            handleSelectAllImage={handleSelectAllImage}
            onClearMark={onClearMark}
            unMarkImage={unMarkImage}
        />
    );
}

export default MarkTab;
