import { ethers } from 'ethers';
import { useWeb3Adapter } from '../web3Adapter/useWeb3Adapter';
import { ABI, ADDRESS } from './constants';

export const useOwnerContract = () => {
  const { signer, provider } = useWeb3Adapter();

  const ownerContract = new ethers.Contract(ADDRESS, ABI, provider);
  const ownerContractWithSigner = signer && ownerContract.connect(signer);

  const ownerSet = (address: string) => {
    ownerContractWithSigner && ownerContractWithSigner.changeOwner(address);
  };

  return {
    ownerContractAddress: ADDRESS,
    ownerContract,
    ownerContractWithSigner,
    ownerSet,
  };
};

export default useOwnerContract;
