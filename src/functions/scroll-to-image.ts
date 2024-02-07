export const scrollIntoImage = (src: string) => {
    Array.from(document.getElementsByTagName<'img'>('img')).forEach((img) => {
        if (img.src === src)
            img.scrollIntoView({
                behavior: 'smooth',
            });
    });
};
