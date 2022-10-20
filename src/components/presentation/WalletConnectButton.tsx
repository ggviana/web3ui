import { Button } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  signerAddress?: string;
  onClick: () => void;
}

const WalletConnectButton: FC<Props> = ({ signerAddress, onClick }) => {
  return (
    <Button
      width='100%'
      // alignSelf='flex-end'
      size='lg'
      colorScheme={`${signerAddress ? 'teal' : 'pink'}`}
      onClick={onClick}
    >
      {signerAddress ? 'Connected' : 'Connect Wallet'}
    </Button>
  );
};

export default WalletConnectButton;
