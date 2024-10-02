import { Button } from '@/components/ui/button';
import { SNAPSHOT_IMAGE } from '@/constants';
import { cropImage } from '@/functions';
import { closeReact } from '@/functions/inject-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';

type TSnapShotImageProps = {
    src: string;
};

function SnapShotImage(props: TSnapShotImageProps) {
    const { src } = props;
    const [crop, setCrop] = useState<Crop>();
    const ref = useRef<HTMLImageElement>(null);

    const saveImage = () => {
        if (!ref.current || !crop) return;
        const image = cropImage(ref.current, crop);
        if (!image) return;
        const base64Data = image.split(',')[1];

        // Convert Base64 to binary
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Uint8Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        // Create a Blob from the binary data
        const blob = new Blob([byteNumbers], { type: 'image/png' });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        const fileName = 'snapshot.png';
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        closeReact(SNAPSHOT_IMAGE);
    };

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeReact(SNAPSHOT_IMAGE);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className='fixed inset-0 z-[99999999] flex items-center justify-center bg-black/50'>
            <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onDragEnd={saveImage}
            >
                <img
                    ref={ref}
                    className='h-full w-full object-cover'
                    src={src}
                    alt={src}
                />
            </ReactCrop>

            <Button
                className='absolute right-4 top-4'
                onClick={() => closeReact(SNAPSHOT_IMAGE)}
            >
                Close
            </Button>
            <link
                href='https://unpkg.com/react-image-crop/dist/ReactCrop.css'
                rel='stylesheet'
            />
        </div>
    );
}

export default SnapShotImage;
