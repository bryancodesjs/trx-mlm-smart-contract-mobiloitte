const contract_address = "THxiHc4zmX4Q9b72FUK85fJCQWh2gbJEp9"

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contract_address)
    },

};

export default utils;
