import React, { useState, useEffect, } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';

import Countdown from 'react-countdown';
import ProgressBar from "@ramonak/react-progress-bar";
import CurrencyInput from 'react-currency-input-field';
import SweetAlert from "react-bootstrap-sweetalert";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import ConnectWallet from "components/Connect/ConnectWallet";

import botwarLogo from "assets/img/background/robotwars_logov1.png";
import presaleHeaderIcon from "assets/img/presale/fightbots-telegram-pic.png";
import notebookIcon from "assets/img/icons/notebook.png";
import copyIcon from "assets/img/icons/copy.png";
import refreshIcon from "assets/img/icons/refresh.png";
import walletIcon from "assets/img/icons/wallet.png";
import startFlagIcon from "assets/img/icons/start-flag.png";
import endFlagIcon from "assets/img/icons/end-flag.png";

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useBusdContract, useIdoBbotContract } from "hooks";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/homepageStyle";
const useStyles = makeStyles(styles);

export default function HomePage() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const idoContractAddress = process.env.REACT_APP_IDO_BBOT_CONTRACT_ADDRESS; //'0x91e7BB4FAa5A18b95A7091afac09defBEF14DA43';
    const idoBbotContract = useIdoBbotContract();
    const busdContract = useBusdContract();

    const prefix = '$(BUSD)  ';

    const [loading, setLoading] = useState(false); 
    const [idoStatus, setIdoStatus] = useState(null); // 0: not started, 1: started, 2: ended, 3: unknown
    const [alert, setAlert] = useState(null);
    const [fundingGoal, setFundingGoal] = useState(0);
    const [softCap, setSoftCap] = useState(50);
    const [hardCap, setHardCap] = useState(100);
    const [remainingLimit, setRemainingLimit] = useState(0);
    const [exRate, setExRate] = useState(10);
    const [reExRate, setReExRate] = useState(0.1);
    const [idoProgress, setIdoProgress] = useState(0);
    const [userBalance, setUserBalance] = useState(0);

    const [inputClassName, setInputClassName] = useState('');
    const [value, setValue] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [targetDateStr, setTargetDateStr] = useState('');

    const { chainId, account, active } = useSelector((state) => state.userWallet);
    // const { connector, chainId, account, activate, deactivate, active, error } = useWeb3React();

    const hideAlert = () => {
        setAlert(null);
    };

    const hideAlertRefresh = () => {
        setAlert(null);
        window.location.reload();
    };

    const showSuccessMsg = (message) => {
        setAlert(
            <SweetAlert
              closeOnClickOutside={false}
              style={{ display: "block", marginTop: "-100px" }}
              title="Success!"
              onConfirm={() => hideAlertRefresh()}
              onCancel={() => hideAlertRefresh()}
              confirmBtnCssClass={classes.button + " " + classes.info}
              customClass="customSweetAlert"
            >
              {message}
            </SweetAlert>
        );
    };

    const showErrorMsg = (message) => {
        setAlert(
          <SweetAlert
            closeOnClickOutside={false}
            style={{ display: "block", marginTop: "-100px" }}
            title="Error!"
            onConfirm={() => hideAlert()}
            onCancel={() => hideAlert()}
            confirmBtnCssClass={classes.button + " " + classes.info}
            customClass="customSweetAlert"
          >
            {message}
          </SweetAlert>
        );
    };

    const showWalletAddress = (str) => {
        return str.substring(0, 6) + '...' + str.substring(str.length-4);
    };

    const getContractAddress = () => {
        return idoContractAddress.substring(0, 18);
    }

    const copyContractAddr = () => {
        navigator.clipboard.writeText(idoContractAddress);
    }

    const handleOnValueChange = (newValue) => {
        if (!newValue) {
            setInputClassName('');
            setValue('');
            return;
        }

        if (Number.isNaN(Number(newValue))) {
            setErrorMessage('Please enter a valid number');
            setInputClassName('is-invalid');
            return;
        }

        if (Number(newValue) > hardCap) {
            setErrorMessage(`Max: ${prefix} ${hardCap}`);
            setInputClassName('is-invalid');
            setValue(newValue);
            return;
        }

        if (Number(newValue) < softCap) {
            setErrorMessage(`Min: ${prefix} ${softCap}`);
            setInputClassName('is-invalid');
            setValue(newValue);
            return;
        }

        if(account && active && userBalance) {
            if (Number(newValue) > userBalance) {
                setErrorMessage(`No Enough Balance: ${prefix} ${userBalance}`);
                setInputClassName('is-invalid');
                setValue(newValue);
                return;
            }
        }

        setErrorMessage('');
        setInputClassName('is-valid');
        setValue(newValue);
    };

    const handleBuy = async () => {
        if(inputClassName !== 'is-valid') return;

        if(!active || !account) return;

        // start loading
        setLoading(true);

        const amount = window.web3.utils.toWei(value.toString(), "Ether");

        // console.log('amount => ' + amount);

        // approve busd payment            
        await busdContract.methods
            .approve(process.env.REACT_APP_IDO_BBOT_CONTRACT_ADDRESS, amount)
            .send({ from: account }, (error, transactionHash) => {
                if(transactionHash === undefined) {
                    setLoading(false);
                    return;
                } else {
                    // console.log(transactionHash);
                }
            });

        // check allowance of BUSD payment
        const allowanceResult = await busdContract.methods
            .allowance(account, process.env.REACT_APP_IDO_BBOT_CONTRACT_ADDRESS)
            .call({ from: account });

        // console.log('allowanceResult => ' + allowanceResult);

        if(allowanceResult !== amount) {
            setLoading(false);
            showErrorMsg('You must approve BUSD payment.');
            return;
        }

        const transaction = await idoBbotContract.methods
            .buy(amount)
            .send({ from: account }, (error, transactionHash) => {
                if(transactionHash === undefined) {
                    setLoading(false);
                    return;
                } else {
                    // console.log(transactionHash);
                }
            });

        // console.log(transaction);        

        setLoading(false);

        showSuccessMsg('You purchased tokens succesfully! Please check your wallet');

    }    

    // Random component
    const Completionist = () => <span></span>;

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return (
                <div className={classes.countDownTimer}>
                    <span className="item">
                        {days < 10 ? `0${days}` : days}&nbsp;: &nbsp;
                    </span>
                    <span className="item">
                        {hours < 10 ? `0${hours}` : hours}&nbsp;: &nbsp;
                    </span>
                    <span className="item">
                        {minutes < 10 ? `0${minutes}` : minutes}&nbsp;: &nbsp;
                    </span>
                    <span className="item">
                        {seconds < 10 ? `0${seconds}` : seconds}
                    </span>
                </div>
            );
        }
    };

    const getBgImage = () => {
        return botwarLogo;
    }

    Number.prototype.round = function(places) {
        return +(Math.round(this + "e+" + places)  + "e-" + places);
    }

    useEffect(() => {
        function getDateStr() {
            const startDateStr = '2022-01-15T00:00:00Z';
            const endDateStr = '2022-02-15T00:00:00Z';
    
            const startDate = Date.parse(startDateStr);
            const endDate = Date.parse(endDateStr);
            const currentDate = Date.now();

            // console.log(startDate);
            // console.log(endDate);
            // console.log(currentDate);
    
            if(currentDate <= startDate)
                setTargetDateStr(startDateStr);
            else if(currentDate > startDate && currentDate < endDate)
                setTargetDateStr(endDateStr);
            else setTargetDateStr(''); 
            
            return;
        }

        getDateStr();
    }, []);

    useEffect( () => {
        async function fetchData() {
            if (!idoBbotContract || !account || !active) return;
            
            setLoading(true);

            const isIdoStartedVal = await idoBbotContract.methods
                .isPresaleStarted()
                .call();
            // console.log('isIdoStartedVal => ' + isIdoStartedVal);
            
            const isIdoEndedVal = await idoBbotContract.methods
                .isPresaleEnded()
                .call();
            // console.log('isIdoEndedVal => ' + isIdoEndedVal);

            if(!isIdoStartedVal && !isIdoEndedVal) {
                setIdoStatus(0); // not started
            } else if(isIdoStartedVal && !isIdoEndedVal) {
                setIdoStatus(1); // started
            } else if(isIdoStartedVal && isIdoEndedVal){
                setIdoStatus(2); // ended       
            } else {  // unknown
                setIdoStatus(3);         
                setLoading(false);
                return;
            }

            const fundingGoal = await idoBbotContract.methods
                .fundingGoal()
                .call();

            setFundingGoal(Math.floor(window.web3.utils.fromWei(fundingGoal.toString(16), 'ether')));

            // const busdRaised = await idoBbotContract.methods
            //     .busdRaised()
            //     .call();

            const tokensRaised = await idoBbotContract.methods
                .tokensRaised()
                .call();

            // console.log('Progress => ' + ((100.0 * tokensRaised) / fundingGoal).toString() + '%');

            const percentValue = (100.0 * tokensRaised) / fundingGoal;
            setIdoProgress(percentValue.round(2));

            const tokenPrice = await idoBbotContract.methods
                .tokenPrice()
                .call();

            setExRate(window.web3.utils.fromWei(tokenPrice, 'ether'));
            setReExRate(1.0 / window.web3.utils.fromWei(tokenPrice, 'ether'));
            
            var remainingWei = (fundingGoal - tokensRaised) / window.web3.utils.fromWei(tokenPrice, 'ether');
            setRemainingLimit(Math.floor(window.web3.utils.fromWei(remainingWei.toString(16), 'ether')));

            const softCapVal = await idoBbotContract.methods
                .softCap()
                .call();

            setSoftCap(window.web3.utils.fromWei(softCapVal.toString(16), 'ether'));
            const hardCapVal = await idoBbotContract.methods
                .hardCap()
                .call();

            setHardCap(window.web3.utils.fromWei(hardCapVal.toString(16), 'ether'));  
            setLoading(false);

            return;
        }

        fetchData();
    }, [idoBbotContract, account, active]);

    useEffect(() => {
        async function fetchData() {
            if(active && account && busdContract)  {
                const userBalance = await busdContract.methods
                    .balanceOf(account)
                    .call();
                
                setUserBalance(window.web3.utils.fromWei(userBalance, 'ether'));
            }
        }

        fetchData();
    }, [active, account, busdContract]);

    return (
        <div className={classes.container}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={1}></GridItem>
                <GridItem xs={12} sm={12} md={10}>
                    <Card rect>
                        <CardBody nopadding>
                            <div className={classes.idoBlock} style={{ backgroundImage: "url(" + getBgImage() + ")" }}>
                                <div className={classes.topBlock}>
                                    <div className={classes.blockHeader}>
                                        <img className={classes.headerIcon} src={presaleHeaderIcon} alt="Fightbots" />
                                    </div>
                                    <div className={classes.blockTitle}>
                                        FightBots.Bet
                                    </div>
                                </div>
                                <div className={classes.blockDivider}></div>
                                <div className={classes.statusBlock}>
                                    <div className={classes.idoContract}>
                                        <div className={classes.flexContainerCenter}>
                                            <img src={notebookIcon} style={{marginRight: "20px"}} alt="IDO Contract" />
                                            <div className="presale-contract">
                                                { 'IDO Contract: ' + getContractAddress()}
                                            </div>
                                            <img src={copyIcon}  style={{marginLeft: "20px"}} onClick={copyContractAddr} alt="Copy Contract Address" />
                                        </div>
                                    </div>                                    
                                    <GridContainer className={classes.flexContainer}>
                                        <GridItem xs={12} sm={12} md={5}>
                                            <GridContainer style={{lineHeight: "30px"}}>
                                                <GridItem xs={6} sm={6} md={12}>
                                                    <div style={{marginBottom: "10px"}}>Remaining Limit: </div>
                                                </GridItem>
                                                <GridItem xs={6} sm={6} md={12}>
                                                    <div className={classes.yellowText}>{remainingLimit.toLocaleString()} BUSD</div>
                                                </GridItem>
                                            </GridContainer>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={7}>                                        
                                            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                                <div style={{display: "flex", alignItems: "center", marginBottom: "10px"}}>
                                                    <img src={refreshIcon} style={{marginRight: "20px"}} alt="Refresh" />
                                                    <div>Exchange Proportion: </div>
                                                </div>
                                            </div>
                                            <div className={classes.exchangeRate}>1 BUSD = {exRate} BBOT ({reExRate} BUSD Per Token)</div>
                                        </GridItem>
                                    </GridContainer>
                                </div>  
                                <div className={classes.blockDivider}></div>
                                <div className={classes.walletBlock}>
                                    { account && active ? (
                                    <div className={classes.flexContainerRight}>
                                        <img src={walletIcon} style={{marginRight: "20px"}} alt="Wallet" />
                                        <div style={{marginRight: "20px"}}>
                                            User Wallet Balance: 
                                        </div>
                                        <div className={classes.yellowText}>
                                            {userBalance} BUSD
                                        </div>
                                    </div>
                                    ) : (<></>) }
                                    <div style={{textAlign: "center", margin: "20px"}}>
                                        <CurrencyInput
                                            id="validationCustom01"
                                            name="input-1"
                                            className={`${classes.exchangeControl} ${inputClassName}`}
                                            value={value}
                                            onValueChange={handleOnValueChange}
                                            placeholder="Please enter the exchange quantity"
                                            prefix={prefix}
                                            step={1}
                                        />
                                        <div className={classes.invalidFeedback}>{errorMessage}</div>
                                        { account && active ? (                                            
                                                <>
                                                    { idoStatus === 1 ? (
                                                        <Button color="transparent" className={classes.idoBuyButton} onClick={handleBuy}>
                                                            Buy
                                                        </Button>
                                                        ) : (<></>) 
                                                    }
                                                    <div>Wallet Address: {showWalletAddress(account)}</div>
                                                </>
                                            ) : (
                                                <div className={classes.warningConnectWallet}>
                                                    <p>Please connect MetaMask to buy BBOT</p>                                                                                          
                                                </div>
                                            )
                                        }    
                                        <ConnectWallet />         
                                    </div> 
                                </div>
                                <div className={classes.blockDivider}></div>
                                <div className={classes.countDownBlock}>                                    
                                    <div className={classes.countDownTitle}>
                                        { idoStatus === 0 ? (<>Ido Sale Starts In:</>) : idoStatus === 1 ? (<>Ido Sale Ends In:</>) : (<>Ido Sale Ended</>)}
                                    </div>
                                    { (idoStatus === 0 || idoStatus === 1) && targetDateStr !== '' ?
                                        (<Countdown
                                            date={Date.parse(targetDateStr)}
                                            renderer={renderer}
                                        />) : (<></>) }
                                </div>
                                <div className={classes.blockDivider}></div>
                                <div className={classes.progressBlock}>
                                    <div className="blockTitle">
                                        Progress
                                    </div>
                                    <div className={classes.progressContainer}>
                                        <ProgressBar 
                                            className="progMain"
                                            barContainerClassName={classes.progContainer}
                                            barCompletedClassName={classes.progBar}
                                            completed={idoProgress} 
                                            height="50px"
                                        />                                        
                                        <img className={classes.startFlagIcon} src={startFlagIcon} alt="StartFlag" />                                        
                                        <img className={classes.endFlagIcon} src={endFlagIcon} alt="EndFlag" />                                        
                                    </div>
                                    <div className={classes.totalSupply}>
                                        <span className="desc">Ido Sale Token Supply:&nbsp;</span>
                                        <span className="value">{fundingGoal.toLocaleString()} BBOT</span>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={1}></GridItem>
            </GridContainer>
            { alert }
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>  
    );
};

