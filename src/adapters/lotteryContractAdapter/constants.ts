export const ADDRESS = `0xF570CcD7b8364A7b618EB47371c81030961bc7c8`;

export const ABI = [
  {
    constant: false,
    inputs: [],
    name: 'join',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getParticipants',
    outputs: [
      {
        name: '',
        type: 'address[10]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];
