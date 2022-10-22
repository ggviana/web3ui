import { FC } from 'react';
import { Button } from '@chakra-ui/react';

interface Props {
  signerAddress?: string;
  onClick: () => void;
}

const WalletConnectButton: FC<Props> = ({
  signerAddress,
  onClick,
  ...rest
}) => {
  return (
    <Button
      width='100%'
      colorScheme={`${signerAddress ? 'teal' : 'pink'}`}
      onClick={onClick}
      whiteSpace='normal'
      fontSize={{ base: '0.8rem', md: '1rem' }}
      lineHeight={{ base: '0.8rem', md: '1.2rem' }}
      {...rest}
    >
      {signerAddress ? 'Connected' : 'Connect Wallet'}
    </Button>
  );
};

export default WalletConnectButton;
