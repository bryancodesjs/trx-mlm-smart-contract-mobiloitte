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
//const contract_address = "TPzeGJ3fi65cjp4deTGm5NfLDfhPgkim5a"
//const contract_address = "TWyG1ofLtjAdkUE2Ac1TYHM4FnyUKESAJL"
//const contract_address = "TEW4nvU1LQYCbWdhuoFid6vidBKD4A4v3h"
//const contract_address = "TNgXUtpZ58dMsGSnGAbKntm1H4fqzK838x"
//const contract_address = "TLm8n7AwTHyJaDW77jvCgoXT4XEBYxx1aQ"
//const contract_address = "TFa9JhkFctXPRB3xFnF9TfGKMiPcXVe5oB"

//const contract_address = "TAiYzX6z1dMz6aWqNYx4X5fKdJLWAYrBUg"
//const contract_address = "TSsh4YKeqDKt8YBR4kDQhLnJTGvyaWyeib"

//const contract_address = "TGB28XpmdSevBrDE7sFNGQUexBtzvVJgm7"
//const contract_address = "TEe34ejtmHiRuqEGtCAn58T3W6hmZawoJV"


//Problem
//const contract_address = "TEy8sahvs3G9AWHMeRgvH5beMCZvAU59tt"

//Works 7ish...
//const contract_address = "TXbcJMDCNM9oZaV8eJLRsXkEEcKC28X99z"

//Debugging...(Broken)
//const contract_address = "TF4j7n6uiz7kxr6eQHghgLVVU4kZfAHWGZ"

//Fixing....
//const contract_address = "TWq6mzqMTEjyLLMXGsqFV1QYjDzbg8MP3J"

//M2 Ciclado Fixed! Yay!
//const contract_address = "TFbxXnX47JXKFXgvHmsHRkdwCaAPnbzNby"

//M2 10 CTAs
//const contract_address = "TUaQVqSjEpaHEEXDjZMKJfrXFpqHFAScHa"

//Good distrution m2 (round robin), missing referrals
//const contract_address = "TD58SzWvCBqJEb2RChtvhe4UXjSk4og9mr"

//const contract_address = "TF9VPpAKcYpL4X5x12RWm3WuQSVkv529Rc"

//Deployed by George
//const contract_address = "TFa9JhkFctXPRB3xFnF9TfGKMiPcXVe5oB"


//Contract with 50% discount in packages
//const contract_address = "TQe5ExxEQpnBGBRkLu4mTDDGRLrudyugrD"
//.env
//const contract_address = process.env.REACT_APP_CONTRACT_ADDRESS

//const contract_address = "TN8RbeAzW7YA5yuFYAVG42qjJR63DsE1ZN"

//const contract_address = "TBLhDkhyXaYESKf9UvB1BQrVXPX6ubjdHo"
//const contract_address = "THsHA3v4zeySDS7AWzavGmPf7yYMTQzxja"

//Avoid buying next level
//const contract_address = "TE1xmorEjAZYu2LaLiAff26KgSbrvWNSgU"


//const contract_address = "TYqqp7vvPhhTFZWcpWgDm5Hf1EPSC55z97"

const contract_address =  "TXWtPvKykN2QXip95PCej3biC5dVb9S4oy"

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contract_address)
    },

};

export default utils;
