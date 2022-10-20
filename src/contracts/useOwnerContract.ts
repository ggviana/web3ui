import { ethers } from 'ethers';
import { useWeb3Adapter } from '../web3Adapter/useWeb3Adapter';

const ADDRESS = `0xcB39CFDF6eB18C0006fB24831931253BfF3ba619`;
const ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'changeOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'oldOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnerSet',
    type: 'event',
  },
  {
    inputs: [],
    name: 'getOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

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
