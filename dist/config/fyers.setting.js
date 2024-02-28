"use strict";
const exchanges = {
    NSE: 10,
    MCX: 11,
    BSE: 12,
};
const segments = {
    "Capital Market": 10,
    "Equity Derivatives": 11,
    "Currency Derivatives": 12,
    "Commodity Derivatives": 20
};
const productTypes = {
    CNC: 'For equity only',
    INTRADAY: 'Applicable for all segments',
    MARGIN: 'Applicable only for derivatives',
    CO: 'Cover Order',
    BO: 'Bracket Order',
};
const orderTypes = {
    "Limit order": 1,
    "Market order": 2,
    "Stop order (SL-M)": 3,
    "Stoplimit order (SL-L)": 4,
};
const orderStatus = {
    "Cancelled": 1,
    "Traded / Filled": 2,
    "For future use": 3,
    "Transit": 4,
    "Rejected": 5,
    "Pending": 6
};
const orderSides = {
    Buy: 1,
    Sell: -1,
};
const positionSides = {
    Long: 1,
    Short: -1,
    "Closed Position": 0,
};
const OrderSources = {
    "Mobile": "M",
    "Web": "W",
    "Fyers One": "R",
    "Admin": "A",
    "API": "ITS"
};
const holdingTypes = {
    T1: "The shares are purchased but not yet delivered to the demat account.",
    HLD: "The shares are purchased and are available in the demat account."
};
