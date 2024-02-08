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
      background-color: hsl(210 40% 96.1%);
      padding: 8px 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 8px;
      color: rgb(9, 9, 11);
    `;

    const stopButton = document.createElement('button');
    stopButton.style.cssText = `
        display: inline-flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        border-radius: 0.375rem;
        font-size: 0.875rem; 
        font-weight: 500; 
        transition: color 0.15s ease;
        outline: none;
        background-color: rgb(9, 9, 11);
        color: rgb(250, 250, 250);
        cursor: pointer;
        border: none;
        margin-top: 16px;
        padding: 8px 16px;
    `;

    stopButton.addEventListener('mouseenter', function () {
        this.style.backgroundColor = 'hsl(210 40% 96.1%)';
        this.style.color = 'hsl(222.2 47.4% 11.2%)';
    });

    stopButton.addEventListener('mouseleave', function () {
        this.style.backgroundColor = 'rgb(9, 9, 11)';
        this.style.color = 'rgb(250, 250, 250)';
    });

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
            chrome.storage.sync.set({ images });
        } else {
            setTimeout(scrollAndCollectImages, 1000);
        }
        const uniqueData = [
            ...((new Map(
                images.map((item) => [item['src'], item])
            ).values() as any) || []),
        ];
        return { images: uniqueData };
    }

    return scrollAndCollectImages();
};
