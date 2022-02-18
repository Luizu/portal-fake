import { Skeleton } from '@chakra-ui/react';

interface IProps {
  repeats: number;
}

export function TagSkeleton({ repeats }: IProps) {
  const count = new Array(repeats).fill(null);

  return (
    <>
      {count.map((_, index) => (
        <Skeleton
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          startColor="#9e9e9e"
          endColor="#515151"
          w="178px"
          h="60px"
        />
      ))}
    </>
  );
}
