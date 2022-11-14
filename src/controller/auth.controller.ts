import * as express from 'express';
import { jwt } from "../utils/jwt.utils";
import { setting } from "../config/setting";

import { userService } from "../service";
import { sessionService } from "../service";
import { Api, api, log } from '../utils';

class Auth {

  generateOTP = () => {

  }

  verifyOTP = () => {

  }

  register = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    log.info('controller.auth.register');
    try {
      const user = await userService.create(inputs);
      return api.response(response,{ code: 200, status: 'success', data:  user, message: 'Registered Succesful' });
    } catch (e) {
      log.error('adsa');
      return response.status(409).json(e);
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