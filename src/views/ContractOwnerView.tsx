/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
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
import useOwnerContract from '../adapters/ownerContractAdapter/useOwnerContract';
import { generateAddressExplorerLink, shortenAddress } from '../utils/utils';
import { useToast } from '../designSystem/useToast';
import { useWeb3Context } from '../adapters/web3Adapter/web3Adapter';

const ADDRESS_OPTIONS = [
  '0x86661b28B520aD314c6EEf28905234DEA0eB4dc3',
  '0xE538b64770671a5719FEcA4EE1Ba411f15EF34d1',
];

const ContractOwnerView: FC = () => {
  const { provider, connectedAddress } = useWeb3Context();
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
      .then(() => showToast('success', 'Current owner read successfully'))
      .catch((err: any) =>
        showToast(
          'warning',
          'Could not fetch current owner',
          err.reason || 'Make sure you are connected to Goerli network'
        )
      );

  const updateOwner = () => {
    if (!connectedAddress)
      showToast('error', 'Not connected to Goerli test network');
    if (!addressOption) showToast('warning', 'Select new owner address');
    if (connectedAddress && addressOption)
      ownerSet(addressOption)
        .then(() => showToast('success', 'New owner set successfully'))
        .catch((err: any) =>
          showToast('warning', 'Could not set new owner', err.reason)
        );
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
      <VStack width='100%' alignItems='start' gap={1}>
        <Link
          color='teal.500'
          href={generateAddressExplorerLink(ownerContractAddress)}
          fontSize='2xl'
          paddingBottom={2}
          fontWeight='semibold'
          target='blank'
          style={{ textDecoration: 'none' }}
        >
          Owner contract
        </Link>

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
            Owner change event
          </Text>
          <Text width={{ base: '100%', md: '76%' }}>{ownerValueLive}</Text>
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
            Read owner
          </Text>
          <Text width={{ base: '100%', md: '56%' }}>{ownerValue}</Text>
          <VStack width={{ base: '100%', md: '20%' }}>
            <Button
              width='100%'
              onClick={() => getCurrentOwner()}
              whiteSpace='normal'
              fontSize={{ base: '0.8rem', md: '1rem' }}
              lineHeight={{ base: '0.8rem', md: '1.2rem' }}
            >
              Read current owner
            </Button>
          </VStack>
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
            Update owner
          </Text>
          <Flex width={{ base: '100%', md: '56%' }}>
            <RadioGroup
              onChange={setAddressOption}
              value={addressOption}
              colorScheme='teal'
            >
              <Stack direction={{ base: 'column', md: 'row' }} width='100%'>
                {ADDRESS_OPTIONS.map((address) => (
                  <Radio value={address} key={address}>
                    {shortenAddress(address)}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </Flex>
          <VStack width={{ base: '100%', md: '20%' }}>
            <Button
              width='100%'
              onClick={() => updateOwner()}
              whiteSpace='normal'
              fontSize={{ base: '0.8rem', md: '1rem' }}
              lineHeight={{ base: '0.8rem', md: '1.2rem' }}
            >
              Change Owner
            </Button>
          </VStack>
        </Stack>
      </VStack>
    </Box>
  );
};

export default ContractOwnerView;
