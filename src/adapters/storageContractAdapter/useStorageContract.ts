import { ethers } from 'ethers';
import { useWeb3Adapter } from '../web3Adapter/useWeb3Adapter';
import { ABI, ADDRESS } from './constants';

export const useStorageContract = () => {
  const { signer, provider } = useWeb3Adapter();

  const storageContract = new ethers.Contract(ADDRESS, ABI, provider);
  const storageContractWithSigner = signer && storageContract.connect(signer);

  const storeSet = (number: number) => {
    storageContractWithSigner && storageContractWithSigner.store(number);
  };

  return {
    storageContractAddress: ADDRESS,
    storageContract,
    storageContractWithSigner,
    storeSet,
  };
};

export default useStorageContract;
