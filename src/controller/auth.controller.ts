import * as express from 'express';
import { jwt } from "../utils/jwt.utils";
import { setting } from "../config/setting";
import { userService, sessionService, otpService } from "../service";
import { Api, api, log } from '../utils';
import { sms } from '../utils/sms.util';
import { HttpStatusCode } from '../config/constant';
import { mailer } from '../utils/email.util';
import { ema } from 'technicalindicators';

class Auth {

  generateOTP = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    try {

      const condition = { $or: [ 
        {
          email: inputs.email
        },
        {
          mobileNo: inputs.mobileNo
        }
      ] };

      const user = await userService.read(condition);

      if (user.length > 0) {
        return new Api(response).error().code(409).send({ data:  user, message: "User Already Exist" });
      }

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
      const no: any = Math.floor((Math.random() * 9000) + 1000);
      const createData = {
        "mobileNo": inputs["mobileNo"],
        "type":  inputs["type"],
        "no": no
      };
      const data: any = await otpService.create(createData);
      const message = "Your OTP to register/access "+setting.appName+" is "+createData.no+". Please do not share it with anyone."
      // Email message options
      const mailOptions = {
        from: 'jhammansharma23@gmail.com', // Sender address
        to: inputs.email, // Recipient address
        subject: 'OTP Email', // Subject line
        text: message
        // You can also use html key for HTML formatted emails
      };

      mailer.sendMail(mailOptions);

      // sms([createData.mobileNo], message);
      
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
        const err = { code: 200, data:  temp, message: "Max try reached please regenerate the OTP" };
        return new Api(response).error().code(402).send(err);
      }

      if (temp && temp.no === parseInt(inputs.no)) {
        return new Api(response).success().code(200).send({  data:  temp, message: "OTP Verified Successfully" });
      }

      const noTry: any =  parseInt(temp.try) + 1;
      
      const updateData = await otpService.update(query.where, { try: noTry });

      return new Api(response).error().code(211).send({  data:  updateData, message: "OTP Doesn't Match" });
    } catch (e) {
      return new Api(response).error().code(200).send(e);
    }
  }

  register = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    log.info('controller.auth.register');
    try {
      const condition = { $or: [ 
        {
          email: inputs.email
        },
        {
          mobileNo: inputs.mobileNo
        }
      ] };

      let user = await userService.read(condition);

      if (user.length > 0) {
        return new Api(response).error().code(409).send({ data:  user, message: "User Already Exist" });
      }

      user = await userService.create(inputs);
      return new Api(response).success().code(200).send({  data:  user, message: "Registered Succesful" });
    } catch (e: any) {
      const code = e && e.code ? e.code : 400;
      log.error('controller.auth.register', { ...e });
      return new Api(response).error().code(code).send({ ...e });
    }
  }

  login = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    log.info('controller.auth.login');
    // validate the email and password
    const user = await userService.validatePassword(request.body);

    if (!user) {
      return new Api(response).error().code(401).send({ data:  null, message: "Invalid username or password" });
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
    return new Api(response).success().code(200).send({  data:  { user, tokens: { accessToken, refreshToken } }, message: 'Login Succesful' });
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