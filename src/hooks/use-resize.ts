import { useEffect, useRef, useState } from 'react';

interface Size {
    width: number;
    height: number;
}

interface Position {
    x: number;
    y: number;
}

export const useResize = (initValues = { width: 100, height: 100 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<Size>(initValues);
    const [isResizing, setIsResizing] = useState(false);
    const [startPos, setStartPos] = useState<Position>({ x: 0, y: 0 });
    const [startSize, setStartSize] = useState<Size>({ width: 0, height: 0 });

    useEffect(() => {
        const element = ref.current;
        if (element) {
            const handleMouseDown = (e: MouseEvent) => {
                setIsResizing(true);
                setStartPos({ x: e.clientX, y: e.clientY });
                setStartSize({
                    width: element.offsetWidth,
                    height: element.offsetHeight,
                });
            };

            const handleMouseMove = (e: MouseEvent) => {
                if (isResizing) {
                    const newWidth = startSize.width + (e.clientX - startPos.x);
                    const newHeight =
                        startSize.height + (e.clientY - startPos.y);
                    setSize({ width: newWidth, height: newHeight });
                }
            };

            const handleMouseUp = () => {
                setIsResizing(false);
            };

            element.addEventListener('mousedown', handleMouseDown);
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                element.removeEventListener('mousedown', handleMouseDown);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isResizing, startPos, startSize]);

    return { ref, size };
};
