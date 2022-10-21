import { ethers } from 'ethers';
import { useWeb3Context } from '../web3Adapter/web3Adapter';
import { ABI, ADDRESS } from './constants';

export const useOwnerContract = () => {
  const { signer, provider } = useWeb3Context();

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
