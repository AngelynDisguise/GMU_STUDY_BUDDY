const { sign, verify } = require('jsonwebtoken');

const createTokens = (user, secret, expiresIn) => {
    const accessToken = sign({ userId: user.id }, secret, { expiresIn }); //create token
    const refreshToken = sign({ userId: user.id }, secret);
    return {
        accessToken,
        refreshToken
    };
}