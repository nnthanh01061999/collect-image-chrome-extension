import {
    autoScrollAndGetImages,
    getAllImageInPage,
    scrollIntoImage,
    scrollIntoVideo,
    showLoadingModal,
    viewImage,
} from '@/functions';
import { ChromeActionEnum, ChromeMessage } from '../types';

const actions = {
    GET_DOM: ({ callback }) => {
        callback(getAllImageInPage());
    },
    SCROLL_INTO_IMAGE: ({ data }) => {
        scrollIntoImage(data);
    },

    SCROLL_INTO_VIDEO: ({ data }) => {
        scrollIntoVideo(data);
    },
    VIEW_IMAGE: ({ data }) => {
        viewImage(data);
    },
    COLLECT_IMAGE: ({ callback }) => {
        showLoadingModal();
        callback(autoScrollAndGetImages());
    },

    CTX_MENU_COLLECT_IMAGE: () => {
        showLoadingModal();
        autoScrollAndGetImages();
    },
} satisfies Record<
    ChromeActionEnum,
    (value: { data: any; callback: (data: any) => void }) => void
>;

chrome.runtime.onMessage.addListener(
    (message: ChromeMessage, _, sendResponse) => {
        const callback = actions[message.type];
        callback({
            data: message.data,
            callback: sendResponse,
        });
    }
);
