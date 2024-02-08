import { ChromeActionEnum } from '../types';

// chrome.contextMenus.create({
//     id: ChromeActionEnum.CTX_MENU_COLLECT_IMAGE,
//     title: 'Collect all images',
//     contexts: ['page'],
// });

chrome.contextMenus.create({
    id: ChromeActionEnum.VIEW_IMAGE,
    title: 'View image',
    contexts: ['image'],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (!tab?.id) return;
    chrome.tabs.sendMessage(tab.id, {
        type: info.menuItemId,
        data: info.srcUrl,
    });
});
