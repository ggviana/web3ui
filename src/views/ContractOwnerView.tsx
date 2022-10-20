/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  InputGroup,
  VStack,
  Text,
  Button,
  RadioGroup,
  Stack,
  Radio,
  Box,
  Link,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import useOwnerContract from '../contracts/useOwnerContract';
import { generateAddressExplorerLink, shortenAddress } from '../utils/utils';
import { useWeb3Adapter } from '../web3Adapter/useWeb3Adapter';
import { useToast } from '../designSystem/useToast';

const ADDRESS_OPTIONS = [
  '0x86661b28B520aD314c6EEf28905234DEA0eB4dc3',
  '0xE538b64770671a5719FEcA4EE1Ba411f15EF34d1',
];

const ContractOwnerView: FC = () => {
  const { provider } = useWeb3Adapter();
  const { ownerContract, ownerContractAddress, ownerSet } = useOwnerContract();
  const { showToast } = useToast();

  const [ownerValue, setOwnerValue] = useState<null | string>(null);
  const [ownerValueLive, setOwnerValueLive] = useState<null | string>(null);
  const [addressOption, setAddressOption] = useState<undefined | string>(
    undefined
  );

  const getCurrentOwner = () =>
    ownerContract
      .getOwner()
      .then((re: any) => setOwnerValue(re.toString()))
      .catch(() =>
        showToast(
          'error',
          'Something went wrong',
          'Make sure Metamask is connected to Goerli test network.'
        )
      );

  const updateOwner = () => {
    !addressOption && showToast('warning', 'Select new owner address');
    addressOption && ownerSet(addressOption);
  };

  useEffect(() => {
    if (!provider) return;
    ownerContract.on('OwnerSet', (re) => {
      setOwnerValueLive(re);
      showToast('info', 'Owner changed', 'Contract emitted event');
      getCurrentOwner();
    });
  }, [provider]);

  return (
    <Box
      width='100%'
      padding={4}
      backgroundColor='blackAlpha.300'
      borderRadius='lg'
      overflow='hidden'
    >
      <VStack width='100%' alignItems='start' gap={2}>
        <Link
          color='teal.500'
          href={generateAddressExplorerLink(ownerContractAddress)}
          fontSize='3xl'
          paddingBottom={2}
          fontWeight='normal'
          target='blank'
          style={{ textDecoration: 'none' }}
        >
          Owner contract
        </Link>
        <InputGroup size='md' gap={4} alignItems={'center'}>
          <Text fontSize='lg' width='30%'>
            Event listener
          </Text>
          <Flex width='100%'>
            <Text>{ownerValueLive}</Text>
          </Flex>
        </InputGroup>
        <InputGroup size='md' gap={4} alignItems={'center'}>
          <Text fontSize='lg' width='40%'>
            Read owner
          </Text>
          <Flex width='100%'>
            <Text>{ownerValue}</Text>
          </Flex>
          <Button width='30%' onClick={() => getCurrentOwner()}>
            Read current owner
          </Button>
        </InputGroup>
        <InputGroup size='md' gap={4} alignItems={'center'}>
          <Text fontSize='lg' width='40%'>
            Update current owner
          </Text>
          <Flex width='100%'>
            <RadioGroup onChange={setAddressOption} value={addressOption}>
              <Stack direction='row' width='100%'>
                {ADDRESS_OPTIONS.map((address) => (
                  <Radio value={address} key={address}>
                    {shortenAddress(address)}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </Flex>
          <Button width='30%' onClick={() => updateOwner()}>
            Update Owner
          </Button>
        </InputGroup>
      </VStack>
    </Box>
  );
};

export default ContractOwnerView;
