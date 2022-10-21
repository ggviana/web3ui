import { FC, useState } from 'react';
import { VStack, Text, Button, Box, Link, HStack } from '@chakra-ui/react';
import { generateAddressExplorerLink } from '../utils/utils';
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

        <HStack width='100%' alignItems='center'>
          <Text fontSize='sm' width='80%'>
            {participants
              .filter(
                (item: string) =>
                  item !== '0x0000000000000000000000000000000000000000'
              )
              .map((item: string) => (
                <p>{item}</p>
              ))}
          </Text>
          <HStack width='20%'>
            <Button width='100%' onClick={() => getParticipants()}>
              Get Participants
            </Button>
          </HStack>
        </HStack>

        <HStack width='100%' alignItems='center'>
          <Text fontSize='lg' width='80%'>
            Required fee 0.001 ETH to join lottery. Open for up to 10
            participants.
          </Text>
          <HStack width='20%'>
            <Button width='100%' onClick={() => payParticipationFee()}>
              Pay Fee
            </Button>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ContractLotteryView;
