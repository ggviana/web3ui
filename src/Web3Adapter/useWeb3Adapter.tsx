/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const useWeb3Adapter = () => {
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >(undefined);
  const [signer, setSigner] = useState<
    ethers.providers.JsonRpcSigner | undefined
  >(undefined);
  const [connectedAddress, setConnectedAddress] = useState<string | undefined>(
    undefined
  );
  const [connectedNetwork, setConnectedNetwork] = useState<string | undefined>(
    undefined
  );

  const getWeb3Provider = async () => {
    const currentProvider = await new ethers.providers.Web3Provider(
      window.ethereum
    );
    setProvider(currentProvider);
  };

  const getNetworkName = () => {
    if (!provider) return;
    provider.getNetwork().then((re) => setConnectedNetwork(re.name));
  };

  const getAddress = () => {
    if (!signer) return;
    signer.getAddress().then((address) => {
      setConnectedAddress(address);
    });
  };

  const getWeb3Signer = async () => {
    if (!provider) return;
    await provider?.send('eth_requestAccounts', []);
    const signerResponse = provider.getSigner();
    setSigner(signerResponse);
  };

  useEffect(() => {
    // console.log('web3Adapter updated');
    getWeb3Provider();
  }, []);

  useEffect(() => {
    // console.log('provider updated');
    getNetworkName();
    getWeb3Signer();
  }, [provider]);

  useEffect(() => {
    // console.log('signer updated');
    getAddress();
  }, [signer]);

  return {
    getWeb3Signer,
    connectedNetwork,
    connectedAddress,
    provider,
    signer,
  };
};
