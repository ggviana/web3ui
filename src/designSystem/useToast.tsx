import { useToast as useToastChakra } from '@chakra-ui/react';

type Status = 'success' | 'error' | 'warning' | 'info';
type Message = string;
type Title = string;

const TOAST_DURATION_MILLIS = 3000;

export const useToast = () => {
  const toast = useToastChakra();

  const showToast = (status: Status, title: Title, message?: Message) => {
    return toast({
      title: title,
      description: message,
      status: status,
      duration: TOAST_DURATION_MILLIS,
      isClosable: true,
      position: 'bottom-left',
      containerStyle: {
        width: '30%',
      },
    });
  };

  return { showToast };
};
