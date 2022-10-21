import { FC, useState } from 'react';
import {
  Flex,
  VStack,
  Text,
  Button,
  Input,
  Box,
  Link,
  HStack,
} from '@chakra-ui/react';
import useStorageContract from '../adapters/storageContractAdapter/useStorageContract';
import { generateAddressExplorerLink } from '../utils/utils';
import { useToast } from '../designSystem/useToast';
import { useDebounce } from '../utils/useDebounce';
import { useWeb3Context } from '../adapters/web3Adapter/web3Adapter';

const ContractStorageView: FC = () => {
  const { connectedAddress } = useWeb3Context();
  const { storeSet, storageContract, storageContractAddress } =
    useStorageContract();
  const { showToast } = useToast();

  const [storeInputValue, setStoreInputValue] = useState<null | number>(null);

  const { debounced: debouncedSetStoreInputValue } =
    useDebounce(setStoreInputValue);

  const [storeValue, setStoreValue] = useState<null | string>(null);

  const handleStoreInputValueChange = (input: string) => {
    debouncedSetStoreInputValue(Number(input));
  };

  const readStoreValue = () =>
    storageContract
      .retrieve()
      .then((re: any) => setStoreValue(re.toString()))
      .then(() => showToast('success', 'Store value read successfully'))
      .catch((err: any) =>
        showToast(
          'warning',
          'Could not read store value',
          err.reason || 'Make sure you are connected to Goerli network'
        )
      );

  const updateStoreValue = () => {
    if (!connectedAddress)
      showToast('error', 'Not connected to Goerli test network');
    if (!storeInputValue) showToast('warning', 'Enter a number');
    if (connectedAddress && storeInputValue)
      storeSet(storeInputValue)
        .then(() => showToast('success', 'New store value set successfully'))
        .catch((err: any) =>
          showToast('warning', 'Could not set new store value', err.reason)
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
          href={generateAddressExplorerLink(storageContractAddress)}
          fontSize='2xl'
          paddingBottom={2}
          fontWeight='semibold'
          target='blank'
          style={{ textDecoration: 'none' }}
        >
          Storage contract
        </Link>

        <HStack width='100%' alignItems='center'>
          <HStack width='80%' alignItems='center'>
            <Text fontSize='lg' width='30%'>
              Read store value
            </Text>
            <Flex width='70%'>
              <Text>{storeValue}</Text>
            </Flex>
          </HStack>
          <HStack width='20%'>
            <Button width='100%' onClick={() => readStoreValue()}>
              Read store value
            </Button>
          </HStack>
        </HStack>

        <HStack width='100%' alignItems='center'>
          <HStack width='80%' alignItems='center'>
            <Text fontSize='lg' width='30%'>
              Update store value
            </Text>
            <Flex width='70%'>
              <Input
                placeholder='Enter number'
                onChange={(e) => handleStoreInputValueChange(e.target.value)}
                variant='filled'
              />
            </Flex>
          </HStack>

          <HStack width='20%'>
            <Button width='100%' onClick={() => updateStoreValue()}>
              Update store value
            </Button>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ContractStorageView;
