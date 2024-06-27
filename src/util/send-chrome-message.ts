import { ChromeActionEnum, ChromeResponse } from '@/types';

export const sendChromeMessage = <T>({
    type,
    data,
    callback,
}: {
    type: ChromeActionEnum;
    data?: T;
    callback?: (tab: chrome.tabs.Tab[], response: ChromeResponse) => void;
}) => {
    if (!chrome.tabs) return;
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true,
        },
        (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id ?? 0,
                {
                    type,
                    data,
                },
                (res) => callback?.(tabs, res)
            );
        }
    );
};
