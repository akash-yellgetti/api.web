const FyersAPI = require("fyers-api-v3")
import * as fs from 'fs';
import * as url from 'url';
// const querystring = require('querystring');

class FyersService {
    appId = "B58SG84OC9-100";
    secretKey = "KAKGI8UDV9";
    redirectUrl = "http://api.fyers.uat/fyers/access-token";
    authCode: any = null;
    accessToken: any = null;
    refreshToken: any = null;
    fyers: any;
    
    

    constructor() {
        this.fyers = new FyersAPI.fyersModel();
    }

    config() {
        // Set your APPID obtained from Fyers (replace "xxx-1xx" with your actual APPID)
        this.fyers.setAppId(this.appId);
  
        // Set the RedirectURL where the authorization code will be sent after the user grants access
        // Make sure your redirectURL matches with your server URL and port
        this.fyers.setRedirectUrl(this.redirectUrl);
    }

    initialize() {
        this.config();
  
        // set access Token
        this.fyers.setAccessToken(this.accessToken)
      } 

    async getAuthCode() {
        try {
            this.config();
            return this.fyers.generateAuthCode();
        } catch (error: any) {
            throw new Error(`Authentication failed: ${error.message}`);
        }
    }

    async getAccessToken(inputs: any) {
        try {
            const filePath: string = 'fyers.authcode'
            // Read the file asynchronously using fs.promises.readFile
            const str: string = await fs.promises.readFile(filePath, 'utf8');
            // const urlParams = url.split('?')[1];
            const queryParameters = url.parse(str, true).query;
            // set auth-code
            this.authCode = inputs.auth_code || queryParameters.auth_code;
            // initialize
            this.initialize()
            // get access token
            const data = await this.fyers.generate_access_token({ "secret_key": this.secretKey, "auth_code": this.authCode })
            // create fyers.data.json   
            const json = { authCode: this.authCode, access_token: data.access_token, refresh_token: data.refresh_token };
            this.accessToken = data.access_token;
            this.refreshToken = data.refresh_token;
            fs.writeFileSync("./fyers.data.json", JSON.stringify(json, null, 2))

            return json;
        } catch (error: any) {
            console.log(error)
            throw new Error(`Authentication failed: ${error.message}`);
        }
    }
 
    async getProfile() {
        try {
            // Implement logic to check funds
            this.initialize()
            return (await this.fyers.get_profile()).data
        } catch (error: any) {
            console.log(error)
            throw new Error(`Failed to check funds: ${error.message}`);
        }
    }

    async orders() {
        try {
            // Implement logic to check funds
        } catch (error: any) {
            throw new Error(`Failed to check funds: ${error.message}`);
        }
    }

    async checkFunds() {
        try {
            // Implement logic to check funds
        } catch (error: any) {
            throw new Error(`Failed to check funds: ${error.message}`);
        }
    }

    async checkBalance() {
        try {
            // Implement logic to check balance
        } catch (error: any) {
            throw new Error(`Failed to check balance: ${error.message}`);
        }
    }

    async placeOrder(orderDetails: any) {
        try {
            // Implement logic to place order
        } catch (error: any) {
            throw new Error(`Failed to place order: ${error.message}`);
        }
    }

    async setStopLoss(orderId: any, stopLossPrice: any) {
        try {
            // Implement logic to set stop-loss for an order
        } catch (error: any) {
            throw new Error(`Failed to set stop-loss: ${error.message}`);
        }
    }

    async setTrailingStopLoss(orderId: any, trailValue: any) {
        try {
            // Implement logic to set trailing stop-loss for an order
        } catch (error: any) {
            throw new Error(`Failed to set trailing stop-loss: ${error.message}`);
        }
    }

    async cancelOrder(orderId: any) {
        try {
            // Implement logic to cancel an order
        } catch (error: any) {
            throw new Error(`Failed to cancel order: ${error.message}`);
        }
    }

    async getOrderStatus(orderId: any) {
        try {
            // Implement logic to get the status of an order
        } catch (error: any) {
            throw new Error(`Failed to get order status: ${error.message}`);
        }
    }

    async getOrderHistory() {
        try {
            // Implement logic to retrieve order history
        } catch (error: any) {
            throw new Error(`Failed to retrieve order history: ${error.message}`);
        }
    }

    async getPositions() {
        try {
            // Implement logic to retrieve open positions
        } catch (error: any) {
            throw new Error(`Failed to retrieve positions: ${error.message}`);
        }
    }

    async getHistoricalData(symbol: string, interval: Number, from: any, to: any) {
        try {
            // Implement logic to retrieve historical market data
        } catch (error: any) {
            throw new Error(`Failed to retrieve historical data: ${error.message}`);
        }
    }
}


export const fyersService = new FyersService();