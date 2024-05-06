import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationEllipsis,
    PaginationLink,
    PaginationNext,
} from '@/components/ui/pagination';
import { usePagination } from '@/hooks';

type TBasePaginationProps = {
    pagination: ReturnType<typeof usePagination>;
};
function BasePagination(props: TBasePaginationProps) {
    const { pagination } = props;
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        disabled={
                            pagination.active === 1 ||
                            pagination.range.length === 0
                        }
                        onClick={pagination.previous}
                    />
                </PaginationItem>
                {pagination.range.map((item, index) => (
                    <PaginationItem key={String(item) + String(index)}>
                        {item === 'dots' ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                isActive={pagination.active === item}
                                onClick={() => pagination.setPage(item)}
                            >
                                {item}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        disabled={
                            pagination.active === pagination.total ||
                            pagination.range.length === 0
                        }
                        onClick={pagination.next}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default BasePagination;
