import * as express from 'express';
import { jwt } from "../utils/jwt.utils";
import { setting } from "../config/setting";
import log from "../logger";
import { userService } from "../service/user.service";
import { sessionService } from "../service/session.service";

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
      return response.status(200).json(inputs);
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
      return response.status(401).send("Invalid username or password");
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
    return response.send({ accessToken, refreshToken });
    // return response.status(200).json(inputs);
  }

  resetPassword = () => {

  }

  forgotPassword = () => {

  }
}

export const AuthController = new Auth();