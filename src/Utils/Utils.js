// const contract_address = "TF46MbUFEDZm1Q6yi8FWa1FkqPLC3QGDMZ"

// const contract_address = "TLaXfyrdGqQWjYMWVC1KQBYwZvuYwVtJXE"

// const contract_address = "TFp4R6eG3EMHvPEfKCMUs29p5VLiaN8fdd"

// const contract_address = "TTpGpJ1JN75ioXm8k1LhCWFEQqGbptyzAF"

//xtron-real
//const contract_address = "TWDECXnA4oAGrDYRNS7ex1izx3Mgys9SRp"

//xtron-shasta
const contract_address = "TQrmGowd3HkCJrHNgDwNAsqSyfkKj6mFXc"

//.env
//const contract_address = process.env.REACT_APP_CONTRACT_ADDRESS

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contract_address)
    },

};

export default utils;