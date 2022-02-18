import { Skeleton } from '@chakra-ui/react';

interface IProps {
  repeats: number;
}

export function MessagesSkeleton({ repeats }: IProps) {
  const count = new Array(repeats).fill(null);

  return (
    <>
      {count.map((_, index) => (
        <Skeleton
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          startColor="#9e9e9e"
          endColor="#515151"
          w="100%"
          h={repeats < 4 ? '42px' : '48px'}
        />
      ))}
    </>
  );
}
