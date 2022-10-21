import { ethers } from 'ethers';
import { useWeb3Context } from '../web3Adapter/web3Adapter';
import { ABI, ADDRESS } from './constants';

export const useStorageContract = () => {
  const { signer, provider } = useWeb3Context();

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
