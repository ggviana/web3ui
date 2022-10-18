import {
  ChakraProvider,
  Text,
  VStack,
  theme,
  Container,
  HStack,
  Heading,
  Input,
  Button,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Container
      maxWidth='container.lg'
      padding={3}
      //  backgroundColor='blue'
    >
      <VStack
        spacing={8}
        // backgroundColor='red'
      >
        <HStack
          justify='space-between'
          width='100%'
          alignItems='center'
          height={20}
        >
          <Heading as='h1' size='xl'>
            Title here
          </Heading>
          <ColorModeSwitcher />
        </HStack>
        <VStack width='100%' alignItems='start'>
          <Heading as='h2' size='md'>
            Section here
          </Heading>
          <HStack
            justify='space-between'
            width='100%'
            alignItems='center'
            height={20}
            // backgroundColor='blueviolet'
          >
            <Input placeholder='Basic usage' />
            <Button colorScheme='teal' size='md'>
              Button
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </Container>
  </ChakraProvider>
);
