import useContract from "./useContract";

import idoBbotContractAbi from "abis/IdoBbot.json";

const useIdoBbotContract = () =>
  useContract(process.env.REACT_APP_IDO_BBOT_CONTRACT_ADDRESS, idoBbotContractAbi, true);

export default useIdoBbotContract;