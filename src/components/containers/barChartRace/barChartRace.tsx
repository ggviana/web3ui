import { useRef, useEffect, LegacyRef } from 'react';
import { Runtime, Inspector } from '@observablehq/runtime';
import notebook from '.';
import { Link, Text, Container, Box } from '@chakra-ui/react';

function BarChartRace() {
  const chartRef = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(notebook, (name: string) => {
      if (name === 'chart') return new Inspector(chartRef.current);
    });
    return () => runtime.dispose();
  }, []);

  return (
    <Box
      width='100%'
      padding={4}
      backgroundColor='blackAlpha.300'
      borderRadius='lg'
      overflow='hidden'
    >
      <Text fontSize='lg'>Historical value (USD)</Text>
      <Container
        maxWidth='container.xl'
        ref={chartRef as unknown as LegacyRef<HTMLDivElement> | undefined}
        borderRadius='lg'
        fontSize='xl'
        marginY={2}
      />
      <Text fontSize='sm' marginTop={3}>
        Data from{' '}
        <Link
          color='teal.500'
          href='https://www.cryptodatadownload.com/data/ftx/'
          fontWeight='normal'
          target='blank'
        >
          cryptodatadownload.com
        </Link>
        , Bar Chart Race forked & customized at Observable{' '}
        <Link
          color='teal.500'
          href='https://observablehq.com/d/283f8a06a6d1ba0f'
          fontWeight='normal'
          target='blank'
        >
          by George Filippou
        </Link>
      </Text>
    </Box>
  );
}

export default BarChartRace;
