export const scrollIntoImage = (
    src: string,
    container?: HTMLDivElement | null,
) => {
    Array.from(
        (container || document).getElementsByTagName<'img'>('img'),
    ).forEach((img) => {
        if (img.src === src)
            img.scrollIntoView({
                behavior: 'smooth',
            });
    });
};
