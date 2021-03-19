//XTron Production Contract
const contract_address = "TA4MuGPwQp6RUvD3uUsshZ4FNaYxWRKHbC"

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contract_address)
    },

};

export default utils;
