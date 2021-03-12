/**
*
*     __  _______                
*     \ \/ /_   _| __ ___  _ __  
*      \  /  | || '__/ _ \| '_ \ 
*      /  \  | || | | (_) | | | |
*     /_/\_\ |_||_|  \___/|_| |_|
*             
*             (~._ _  _ .__|_  |~ _ ._ _|_._ _  __|_
*             _)| | |(_||  | ~~|_(_)| | | | (_|(_ | 
* 
* Xtron
* https://xtron.online
* (only for Xtron members)
* 
**/

pragma solidity >= 0.4.23 < 0.6.0;
contract XtronHybridMarketing {
  struct User {
    uint id;
    address referrer;
    uint partnersCount;
    mapping(uint8 => bool) activeM1Levels;
    mapping(uint8 => bool) activeM2Levels;
    mapping(uint8 => M1) m1Matrix;
    mapping(uint8 => M2) m2Matrix;
  }

  struct M1 {
    address currentReferrer;
    address[] referrals;
    bool blocked;
    uint reinvestCount;
  }
  struct M2 {
    address currentReferrer;
    address spilloverReferrer;
    address[] firstLevelReferrals;
    address[] secondLevelReferrals;
    bool blocked;
    uint reinvestCount;
    address[] closedPart;
  }
  uint8 public constant LAST_LEVEL = 12;
  mapping(address => User) public users;
  mapping(uint    => address) public idToAddress;
  mapping(uint    => address) public userIds;
  mapping(address => uint) public balances;
  mapping(address => uint) public m2balance;
  uint public lastUserId = 2;
  address public owner;
  mapping(uint8 => uint) public levelPrice;
  event Registration(address indexed user, address indexed referrer, uint indexed userId, uint referrerId);
  event M2PaidUsers(address registeredUser, address userReceiver1, address userReceiver2, address userReceiver3, address userReceiver4, address userReceiver5 );
  event LogEntry(address indexed user, address indexed referrer, string info);
  event EntryLog(uint id, address indexed userAddress, address indexed referrerAddress);
  event Reinvest(address indexed user, address indexed currentReferrer, address indexed caller, uint8 matrix, uint8 level);
  event Upgrade(address indexed user, address indexed referrer, uint8 matrix, uint8 level);
  event NewUserPlace(address indexed user, address indexed referrer, uint8 matrix, uint8 level, uint8 place);
  event MissedEthReceive(address indexed receiver, address indexed from, uint8 matrix, uint8 level);
  event SentExtraEthDividends(address indexed from, address indexed receiver, uint8 matrix, uint8 level);
  constructor(address ownerAddress) public {    
    //levelPrice[1] = 20 trx; //Lets reduce the first section to 20, QA Testing
    levelPrice[1] = 100 trx;
    levelPrice[2] = 200 trx;
    levelPrice[3] = 400 trx;
    levelPrice[4] = 800 trx;
    levelPrice[5] = 1600 trx;
    levelPrice[6] = 3200 trx;
    levelPrice[7] = 6400 trx;
    levelPrice[8] = 12800 trx;
    levelPrice[9] = 25600 trx;
    levelPrice[10] = 51200 trx;
    levelPrice[11] = 102400 trx;
    levelPrice[12] = 204800 trx;
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
      users[ownerAddress].activeM1Levels[i] = true;
      users[ownerAddress].activeM2Levels[i] = true;
    }
  }

  function () external payable {
    if (msg.data.length == 0) {
      return registration(msg.sender, owner);
    }
    registration(msg.sender, bytesToAddress(msg.data));
  }

  function registrationExt(address referrerAddress) external payable {
    require(msg.value == 2 * (levelPrice[1] + (levelPrice[1] / 10)), "invalid price");
    registration(msg.sender, referrerAddress);
  }

  function buyNewLevel(uint8 matrix, uint8 level) external payable {
    require(isUserExists(msg.sender), "user is not exists. Register first.");
    require(matrix == 1 || matrix == 2, "invalid matrix");
    require(msg.value == levelPrice[level] + (levelPrice[level] / 10), "invalid price");
    require(level > 1 && level <= LAST_LEVEL, "invalid level");
    address(owner).send(levelPrice[level] / 10);
    if (matrix == 1) {
      require(!users[msg.sender].activeM1Levels[level], "level already activated");
      if (users[msg.sender].m1Matrix[level - 1].blocked) {
        users[msg.sender].m1Matrix[level - 1].blocked = false;
      }
      address freeM1Referrer = findfreeM1Referrer(msg.sender, level);
      users[msg.sender].m1Matrix[level].currentReferrer = freeM1Referrer;
      users[msg.sender].activeM1Levels[level] = true;
      updateM1Referrer(msg.sender, freeM1Referrer, level);
      emit Upgrade(msg.sender, freeM1Referrer, 1, level);
    } else {
      require(!users[msg.sender].activeM2Levels[level], "level already activated");
      if (users[msg.sender].m2Matrix[level - 1].blocked) {
        users[msg.sender].m2Matrix[level - 1].blocked = false;
      }
      address freeM2Referrer = findfreeM2Referrer(msg.sender, level);
      users[msg.sender].activeM2Levels[level] = true;
      updateM2Referrer(msg.sender, freeM2Referrer, level);
      emit Upgrade(msg.sender, freeM2Referrer, 2, level);
    }
  }

  /**

  Registration: Para el acceso de la red de distribución Xtron, se requiere un registro
  Para efectuarse un registro, se debe de tener un Wallet Tron y un ID de referencia.
  Si el ID no esta disponible a la hora de registro, se recomienda hacer el registro refierendo la cuenta ID 1
  
  La función interna del registro requiere dos wallets, el wallet del usuario a registrarse, y el wallet del usuario referente.
  En la actualidad, un registro tiene un costo de 440 trx que se corresponde de la siguiente manera:
  200 trx para la matriz M1
  200 trx para la matriz M2
   40 trx como el fee del 10% del costo comisión

  - La distribución de la matriz M1, ira directamente al usuario referente  
  - La distribución de la matriz M2, sera distribuida en los 5 niveles hacia arriba, 
  partiendo del usuario referente y pagando un 20% a cada uno de estos.

  TODO: Cada ejecución del contrato tiene un costo (Gas Price). En la acutalidad el costo varía y 
  estamos en proceso de investigacion como tener un monto fijo.

  Analisis:

  - Validar que el wallet no se encuentre registrado
  - Validar que el wallet del referente exista.

  **/

  function registration(address userAddress, address referrerAddress) private {
    
    //Valida que el usuario referido no exista
    require(!isUserExists(userAddress), "User exists");
    
    //Valida que el referente exista
    require(isUserExists(referrerAddress), "Referrer not exists");
    
    //Validad el contrato en base al tamaño.
    uint32 size;
    assembly {
      size: = extcodesize(userAddress)
    }
    require(size == 0, "Cannot be a contract");
    
    //Crear nuevo Usuario
    User memory user = User({
      id: lastUserId,
      referrer: referrerAddress,
      partnersCount: 0
    });
    
    users[userAddress]                    = user;           //El nuevo usuario es salvado en la lista de usuarios
    idToAddress[lastUserId]               = userAddress;    //Se guarda el usuario en un arreglo con un indice igual al ID asignado
    users[userAddress].referrer           = referrerAddress;//Se guarda dirección de referencia en la lista de usuarios.
    users[userAddress].activeM1Levels[1]  = true;           //Se active la matriz M1 como parte del registro
    users[userAddress].activeM2Levels[1]  = true;           //Se active la matriz M2 como parte del registro
    userIds[lastUserId]                   = userAddress;    //Lista Similar al idToAddress
    lastUserId++;                                           //Se Incrementa lastUserId

    users[referrerAddress].partnersCount++;                                               //Se incrementa el número de partners del referente
    address freeM1Referrer                         = findfreeM1Referrer(userAddress, 1);  //Se identifica el referente de la matriz M1    
    users[userAddress].m1Matrix[1].currentReferrer = freeM1Referrer;                      //Se asigna el referente de la matriz M1 al referido    
    updateM1Referrer(userAddress, freeM1Referrer, 1);                                     //Se actualiza la matriz M1
    
    address freeM2Referrer                         = findfreeM2Referrer(userAddress, 1); //Se identifica el referente de la matriz M12    
    
    if (user.id == 6){
      emit LogEntry(userAddress, referrerAddress, "COD#007");
      freeM2Referrer  = userIds[3];
    }

    updateM2Referrer(userAddress, freeM2Referrer, 1);                                    //Se actualiza la matriz M2 
    

    emit Registration(userAddress, 
                      referrerAddress, 
                      users[userAddress].id, 
                      users[referrerAddress].id);                                         //Se emite un evento de la transacción para ser registrado en el Blockchain

    //TODO: Eliminar estos eventos
    address level_1 = findfreeM2Referrer(userAddress, 1);           
    address level_2 = findfreeM2Referrer(userAddress, 2);    
    address level_3 = findfreeM2Referrer(userAddress, 3); 
    address level_4 = findfreeM2Referrer(userAddress, 4); 
    address level_5 = findfreeM2Referrer(userAddress, 5); 
    

   emit M2PaidUsers(userAddress, level_1, level_2, level_3,level_4, level_5);

    //emit M2PaidUsers(level_0);
    //emit M2PaidUsers(level_1);
    //emit M2PaidUsers(level_2);
    //emit M2PaidUsers(level_3);
    //emit M2PaidUsers(level_4);

    address(owner).send((levelPrice[1] * 2) / 10);                                        //Se distribuye el monto establecido (10%) como el costo de la transacción
  }

  function updateM1Referrer(address userAddress, address referrerAddress, uint8 level) private {
    users[referrerAddress].m1Matrix[level].referrals.push(userAddress);
    if (users[referrerAddress].m1Matrix[level].referrals.length < 5) {
      emit NewUserPlace(userAddress, referrerAddress, 1, level, uint8(users[referrerAddress].m1Matrix[level].referrals.length));
      return sendETHDividends(referrerAddress, userAddress, 1, level);
    }
    emit NewUserPlace(userAddress, referrerAddress, 1, level, 5);
    //close matrix
    users[referrerAddress].m1Matrix[level].referrals = new address[](0);
    if (!users[referrerAddress].activeM1Levels[level + 1] && level != LAST_LEVEL) {
      users[referrerAddress].m1Matrix[level].blocked = true;
    }
    //create new one by recursion
    if (referrerAddress != owner) {
      //check referrer active level
      address freeReferrerAddress = findfreeM1Referrer(referrerAddress, level);
      if (users[referrerAddress].m1Matrix[level].currentReferrer != freeReferrerAddress) {
        users[referrerAddress].m1Matrix[level].currentReferrer = freeReferrerAddress;
      }
      users[referrerAddress].m1Matrix[level].reinvestCount++;
      emit Reinvest(referrerAddress, freeReferrerAddress, userAddress, 1, level);
      updateM1Referrer(referrerAddress, freeReferrerAddress, level);
    } else {
      sendETHDividends(owner, userAddress, 1, level);
      users[owner].m1Matrix[level].reinvestCount++;
      emit Reinvest(owner, address(0), userAddress, 1, level);
    }
  }


  function updateM2ReferrerLevel1(address userAddress, address referrerAddress, uint8 level) private {     
    //Agregar registro a la matrix al referente
    users[referrerAddress].m2Matrix[level].firstLevelReferrals.push(userAddress);
    //Emitir evento de un nuevo registro
    emit NewUserPlace(userAddress, referrerAddress, 3, level, uint8(users[referrerAddress].m2Matrix[level].firstLevelReferrals.length));
    //Asignar al nuevo registro su referentre en la matriz correspondiente.
    users[userAddress].m2Matrix[level].currentReferrer = referrerAddress;
    //Si la direccción refernte es igual a la cta principal, ejecuta el retorno de dividendos
    if (referrerAddress == owner) {
      emit LogEntry(userAddress, referrerAddress, "COD#002");
      return sendETHDividends(referrerAddress, userAddress, 2, level);
    }
    //Si la cuenta de referencia no es igual a la cta referente.
    else {
      //Asignar referente del referente
      address ref = users[referrerAddress].m2Matrix[level].currentReferrer;
      users[ref].m2Matrix[level].secondLevelReferrals.push(userAddress);
      uint len = users[ref].m2Matrix[level].firstLevelReferrals.length;
      if ((len == 3) && (users[ref].m2Matrix[level].firstLevelReferrals[0] == referrerAddress) && (users[ref].m2Matrix[level].firstLevelReferrals[1] == referrerAddress) && (users[ref].m2Matrix[level].firstLevelReferrals[2] == referrerAddress)) {
        if (users[referrerAddress].m2Matrix[level].firstLevelReferrals.length == 1) {
          emit NewUserPlace(userAddress, ref, 2, level, 10);
        } else if (users[referrerAddress].m2Matrix[level].firstLevelReferrals.length == 2) {
          emit NewUserPlace(userAddress, ref, 2, level, 11);
        } else {
          emit NewUserPlace(userAddress, ref, 2, level, 12);
        }
      } else if ((len == 2) && users[ref].m2Matrix[level].firstLevelReferrals[0] == referrerAddress) {
        if (users[referrerAddress].m2Matrix[level].firstLevelReferrals.length == 1) {
          emit NewUserPlace(userAddress, ref, 2, level, 9);
        } else if (users[referrerAddress].m2Matrix[level].firstLevelReferrals.length == 2) {
          emit NewUserPlace(userAddress, ref, 2, level, 8);
        } else {
          emit NewUserPlace(userAddress, ref, 2, level, 7);
        }
      } else if ((len == 1) && users[ref].m2Matrix[level].firstLevelReferrals[0] == referrerAddress) {
        if (users[referrerAddress].m2Matrix[level].firstLevelReferrals.length == 1) {
          emit NewUserPlace(userAddress, ref, 2, level, 5);
        } else if (users[referrerAddress].m2Matrix[level].firstLevelReferrals.length == 2) {
          emit NewUserPlace(userAddress, ref, 2, level, 4);
        } else {
          emit NewUserPlace(userAddress, ref, 2, level, 3);
        }
      } else if (len == 3 && users[ref].m2Matrix[level].firstLevelReferrals[1] == referrerAddress) {
        if (users[referrerAddress].m2Matrix[level].firstLevelReferrals.length == 1) {
          emit NewUserPlace(userAddress, ref, 2, level, 10);
        } else if (users[referrerAddress].m2Matrix[level].firstLevelReferrals.length == 2) {
          emit NewUserPlace(userAddress, ref, 2, level, 11);
        } else {
          emit NewUserPlace(userAddress, ref, 2, level, 12);
        }
      }
    }
    emit LogEntry(userAddress, referrerAddress, "COD#003");
    return updateM2ReferrerSecondLevel(userAddress, referrerAddress, level);
  
  }

  function updateM2ReferrerLevel2(address userAddress, address referrerAddress, uint8 level) private {  
    //Se agrega el nuevo registro a la lista de referentes de segundo nivel
    //Este registro debe efectuar un pago por derrame, si es necesario.

/**
       1
       2
     3 4 5
    6
 
 2 -> 1 -> [3,4,5] 
 2 -> 2 -> [6] 
**/

    users[referrerAddress].m2Matrix[level].secondLevelReferrals.push(userAddress);
    if (users[referrerAddress].m2Matrix[level].closedPart.length != 0) {
      emit LogEntry(userAddress, referrerAddress, "COD#004");
      for (uint8 i = 0; i < users[referrerAddress].m2Matrix[level].firstLevelReferrals.length; i++) {
        bool flag = false;
        for (uint8 j = 0; j < users[referrerAddress].m2Matrix[level].closedPart.length; j++) {
          if (users[referrerAddress].m2Matrix[level].closedPart[j] == users[referrerAddress].m2Matrix[level].firstLevelReferrals[i]) {
            flag = true;
          }
        }
        if (!flag) {
          updateM2(userAddress, referrerAddress, level, i);
          emit LogEntry(userAddress, referrerAddress, "COD#004.001");
          return updateM2ReferrerSecondLevel(userAddress, referrerAddress, level);
        }
      }
    } else {
      emit LogEntry(userAddress, referrerAddress, "COD#005");
      if (users[users[referrerAddress].m2Matrix[level].firstLevelReferrals[0]].m2Matrix[level].firstLevelReferrals.length <= users[users[referrerAddress].m2Matrix[level].firstLevelReferrals[1]].m2Matrix[level].firstLevelReferrals.length) {        
        if (users[users[referrerAddress].m2Matrix[level].firstLevelReferrals[0]].m2Matrix[level].firstLevelReferrals.length <= users[users[referrerAddress].m2Matrix[level].firstLevelReferrals[2]].m2Matrix[level].firstLevelReferrals.length) {
          emit LogEntry(userAddress, referrerAddress, "COD#005.001");
          updateM2(userAddress, referrerAddress, level, 0);

          //Despues de actualizar el pago de la matriz M2

        } else {
          emit LogEntry(userAddress, referrerAddress, "COD#005.002");
          updateM2(userAddress, referrerAddress, level, 2);
        }
      } else {
        if (users[users[referrerAddress].m2Matrix[level].firstLevelReferrals[1]].m2Matrix[level].firstLevelReferrals.length <= users[users[referrerAddress].m2Matrix[level].firstLevelReferrals[2]].m2Matrix[level].firstLevelReferrals.length) {
          emit LogEntry(userAddress, referrerAddress, "COD#005.003");
          updateM2(userAddress, referrerAddress, level, 1);
        } else {
          emit LogEntry(userAddress, referrerAddress, "COD#005.004");
          updateM2(userAddress, referrerAddress, level, 2);
        }
      }
      emit LogEntry(userAddress, referrerAddress, "COD#006");
      updateM2ReferrerSecondLevel(userAddress, referrerAddress, level);
    }

  }

  function updateM2Referrer(address userAddress, address referrerAddress, uint8 level) private {
    emit LogEntry(userAddress, referrerAddress, "COD#001");
    require(users[referrerAddress].activeM2Levels[level], "0.05. Referrer level is inactive");
    //Si el referente tiene menos de 3 casillas, es un registro directo. No hay derrame
    
    if (users[referrerAddress].m2Matrix[level].firstLevelReferrals.length < 3) {
      //Registro Directo
      updateM2ReferrerLevel1(userAddress,referrerAddress,level);
    } else {
      //Registro por Derrame
      updateM2ReferrerLevel2(userAddress,referrerAddress,level);    
    }
  }

  function updateM2(address userAddress, address referrerAddress, uint8 level, uint8 child) private {
    if (child == 0) {
      users[users[referrerAddress].m2Matrix[level].firstLevelReferrals[0]].m2Matrix[level].firstLevelReferrals.push(userAddress);
      emit NewUserPlace(userAddress, users[referrerAddress].m2Matrix[level].firstLevelReferrals[0], 3, level, uint8(users[users[referrerAddress].m2Matrix[level].firstLevelReferrals[0]].m2Matrix[level].firstLevelReferrals.length));
      emit NewUserPlace(userAddress, referrerAddress, 3, level, 3 + uint8(users[users[referrerAddress].m2Matrix[level].firstLevelReferrals[0]].m2Matrix[level].firstLevelReferrals.length));
      //set current level
      users[userAddress].m2Matrix[level].currentReferrer = users[referrerAddress].m2Matrix[level].firstLevelReferrals[0];
    } else if (child == 1) {
      users[users[referrerAddress].m2Matrix[level].firstLevelReferrals[1]].m2Matrix[level].firstLevelReferrals.push(userAddress);
      emit NewUserPlace(userAddress, users[referrerAddress].m2Matrix[level].firstLevelReferrals[1], 3, level, uint8(users[users[referrerAddress].m2Matrix[level].firstLevelReferrals[1]].m2Matrix[level].firstLevelReferrals.length));
      emit NewUserPlace(userAddress, referrerAddress, 3, level, 9 + uint8(users[users[referrerAddress].m2Matrix[level].firstLevelReferrals[1]].m2Matrix[level].firstLevelReferrals.length));
      //set current level
      users[userAddress].m2Matrix[level].currentReferrer = users[referrerAddress].m2Matrix[level].firstLevelReferrals[1];
    } else {
      users[users[referrerAddress].m2Matrix[level].firstLevelReferrals[2]].m2Matrix[level].firstLevelReferrals.push(userAddress);
      emit NewUserPlace(userAddress, users[referrerAddress].m2Matrix[level].firstLevelReferrals[2], 3, level, uint8(users[users[referrerAddress].m2Matrix[level].firstLevelReferrals[2]].m2Matrix[level].firstLevelReferrals.length));
      emit NewUserPlace(userAddress, referrerAddress, 3, level, 9 + uint8(users[users[referrerAddress].m2Matrix[level].firstLevelReferrals[2]].m2Matrix[level].firstLevelReferrals.length));
      //set current level
      users[userAddress].m2Matrix[level].currentReferrer = users[referrerAddress].m2Matrix[level].firstLevelReferrals[2];
    }
  }

  function updateM2ReferrerSecondLevel(address userAddress, address referrerAddress, uint8 level) private {


    if (users[referrerAddress].m2Matrix[level].secondLevelReferrals.length < 9) {
      return sendETHDividends(referrerAddress, userAddress, 2, level);
    }
    address[] memory m2 = users[users[referrerAddress].m2Matrix[level].currentReferrer].m2Matrix[level].firstLevelReferrals;
    if (m2.length == 3) {
      if (m2[0] == referrerAddress || m2[1] == referrerAddress || m2[2] == referrerAddress) {
        users[users[referrerAddress].m2Matrix[level].currentReferrer].m2Matrix[level].closedPart.push(referrerAddress);
      } else if (m2.length == 2) {
        if (m2[0] == referrerAddress || m2[1] == referrerAddress) {
          users[users[referrerAddress].m2Matrix[level].currentReferrer].m2Matrix[level].closedPart.push(referrerAddress);
        } else if (m2.length == 1) {
          if (m2[0] == referrerAddress) {
            users[users[referrerAddress].m2Matrix[level].currentReferrer].m2Matrix[level].closedPart.push(referrerAddress);
          }
        }
      }
    }
    users[referrerAddress].m2Matrix[level].firstLevelReferrals = new address[](0);
    users[referrerAddress].m2Matrix[level].secondLevelReferrals = new address[](0);
    users[referrerAddress].m2Matrix[level].closedPart = new address[](0);
    if (!users[referrerAddress].activeM2Levels[level + 1] && level != LAST_LEVEL) {
      users[referrerAddress].m2Matrix[level].blocked = true;
    }
    users[referrerAddress].m2Matrix[level].reinvestCount++;
    if (referrerAddress != owner) {
      address freeReferrerAddress = findfreeM2Referrer(referrerAddress, level);      
      emit Reinvest(referrerAddress, freeReferrerAddress, userAddress, 2, level);
      updateM2Referrer(referrerAddress, freeReferrerAddress, level);
    } else {
      emit Reinvest(owner, address(0), userAddress, 3, level);
      sendETHDividends(owner, userAddress, 2, level);
    }
  }

  function findfreeM1Referrer(address userAddress, uint8 level) public view returns(address) {
    while (true) {
      if (users[users[userAddress].referrer].activeM1Levels[level]) {
        return users[userAddress].referrer;
      }
      userAddress = users[userAddress].referrer;
    }
  }

  function findfreeM2Referrer(address userAddress, uint8 level) public view returns(address) {
    while (true) {
      if (users[users[userAddress].referrer].activeM2Levels[level]) {
        return users[userAddress].referrer;
      }
      userAddress = users[userAddress].referrer;
    }
  }

  function usersactiveM1Levels(address userAddress, uint8 level) public view returns(bool) {
    return users[userAddress].activeM1Levels[level];
  }

  function usersactiveM2Levels(address userAddress, uint8 level) public view returns(bool) {
    return users[userAddress].activeM2Levels[level];
  }

  function usersm1Matrix(address userAddress, uint8 level) public view returns(address, address[] memory, bool, uint) {
    return (users[userAddress].m1Matrix[level].currentReferrer, users[userAddress].m1Matrix[level].referrals, users[userAddress].m1Matrix[level].blocked, users[userAddress].m1Matrix[level].reinvestCount);
  }

  function usersm2Matrix(address userAddress, uint8 level) public view returns(address, address[] memory, address[] memory, bool, address[] memory, uint) {
    return (users[userAddress].m2Matrix[level].currentReferrer, users[userAddress].m2Matrix[level].firstLevelReferrals, users[userAddress].m2Matrix[level].secondLevelReferrals, users[userAddress].m2Matrix[level].blocked, users[userAddress].m2Matrix[level].closedPart, users[userAddress].m1Matrix[level].reinvestCount);
  }

  function isUserExists(address user) public view returns(bool) {
    return (users[user].id != 0);
  }

  function findEthReceiverMatrix1(address userAddress, address _from, uint8 level) private returns(address, bool) {
    address receiver = userAddress;
    bool isExtraDividends;
    while (true) {
      if (users[receiver].m1Matrix[level].blocked) {
        emit MissedEthReceive(receiver, _from, 1, level);
        isExtraDividends = true;
        receiver = users[receiver].m1Matrix[level].currentReferrer;
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
    for (uint i = 0; i < 5; i++) {
      if (users[receiver].m2Matrix[level].blocked) {
        emit MissedEthReceive(receiver, _from, 2, level);
        emit SentExtraEthDividends(_from, receiver, 2, level);
        receiver = users[receiver].m1Matrix[level].currentReferrer;
      } 
      else {
        if (receiver == address(0)) {
          return (re);
        }
        re.push(receiver);
        receiver = users[receiver].m1Matrix[level].currentReferrer;
      }
    }
    return (re);
  }

  function sendETHDividends(address userAddress, address _from, uint8 matrix, uint8 level) private {
    if (matrix == 1) {
      (address receiver1, bool isExtraDividends) = findEthReceiverMatrix1(userAddress, _from, level);      
      if (!address(uint160(receiver1)).send(levelPrice[level])) {
        return address(uint160(receiver1)).transfer(address(this).balance);
      }
      if (isExtraDividends) {
        emit SentExtraEthDividends(_from, receiver1, matrix, level);
      }
    } else {
      address[] memory receiver = findEthReceiverMatrix2(userAddress, _from, level);
      for (uint i = 0; i < receiver.length; i++) {
        m2balance[receiver[i]] = m2balance[receiver[i]] + levelPrice[level] / 5;
        if (!address(uint160(receiver[i])).send(levelPrice[level] / 5)) {
          address(uint160(receiver[i])).transfer(address(this).balance);
        }
      }
      if (receiver.length < 5) {
        m2balance[owner] = m2balance[owner] + levelPrice[level] / 5 * (5 - receiver.length);
        address(owner).send(levelPrice[level] / 5 * (5 - receiver.length));
      }
    }
  }

  function bytesToAddress(bytes memory bys) private pure returns(address addr) {
    assembly {
      addr: = mload(add(bys, 20))
    }
  }
}
