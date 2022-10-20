import { ethers } from 'ethers';
import { useWeb3Adapter } from '../web3Adapter/useWeb3Adapter';

const ADDRESS = `0x6D269E03a93ABf0858a449CBB596ea384D90060a`;
const ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'num',
        type: 'uint256',
      },
    ],
    name: 'store',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'retrieve',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

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
