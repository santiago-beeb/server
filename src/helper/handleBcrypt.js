import bcrypt from "bcryptjs";

const encrypt = async (textPlain) => {
  const hash = await bcrypt.hash(textPlain, 10);
  return hash;
};

const compare = async (contraseniaPlana, contraseniaHash) => {
  return await bcrypt.compare(contraseniaPlana, contraseniaHash);
};

export { encrypt, compare };
