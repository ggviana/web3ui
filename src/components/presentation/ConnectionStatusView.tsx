import { FC } from 'react';
import { Heading, VStack, Text, HStack } from '@chakra-ui/react';
import { useWeb3Adapter } from '../../web3Adapter/useWeb3Adapter';
import { capitalizeFirstLetter } from '../../utils/utils';

interface Props {}

const ConnectionStatusView: FC<Props> = () => {
  const { connectedNetwork, connectedAddress } = useWeb3Adapter();

  return (
    <VStack width='100%' alignItems='start'>
      <HStack width='100%' height='2.5rem' alignItems='center'>
        <Heading as='h3' size='sm' width='20%'>
          Network
        </Heading>
        <Text>
          {connectedNetwork ? capitalizeFirstLetter(connectedNetwork) : ''}
        </Text>
      </HStack>
      <HStack width='100%' height='2.5rem' alignItems='center'>
        <Heading as='h3' size='sm' width='20%'>
          Address
        </Heading>
        <Text>{connectedAddress && connectedAddress}</Text>
      </HStack>
    </VStack>
  );
};

export default ConnectionStatusView;
