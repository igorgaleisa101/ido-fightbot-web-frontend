import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

const connectWalletStyle = theme => ({
  ...sweetAlertStyle,
  connectWallet: {
    fontFamily: 'NauSea',
    background: "transparent",
    border: "2px solid #FF7777",
    borderRadius: "6px !important",
    fontSize: "20px",
    padding: "8px 14px",
    WebkitTextStrokeWidth: "0.5px",
    WebkitTextStrokeColor: "#000",
    boxShadow: "rgba(255, 255, 255, 0.3) 0px 0px 12px inset, rgba(255, 255, 255, 0.5) 0px 0px 12px !important",
    "&:hover" : {
      background: "#FF7777",
    }
  }
});

export default connectWalletStyle;
