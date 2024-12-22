'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

type QueryPaginationProps = {
  totalPages: number;
  className?: string;
};
export const QueryPagination = ({
  totalPages,
  className,
}: QueryPaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  return (
    <Pagination className={className}>
      <PaginationContent>
        {prevPage >= 1 ? (
          <PaginationItem>
            <PaginationPrevious href={createPageUrl(prevPage)} />
          </PaginationItem>
        ) : null}

        {Array(totalPages)
          .fill('')
          .map((_, index) => {
            return (
              <PaginationItem key={index} className="hidden sm:inline-block">
                <PaginationLink
                  isActive={currentPage === index + 1}
                  href={createPageUrl(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })}

        {nextPage <= totalPages ? (
          <PaginationItem>
            <PaginationNext href={createPageUrl(nextPage)} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
};
