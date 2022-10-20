import {
  ChakraProvider,
  VStack,
  theme,
  Container,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { ThemeSwitch } from './designSystem/ThemeSwitch';
import WalletConnectButton from './components/presentation/WalletConnectButton';
import { useWeb3Adapter } from './web3Adapter/useWeb3Adapter';
import ContractStorageView from './views/ContractStorageView';
import ConnectionStatusView from './components/presentation/ConnectionStatusView';
import ContractOwnerView from './views/ContractOwnerView';

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
            <Heading as='h1' size='lg' fontWeight='light'>
              Smart Contract Tests
            </Heading>
            <ThemeSwitch />
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
