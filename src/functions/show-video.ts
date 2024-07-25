import { VIEW_IMAGE } from '@/constants';
import { Video } from '@/types';

let currentVideoIndex = 0;

// Function to collect all videos from the right-clicked element
const collectVideos = () => {
    return Array.from(document.getElementsByTagName<'video'>('video'))
        .filter((link) => !link.getAttribute('id')?.includes('preview'))
        .map((link) => {
            if (link.getAttribute('src')) {
                return {
                    src: link.getAttribute('src') ?? '',
                    type: link.getAttribute('type') ?? '',
                };
            } else {
                return Array.from(
                    link.getElementsByTagName<'source'>('source'),
                ).map((source: any) => ({
                    src: source.getAttribute('src') ?? '',
                    type: source.getAttribute('type') ?? '',
                }));
            }
        })
        .reduce(
            (prev: Video[], cur) => [
                ...prev,
                ...(Array.isArray(cur) ? cur : [cur]),
            ],
            [],
        );
};

export const viewVideoCarousel = () => {
    const videos = collectVideos();

    if (videos.length === 0) {
        console.log('No videos found on the page.');
        return;
    }

    const modal = document.createElement('div');
    modal.id = VIEW_IMAGE;
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        height: 80%;
    `;

    const closeButton = document.createElement('button');
    closeButton.style.cssText = `
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
        position: fixed;
        padding: 8px 16px;
        top: 16px;
        right: 16px;
        cursor: pointer;
        border: none;
    `;
    closeButton.textContent = 'Close';
    closeButton.onclick = () => {
        closeViewModal();
    };

    const prevButton = document.createElement('button');
    prevButton.style.cssText = `
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
        position: fixed;
        padding: 8px 16px;
        top: 50%;
        right: 16px;
        cursor: pointer;
        border: none;
    `;
    prevButton.textContent = 'Prev';
    prevButton.onclick = (e) => {
        e.stopPropagation();
        currentVideoIndex =
            (currentVideoIndex - 1 + videos.length) % videos.length;
        showCurrentVideo();
    };

    const nextButton = document.createElement('button');
    nextButton.style.cssText = `
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
        position: fixed;
        padding: 8px 16px;
        top: 50%;
        left: 16px;
        cursor: pointer;
        border: none;
    `;
    nextButton.textContent = 'Next';
    nextButton.onclick = (e) => {
        e.stopPropagation();
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        showCurrentVideo();
    };

    const videoContainer = document.createElement('div');
    videoContainer.style.cssText = `
        flex: 1;
        overflow: hidden;
        position: relative;
    `;

    const videoList = document.createElement('div');
    videoList.style.cssText = `
        display: flex;
        transition: transform 0.5s ease;
    `;

    videos.forEach((videoSrc, index) => {
        const videoElement = document.createElement('video');
        videoElement.src = videoSrc.src;
        videoElement.controls = true;
        videoElement.style.cssText = `
            flex: 1 0 100%;
            margin: 0 10px;
            display: ${index === currentVideoIndex ? 'block' : 'none'};
        `;
        videoList.appendChild(videoElement);
    });

    videoContainer.appendChild(videoList);

    modalContent.appendChild(closeButton);
    modalContent.appendChild(prevButton);
    modalContent.appendChild(videoContainer);
    modalContent.appendChild(nextButton);

    modal.appendChild(modalContent);

    modal.onclick = () => {
        closeViewModal();
    };

    document.body.appendChild(modal);

    // Function to show the current video
    function showCurrentVideo() {
        const videoElements = videoList.querySelectorAll('video');
        videoElements.forEach((videoElement, index) => {
            if (index === currentVideoIndex) {
                videoElement.style.display = 'block';
            } else {
                videoElement.style.display = 'none';
            }
        });
    }

    showCurrentVideo();
};

export const closeViewModal = () => {
    const modal = document.getElementById(VIEW_IMAGE);
    if (modal) {
        modal.remove();
    }
};
