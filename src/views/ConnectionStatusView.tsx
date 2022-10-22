import { FC } from 'react';
import { VStack, Text, Stack } from '@chakra-ui/react';
import { capitalizeFirstLetter } from '../utils/utils';
import WalletConnectButton from '../components/presentation/WalletConnectButton';
import { useWeb3Context } from '../adapters/web3Adapter/web3Adapter';

interface Props {}

const ConnectionStatusView: FC<Props> = () => {
  const { connectedNetwork, connectedAddress, getWeb3Provider } =
    useWeb3Context();

  return (
    <VStack
      width='100%'
      padding={4}
      backgroundColor='blackAlpha.300'
      borderRadius='lg'
      overflow='hidden'
    >
      <Stack
        direction={{ base: 'column', md: 'row' }}
        width='100%'
        alignItems={{ base: 'start', md: 'center' }}
        gap={1}
      >
        <Text
          fontSize='lg'
          width={{ base: '100%', md: '24%' }}
          fontWeight={{ base: 'bold', md: 'normal' }}
        >
          Network
        </Text>
        <Text width={{ base: '100%', md: '76%' }}>
          {connectedNetwork ? capitalizeFirstLetter(connectedNetwork) : ''}
        </Text>
      </Stack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        width='100%'
        alignItems={{ base: 'start', md: 'center' }}
        gap={1}
      >
        <Text
          fontSize='lg'
          width={{ base: '100%', md: '24%' }}
          fontWeight={{ base: 'bold', md: 'normal' }}
        >
          Address
        </Text>
        <Text width={{ base: '100%', md: '56%' }}>
          {connectedAddress && connectedAddress}
        </Text>
        <VStack width={{ base: '100%', md: '20%' }}>
          <WalletConnectButton
            signerAddress={connectedAddress}
            onClick={() => getWeb3Provider && getWeb3Provider()}
          />
        </VStack>
      </Stack>
    </VStack>
  );
};

export default ConnectionStatusView;
