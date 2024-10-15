import { Button } from '@/components/ui/button';
import { SNAPSHOT_IMAGE } from '@/constants';
import { cropImage } from '@/functions';
import { closeReact } from '@/functions/inject-react';
import { saveBase64ToImage } from '@/util';
import { SaveIcon, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';

type TSnapShotImageProps = {
    src: string;
};

function SnapShotImage(props: TSnapShotImageProps) {
    const { src } = props;
    const [crop, setCrop] = useState<Crop>();
    const ref = useRef<HTMLImageElement>(null);

    const contextMenuPosition = useMemo(() => {
        if (!crop) return {};
        let top = 0;

        const windowWidth = window.innerWidth;

        const selectionPosition = {
            top: crop.y,
            bottom: crop.y + crop.height,
            left: crop.x,
            right: crop.x + crop.width,
        };

        if (
            selectionPosition.left - 44 < 0 &&
            selectionPosition.right + 44 >= windowWidth
        ) {
            return {
                top: `${top}`,
                right: `calc(100% - 44px)`,
            };
        }

        if (selectionPosition.right + 44 >= windowWidth) {
            return {
                top: `${top}`,
                right: `calc(100% + 4px)`,
            };
        }
        return {
            top,
            left: `calc(100% + 4px)`,
        };
    }, [crop]);

    const onClose = useCallback(() => {
        closeReact(SNAPSHOT_IMAGE);
        document.body.style.overflow = 'auto';
    }, []);

    const saveImage = () => {
        if (!ref.current || !crop) return;
        const image = cropImage(ref.current, crop);
        if (!image) return;
        const base64Data = image.split(',')[1];
        saveBase64ToImage(base64Data);
        onClose();
    };

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        },
        [onClose],
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className='fixed inset-0 z-[99999999] flex items-center justify-center bg-black/50'>
            <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                renderSelectionAddon={() =>
                    crop ? (
                        <div className='relative grid h-full w-full bg-transparent'>
                            <div
                                style={contextMenuPosition}
                                className='absolute flex flex-col gap-2'
                            >
                                <Button size='icon' onClick={onClose}>
                                    <X size={16} />
                                </Button>
                                <Button size='icon' onClick={saveImage}>
                                    <SaveIcon size={16} />
                                </Button>
                            </div>
                        </div>
                    ) : null
                }
            >
                <img
                    ref={ref}
                    className='h-full w-full object-cover'
                    src={src}
                    alt={src}
                />
            </ReactCrop>

            <link
                href='https://unpkg.com/react-image-crop/dist/ReactCrop.css'
                rel='stylesheet'
            />
        </div>
    );
}

export default SnapShotImage;
