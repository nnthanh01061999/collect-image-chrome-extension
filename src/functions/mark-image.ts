import { CHROME_DATA } from '@/constants';
import { Image } from '@/types';

export const markImage = (data: Image) => {
    chrome.storage.sync.get(CHROME_DATA).then((result) => {
        const chromeData = result?.[CHROME_DATA] || '';
        const dataParse = chromeData ? JSON.parse(chromeData) : [];
        const newData = [
            {
                ...data,
                time: new Date().toISOString(),
            },
            ...dataParse,
        ];
        const uniqueData = [
            ...((new Map(
                newData.map((item) => [item['src'], item])
            ).values() as any) || []),
        ];
        chrome.storage.sync.set({
            [CHROME_DATA]: JSON.stringify(uniqueData),
        });
    });
};
