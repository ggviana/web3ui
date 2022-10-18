import {
  Flex,
  Heading,
  InputGroup,
  VStack,
  Text,
  Button,
  Input,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import useStorageContract from '../contracts/useStorageContract';
import { useWeb3Adapter } from '../Web3Adapter/useWeb3Adapter';

interface Props {}

const ContractStorageView: FC<Props> = () => {
  const { connectedAddress } = useWeb3Adapter();
  const { storeSet, storageContract } = useStorageContract();

  const [storeInputValue, setStoreInputValue] = useState<null | number>(null);
  const [storeValue, setStoreValue] = useState<null | string>(null);

  const handleStoreInputValueChange = (input: string) => {
    setStoreInputValue(Number(input));
  };

  const readStoreValue = () =>
    storageContract
      .retrieve()
      .then((re: any) => setStoreValue(re.toString()))
      .catch((err: any) => console.log(err));

  const updateStoreValue = () => {
    if (!connectedAddress) alert('you are not connected');
    if (!storeInputValue) alert('no value entered');
    storeInputValue && storeSet(storeInputValue);
  };

  return (
    <VStack width='100%' alignItems='start'>
      <Heading as='h2' size='lg' noOfLines={1}>
        Store
      </Heading>
      <InputGroup size='md' gap={'1rem'} alignItems={'center'}>
        <Heading as='h2' size='md' noOfLines={1} width='40%'>
          Read Store Value
        </Heading>
        <Flex width='100%'>
          <Text>{storeValue}</Text>
        </Flex>
        <Button width='30%' onClick={() => readStoreValue()}>
          Read Store Value
        </Button>
      </InputGroup>
      <InputGroup size='md' gap={'1rem'} alignItems={'center'}>
        <Heading as='h2' size='md' noOfLines={1} width='40%'>
          Update Store Value
        </Heading>
        <Input
          placeholder='Enter number'
          onChange={(e) => handleStoreInputValueChange(e.target.value)}
        />
        <Button width='30%' onClick={() => updateStoreValue()}>
          Update Store Value
        </Button>
      </InputGroup>
    </VStack>
  );
};

export default ContractStorageView;
