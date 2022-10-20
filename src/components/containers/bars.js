import { useRef, useEffect } from 'react';
import { Runtime, Inspector } from '@observablehq/runtime';
import notebook from '283f8a06a6d1ba0f';
import { Link, Text, Container, Box } from '@chakra-ui/react';

function Notebook() {
  const chartRef = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(notebook, (name) => {
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
      <Text fontSize='lg'>
        Historical token values in USD from March 2020 until October 2022
      </Text>
      <Container
        maxWidth='container.xl'
        ref={chartRef}
        // backgroundColor='whiteAlpha.400'
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

export default Notebook;
