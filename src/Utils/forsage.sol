/**
 *Submitted for verification at Tronscan.io on 2020-01-31
*/

/**
*
*   ,d8888b                                                    
*   88P'                                                       
*d888888P                                                      
*  ?88'     d8888b   88bd88b .d888b, d888b8b   d888b8b   d8888b
*  88P     d8P' ?88  88P'  ` ?8b,   d8P' ?88  d8P' ?88  d8b_,dP
* d88      88b  d88 d88        `?8b 88b  ,88b 88b  ,88b 88b    
*d88'      `?8888P'd88'     `?888P' `?88P'`88b`?88P'`88b`?888P'
*                                                    )88       
*                                                   ,88P       
*                                               `?8888P        
*
* 
* SmartWay Forsage
* https://forsage.smartway.run
* (only for SmartWay.run members)
* 
**/


pragma solidity >=0.4.23 <0.6.0;

contract XtronHybridMarketing {
    
    struct User {
        uint id;
        address referrer;
        uint partnersCount;
    
        mapping(uint8 => bool) activeX5Levels;
        mapping(uint8 => bool) activeX12Levels;
        
        mapping(uint8 => X5) x5Matrix;
        mapping(uint8 => X6) x12Matrix;
        
    }
    
    struct X5 {
        address currentReferrer;
        address[] referrals;
        bool blocked;
        uint reinvestCount;
    
    }
    
    struct X6 {
        address currentReferrer;
        address[] firstLevelReferrals;
        address[] secondLevelReferrals;
        bool blocked;
        uint reinvestCount;
        address[] closedPart;
    }

    uint8 public constant LAST_LEVEL = 12;
    mapping(address => User) public users;
    mapping(uint => address) public idToAddress;
    mapping(uint => address) public userIds;
    mapping(address => uint) public balances; 
    mapping(address => uint) public x12balance;

    uint public lastUserId = 2;
    address public owner;
    
    mapping(uint8 => uint) public levelPrice;
    
    event Registration(address indexed user, address indexed referrer, uint indexed userId, uint referrerId);
    event Reinvest(address indexed user, address indexed currentReferrer, address indexed caller, uint8 matrix, uint8 level);
    event Upgrade(address indexed user, address indexed referrer, uint8 matrix, uint8 level);
    event NewUserPlace(address indexed user, address indexed referrer, uint8 matrix, uint8 level, uint8 place);
    event MissedEthReceive(address indexed receiver, address indexed from, uint8 matrix, uint8 level);
    event SentExtraEthDividends(address indexed from, address indexed receiver, uint8 matrix, uint8 level);
    
      constructor(address ownerAddress) public {
        levelPrice[1] = 200 trx; 
        levelPrice[2] = 400 trx;
        levelPrice[3] = 800 trx;
        levelPrice[4] = 1600 trx;
        levelPrice[5] = 3200 trx;
        levelPrice[6] = 6400 trx;
        levelPrice[7] = 12800 trx;
        levelPrice[8] = 25600 trx;
        levelPrice[9] = 51200 trx;
        levelPrice[10] = 102400 trx;
        levelPrice[11] = 204800 trx;
        levelPrice[12] = 409600 trx;
        owner = ownerAddress;
        User memory user = User({
            id: 1,
            referrer: address(0),
            partnersCount: uint(0)
        });
        
        userIds[1] = ownerAddress;
        users[ownerAddress] = user;
        idToAddress[1] = ownerAddress;
        
        for (uint8 i = 1; i <= LAST_LEVEL; i++) {
            users[ownerAddress].activeX5Levels[i] = true;
            users[ownerAddress].activeX12Levels[i] = true;
        }   
    }
    
    
    function() external payable {
        if(msg.data.length == 0) {
            return registration(msg.sender, owner);
        }
        
        registration(msg.sender, bytesToAddress(msg.data));
    }

    function registrationExt(address referrerAddress) external payable {
        require(msg.value == 2*(levelPrice[1]+(levelPrice[1]/10)), "invalid price");
        registration(msg.sender, referrerAddress);
    }
    
    function buyNewLevel(uint8 matrix, uint8 level) external payable {
        require(isUserExists(msg.sender), "user is not exists. Register first.");
        require(matrix == 1 || matrix == 2, "invalid matrix");
        require(msg.value == levelPrice[level]+(levelPrice[level]/10), "invalid price");
        require(level > 1 && level <= LAST_LEVEL, "invalid level");

        address(owner).send(levelPrice[level]/10);
        if (matrix == 1) {
            require(!users[msg.sender].activeX5Levels[level], "level already activated");

            if (users[msg.sender].x5Matrix[level-1].blocked) {
                users[msg.sender].x5Matrix[level-1].blocked = false;
            }
    
            address freeX5Referrer = findfreeX5Referrer(msg.sender, level);
            users[msg.sender].x5Matrix[level].currentReferrer = freeX5Referrer;
            users[msg.sender].activeX5Levels[level] = true;
            updateX5Referrer(msg.sender, freeX5Referrer, level);
            
            emit Upgrade(msg.sender, freeX5Referrer, 1, level);

        } else {
            require(!users[msg.sender].activeX12Levels[level], "level already activated"); 

            if (users[msg.sender].x12Matrix[level-1].blocked) {
                users[msg.sender].x12Matrix[level-1].blocked = false;
            }

            address freeX12Referrer = findfreeX12Referrer(msg.sender, level);
            
            users[msg.sender].activeX12Levels[level] = true;
            updateX12Referrer(msg.sender, freeX12Referrer, level);
            
            emit Upgrade(msg.sender, freeX12Referrer, 2, level);
        }
    }    
    
    function registration(address userAddress, address referrerAddress) private {
        require(!isUserExists(userAddress), "user exists");
        require(isUserExists(referrerAddress), "referrer not exists");
        uint32 size;
        assembly {
            size := extcodesize(userAddress)
        }
        require(size == 0, "cannot be a contract");
        
        User memory user = User({
            id: lastUserId,
            referrer: referrerAddress,
            partnersCount: 0
        });
        
        users[userAddress] = user;
        idToAddress[lastUserId] = userAddress;
        
        users[userAddress].referrer = referrerAddress;
        
        users[userAddress].activeX5Levels[1] = true; 
        users[userAddress].activeX12Levels[1] = true;
        
        
        userIds[lastUserId] = userAddress;
        lastUserId++;
        
        users[referrerAddress].partnersCount++;

        address freeX5Referrer = findfreeX5Referrer(userAddress, 1);
        users[userAddress].x5Matrix[1].currentReferrer = freeX5Referrer;
        updateX5Referrer(userAddress, freeX5Referrer, 1);

        updateX12Referrer(userAddress, findfreeX12Referrer(userAddress, 1), 1);
        
        emit Registration(userAddress, referrerAddress, users[userAddress].id, users[referrerAddress].id);

        address(owner).send((levelPrice[1]*2)/10);
    }
    
    function updateX5Referrer(address userAddress, address referrerAddress, uint8 level) private {
        users[referrerAddress].x5Matrix[level].referrals.push(userAddress);

        if (users[referrerAddress].x5Matrix[level].referrals.length < 5) {
            emit NewUserPlace(userAddress, referrerAddress, 1, level, uint8(users[referrerAddress].x5Matrix[level].referrals.length));
            return sendETHDividends(referrerAddress, userAddress, 1, level);
        }
        
        emit NewUserPlace(userAddress, referrerAddress, 1, level, 5);
        //close matrix
        users[referrerAddress].x5Matrix[level].referrals = new address[](0);
        if (!users[referrerAddress].activeX5Levels[level+1] && level != LAST_LEVEL) {
            users[referrerAddress].x5Matrix[level].blocked = true;
        }

        //create new one by recursion
        if (referrerAddress != owner) {
            //check referrer active level
            address freeReferrerAddress = findfreeX5Referrer(referrerAddress, level);
            if (users[referrerAddress].x5Matrix[level].currentReferrer != freeReferrerAddress) {
                users[referrerAddress].x5Matrix[level].currentReferrer = freeReferrerAddress;
            }
            
            users[referrerAddress].x5Matrix[level].reinvestCount++;
            emit Reinvest(referrerAddress, freeReferrerAddress, userAddress, 1, level);
            updateX5Referrer(referrerAddress, freeReferrerAddress, level);
        } else {
            sendETHDividends(owner, userAddress, 1, level);
            users[owner].x5Matrix[level].reinvestCount++;
            emit Reinvest(owner, address(0), userAddress, 1, level);
        }
    }

    function updateX12Referrer(address userAddress, address referrerAddress, uint8 level) private {
        require(users[referrerAddress].activeX12Levels[level], "0.05. Referrer level is inactive");

        if (users[referrerAddress].x12Matrix[level].firstLevelReferrals.length < 3) {
            users[referrerAddress].x12Matrix[level].firstLevelReferrals.push(userAddress);
            emit NewUserPlace(userAddress, referrerAddress, 3, level, uint8(users[referrerAddress].x12Matrix[level].firstLevelReferrals.length));
            
            //set current level
            users[userAddress].x12Matrix[level].currentReferrer = referrerAddress;

            if (referrerAddress == owner) {
                return sendETHDividends(referrerAddress, userAddress, 3, level);
            }
            
            address ref = users[referrerAddress].x12Matrix[level].currentReferrer;            
            users[ref].x12Matrix[level].secondLevelReferrals.push(userAddress); 
            
            uint len = users[ref].x12Matrix[level].firstLevelReferrals.length;
            
            if ((len == 3) && 
                (users[ref].x12Matrix[level].firstLevelReferrals[0] == referrerAddress) &&
                (users[ref].x12Matrix[level].firstLevelReferrals[1] == referrerAddress) &&
                (users[ref].x12Matrix[level].firstLevelReferrals[2] == referrerAddress)) {
                if (users[referrerAddress].x12Matrix[level].firstLevelReferrals.length == 1) {
                    emit NewUserPlace(userAddress, ref, 3, level, 10);
                } else if (users[referrerAddress].x12Matrix[level].firstLevelReferrals.length == 2){
                    emit NewUserPlace(userAddress, ref, 3, level, 11);
               }
               else{
                   emit NewUserPlace(userAddress, ref, 3, level, 12);
               }
                }
                else if ((len == 2) &&
                    users[ref].x12Matrix[level].firstLevelReferrals[0] == referrerAddress) {
                if (users[referrerAddress].x12Matrix[level].firstLevelReferrals.length == 1) {
                    emit NewUserPlace(userAddress, ref, 3, level, 9);
                } else if(users[referrerAddress].x12Matrix[level].firstLevelReferrals.length == 2){
                    emit NewUserPlace(userAddress, ref, 3, level, 8);
                }
                  else{
                   emit NewUserPlace(userAddress, ref, 3, level, 7);
               }
                }
                else if ((len == 1) &&
                    users[ref].x12Matrix[level].firstLevelReferrals[0] == referrerAddress) {
                if (users[referrerAddress].x12Matrix[level].firstLevelReferrals.length == 1) {
                    emit NewUserPlace(userAddress, ref, 3, level, 5);
                } else if(users[referrerAddress].x12Matrix[level].firstLevelReferrals.length == 2){
                    emit NewUserPlace(userAddress, ref, 3, level, 4);
                }
                  else{
                   emit NewUserPlace(userAddress, ref, 3, level, 3);
               }
                
            } else if (len == 3 && users[ref].x12Matrix[level].firstLevelReferrals[1] == referrerAddress) {
                if (users[referrerAddress].x12Matrix[level].firstLevelReferrals.length == 1) 
                {
                    emit NewUserPlace(userAddress, ref, 3, level, 10);
                } else if (users[referrerAddress].x12Matrix[level].firstLevelReferrals.length == 2){
                    emit NewUserPlace(userAddress, ref, 3, level, 11);
               }
               else{
                   emit NewUserPlace(userAddress, ref, 3, level, 12);
               }
                }

            return updateX12ReferrerSecondLevel(userAddress, referrerAddress, level);
        }
        
        users[referrerAddress].x12Matrix[level].secondLevelReferrals.push(userAddress);

        if(users[referrerAddress].x12Matrix[level].closedPart.length != 0){
            for(uint8 i = 0; i < users[referrerAddress].x12Matrix[level].firstLevelReferrals.length; i++){
                bool flag = false;
                for(uint8 j = 0; j < users[referrerAddress].x12Matrix[level].closedPart.length; j++){
                    if(users[referrerAddress].x12Matrix[level].closedPart[j] ==
                        users[referrerAddress].x12Matrix[level].firstLevelReferrals[i]){
                            flag = true;
                        }
                }
                if(!flag){
                    updateX12(userAddress, referrerAddress, level, i);
                    return updateX12ReferrerSecondLevel(userAddress, referrerAddress, level);
                }
            }
        }else{
            if (users[users[referrerAddress].x12Matrix[level].firstLevelReferrals[0]].x12Matrix[level].firstLevelReferrals.length <= 
            users[users[referrerAddress].x12Matrix[level].firstLevelReferrals[1]].x12Matrix[level].firstLevelReferrals.length) {
                if (users[users[referrerAddress].x12Matrix[level].firstLevelReferrals[0]].x12Matrix[level].firstLevelReferrals.length <= 
                users[users[referrerAddress].x12Matrix[level].firstLevelReferrals[2]].x12Matrix[level].firstLevelReferrals.length) {
                    updateX12(userAddress, referrerAddress, level, 0);
                }else{
                    updateX12(userAddress, referrerAddress, level, 2);
                }
            }else{
                if (users[users[referrerAddress].x12Matrix[level].firstLevelReferrals[1]].x12Matrix[level].firstLevelReferrals.length <= 
                users[users[referrerAddress].x12Matrix[level].firstLevelReferrals[2]].x12Matrix[level].firstLevelReferrals.length) {
                    updateX12(userAddress, referrerAddress, level, 1);
                }else{
                    updateX12(userAddress, referrerAddress, level, 2);
                }
            }
            updateX12ReferrerSecondLevel(userAddress, referrerAddress, level);
        }
        // if (users[referrerAddress].x12Matrix[level].closedPart != address(0)) {
        //     if ((users[referrerAddress].x12Matrix[level].firstLevelReferrals[2] == 
        //         users[referrerAddress].x12Matrix[level].firstLevelReferrals[1]) &&
        //         (users[referrerAddress].x12Matrix[level].firstLevelReferrals[1] == 
        //         users[referrerAddress].x12Matrix[level].firstLevelReferrals[0]) &&
        //         (users[referrerAddress].x12Matrix[level].firstLevelReferrals[0] ==
        //         users[referrerAddress].x12Matrix[level].closedPart)) {
        //         updateX12(userAddress, referrerAddress, level, true);
        //         return updateX12ReferrerSecondLevel(userAddress, referrerAddress, level);
        //     } else if (users[referrerAddress].x12Matrix[level].firstLevelReferrals[1] == 
        //         users[referrerAddress].x12Matrix[level].firstLevelReferrals[0] &&
        //         (users[referrerAddress].x12Matrix[level].firstLevelReferrals[0] ==
        //         users[referrerAddress].x12Matrix[level].closedPart)) {
        //         updateX12(userAddress, referrerAddress, level, true);
        //         return updateX12ReferrerSecondLevel(userAddress, referrerAddress, level);
        //     }else if (users[referrerAddress].x12Matrix[level].firstLevelReferrals[0] == 
        //         users[referrerAddress].x12Matrix[level].closedPart) {
        //         updateX12(userAddress, referrerAddress, level, true);
        //         return updateX12ReferrerSecondLevel(userAddress, referrerAddress, level);
        //     } else {
        //         updateX12(userAddress, referrerAddress, level, false);
        //         return updateX12ReferrerSecondLevel(userAddress, referrerAddress, level);
        //     }
        // }

        // if (users[referrerAddress].x12Matrix[level].firstLevelReferrals[1] == userAddress) {
        //     updateX12(userAddress, referrerAddress, level, false);
        //     return updateX12ReferrerSecondLevel(userAddress, referrerAddress, level);
        // } else if (users[referrerAddress].x12Matrix[level].firstLevelReferrals[0] == userAddress) {
        //     updateX12(userAddress, referrerAddress, level, true);
        //     return updateX12ReferrerSecondLevel(userAddress, referrerAddress, level);
        // }
        
        // if (users[users[referrerAddress].x12Matrix[level].firstLevelReferrals[0]].x12Matrix[level].firstLevelReferrals.length <= 
        //     users[users[referrerAddress].x12Matrix[level].firstLevelReferrals[1]].x12Matrix[level].firstLevelReferrals.length) {
        //     updateX12(userAddress, referrerAddress, level, false);
        // } else {
        //     updateX12(userAddress, referrerAddress, level, true);
        // }
        
        // updateX12ReferrerSecondLevel(userAddress, referrerAddress, level);
    }

    function updateX12(address userAddress, address referrerAddress, uint8 level, uint8 child) private {
        if (child == 0) {
            users[users[referrerAddress].x12Matrix[level].firstLevelReferrals[0]].x12Matrix[level].firstLevelReferrals.push(userAddress);
            emit NewUserPlace(userAddress, users[referrerAddress].x12Matrix[level].firstLevelReferrals[0], 3, level, uint8(users[users[referrerAddress].x12Matrix[level].firstLevelReferrals[0]].x12Matrix[level].firstLevelReferrals.length));
            emit NewUserPlace(userAddress, referrerAddress, 3, level, 3 + uint8(users[users[referrerAddress].x12Matrix[level].firstLevelReferrals[0]].x12Matrix[level].firstLevelReferrals.length));
            //set current level
            users[userAddress].x12Matrix[level].currentReferrer = users[referrerAddress].x12Matrix[level].firstLevelReferrals[0];
        } else if(child == 1){
            users[users[referrerAddress].x12Matrix[level].firstLevelReferrals[1]].x12Matrix[level].firstLevelReferrals.push(userAddress);
            emit NewUserPlace(userAddress, users[referrerAddress].x12Matrix[level].firstLevelReferrals[1], 3, level, uint8(users[users[referrerAddress].x12Matrix[level].firstLevelReferrals[1]].x12Matrix[level].firstLevelReferrals.length));
            emit NewUserPlace(userAddress, referrerAddress, 3, level, 9 + uint8(users[users[referrerAddress].x12Matrix[level].firstLevelReferrals[1]].x12Matrix[level].firstLevelReferrals.length));
            //set current level
            users[userAddress].x12Matrix[level].currentReferrer = users[referrerAddress].x12Matrix[level].firstLevelReferrals[1];
        }else{
            users[users[referrerAddress].x12Matrix[level].firstLevelReferrals[2]].x12Matrix[level].firstLevelReferrals.push(userAddress);
            emit NewUserPlace(userAddress, users[referrerAddress].x12Matrix[level].firstLevelReferrals[2], 3, level, uint8(users[users[referrerAddress].x12Matrix[level].firstLevelReferrals[2]].x12Matrix[level].firstLevelReferrals.length));
            emit NewUserPlace(userAddress, referrerAddress, 3, level, 9 + uint8(users[users[referrerAddress].x12Matrix[level].firstLevelReferrals[2]].x12Matrix[level].firstLevelReferrals.length));
            //set current level
            users[userAddress].x12Matrix[level].currentReferrer = users[referrerAddress].x12Matrix[level].firstLevelReferrals[2];
        }
    }
    
    function updateX12ReferrerSecondLevel(address userAddress, address referrerAddress, uint8 level) private {
        if (users[referrerAddress].x12Matrix[level].secondLevelReferrals.length < 9) {
            return sendETHDividends(referrerAddress, userAddress, 2, level);
        }
        
        address[] memory x6 = users[users[referrerAddress].x12Matrix[level].currentReferrer].x12Matrix[level].firstLevelReferrals;
        
        if (x6.length == 3) {
            if (x6[0] == referrerAddress ||
                x6[1] == referrerAddress||
                x6[2] == referrerAddress) {
                users[users[referrerAddress].x12Matrix[level].currentReferrer].x12Matrix[level].closedPart.push(referrerAddress);
            } else if (x6.length == 2) {
                if (x6[0] == referrerAddress||x6[1] == referrerAddress) {
                    users[users[referrerAddress].x12Matrix[level].currentReferrer].x12Matrix[level].closedPart.push(referrerAddress);
                }else if (x6.length ==1){
                    if (x6[0] == referrerAddress) {
                    users[users[referrerAddress].x12Matrix[level].currentReferrer].x12Matrix[level].closedPart.push(referrerAddress);
                }
            }
        }
        }
        
        users[referrerAddress].x12Matrix[level].firstLevelReferrals = new address[](0);
        users[referrerAddress].x12Matrix[level].secondLevelReferrals = new address[](0);
        users[referrerAddress].x12Matrix[level].closedPart = new address[](0);

        if (!users[referrerAddress].activeX12Levels[level+1] && level != LAST_LEVEL) {
            users[referrerAddress].x12Matrix[level].blocked = true;
        }

        users[referrerAddress].x12Matrix[level].reinvestCount++;
        
        if (referrerAddress != owner) {
            address freeReferrerAddress = findfreeX12Referrer(referrerAddress, level);

            emit Reinvest(referrerAddress, freeReferrerAddress, userAddress, 2, level);
            updateX12Referrer(referrerAddress, freeReferrerAddress, level);
        } else {
            emit Reinvest(owner, address(0), userAddress, 3, level);
            sendETHDividends(owner, userAddress, 3, level);
        }
    }
    
    function findfreeX5Referrer(address userAddress, uint8 level) public view returns(address) {
        while (true) {
            if (users[users[userAddress].referrer].activeX5Levels[level]) {
                return users[userAddress].referrer;
            }
            
            userAddress = users[userAddress].referrer;
        }
    }
    
    function findfreeX12Referrer(address userAddress, uint8 level) public view returns(address) {
        while (true) {
            if (users[users[userAddress].referrer].activeX12Levels[level]) {
                return users[userAddress].referrer;
            }
            
            userAddress = users[userAddress].referrer;
        }
    }
        
    function usersactiveX5Levels(address userAddress, uint8 level) public view returns(bool) {
        return users[userAddress].activeX5Levels[level];
    }

    function usersactiveX12Levels(address userAddress, uint8 level) public view returns(bool) {
        return users[userAddress].activeX12Levels[level];
    }

    function usersx5Matrix(address userAddress, uint8 level) public view returns(address, address[] memory, bool,uint) {
        return (users[userAddress].x5Matrix[level].currentReferrer,
                users[userAddress].x5Matrix[level].referrals,
                users[userAddress].x5Matrix[level].blocked,
                users[userAddress].x5Matrix[level].reinvestCount);
    }

    // function usersx5Matrix(address userAddress, uint8 level) public view returns(address, address[] memory, bool,uint) {
    //     return (users[userAddress].x5Matrix[level].currentReferrer,
    //             users[userAddress].x5Matrix[level].referrals,
    //             users[userAddress].x5Matrix[level].blocked);
    //             // users[userAddress].x5Matrix[level].reinvestCount);
    // }


    function usersx12Matrix(address userAddress, uint8 level) public view returns(address, address[] memory, address[] memory, bool, address[] memory,uint) {
        return (users[userAddress].x12Matrix[level].currentReferrer,
                users[userAddress].x12Matrix[level].firstLevelReferrals,
                users[userAddress].x12Matrix[level].secondLevelReferrals,
                users[userAddress].x12Matrix[level].blocked,
                users[userAddress].x12Matrix[level].closedPart,
                users[userAddress].x5Matrix[level].reinvestCount);
    }
    
    function isUserExists(address user) public view returns (bool) {
        return (users[user].id != 0);
    }

    function findEthReceiverMatrix1(address userAddress, address _from, uint8 level) private returns(address, bool) {
        address receiver = userAddress;
        bool isExtraDividends;
            while (true) {
                if (users[receiver].x5Matrix[level].blocked) {
                    emit MissedEthReceive(receiver, _from, 1, level);
                    isExtraDividends = true;
                    receiver = users[receiver].x5Matrix[level].currentReferrer;
                } else {
                    return (receiver, isExtraDividends);
                }
            }
    
    }
    address[] re;
    function findEthReceiverMatrix2(address userAddress, address _from, uint8 level) private returns(address[] memory) {
        address receiver = userAddress;
        address[] memory rece;
        re = rece;
            for(uint i=0;i<5;i++){
                if(users[receiver].x12Matrix[level].blocked){
                    emit MissedEthReceive(receiver, _from, 2, level);
                    emit SentExtraEthDividends(_from, receiver, 2, level);
                    receiver = users[receiver].x5Matrix[level].currentReferrer; 
                }else{
                    if(receiver == address(0)){
                        return (re);
                    }
                    re.push(receiver);
                    receiver = users[receiver].x5Matrix[level].currentReferrer;
                }
            }return (re);
        
    }

    function sendETHDividends(address userAddress, address _from, uint8 matrix, uint8 level) private {
        if(matrix == 1){
            (address receiver1, bool isExtraDividends) = findEthReceiverMatrix1(userAddress, _from, level);
        // uint amount = (levelPrice[1]*2)/10;
        // address payable wallet = address(uint160(owner));
        // wallet.transfer(amount);
        // address(owner).send((levelPrice[1]*2)/10);
        if (!address(uint160(receiver1)).send(levelPrice[level])) {
            return address(uint160(receiver1)).transfer(address(this).balance);
        }
        
        if (isExtraDividends) {
            emit SentExtraEthDividends(_from, receiver1, matrix, level);
        }
        }else{
            address[] memory receiver = findEthReceiverMatrix2(userAddress, _from, level);
            // uint amount = (levelPrice[1]*2)/10;
            // address payable wallet = address(uint160(owner));
            // wallet.transfer(amount);
            // address(owner).send((levelPrice[1]*2)/10);
            for(uint i=0;i<receiver.length;i++){
                x12balance[receiver[i]] =x12balance[receiver[i]]+levelPrice[level]/5;
                if (!address(uint160(receiver[i])).send(levelPrice[level]/5)) {
                    address(uint160(receiver[i])).transfer(address(this).balance);
                }
            }
            if(receiver.length < 5){
                // amount = levelPrice[level]/20*(5-receiver.length);
                // address payable wallet = address(uint160(owner));
                // wallet.transfer(amount);

                x12balance[owner]=x12balance[owner]+levelPrice[level]/5*(5-receiver.length);
                address(owner).send(levelPrice[level]/5*(5-receiver.length));
            }
            
        }
        
    }

    function bytesToAddress(bytes memory bys) private pure returns (address addr) {
        assembly {
            addr := mload(add(bys, 20))
        }
    }

}

