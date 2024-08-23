const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhhhh';
const expiration = '2h';
const { GraphQLError } = require('graphql');

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),

  authMiddleware: function ({ req }) {
    let token = req.query.token || req.headers.authorization;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = token.split(' ')[1].trim();
    }

    if (!token) {
      console.log('No token provided');
      return {};
    }

    try {
      const decoded = jwt.verify(token, secret);
      console.log('Decoded User:', decoded);
      return { user: decoded };
    } catch (error) {
      console.error('Invalid token:', error.message);
    }

    return {};
  },

  signToken: function ({ username, email, _id }) {
    const payload = { _id, username, email };
    return jwt.sign(payload, secret, { expiresIn: expiration });
  },
};
