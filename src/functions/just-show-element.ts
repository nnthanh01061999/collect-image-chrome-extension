export const hideAllElementExcludeTag = <K extends keyof HTMLElementTagNameMap>(
    tagName: K
) => {
    const linkElements = document.getElementsByTagName('link');
    const styleElements = document.getElementsByTagName('style');

    for (let i = linkElements.length - 1; i >= 0; i--) {
        linkElements?.[i]?.parentNode?.removeChild(linkElements[i]);
    }

    for (let i = styleElements.length - 1; i >= 0; i--) {
        styleElements?.[i]?.parentNode?.removeChild(styleElements[i]);
    }

    const allElements = document.querySelectorAll(
        '*'
    ) as unknown as HTMLElement[];

    allElements.forEach((element) => {
        if (!element.querySelector(tagName)) {
            element.style.display = 'none';
        }
    });

    const videoElements = document.getElementsByTagName(tagName);

    for (let i = 0; i < videoElements.length; i++) {
        videoElements[i].style.display = 'block';
        videoElements[i].style.width = 'auto';
        videoElements[i].style.height = 'auto';

        if (tagName === 'video') {
            (videoElements[i] as HTMLVideoElement).width = 400;
            (videoElements[i] as HTMLVideoElement).controls = true;
        }
    }
};
