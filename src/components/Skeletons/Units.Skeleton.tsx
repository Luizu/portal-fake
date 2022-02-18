import { Skeleton } from '@chakra-ui/react';

interface IProps {
  repeats: number;
}

export function UnitsSkeleton({ repeats }: IProps) {
  const count = new Array(repeats).fill(null);

  return (
    <>
      {count.map((_, index) => (
        <Skeleton
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          startColor="#9e9e9e"
          endColor="#515151"
          w={repeats === 9 ? '231px' : repeats === 21 ? '256px' : '275px'}
          h={repeats === 9 ? '65px' : repeats === 21 ? '60px' : '60px'}
          borderRadius="8px"
        />
      ))}
    </>
  );
}
