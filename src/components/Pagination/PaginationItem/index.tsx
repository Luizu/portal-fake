import { Container } from './styles';

interface IPaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  number,
  onPageChange,
  isCurrent,
}: IPaginationItemProps) {
  if (isCurrent) {
    return <Container disabled>{number}</Container>;
  }

  return <Container onClick={() => onPageChange(number)}>{number}</Container>;
}
