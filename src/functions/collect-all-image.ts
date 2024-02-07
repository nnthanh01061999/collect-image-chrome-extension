import { LOADING_MODAL } from '@/constants';
import { Image } from '@/types';

let enabled = true;

export const showLoadingModal = () => {
    const modal = document.createElement('div');
    modal.id = LOADING_MODAL;
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
      `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background-color: rgba(0, 0, 0, 0.8);
      padding: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 8px;
      color: #fff;
    `;

    const stopButton = document.createElement('button');
    stopButton.style.cssText = `
        display: inline-block;
        width: auto;
        cursor: pointer;
        color: #000;
        font-size: 0.875rem;
        margin-top: 1rem;
        background-color: #fff;
        border-radius: 8px;
        padding: 4px;
    `;

    stopButton.textContent = 'Cancel';
    stopButton.onclick = () => {
        enabled = false;
        closeLoadingModal();
    };

    modalContent.textContent = 'Collecting...';
    modalContent.appendChild(stopButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
};

export const closeLoadingModal = () => {
    const modal = document.getElementById(LOADING_MODAL);
    if (modal) {
        modal.remove();
    }
};

export const autoScrollAndGetImages = () => {
    const images: Image[] = [];

    const scrollThreshold = 100;
    const scrollIncrement = 500;
    let previousScrollPosition = 0;

    function scrollAndCollectImages() {
        const currentScrollPosition = Math.max(
            previousScrollPosition + scrollIncrement,
            document.documentElement.scrollHeight - window.innerHeight
        );

        window.scrollTo(0, currentScrollPosition);

        const imageElements =
            document.querySelectorAll<HTMLImageElement>('img');
        imageElements.forEach((element) => {
            images.push({
                src: element.src,
                alt: element.alt,
            });
        });

        previousScrollPosition = currentScrollPosition;

        if (
            enabled &&
            currentScrollPosition >=
                document.documentElement.scrollHeight - scrollThreshold
        ) {
            closeLoadingModal();
            chrome.storage.local.set({ images });
        } else {
            setTimeout(scrollAndCollectImages, 1000);
        }
    }

    scrollAndCollectImages();
};
