import useContract from "./useContract";

import busdABI from "abis/Busd.json";

const useBusdContract = () =>
  useContract(process.env.REACT_APP_BUSD_CONTRACT_ADDRESS, busdABI, true);

export default useBusdContract;
