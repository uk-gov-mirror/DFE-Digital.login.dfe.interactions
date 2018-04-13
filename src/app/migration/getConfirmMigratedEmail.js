'use strict';

const userCodes = require('./../../infrastructure/UserCodes');

const get = async (req, res) => {
  const userCode = await userCodes.getCode(req.params.emailConfId);

  if (!userCode) {
    throw new Error('Invalid Request');
  }

  res.render('migration/views/confirmEmail', {
    message: '',
    title: 'DfE Sign-in',
    emailConfId: req.params.emailConfId,
    csrfToken: req.csrfToken(),
    validationMessages: {},
    email: userCode.email,
  });
};

module.exports = get;
