import { ethers } from 'ethers';
import { useWeb3Context } from '../web3Adapter/web3Adapter';
import { ABI, ADDRESS } from './constants';

export const useLotteryContract = () => {
  const { signer, provider } = useWeb3Context();

  const lotteryContract = new ethers.Contract(ADDRESS, ABI, provider);
  const lotteryContractWithSigner = signer && lotteryContract.connect(signer);

  const entryAdmission = ethers.utils.parseUnits('0.001', 18);

  const joinLottery = async () => {
    if (!lotteryContractWithSigner) return;
    return await lotteryContractWithSigner.join({ value: entryAdmission });
  };

  const getParticipantsList = async () => {
    if (!lotteryContract) return;
    return await lotteryContract.getParticipants();
  };

  return {
    lotteryContractAddress: ADDRESS,
    joinLottery,
    getParticipantsList,
  };
};

export default useLotteryContract;
