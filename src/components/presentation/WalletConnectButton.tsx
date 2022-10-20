import { FC } from 'react';
import { Button } from '@chakra-ui/react';

interface Props {
  signerAddress?: string;
  onClick: () => void;
}

const WalletConnectButton: FC<Props> = ({ signerAddress, onClick }) => {
  return (
    <Button
      width='100%'
      size='lg'
      colorScheme={`${signerAddress ? 'teal' : 'pink'}`}
      onClick={onClick}
    >
      {signerAddress ? 'Connected' : 'Connect Wallet'}
    </Button>
  );
};

export default WalletConnectButton;
