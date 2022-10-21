import { createContext, useContext } from 'react';
import { useWeb3Adapter } from './useWeb3Adapter';
import { ethers } from 'ethers';

interface IWeb3Context {
  getWeb3Provider?: () => void;
  connectedNetwork: string | undefined;
  connectedAddress: string | undefined;
  provider: ethers.providers.Web3Provider | undefined;
  signer: ethers.providers.JsonRpcSigner | undefined;
}

const emptyState = {
  getWeb3Provider: undefined,
  connectedNetwork: undefined,
  connectedAddress: undefined,
  provider: undefined,
  signer: undefined,
};

export const Web3Context = createContext<IWeb3Context>(emptyState);
export const useWeb3Context = () => useContext(Web3Context);

export const Web3Provider = ({ children }: { children: any }) => {
  const {
    getWeb3Provider,
    connectedNetwork,
    connectedAddress,
    provider,
    signer,
  } = useWeb3Adapter();

  return (
    <Web3Context.Provider
      value={{
        getWeb3Provider,
        connectedNetwork,
        connectedAddress,
        provider,
        signer,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
