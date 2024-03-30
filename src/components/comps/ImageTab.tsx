import Empty from '@/components/comps/Empty';
import ImageCard from '@/components/comps/ImageCard';
import ImageItem from '@/components/comps/ImageItem';
import Information from '@/components/comps/Information';
import Loading from '@/components/comps/Loading';
import { InputSearch } from '@/components/input/InputSearch';
import BasePagination from '@/components/ui/base-pagination';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { paginationViewModeIcons, sortIcons, viewModeIcons } from '@/constants';
import { cn } from '@/lib/utils';
import { Image, TDir, TPagination, TView } from '@/types';
import {
    downloadAllImage,
    downloadAllImagesAsZip,
    exportImageToExcel,
    sortData,
} from '@/util';
import usePaginationClient from '@/util/hooks/use-pagination-client';
import {
    CheckCheck,
    Download,
    FileArchive,
    ScanSearch,
    Sheet,
    Trash,
    X,
} from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

export type TImageTabProps = {
    loading?: boolean;
    images: Image[];
    selectedImage: string[];
    handleShowAllImage?: () => void;
    onDownloadError: (src: string) => void;
    handleSelectAllImage: () => void;
    onSelect: (src: string) => void;
    onClearMark?: () => void;
    unMarkImage?: (src: string) => void;
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
        onClearMark,
        unMarkImage,
    } = props;

    const [sortedImage, setSortedImage] = useState<Image[]>([]);
    const [sortMode, setSortMode] = useState<TDir>('none');
    const [cols, setCols] = useState<number>(3);
    const [viewMode, setViewMode] = useState<TView>('grid');
    const [paginationMode, setPaginationMode] = useState<TPagination>('none');
    const [keyword, setKeyword] = useState<string>('');

    const filteredImages = useMemo(() => {
        if (!keyword) return images;
        const lowerCaseKeyword = keyword.toLowerCase();
        return images.filter(
            (image) =>
                image.src.toLowerCase().includes(lowerCaseKeyword) ||
                image.alt.toLowerCase().includes(lowerCaseKeyword)
        );
    }, [images, keyword]);

    const { data, pagination } = usePaginationClient({
        data: sortedImage.length ? sortedImage : filteredImages,
        size:
            paginationMode === 'none'
                ? (sortedImage.length ? sortedImage : filteredImages).length
                : 12,
    });

    const handleSort = useCallback(() => {
        setSortedImage(() => {
            switch (sortMode) {
                case 'none': {
                    return sortData(filteredImages, 'asc', 'width', 'height');
                }
                case 'asc': {
                    return sortData(filteredImages, 'desc', 'width', 'height');
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
        pagination.first();
    }, [filteredImages, pagination, sortMode]);

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

    const handleChangePaginationMode = useCallback(() => {
        setPaginationMode(() => {
            switch (paginationMode) {
                case 'none': {
                    return 'pagination';
                }
                case 'pagination': {
                    return 'none';
                }

                default: {
                    return 'pagination';
                }
            }
        });
    }, [paginationMode]);

    const actions = useMemo(
        () => [
            {
                onClick: handleChangeViewMode,
                title: 'Change view mode',
                icon: viewModeIcons[viewMode].icon,
            },
            {
                onClick: handleChangePaginationMode,
                title: 'Change pagination view',
                icon: paginationViewModeIcons[paginationMode].icon,
            },
            {
                onClick: handleSort,
                title: 'Sort images',
                icon: sortIcons[sortMode].icon,
            },
            {
                onClick: handleSelectAllImage,
                title: 'Select all images',
                icon:
                    selectedImage.length < filteredImages.length ? (
                        <CheckCheck size={16} />
                    ) : (
                        <X size={16} />
                    ),
            },
            {
                onClick: downloadAllImage(selectedImage, onDownloadError),
                title: 'Download all selected images',
                icon: <Download size={16} />,
            },
            {
                onClick: downloadAllImagesAsZip(selectedImage, onDownloadError),
                title: 'Download all selected images to zip file',
                icon: <FileArchive size={16} />,
            },
            {
                onClick: exportImageToExcel(selectedImage),
                title: 'Export all selected images to Excel file',
                icon: <Sheet size={16} />,
            },
        ],
        [
            filteredImages.length,
            handleChangePaginationMode,
            handleChangeViewMode,
            handleSelectAllImage,
            handleSort,
            onDownloadError,
            paginationMode,
            selectedImage,
            sortMode,
            viewMode,
        ]
    );

    const onSearch = (e: string) => setKeyword(e);

    const renderItem = useCallback(
        (image: Image) => {
            return viewMode === 'grid' ? (
                <ImageCard
                    key={image.src}
                    data={image}
                    selected={selectedImage?.includes(image.src)}
                    onSelect={() => onSelect(image.src)}
                    onDownloadError={onDownloadError}
                    cols={cols}
                    mark={!onClearMark}
                    unMarkImage={unMarkImage}
                />
            ) : (
                <ImageItem
                    key={image.src}
                    data={image}
                    selected={selectedImage?.includes(image.src)}
                    onSelect={() => onSelect(image.src)}
                    onDownloadError={onDownloadError}
                    mark={!onClearMark}
                    unMarkImage={unMarkImage}
                />
            );
        },
        [
            cols,
            onClearMark,
            onDownloadError,
            onSelect,
            selectedImage,
            unMarkImage,
            viewMode,
        ]
    );

    return (
        <div className='grid gap-2 relative'>
            {loading && <Loading />}
            <div className='fixed top-3 right-4'>
                <InputSearch value={keyword} onChange={onSearch} />
            </div>
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
                    {onClearMark && (
                        <Button
                            size='icon'
                            variant='ghost'
                            onClick={onClearMark}
                            title='Clear all mark'
                        >
                            <Trash size={16} />
                        </Button>
                    )}
                    {handleShowAllImage && (
                        <Button
                            size='icon'
                            variant='ghost'
                            loading={loading}
                            onClick={handleShowAllImage}
                            title='Show all collected images'
                        >
                            <ScanSearch size={16} />
                        </Button>
                    )}
                    {actions.map((action, index) => (
                        <Button
                            key={index}
                            size='icon'
                            variant='ghost'
                            onClick={action.onClick}
                            title={action.title}
                        >
                            {action.icon}
                        </Button>
                    ))}
                </div>
            </div>
            <ScrollArea
                className={cn([
                    'pe-4',
                    paginationMode === 'none'
                        ? 'max-h-[460px]'
                        : 'max-h-[420px]',
                ])}
            >
                {data.length ? (
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
                        {data.map((image) => renderItem(image))}
                    </div>
                ) : (
                    <Empty />
                )}
            </ScrollArea>
            {paginationMode === 'pagination' && (
                <div className='fixed bottom-2 inset-x-0'>
                    <BasePagination pagination={pagination} />
                </div>
            )}
        </div>
    );
}

export default ImageTab;
