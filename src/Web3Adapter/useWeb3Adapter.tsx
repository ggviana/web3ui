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
    provider &&
      provider.getNetwork().then((re) => setConnectedNetwork(re.name));
  };

  const getAddress = () => {
    signer &&
      signer
        .getAddress()
        .then((address) => {
          setConnectedAddress(address);
        })
        .catch((err: any) => console.log(err));
  };

  const getWeb3Signer = async () => {
    if (!provider) return;
    await provider?.send('eth_requestAccounts', []);
    const signerResponse = provider.getSigner();
    setSigner(signerResponse);
  };

  useEffect(() => {
    getWeb3Provider();
  }, []);

  useEffect(() => {
    getNetworkName();
    getWeb3Signer();
  }, [provider]);

  useEffect(() => {
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
