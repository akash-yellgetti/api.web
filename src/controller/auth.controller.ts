import * as express from 'express';
import { jwt } from "../utils/jwt.utils";
import { setting } from "../config/setting";
import log from "../logger";
import { userService } from "../service";
import { sessionService } from "../service";
import { api } from '../utils/response.utils';

class Auth {

  generateOTP = () => {

  }

  verifyOTP = () => {

  }

  register = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    log.info('controller.auth.register');
    try {
      const user = userService.create(inputs);
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

  resetPassword = () => {

  }

  forgotPassword = () => {

  }
}

export const AuthController = new Auth();