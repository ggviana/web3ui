import { FC, useState } from 'react';
import {
  VStack,
  Text,
  Button,
  Box,
  Link,
  HStack,
  Badge,
  Stack,
} from '@chakra-ui/react';
import { generateAddressExplorerLink, shortenAddress } from '../utils/utils';
import { useToast } from '../designSystem/useToast';
import { useWeb3Context } from '../adapters/web3Adapter/web3Adapter';
import useLotteryContract from '../adapters/lotteryContractAdapter/useLotteryContract';

const ContractLotteryView: FC = () => {
  const { connectedAddress } = useWeb3Context();
  const { getParticipantsList, joinLottery, lotteryContractAddress } =
    useLotteryContract();
  const { showToast } = useToast();

  const [participants, setParticipants] = useState([]);

  const payParticipationFee = () => {
    if (!connectedAddress)
      showToast('error', 'Not connected to Goerli test network');
    joinLottery()
      .then(() => console.log(showToast('success', 'Joined successfully')))
      .catch((err: any) =>
        showToast('warning', 'Something went wrong', err.reason)
      );
  };

  const getParticipants = () => {
    if (!connectedAddress)
      showToast('error', 'Not connected to Goerli test network');
    getParticipantsList()
      .then((re: any) => setParticipants(re))
      .then(() =>
        showToast('success', 'Participants list fetched successfully')
      )
      .catch((err: any) =>
        showToast(
          'warning',
          'Could not fetch participants lists',
          err.reason || 'Make sure you are connected to Goerli network'
        )
      );
  };

  return (
    <Box
      width='100%'
      padding={4}
      backgroundColor='blackAlpha.300'
      borderRadius='lg'
      overflow='hidden'
    >
      <VStack width='100%' alignItems='start' gap={1}>
        <Link
          color='teal.500'
          href={generateAddressExplorerLink(lotteryContractAddress)}
          fontSize='2xl'
          paddingBottom={2}
          fontWeight='semibold'
          target='blank'
          style={{ textDecoration: 'none' }}
        >
          Participation fee contract
        </Link>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          width='100%'
          alignItems={{ base: 'start', md: 'center' }}
          gap={1}
        >
          <Stack
            direction={{ base: 'column', md: 'row' }}
            width={{ base: '100%', md: '80%' }}
          >
            {participants
              .filter(
                (item: string) =>
                  item !== '0x0000000000000000000000000000000000000000'
              )
              .map((item: string) => (
                <Badge colorScheme='teal' variant='solid'>
                  {shortenAddress(item)}
                </Badge>
              ))}
          </Stack>
          <HStack width={{ base: '100%', md: '20%' }}>
            <Button
              width='100%'
              onClick={() => getParticipants()}
              whiteSpace='normal'
              fontSize={{ base: '0.8rem', md: '1rem' }}
              lineHeight={{ base: '0.8rem', md: '1.2rem' }}
            >
              Get Participants
            </Button>
          </HStack>
        </Stack>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          width='100%'
          alignItems={{ base: 'start', md: 'center' }}
          gap={1}
        >
          <Text fontSize='lg' width={{ base: '100%', md: '80%' }}>
            Required fee 0.001 ETH to join lottery. Open for up to 10
            participants.
          </Text>
          <HStack width={{ base: '100%', md: '20%' }}>
            <Button
              width='100%'
              onClick={() => payParticipationFee()}
              whiteSpace='normal'
              fontSize={{ base: '0.8rem', md: '1rem' }}
              lineHeight={{ base: '0.8rem', md: '1.2rem' }}
            >
              Pay Fee
            </Button>
          </HStack>
        </Stack>
      </VStack>
    </Box>
  );
};

export default ContractLotteryView;
