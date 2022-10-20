import { VStack, Container, HStack, Heading } from '@chakra-ui/react';
import { ThemeSwitch } from './designSystem/ThemeSwitch';
import ContractStorageView from './views/ContractStorageView';
import ConnectionStatusView from './views/ConnectionStatusView';
import ContractOwnerView from './views/ContractOwnerView';
import BarChartRace from './components/containers/barChartRace/barChartRace';

export const App = () => {
  return (
    <Container maxWidth='container.lg' padding={3}>
      <HStack
        justify='space-between'
        width='100%'
        alignItems='center'
        height={20}
      >
        <Heading as='h1' size='xl' fontWeight='bold' letterSpacing={-3}>
          pods
        </Heading>
        <ThemeSwitch />
      </HStack>
      <Heading as='h1' size='lg' fontWeight='light' marginY={4}>
        D3 Visualization
      </Heading>
      <BarChartRace />
      <VStack spacing={6}>
        <Heading
          as='h1'
          size='lg'
          fontWeight='light'
          marginTop={10}
          alignSelf='start'
        >
          Smart Contract Integration
        </Heading>
        <ConnectionStatusView />
        <ContractStorageView />
        <ContractOwnerView />
      </VStack>
    </Container>
  );
};
