import { TDir, TPagination, TView } from '@/types';
import {
    ArrowUp,
    ArrowDown,
    ArrowDownUp,
    LayoutGrid,
    List,
    ListOrdered,
    X,
} from 'lucide-react';
import { ReactNode } from 'react';

export const LOADING_MODAL = 'ex-loading-modal';
export const VIEW_MODAL = 'ex-view-modal';
export const IMAGE_MINIMAP = 'image-minimap';

export const WIDTHS = [150, 200, 300, 600];

export const sortIcons: Record<
    TDir,
    {
        icon: ReactNode;
    }
> = {
    asc: {
        icon: <ArrowUp size={16} />,
    },
    desc: {
        icon: <ArrowDown size={16} />,
    },
    none: {
        icon: <ArrowDownUp size={16} />,
    },
};

export const viewModeIcons: Record<
    TView,
    {
        icon: ReactNode;
    }
> = {
    grid: {
        icon: <LayoutGrid size={16} />,
    },
    list: {
        icon: <List size={16} />,
    },
};

export const paginationViewModeIcons: Record<
    TPagination,
    {
        icon: ReactNode;
    }
> = {
    pagination: {
        icon: <X size={16} />,
    },
    none: {
        icon: <ListOrdered size={16} />,
    },
};
