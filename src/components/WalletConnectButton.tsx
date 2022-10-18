import { Button } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  signerAddress?: string;
  onClick: () => void;
}

const WalletConnectButton: FC<Props> = ({ signerAddress, onClick }) => {
  // const displayAddress = `...${signerAddress?.slice(-5).toUpperCase()}`;

  return (
    <Button
      alignSelf='flex-start'
      size='lg'
      colorScheme={`${signerAddress ? 'teal' : 'pink'}`}
      onClick={onClick}
    >
      {signerAddress ? 'Connected' : 'Connect Wallet'}
    </Button>
  );
};

export default WalletConnectButton;
