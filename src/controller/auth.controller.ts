class Auth {

  generateOTP = () => {

  }

  verifyOTP = () => {

  }

  register = async (request: express.Request, response: express.Response) => {
        const inputs = {...request.body.data, ...request.params};
        Common.logInfo(inputs, 'getQueryCount', 'query.controller.getQueryCount');
        let result: any =  {
            status: 1,
            message: 'CMS data fetched successfully.',
            payload: null
        };
        try {
            result.payload = await queryService.getQueryCount(inputs);
            return this.getSuccessResponse(result, response);
        } catch (error) {
            Common.logError(error, 'getQueryCount', 'query.controller.getQueryCount');
            return this.getFailResponse(error, 'unable to connect with cloud cms', response);
        }
    }

  login = (req: any, res: any) => {
    const result = {
      project: 'Welcome to Momenta auth login'
    };
    return res.status(200).json(result);
  }

  resetPassword = () => {

  }

  forgotPassword = () => {

  }
}

export const AuthController = new Auth();