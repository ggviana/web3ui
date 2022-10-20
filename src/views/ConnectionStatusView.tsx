import { FC } from 'react';
import { VStack, Text, HStack, Box } from '@chakra-ui/react';
import { useWeb3Adapter } from '../adapters/web3Adapter/useWeb3Adapter';
import { capitalizeFirstLetter } from '../utils/utils';
import WalletConnectButton from '../components/presentation/WalletConnectButton';

interface Props {}

const ConnectionStatusView: FC<Props> = () => {
  const { connectedNetwork, connectedAddress, getWeb3Signer } =
    useWeb3Adapter();

  return (
    <Box
      width='100%'
      padding={4}
      backgroundColor='blackAlpha.300'
      borderRadius='lg'
      overflow='hidden'
    >
      <HStack>
        <VStack width='80%' alignItems='start'>
          <HStack width='100%' height='2.5rem' alignItems='center'>
            <Text fontSize='lg' width='30%'>
              Network
            </Text>
            <Text width='70%'>
              {connectedNetwork ? capitalizeFirstLetter(connectedNetwork) : ''}
            </Text>
          </HStack>
          <HStack
            width='100%'
            height='2.5rem'
            alignItems='center'
            // backgroundColor='red'
          >
            <Text fontSize='lg' width='30%'>
              Address
            </Text>
            <Text width='70%'>{connectedAddress && connectedAddress}</Text>
          </HStack>
        </VStack>
        <VStack width='20%'>
          <WalletConnectButton
            signerAddress={connectedAddress}
            onClick={() => getWeb3Signer()}
          />
        </VStack>
      </HStack>
    </Box>
  );
};

export default ConnectionStatusView;
