// var config = require('../config');
const Constant = require('../Helper/constant');
var fs = require('fs');
const { hasUncaughtExceptionCaptureCallback } = require('process');
const TronWeb = require('tronweb');
const { json } = require('express');
const HttpProvider = TronWeb.providers.HttpProvider; // This provider is optional, you can just use a url for the nodes instead
const fullNode = new HttpProvider(Constant.tronRequestUrl); // Full node http endpoint
const solidityNode = new HttpProvider(Constant.tronRequestUrl); // Solidity node http endpoint
const eventServer = Constant.tronRequestUrl; // Contract events http endpoint


const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    Constant.privateKey
);

exports.register = async (req, res) => {
    console.log(`Register api calling...`);
   
    try {
        let instance = await tronWeb.contract(Constant.abi,Constant.contractAddress); 
        let result = await instance["registrationExt"](req.body.RefereAddress).send({
          callValue:req.body.callValue,
        });
        console.log("respon",result);
        console.log(` Register api end...`);
        console.log("res",result);
        return res.send({status:200,txid:result});
      
    }
    catch (e) {
      console.error('\n\n\ registeration| error', e);
      return res.send({status : 500 , message : "Registration failed."})
    }
  }
  
   exports.buylevel = async (req, res) => {
    console.log(`lenel api calling...`);
   
    try {
        let instance = await tronWeb.contract(Constant.abi,Constant.contractAddress); 
        let result = await instance["buyNewLevel"](req.body.level,req.body.matrix).send({
          callValue:req.body.callValue,
        });
        console.log("respon",result);
        console.log(` buy new level api end...`);
        return res.send({status:200, txid : result})
    }
    catch (e) {
      console.error('\n\n\ buy new level| error', e);
      return res.send({status : 500 , message : "buy level failed."})
    }
  }

  exports.user = async (req, res) => {
    console.log(`user api calling...`);
   
    try {
        let instance = await tronWeb.contract(Constant.abi,Constant.contractAddress); 
        let result = await instance["users"](req.body.address).call();
        console.log("respon",result);
        console.log(` user api end...`);
        return res.send({status:200, txid : result})
    }
    catch (e) {
      console.error('\n\n\ user api| error', e);
      return res.send({status : 500 , message : "failed to fetch user."})
    }
  }

  exports.userId = async (req, res) => {
    console.log(`userID api calling...`);
   
    try {
        let instance = await tronWeb.contract(Constant.abi,Constant.contractAddress); 
        let result = await instance["userIds"](req.body.id).call();
        console.log("respon",result);
        console.log(` userIds api end...`);
        return res.send({status:200, txid : result})
    }
    catch (e) {
      console.error('\n\n\ userIds api| error', e);
      return res.send({status : 500 , message : "failed to fetch user id."})
    }
  }

  exports.userX5Matrix = async (req, res) => {
    console.log(`userID api calling...`);
   
    try {
        let instance = await tronWeb.contract(Constant.abi,Constant.contractAddress); 
        let result = await instance["usersx5Matrix"](req.body.useraddress,req.body.level).call();
        console.log("respon",result);
        console.log(` userX5Matrix api end...`);
        return res.send({status:200, txid : result})
    }
    catch (e) {
      console.error('\n\n\ userX5Matrix api| error', e);
      return res.send({status : 500 , message : "failed to fetch userX5Matrix."})
    }
  }

  exports.usersx12Matrix= async (req, res) => {
    console.log(`usersx12Matrix api calling...`);
   
    try {
        let instance = await tronWeb.contract(Constant.abi,Constant.contractAddress); 
        let result = await instance["usersx12Matrix"](req.body.useraddress,req.body.level).call();
        console.log("respon",result);
        console.log(` usersx12Matrix api end...`);
        return res.send({status:200, txid : result})
    }
    catch (e) {
      console.error('\n\n\ usersx12Matrix api| error', e);
      return res.send({status : 500 , message : "failed to fetch usersx12Matrix."})
    }
  }

  exports.usersactiveX12Levels = async (req, res) => {
    console.log(`usersactiveX12Levels api calling...`);
   
    try {
        let instance = await tronWeb.contract(Constant.abi,Constant.contractAddress); 
        let result = await instance["usersactiveX12Levels"](req.body.useraddress,req.body.level).call();
        console.log("respon",result);
        console.log(` usersactiveX12Levels api end...`);
        return res.send({status:200, txid : result})
    }
    catch (e) {
      console.error('\n\n\ usersactiveX12Levels api| error', e);
      return res.send({status : 500 , message : "failed to fetch users active X12 Levels."})
    }
  }
  exports.usersactiveX5Levels = async (req, res) => {
    console.log(`usersactiveX5Levels api calling...`);
   
    try {
        let instance = await tronWeb.contract(Constant.abi,Constant.contractAddress); 
        let result = await instance["usersactiveX5Levels"](req.body.useraddress,req.body.level).call();
        console.log("respon",result);
        console.log(` usersactiveX5Levels api end...`);
        return res.send({status:200, txid : result})
    }
    catch (e) {
      console.error('\n\n\ usersactiveX5Levels api| error', e);
      return res.send({status : 500 , message : "failed to fetch users active X5 Levels."})
    }
  }

 