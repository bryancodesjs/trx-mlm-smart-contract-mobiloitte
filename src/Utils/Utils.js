// const contract_address = "TF46MbUFEDZm1Q6yi8FWa1FkqPLC3QGDMZ"

// const contract_address = "TLaXfyrdGqQWjYMWVC1KQBYwZvuYwVtJXE"

// const contract_address = "TFp4R6eG3EMHvPEfKCMUs29p5VLiaN8fdd"

// const contract_address = "TTpGpJ1JN75ioXm8k1LhCWFEQqGbptyzAF"

//xtron-real
//const contract_address = "TWDECXnA4oAGrDYRNS7ex1izx3Mgys9SRp"

//xtron-shasta
//const contract_address = "TQrmGowd3HkCJrHNgDwNAsqSyfkKj6mFXc"

//const contract_address = "TEzd5H6uQ1EbcUgrnn3MTBcykkyFgrPE5z"

//const contract_address = "THK1ZCLjmD9dN8qcpYSkoa2E4gYpJ4EhH2"

//const contract_address = "TLsW2M4tMghftba1cymJeFdwezyKfovuci"

//const contract_address = "TYx9J1Yr7VPDhxsdRcfjGrZPGhRykK1Uwy"

//const contract_address = "TQ1ER4kAy4CoLLmx9tuFPZwVv33JbvLRXu"
 
 //const contract_address = "TYjd4gRFqEXinRVDqUWESUzcGzg47uM4Fk"

// const contract_address = "TPzeGJ3fi65cjp4deTGm5NfLDfhPgkim5a"

 //const contract_address = "TWyG1ofLtjAdkUE2Ac1TYHM4FnyUKESAJL"
 
//const contract_address = "TEW4nvU1LQYCbWdhuoFid6vidBKD4A4v3h"

//const contract_address = "TNgXUtpZ58dMsGSnGAbKntm1H4fqzK838x"

//const contract_address = "TLm8n7AwTHyJaDW77jvCgoXT4XEBYxx1aQ"

//Deployed by George
//const contract_address = "TFa9JhkFctXPRB3xFnF9TfGKMiPcXVe5oB"

//Contract with 50% discount in packages
const contract_address = "TQe5ExxEQpnBGBRkLu4mTDDGRLrudyugrD"
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
