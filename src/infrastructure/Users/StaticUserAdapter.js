const authenticate = async (username, password) => {
  if (username.toLowerCase() !== 'foo@example.com' || !password || password.length < 1) {
    return null;
  }
  return { id: '23121d3c-84df-44ac-b458-3d63a9a05497' };
};

const find = async (username, client) => {
  if (username.toLowerCase() !== 'foo@example.com') {
    return null;
  }
  return { id: '23121d3c-84df-44ac-b458-3d63a9a05497' };
};

const changePassword = async (uid, password, client) => {
  return Promise.resolve(null);
};

const getDevices = async (uid) => {
  if (uid === '23121d3c-84df-44ac-b458-3d63a9a05497') {
    return [
      {
        type: 'digipass',
        serialNumber: '123456',
      },
    ];
  } else if (uid === 'bfa93e30-48b5-4942-b45d-8cf9ece5b7e9') {
    return [
      {
        type: 'authenticator',
        serialNumber: '123456',
      },
    ];
  }

  return [];
};


module.exports = {
  authenticate,
  find,
  changePassword,
  getDevices,
};
