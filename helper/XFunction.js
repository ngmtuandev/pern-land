const { networkInterfaces } = require("os");

const getIpAddressNetwork = () => {
  const nets = networkInterfaces();
  const result = {};

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!result[name]) {
          result[name] = [];
        }
        result[name].push(net.address);
      }
    }
    return Object.values(result)[0];
  }
};

const generateIpKeyRedis = (filter) => {
  const filterStringKey = JSON.stringify(filter)
    ?.replace(/\W/g, "")
    ?.split("")
    ?.sort((a, b) => a.localeCompare(b))
    ?.join("");

  const IPAddressNetworkObject = getIpAddressNetwork();
  return IPAddressNetworkObject + filterStringKey;
};

module.exports = {
  generateIpKeyRedis,
};
