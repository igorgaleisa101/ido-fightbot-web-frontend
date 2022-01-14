import { useMemo } from "react";
import Web3 from "web3";

const useContract = (address = undefined, ABI, withSignerIfPossible = true) => {
  const { ethereum } = window;
  window.web3 = new Web3(ethereum);

  return useMemo(() => {
    // if (!address || !ABI || !library) {
    if (!address || !ABI) {
      return null;
    }

    try {
      const contractInstance = new window.web3.eth.Contract(ABI, address);
      return contractInstance;
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI]);
};

export default useContract;
