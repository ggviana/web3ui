import { VStack, Container, HStack, Heading } from '@chakra-ui/react';
import { ThemeSwitch } from './designSystem/ThemeSwitch';
import ContractStorageView from './views/ContractStorageView';
import ConnectionStatusView from './views/ConnectionStatusView';
import ContractOwnerView from './views/ContractOwnerView';
import BarChartRaceView from './views/BarChartRaceView';
import ContractLotteryView from './views/ContractLotteryView';

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
      <BarChartRaceView />
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
        <ContractLotteryView />
      </VStack>
    </Container>
  );
};
