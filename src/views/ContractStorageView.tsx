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
import { useWeb3Adapter } from '../adapters/web3Adapter/useWeb3Adapter';
import { useToast } from '../designSystem/useToast';
import { useDebounce } from '../utils/useDebounce';

const ContractStorageView: FC = () => {
  const { connectedAddress } = useWeb3Adapter();
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
      .catch(() =>
        showToast(
          'error',
          'Something went wrong',
          'Make sure Metamask is connected to Goerli test network.'
        )
      );

  const updateStoreValue = () => {
    if (!connectedAddress)
      showToast('error', 'Not connected to Goerli test network');
    if (!storeInputValue) showToast('warning', 'Enter a number');
    storeInputValue && storeSet(storeInputValue);
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
          fontSize='3xl'
          paddingBottom={2}
          fontWeight='normal'
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
