import {
  Flex,
  Heading,
  InputGroup,
  VStack,
  Text,
  Button,
  Input,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import useOwnerContract from '../contracts/useOwnerContract';
import { useWeb3Adapter } from '../Web3Adapter/useWeb3Adapter';

interface Props {}

const ContractOwnerView: FC<Props> = () => {
  const { provider } = useWeb3Adapter();
  const { ownerContract, ownerSet } = useOwnerContract();

  const [ownerValue, setOwnerValue] = useState<null | string>(null);
  const [ownerValueLive, setOwnerValueLive] = useState<null | string>(null);
  const [addressOption, setAddressOption] = useState<undefined | string>(
    undefined
  );

  const getCurrentOwner = () =>
    ownerContract
      .getOwner()
      .then((re: any) => setOwnerValue(re.toString()))
      .catch((err: any) => console.log(err));

  const updateOwner = () => {
    addressOption && ownerSet(addressOption);
  };

  useEffect(() => {
    if (!provider) return;
    ownerContract.on('OwnerSet', (re) => setOwnerValueLive(re));
  }, [provider]);

  return (
    <VStack width='100%' alignItems='start'>
      <Heading as='h2' size='lg' noOfLines={1}>
        Owner
      </Heading>
      <InputGroup size='md' gap={'1rem'} alignItems={'center'}>
        <Heading as='h2' size='md' noOfLines={1} width='40%'>
          Live Owner Listener
        </Heading>
        <Flex width='100%'>
          <Text>{ownerValueLive}</Text>
        </Flex>
      </InputGroup>
      <InputGroup size='md' gap={'1rem'} alignItems={'center'}>
        <Heading as='h2' size='md' noOfLines={1} width='40%'>
          Read Owner
        </Heading>
        <Flex width='100%'>
          <Text>{ownerValue}</Text>
        </Flex>
        <Button width='30%' onClick={() => getCurrentOwner()}>
          Read Current Owner
        </Button>
      </InputGroup>
      <InputGroup size='md' gap={'1rem'} alignItems={'center'}>
        <Heading as='h2' size='md' noOfLines={1} width='40%'>
          Update Current Owner
        </Heading>
        <Flex width='100%'>
          <RadioGroup onChange={setAddressOption} value={addressOption}>
            <Stack direction='row' width='100%'>
              <Radio value='0xE538b64770671a5719FEcA4EE1Ba411f15EF34d1'>
                ...5EF34d1
              </Radio>
              <Radio value='0x86661b28B520aD314c6EEf28905234DEA0eB4dc3'>
                ...0eB4dc3
              </Radio>
            </Stack>
          </RadioGroup>
        </Flex>
        <Button width='30%' onClick={() => updateOwner()}>
          Update Owner
        </Button>
      </InputGroup>
    </VStack>
  );
};

export default ContractOwnerView;
