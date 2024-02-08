import { Image, Video } from '.';

export enum ChromeActionEnum {
    'GET_DOM' = 'GET_DOM',
    'SCROLL_INTO_IMAGE' = 'SCROLL_INTO_IMAGE',
    'SCROLL_INTO_VIDEO' = 'SCROLL_INTO_VIDEO',
    'VIEW_IMAGE' = 'VIEW_IMAGE',
    'COLLECT_IMAGE' = 'COLLECT_IMAGE',
    'CTX_MENU_COLLECT_IMAGE' = 'CTX_MENU_COLLECT_IMAGE',
}

export type ChromeMessage = {
    type: ChromeActionEnum;
    data: any;
};

export type ChromeResponse = {
    images?: Image[];
    videos?: Video[];
};
