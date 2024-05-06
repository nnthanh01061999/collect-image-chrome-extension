import { VIEW_MODAL } from '@/constants';

export const viewImage = (src: string) => {
    const id = VIEW_MODAL;
    const modalElement = document.querySelector(`#${id}`);
    if (modalElement) {
        modalElement.remove();
        return;
    }

    const modal = document.createElement('div');
    modal.id = id;
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

    const modalContent = document.createElement('img');
    modalContent.style.cssText = `
        object-cover: contain;
        width: auto;
        height: auto;
        max-height: 100vh;
    `;

    modalContent.src = src;
    modalContent.onclick = (e) => {
        e.stopPropagation();
    };

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

    closeButton.addEventListener('mouseenter', function () {
        this.style.backgroundColor = 'hsl(210 40% 96.1%)';
        this.style.color = 'hsl(222.2 47.4% 11.2%)';
    });

    closeButton.addEventListener('mouseleave', function () {
        this.style.backgroundColor = 'rgb(9, 9, 11)';
        this.style.color = 'rgb(250, 250, 250)';
    });

    closeButton.textContent = 'Close';
    closeButton.onclick = () => {
        closeViewModal();
    };

    modal.onclick = () => {
        closeViewModal();
    };

    modal.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    document.addEventListener('keydown', handleKeyDown);
};

const closeViewModal = () => {
    const modal = document.getElementById(VIEW_MODAL);
    if (modal) {
        modal.remove();
        document.removeEventListener('keydown', handleKeyDown);
    }
};

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        closeViewModal();
    }
};
