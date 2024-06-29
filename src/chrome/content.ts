import {
    autoScrollAndGetImages,
    getAllImageInPage,
    hideAllElementExcludeTag,
    markImage,
    scrollIntoImage,
    scrollIntoVideo,
    showImageMinimap,
    showLoadingModal,
    viewImage,
    viewVideoCarousel,
} from '@/functions';
import { showImageViewer } from '@/functions/image-viewer';

import { ChromeActionEnum, ChromeMessage } from '@/types';

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
    CTX_SHOW_VIDEO: () => {
        viewVideoCarousel();
    },
    CTX_MARK_IMAGE: ({ data }) => {
        markImage({ src: data, alt: data });
    },
    CTX_JUST_SHOW_VIDEO: () => {
        hideAllElementExcludeTag('video');
    },
    CTX_JUST_SHOW_IMAGE: () => {
        hideAllElementExcludeTag('img');
    },
    CTX_SHOW_IMAGE_MINIMAP: () => {
        showImageMinimap();
    },
    CTX_SHOW_IMAGE_VIEWER: () => {
        showImageViewer();
    },
} satisfies Record<
    ChromeActionEnum,
    (value: { data: any; callback: (data: any) => void }) => void
>;

chrome.runtime.onMessage.addListener(
    (message: ChromeMessage<any>, _, sendResponse) => {
        const callback = actions[message.type];
        callback({
            data: message.data,
            callback: sendResponse,
        });
    }
);
