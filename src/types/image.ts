export interface Image {
    src: string;
    alt: string;
    error?: string;
    width?: number;
    height?: number;
    top?: number;
}

export type ImageData = Image & {
    time: string;
};
