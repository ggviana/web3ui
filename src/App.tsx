import {
  ChakraProvider,
  VStack,
  theme,
  Container,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './components/ColorModeSwitcher';
import WalletConnectButton from './components/WalletConnectButton';
import { useWeb3Adapter } from './Web3Adapter/useWeb3Adapter';
import ContractStorageView from './components/ContractStorageView';
import ConnectionStatusView from './components/ConnectionStatusView';
import ContractOwnerView from './components/ContractOwnerView';

export const App = () => {
  const { connectedAddress, getWeb3Signer } = useWeb3Adapter();

  return (
    <ChakraProvider theme={theme}>
      <Container maxWidth='container.lg' padding={3}>
        <VStack spacing={8}>
          <HStack
            justify='space-between'
            width='100%'
            alignItems='center'
            height={20}
          >
            <Heading as='h1' size='xl'>
              Smart Contract Tests
            </Heading>
            <ColorModeSwitcher />
          </HStack>
          <WalletConnectButton
            signerAddress={connectedAddress}
            onClick={() => getWeb3Signer()}
          />
          <ConnectionStatusView />
          <ContractStorageView />
          <ContractOwnerView />
        </VStack>
      </Container>
    </ChakraProvider>
  );
};
