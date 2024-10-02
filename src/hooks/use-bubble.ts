import { useState, useEffect } from 'react';

export const useBubble = (elementRef: React.RefObject<HTMLElement>) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleMouseDown = (e: MouseEvent) => {
            setIsDragging(true);
            const startX = e.clientX;
            const startY = e.clientY;
            const rect = element.getBoundingClientRect();
            const initialLeft = rect.left;
            const initialTop = rect.top;

            const handleMouseMove = (moveEvent: MouseEvent) => {
                if (!isDragging) return;

                const newLeft = initialLeft + moveEvent.clientX - startX;
                const newTop = initialTop + moveEvent.clientY - startY;
                setPosition({ top: newTop, left: newLeft });
            };

            const handleMouseUp = () => {
                setIsDragging(false);
                snapToClosestCorner();
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        };

        const snapToClosestCorner = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const rect = element.getBoundingClientRect();
            const elementWidth = rect.width;
            const elementHeight = rect.height;

            const corners = [
                { top: 0, left: 0 }, // top-left
                { top: 0, left: windowWidth - elementWidth }, // top-right
                { top: windowHeight - elementHeight, left: 0 }, // bottom-left
                {
                    top: windowHeight - elementHeight,
                    left: windowWidth - elementWidth,
                }, // bottom-right
            ];

            const closestCorner = corners.reduce((prev, curr) => {
                const prevDistance = Math.hypot(
                    prev.top - rect.top,
                    prev.left - rect.left,
                );
                const currDistance = Math.hypot(
                    curr.top - rect.top,
                    curr.left - rect.left,
                );
                return currDistance < prevDistance ? curr : prev;
            });

            setPosition(closestCorner);
        };

        element.addEventListener('mousedown', handleMouseDown);

        return () => {
            element.removeEventListener('mousedown', handleMouseDown);
        };
    }, [isDragging, elementRef]);

    return {
        position,
    };
};
