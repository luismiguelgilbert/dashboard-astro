import Cryptr from 'cryptr';

const cryptr = new Cryptr(import.meta.env.BETTER_AUTH_SECRET, {
  encoding: 'base64',
});

export default cryptr;
