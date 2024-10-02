import { Image, Video } from '.';

export enum ChromeActionEnum {
    'GET_DOM' = 'GET_DOM',
    'SCROLL_INTO_IMAGE' = 'SCROLL_INTO_IMAGE',
    'SCROLL_INTO_VIDEO' = 'SCROLL_INTO_VIDEO',
    'VIEW_IMAGE' = 'VIEW_IMAGE',
    'COLLECT_IMAGE' = 'COLLECT_IMAGE',
    'CTX_MENU_COLLECT_IMAGE' = 'CTX_MENU_COLLECT_IMAGE',
    'CTX_SHOW_VIDEO' = 'CTX_SHOW_VIDEO',
    'CTX_MARK_IMAGE' = 'CTX_MARK_IMAGE',
    'CTX_JUST_SHOW_VIDEO' = 'CTX_JUST_SHOW_VIDEO',
    'CTX_JUST_SHOW_IMAGE' = 'CTX_JUST_SHOW_IMAGE',
    'CTX_SHOW_IMAGE_MINIMAP' = 'CTX_SHOW_IMAGE_MINIMAP',
    'CTX_SHOW_IMAGE_VIEWER' = 'CTX_SHOW_IMAGE_VIEWER',
    'CTX_SHOW_CAROUSEL_VIEW' = 'CTX_SHOW_CAROUSEL_VIEW',
    'CTX_CORNER_IFRAME' = 'CTX_CORNER_IFRAME',
    'CTX_SNAPSHOT' = 'CTX_SNAPSHOT',
}

export type ChromeMessage<T> = {
    type: ChromeActionEnum;
    data: T;
};

export type ChromeResponse = {
    images?: Image[];
    videos?: Video[];
};
