const { PutItemCommand ,ScanCommand,GetItemCommand,DeleteItemCommand, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const { TABLE_NAME } = require("../models/bedModel");
const { dynamoDB } = require("../config/dynamoClient");


const addBed = async (bed) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      bid: { S: bed.bid },
      ...(bed.status && { status: { S: bed.status } }),
      ...(bed.uid && { uid: { S: bed.uid } }),  
      ...(bed.puser && {puser: { S: bed.puser } }),
      ...(bed.baddress && { baddress: { S: bed.baddress } }),
      ...(bed.spname && { spname: { S: bed.spname } }),
      ...(bed.caregiver && {caregiver: { S: bed.caregiver } }),
      ...(bed.cname && { cname: { S: bed.cname } }),  
      ...(bed.ph_caregiver && {ph_caregiver: { S: bed.ph_caregiver } }),
      ...(bed.pose && { pose: { S: bed.pose } }),
      ...(bed.position && { position: { S: bed.position } }),
      ...(bed.date && { date: { S: bed.date } }),
      ...(bed.time && { S: bed.time }),
      ...(bed.hoursSpent && { N: bed.hoursSpent.toString() }),
    }
  };

  await dynamoDB.send(new PutItemCommand(params));
};

const deleteBedById = async (bid) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      bid: { S: bid }
    }
  };

  await dynamoDB.send(new DeleteItemCommand(params));
};


const updateBedById = async (bid, updateData) => {
  const updateExpressions = [];
  const expressionAttributeNames = {};
  const expressionAttributeValues = {};

  for (const key in updateData) {
    updateExpressions.push(`#${key} = :${key}`);
    expressionAttributeNames[`#${key}`] = key;
    expressionAttributeValues[`:${key}`] = { S: String(updateData[key]) };
  }

  const params = {
    TableName: TABLE_NAME,
    Key: {
      bid: { S: bid }
    },
    UpdateExpression: `SET ${updateExpressions.join(", ")}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues
  };

  await dynamoDB.send(new UpdateItemCommand(params));
};


const getAllBeds = async () => {
  const params = {
    TableName: TABLE_NAME
  };

  const result = await dynamoDB.send(new ScanCommand(params));
  return result.Items.map(item => {
    const parsed = {};
    for (const key in item) {
      parsed[key] = Object.values(item[key])[0]; 
    }
    return parsed;
  });
};


const getBedById = async (bid) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      bid: { S: bid }
    }
  };

  const result = await dynamoDB.send(new GetItemCommand(params));
  if (!result.Item) return null;

  const parsed = {};
  for (const key in result.Item) {
    parsed[key] = Object.values(result.Item[key])[0];
  }

  return parsed;
};


module.exports = {
deleteBedById,
addBed,
updateBedById,
getAllBeds,
getBedById,
};
