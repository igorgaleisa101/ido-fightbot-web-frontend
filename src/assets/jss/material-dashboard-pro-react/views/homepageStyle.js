import {
    container,
    homeYellowColor,
    homeBackColor,
    homeDividerColor,
    homeTextColor1
} from "assets/jss/material-dashboard-pro-react.js";

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
  
const homePageStyle = theme => ({
    ...sweetAlertStyle,
    container: {
      ...container,
      zIndex: "4",
      [theme.breakpoints.down("sm")]: {
        paddingBottom: "100px"
      }
    },
    backdrop: {
        zIndex: 99999,
        color: '#fff',
    },
    idoBlock: {
        color: "#fff",
        fontFamily: 'NauSea',
        textTransform: "uppercase",
        fontSize: "22px",
        backgroundColor: homeBackColor,
        padding: "30px 40px",
        backgroundSize: "400px 400px",
        [theme.breakpoints.down("sm")]: {
            padding: "20px 10px",
            fontSize: "16px",
            backgroundSize: "200px 200px",
        },
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right bottom",
        WebkitTextStrokeWidth: "0.5px",
        WebkitTextStrokeColor: "#000"
    },
    largeText: {
        fontSize: "26px"
    },
    yellowText: {
        color: homeYellowColor,
    },
    flexContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "20px 0",
        padding: "4px 20px",
        [theme.breakpoints.down("sm")]: {
            padding: "4px 0px",
        },
        "& img" : {
            width: "40px",
            [theme.breakpoints.down("sm")]: {
                width: "20px",
            },
        }
    },
    flexContainerCenter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px 0",
        padding: "4px 20px",
        [theme.breakpoints.down("sm")]: {
            padding: "4px 0px",
        },
        "& img" : {
            width: "40px",
            [theme.breakpoints.down("sm")]: {
                width: "20px",
            }
        }
    },
    flexContainerRight: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        margin: "20px 0",
        padding: "4px 20px",
        [theme.breakpoints.down("sm")]: {
            padding: "4px 0px",
        },
        "& img" : {
            width: "30px",
            [theme.breakpoints.down("sm")]: {
                width: "20px",
            },
        }
    },
    blockHeader: {
        textAlign: "center",        
    }, 
    headerIcon: {
        maxHeight: "160px"
    },   
    blockTitle: {
        textAlign: "right",            
        color: homeTextColor1,
        fontSize: "26px",
        paddingBottom: "4px",
        WebkitTextStrokeWidth: "0px",
        WebkitTextStrokeColor: "transparent"
    },
    blockDivider: {
        height: "2px",
        width: "100%",
        backgroundColor: homeDividerColor
    },
    idoContract: {
        padding: "0 40px"
    },        
    exchangeRate: {
        textAlign: "center",
        color: homeYellowColor
    },
    exchangeControl: {
        color: "#fff",
        fontFamily: 'NauSea',
        textTransform: "uppercase",
        fontSize: "24px",
        [theme.breakpoints.down("sm")]: {
            fontSize: "12px",
            padding: "10px 6px",
        },
        backgroundColor: "transparent",
        width: "90%",
        padding: "10px 20px",
        border: "2px solid " + homeYellowColor,
        boxShadow: "rgb(255 250 21 / 30%) 0px 0px 12px inset, rgb(255 250 21 / 50%) 0px 0px 20px",
        borderRadius: "10px",
        transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
        lineHeight: "1.5",
        backgroundImage: "url('/img/transfer.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right calc(0.375em + 0.1875rem) center",
        backgroundSize: "calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)",
        "&::-webkit-input-placeholder": {
            color: "#fff"
        },
        "&:-ms-input-placeholder": {
            color: "#fff"
        },
        "&::placeholder": {
            color: "#fff"
        },
        "&.is-valid": {
            borderColor: "#28a745",
            paddingRight: "calc(1.5em + 0.75rem)",
            backgroundImage: "url('/img/1.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right calc(0.375em + 0.1875rem) center",
            backgroundSize: "calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)"
        },    
        "&.is-invalid": {
            borderColor: "#dc3545",
            paddingRight: "calc(1.5em + 0.75rem)",
            backgroundImage: "url('/img/2.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right calc(0.375em + 0.1875rem) center",
            backgroundSize: "calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)"
        }
    },
    invalidFeedback: {
        width: "100%",
        marginTop: "20px",
        fontSize: "80%",
        color: "#dc3545"
    },    
    idoBuyButton: {
        minWidth: "140px",
        fontFamily: 'NauSea',
        background: "transparent",
        border: "2px solid #FF7777",
        borderRadius: "6px !important",
        fontSize: "20px",
        padding: "8px 14px",
        WebkitTextStrokeWidth: "0.5px",
        WebkitTextStrokeColor: "#000",
        marginBottom: "20px",
        boxShadow: "rgba(255, 255, 255, 0.3) 0px 0px 12px inset, rgba(255, 255, 255, 0.5) 0px 0px 12px !important",
        "&:hover" : {
            pointer: "cursor",
            background: "#FF7777",
        },
        "&:active": {
            background: "#FF7777",
        }
    },
    warningConnectWallet: {
        fontSize: "20px",
        marginTop: "20px",
        color: "#dc3545",
        WebkitTextStrokeWidth: "0.5px",
        WebkitTextStrokeColor: "#fff"
    },
    countDownTitle: {
        marginTop: "30px",
        fontSize: "26px",
        textAlign: "center"
    },
    countDownTimer: {
        margin: "30px 0 20px 0",
        textAlign: "center",
        "& .item" : {
            color: homeYellowColor,
            fontSize: "56px",
            [theme.breakpoints.down("sm")]: {
                fontSize: "40px",
            }
        }
    },
    progressBlock: {
        "& .blockTitle": {
            margin: "20px 0",
            textAlign: "center",
            fontSize: "26px"
        },
    },
    progContainer: {
        borderRadius: "10px",
        boxShadow: "rgb(255 255 255 / 30%) 0px 0px 12px inset, rgb(255 255 255 / 50%) 0px 0px 12px",
        backgroundColor: "transparent",
        "& div": {
            backgroundColor: homeYellowColor + "!important"
        },
        "& span": {
            WebkitTextStrokeWidth: "0px",
            WebkitTextStrokeColor: "transparent",
            color: "#000 !important",
            fontSize: "40px !important",
            [theme.breakpoints.down("sm")]: {
                fontSize: "28px !important",
            }
        }
    },
    totalSupply: {
        textAlign: "center",
        marginTop: "40px",
        fontSize: "26px",
        [theme.breakpoints.down("sm")]: {
            fontSize: "16px !important",
        },
        "& .value": {
            color: homeYellowColor
        }
    },
    progressContainer: {
        position: "relative",
        padding: "0 30px"
    },
    startFlagIcon: {
        position: "absolute",
        width: "100px"
    },
    endFlagIcon: {
        position: "absolute",
        right: "0",
        top: "-32px",
        width: "100px"
    }
  });
  
  export default homePageStyle;
  