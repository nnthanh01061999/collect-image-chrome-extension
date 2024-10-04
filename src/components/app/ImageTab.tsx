import Empty from '@/components/app/Empty';
import ImageCard from '@/components/app/ImageCard';
import ImageItem from '@/components/app/ImageItem';
import Information from '@/components/app/Information';
import Loading from '@/components/app/Loading';
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
import usePaginationClient from '@/hooks/use-pagination-client';
import {
    CheckCheck,
    Download,
    FileArchive,
    Filter,
    ScanSearch,
    Sheet,
    Trash,
    X,
} from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import AdvancedFilter from '@/components/app/AdvancedFilter';

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
    const [width, setWidth] = useState<number[]>();
    const [height, setHeight] = useState<number[]>();

    const filteredImages = useMemo(() => {
        if (!keyword && !width && !height) return images;
        const lowerCaseKeyword = keyword.toLowerCase();
        return images.filter((image) => {
            console.log(image);
            return (
                (image.src.toLowerCase().includes(lowerCaseKeyword) ||
                    image.alt.toLowerCase().includes(lowerCaseKeyword)) &&
                (width && image.width
                    ? image.width >= width?.[0] && image.width <= width?.[1]
                    : true) &&
                (height && image.height
                    ? image.height >= height?.[0] && image.height <= height?.[1]
                    : true)
            );
        });
    }, [height, images, keyword, width]);

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
                title: chrome.i18n.getMessage('change_view_mode'),
                code: 'change_view_mode',
                icon: viewModeIcons[viewMode].icon,
            },
            {
                onClick: handleChangePaginationMode,
                title: chrome.i18n.getMessage('change_pagination_view'),
                code: 'change_pagination_view',
                icon: paginationViewModeIcons[paginationMode].icon,
            },
            {
                onClick: handleSort,
                title: chrome.i18n.getMessage('sort_images'),
                code: 'sort_images',
                icon: sortIcons[sortMode].icon,
            },
            {
                onClick: handleSelectAllImage,
                title: chrome.i18n.getMessage('select_all_images'),
                code: 'select_all_images',
                icon:
                    selectedImage.length < filteredImages.length ? (
                        <CheckCheck size={16} />
                    ) : (
                        <X size={16} />
                    ),
            },
            {
                onClick: downloadAllImage(selectedImage, onDownloadError),
                title: chrome.i18n.getMessage('download_all_selected_images'),
                code: 'download_all_selected_images',
                icon: <Download size={16} />,
            },
            {
                onClick: downloadAllImagesAsZip(selectedImage, onDownloadError),
                title: chrome.i18n.getMessage(
                    'download_all_selected_images_to_zip_file',
                ),
                code: 'download_all_selected_images_to_zip_file',
                icon: <FileArchive size={16} />,
            },
            {
                onClick: exportImageToExcel(selectedImage),
                title: chrome.i18n.getMessage(
                    'export_all_selected_images_to_excel_file',
                ),
                code: 'export_all_selected_images_to_excel_file',
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
        ],
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
        ],
    );

    return (
        <div className='relative grid gap-2'>
            {loading && <Loading />}
            <div className='fixed right-4 top-3 flex gap-2'>
                <InputSearch value={keyword} onChange={onSearch} />
                <AdvancedFilter
                    width={width}
                    height={height}
                    setWidth={setWidth}
                    setHeight={setHeight}
                >
                    <Button
                        size='icon'
                        variant='ghost'
                        title={chrome.i18n.getMessage('advanced_filter')}
                        className='h-8'
                    >
                        <Filter size={16} />
                    </Button>
                </AdvancedFilter>
            </div>
            <div className='flex items-center justify-between space-x-2'>
                <div className='grid gap-2'>
                    <Information
                        total={images.length}
                        selected={selectedImage.length}
                    />
                </div>
                <div className='grid grid-flow-col gap-1'>
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
                            title={chrome.i18n.getMessage('clear_all_mark')}
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
                            title={chrome.i18n.getMessage(
                                'show_all_collected_images',
                            )}
                        >
                            <ScanSearch size={16} />
                        </Button>
                    )}
                    {actions.map((action) => (
                        <Button
                            key={action.code}
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
                            'grid',
                            viewMode === 'grid' ? 'gap-4' : 'gap-2',
                            viewMode === 'grid' && cols === 1 && 'grid-cols-1',
                            viewMode === 'grid' && cols === 2 && 'grid-cols-2',
                            viewMode === 'grid' && cols === 3 && 'grid-cols-3',
                            viewMode === 'grid' && cols === 4 && 'grid-cols-4',
                        )}
                    >
                        {data.map((image) => renderItem(image))}
                    </div>
                ) : (
                    <Empty />
                )}
            </ScrollArea>
            {paginationMode === 'pagination' && (
                <div className='fixed inset-x-0 bottom-2'>
                    <BasePagination pagination={pagination} />
                </div>
            )}
        </div>
    );
}

export default ImageTab;
