class JwtAuth {
    verify = () => {

    }

    public token = async (tokenParams: IJWTParams, tokenKey: jwt.Secret) => {
        return await jwt.sign(tokenParams, tokenKey, { expiresIn: tokenParams.expiresAt });
    }
}