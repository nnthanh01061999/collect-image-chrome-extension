import { ChromeActionEnum } from '@/types';

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: ChromeActionEnum.VIEW_IMAGE,
        title: 'View image',
        contexts: ['image'],
    });

    chrome.contextMenus.create({
        id: ChromeActionEnum.CTX_SHOW_VIDEO,
        title: 'Show Video',
        contexts: ['all'],
    });

    chrome.contextMenus.create({
        id: ChromeActionEnum.CTX_MARK_IMAGE,
        title: 'Mark image',
        contexts: ['image'],
    });

    chrome.contextMenus.create({
        id: ChromeActionEnum.CTX_JUST_SHOW_VIDEO,
        title: 'Just show video',
        contexts: ['all'],
    });

    chrome.contextMenus.create({
        id: ChromeActionEnum.CTX_JUST_SHOW_IMAGE,
        title: 'Just show image',
        contexts: ['all'],
    });

    chrome.contextMenus.create({
        id: ChromeActionEnum.CTX_SHOW_IMAGE_MINIMAP,
        title: 'Show minimap of image',
        contexts: ['all'],
    });
    chrome.contextMenus.create({
        id: ChromeActionEnum.CTX_SHOW_IMAGE_VIEWER,
        title: 'Show image viewer',
        contexts: ['all'],
    });
    chrome.contextMenus.create({
        id: ChromeActionEnum.CTX_SHOW_CAROUSEL_VIEW,
        title: 'Show carousel viewer',
        contexts: ['all'],
    });
    chrome.contextMenus.create({
        id: ChromeActionEnum.CTX_CORNER_IFRAME,
        title: 'Corner iframe',
        contexts: ['all'],
    });
    chrome.contextMenus.create({
        id: ChromeActionEnum.CTX_SNAPSHOT,
        title: 'Snapshot',
        contexts: ['all'],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    const id = tab?.id;
    if (!id) return;
    if (info.menuItemId === ChromeActionEnum.CTX_SNAPSHOT) {
        chrome.tabs?.captureVisibleTab(
            null as any,
            { format: 'png' },
            (dataUrl) => {
                chrome.tabs.sendMessage(id, {
                    type: info.menuItemId,
                    data: dataUrl,
                });
            },
        );
        return;
    }
    chrome.tabs.sendMessage(id, {
        type: info.menuItemId,
        data: info.srcUrl,
    });
});
