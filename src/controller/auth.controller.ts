import * as express from 'express';
import { jwt } from "../utils/jwt.utils";
import { setting } from "../config/setting";
import { userService, sessionService, otpService } from "../service";
import { Api, api, log } from '../utils';

class Auth {

  generateOTP = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    try {
      const query = {
        where: {
          mobileNo: inputs.mobileNo,
          type: inputs.type,
          isActive: 1,
        }
      }
      const tempOtp = await otpService.read(query.where);

      if(tempOtp.length > 0) {
        await otpService.update(query.where, { isActive : 0 });
      }

      const createData = {
        "mobileNo": inputs["mobileNo"],
        "type":  inputs["type"],
        "no": Math.floor((Math.random() * 9000) + 1000)
      };
      const data: any = await otpService.create(createData);
      
      return new Api(response).success().code(200).send({   data, message: 'OTP generated Succesful'});
    } catch (e) {
      console.log(e)
      return new Api(response).error().code(400).send(e);
    }
  }

  verifyOTP = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    log.info('controller.auth.register');
    try {

      const query = {
        where: {
          mobileNo: inputs.mobileNo,
          type: inputs.type,
          isActive: 1,
        }
      }

      const temp: any = await otpService.readOne(query.where);

      if (temp && temp.try == 3) {
        const err = { code: 200, data:  temp, message: "Max try reached please regenerate the otp" };
        return new Api(response).error().code(402).send(err);
      }

      if (temp && temp.no === parseInt(inputs.no)) {
        return new Api(response).success().code(200).send({  data:  temp, message: "Otp Verified Successfully" });
      }

      const noTry: any =  parseInt(temp.try) + 1;
      
      const updateData = await otpService.update(query.where, { try: noTry });

      return new Api(response).error().code(211).send({  data:  updateData, message: "Otp Doesn't match" });
    } catch (e) {
      return new Api(response).error().code(200).send(e);
    }
  }

  register = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    log.info('controller.auth.register');
    try {
      const user = await userService.create(inputs);
      return api.response(response,{ code: 200, status: 'success', data:  user, message: 'Registered Succesful' });
    } catch (e) {
      return new Api(response).error().code(200).send(e);
    }
  }

  login = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    log.info('controller.auth.login');
    // validate the email and password
    const user = await userService.validatePassword(request.body);

    if (!user) {
      return api.response(response,{ code: 401, status: 'error', data:  null, message: "Invalid username or password" });
    }

    // Create a session
    const session = await sessionService.createSession(user._id, request.get("user-agent") || "");

    // create access token
    const accessToken = sessionService.createAccessToken({
      user,
      session,
    });

    // create refresh token
    const refreshToken = jwt.sign(session, {
      expiresIn: setting["refreshTokenTtl"], // 1 year
    });

    // send refresh & access token back
    return api.response(response,{ code: 200, status: 'success', data:  { user, tokens: { accessToken, refreshToken } }, message: 'Login Succesful' });
  }

  check = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    const user = request.user;
    log.info('controller.auth.check');
    try {
      const payload = { data: user, message: 'authenicated successfully.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      return new Api(response).error().code(200).send(e);
    }
  }

  resetPassword = () => {

  }

  forgotPassword = () => {

  }
}

export const AuthController = new Auth();