import Empty from '@/components/comps/Empty';
import ImageCard from '@/components/comps/ImageCard';
import ImageItem from '@/components/comps/ImageItem';
import Information from '@/components/comps/Information';
import Loading from '@/components/comps/Loading';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { sortIcons, viewModeIcons } from '@/constants';
import { cn } from '@/lib/utils';
import { Image, TDir, TView } from '@/types';
import { downloadAllImage, sortData } from '@/util';
import { ListTree, CheckCheck, X, Download } from 'lucide-react';
import { useCallback, useState } from 'react';

type TImageTabProps = {
    loading: boolean;
    images: Image[];
    selectedImage: string[];
    handleShowAllImage: () => void;
    onDownloadError: (src: string) => void;
    handleSelectAllImage: () => void;
    onSelect: (src: string) => void;
};
function ImageTab(props: TImageTabProps) {
    const {
        loading,
        images,
        selectedImage,
        handleShowAllImage,
        onDownloadError,
        handleSelectAllImage,
        onSelect,
    } = props;

    const [sortedImage, setSortedImage] = useState<Image[]>([]);
    const [sortMode, setSortMode] = useState<TDir>('none');
    const [cols, setCols] = useState<number>(3);
    const [viewMode, setViewMode] = useState<TView>('grid');

    const handleSort = useCallback(() => {
        setSortedImage(() => {
            switch (sortMode) {
                case 'none': {
                    return sortData(images, 'asc', 'width', 'height');
                }
                case 'asc': {
                    return sortData(images, 'desc', 'width', 'height');
                }
                case 'desc': {
                    return [];
                }
                default: {
                    return [];
                }
            }
        });
        setSortMode((prevSortMode) => {
            switch (prevSortMode) {
                case 'none':
                    return 'asc';
                case 'asc':
                    return 'desc';
                case 'desc':
                    return 'none';
                default:
                    return 'none';
            }
        });
    }, [images, sortMode]);

    const handleChangeViewMode = useCallback(() => {
        setViewMode(() => {
            switch (viewMode) {
                case 'grid': {
                    return 'list';
                }
                case 'list': {
                    return 'grid';
                }

                default: {
                    return 'grid';
                }
            }
        });
    }, [viewMode]);

    const renderItem = useCallback(
        (image: Image) => {
            return viewMode === 'grid' ? (
                <ImageCard
                    key={image.src}
                    data={image}
                    selected={selectedImage?.includes(image.src)}
                    onSelect={() => onSelect(image.src)}
                    onDownloadError={onDownloadError}
                />
            ) : (
                <ImageItem
                    key={image.src}
                    data={image}
                    selected={selectedImage?.includes(image.src)}
                    onSelect={() => onSelect(image.src)}
                    onDownloadError={onDownloadError}
                />
            );
        },
        [onDownloadError, onSelect, selectedImage, viewMode]
    );

    return (
        <div className='grid gap-2 relative'>
            {loading && <Loading />}
            <div className='flex space-x-2 justify-between items-center'>
                <div className='grid gap-2'>
                    <Information
                        total={images.length}
                        selected={selectedImage.length}
                    />
                </div>
                <div className='grid gap-1 grid-flow-col'>
                    {viewMode === 'grid' && (
                        <Slider
                            value={[cols]}
                            onValueChange={([value]) => setCols(value)}
                            min={1}
                            max={4}
                            className='w-14'
                        />
                    )}
                    <Button
                        size='icon'
                        variant='ghost'
                        onClick={handleShowAllImage}
                        title='Show all collected images'
                    >
                        <ListTree size={16} />
                    </Button>
                    <Button
                        size='icon'
                        variant='ghost'
                        onClick={handleChangeViewMode}
                        title='Change view mode'
                    >
                        {viewModeIcons[viewMode].icon}
                    </Button>
                    <Button
                        size='icon'
                        variant='ghost'
                        onClick={handleSort}
                        title='Sort images'
                    >
                        {sortIcons[sortMode].icon}
                    </Button>
                    <Button
                        size='icon'
                        variant='ghost'
                        onClick={handleSelectAllImage}
                        title='Select all images'
                    >
                        {selectedImage.length < images.length ? (
                            <CheckCheck size={16} />
                        ) : (
                            <X size={16} />
                        )}
                    </Button>
                    <Button
                        size='icon'
                        variant='ghost'
                        onClick={downloadAllImage(
                            selectedImage,
                            onDownloadError
                        )}
                        title='Download all selected images'
                    >
                        <Download size={16} />
                    </Button>
                </div>
            </div>
            <ScrollArea className='max-h-[460px] pe-4'>
                {sortedImage.length || images.length ? (
                    <div
                        className={cn(
                            'grid ',
                            viewMode === 'grid' ? 'gap-4' : 'gap-2',
                            viewMode === 'grid' && cols === 1 && 'grid-cols-1',
                            viewMode === 'grid' && cols === 2 && 'grid-cols-2',
                            viewMode === 'grid' && cols === 3 && 'grid-cols-3',
                            viewMode === 'grid' && cols === 4 && 'grid-cols-4'
                        )}
                    >
                        {sortedImage.length
                            ? sortedImage.map((image) => renderItem(image))
                            : images.length
                            ? images.map((image) => renderItem(image))
                            : null}
                    </div>
                ) : (
                    <Empty />
                )}
            </ScrollArea>
        </div>
    );
}

export default ImageTab;
