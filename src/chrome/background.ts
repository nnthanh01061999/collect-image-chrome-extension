import { ChromeActionEnum } from '@/types';

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

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (!tab?.id) return;
    chrome.tabs.sendMessage(tab.id, {
        type: info.menuItemId,
        data: info.srcUrl,
    });
});
