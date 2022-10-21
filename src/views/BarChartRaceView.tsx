import { useRef, useEffect, LegacyRef } from 'react';
import { Runtime, Inspector } from '@observablehq/runtime';
import barChartRaceDef from '../components/presentation/barChartRace/barChartRaceDef';
import { Link, Text, Container, Box } from '@chakra-ui/react';

function BarChartRaceView() {
  const chartRef = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(barChartRaceDef, (name: string) => {
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
          href='https://observablehq.com/d/0b3a144e9379526b'
          fontWeight='normal'
          target='blank'
        >
          by George Filippou
        </Link>
      </Text>
    </Box>
  );
}

export default BarChartRaceView;
