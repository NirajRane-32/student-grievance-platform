const generateReferenceID = () => {
  const timestamp = Date.now().toString().slice(-5);
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(5, '0');
  return `GRV-MUM-2026-${timestamp}${random}`.slice(0, 20);
};

module.exports = { generateReferenceID };
