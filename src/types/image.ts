export interface Image {
    src: string;
    alt: string;
    error?: string;
    width?: number;
    height?: number;
}

export type ImageData = Image & {
    time: string;
};
