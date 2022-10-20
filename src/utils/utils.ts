export const capitalizeFirstLetter = (word: string): string => {
  return word[0].toUpperCase() + word.slice(1);
};

export const shortenAddress = (address: string): string => {
  return address.slice(0, 5) + '...' + address.slice(-5);
};

export const generateAddressExplorerLink = (address: string) => {
  return `https://goerli.etherscan.io/address/${address}`;
};
