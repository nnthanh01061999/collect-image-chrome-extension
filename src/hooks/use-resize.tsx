import { useCallback, useEffect, useRef, useState } from 'react';

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
    const [resizingDirection, setResizingDirection] = useState<string | null>(
        null,
    );

    const handleMouseDown = (e: MouseEvent, direction: string) => {
        const element = ref.current;
        if (!element) return;
        setIsResizing(true);
        setResizingDirection(direction);
        setStartPos({ x: e.clientX, y: e.clientY });
        setStartSize({
            width: element.offsetWidth,
            height: element.offsetHeight,
        });
        e.stopPropagation();
    };

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;

            const diffX = e.clientX - startPos.x;
            const diffY = e.clientY - startPos.y;

            if (resizingDirection?.includes('e')) {
                setSize((prevSize) => ({
                    ...prevSize,
                    width: startSize.width + diffX,
                }));
            }

            if (resizingDirection?.includes('s')) {
                setSize((prevSize) => ({
                    ...prevSize,
                    height: startSize.height + diffY,
                }));
            }

            if (resizingDirection?.includes('w')) {
                setSize((prevSize) => ({
                    ...prevSize,
                    width: startSize.width - diffX,
                }));
            }

            if (resizingDirection?.includes('n')) {
                setSize((prevSize) => ({
                    ...prevSize,
                    height: startSize.height - diffY,
                }));
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            setResizingDirection(null);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, startPos, startSize, resizingDirection]);

    const addResizeBorders = useCallback(() => {
        const element = ref.current;
        if (!element) return;
        element.className = element.className + ' group';

        const borderElements = [
            { side: 'n', top: '0', left: '0' },
            { side: 'w', top: '0', left: '0' },
            { side: 'e', top: '0', left: 'calc(100% - 4px)' },
            { side: 's', top: 'calc(100% - 4px)', left: '0' },
        ].map(({ side, top, left }) => {
            const border = document.createElement('div');
            border.style.position = 'absolute';
            border.style.width = side === 'n' || side === 's' ? '100%' : '4px';
            border.style.height = side === 'w' || side === 'e' ? '100%' : '4px';
            border.style.cursor = `${side}-resize`;
            border.style.backgroundColor = 'gray';
            border.style.top = top;
            border.style.left = left;

            border.onmousedown = (e: MouseEvent) => handleMouseDown(e, side);

            return border;
        });

        const cornerElements = [
            { vertical: 'n', horizontal: 'e', top: '0', left: '0' },
            {
                vertical: 'n',
                horizontal: 'w',
                top: '0',
                left: 'calc(100% - 20px)',
            },
            {
                vertical: 's',
                horizontal: 'e',
                top: 'calc(100% - 20px)',
                left: '0',
            },
            {
                vertical: 's',
                horizontal: 'w',
                top: 'calc(100% - 20px)',
                left: 'calc(100% - 20px)',
            },
        ].map(({ vertical, horizontal, top, left }) => {
            const corner = document.createElement('div');
            corner.style.position = 'absolute';
            corner.style.width = '20px';
            corner.style.height = '20px';
            corner.style.cursor = `nwse-resize`;
            corner.style.backgroundColor = 'gray';
            corner.style.top = top;
            corner.style.left = left;

            corner.onmousedown = (e: MouseEvent) =>
                handleMouseDown(e, `${vertical}-${horizontal}`);

            return corner;
        });

        borderElements.concat(cornerElements).forEach((el) => {
            element.appendChild(el);
        });
    }, []);

    useEffect(() => {
        addResizeBorders();
    }, [addResizeBorders]);

    return { ref: ref as React.RefObject<HTMLDivElement>, size };
};
