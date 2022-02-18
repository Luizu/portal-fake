import { PaginationItem } from './PaginationItem';
import { Container, Count, Pages, Text } from './styles';

interface IPaginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePageArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page > 0);
}

export function Pagination({
  onPageChange,
  totalCountOfRegisters,
  registerPerPage = 8,
  currentPage = 1,
}: IPaginationProps) {
  const lastPage =
    totalCountOfRegisters % registerPerPage !== 0
      ? Math.floor(
          (totalCountOfRegisters -
            (totalCountOfRegisters % registerPerPage) +
            registerPerPage) /
            registerPerPage,
        )
      : Math.floor(totalCountOfRegisters / registerPerPage);

  const previousPages =
    currentPage > 1
      ? generatePageArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePageArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : [];

  return (
    <Container>
      <Count>
        {currentPage} de {lastPage}
      </Count>

      <Pages>
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > 2 + siblingsCount && <Text>...</Text>}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map(page => {
            return (
              <PaginationItem
                onPageChange={onPageChange}
                key={page}
                number={page}
              />
            );
          })}

        <PaginationItem
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />

        {nextPages.length > 0 &&
          nextPages.map(page => {
            return (
              <PaginationItem
                onPageChange={onPageChange}
                key={page}
                number={page}
              />
            );
          })}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && <Text>...</Text>}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </Pages>
    </Container>
  );
}
