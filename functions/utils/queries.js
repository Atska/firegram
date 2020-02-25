const { db } = require("./admin");

class CollectionQueries {
  constructor(
    collection,
    dbValue,
    requestedValue,
    operationString,
    orderValue,
    orderType
  ) {
    this.collection = collection;
    this.dbValue = dbValue;
    this.requestedValue = requestedValue;
    this.operationString = operationString;
    this.orderValue = orderValue;
    this.orderType = orderType;
  }

  getQuery(collection, dbValue, operationString, requestedValue) {
    return db
      .collection(collection)
      .where(dbValue, operationString, requestedValue)
      .get();
  }

  getOrderedQuery(
    collection,
    dbValue,
    operationString,
    requestedValue,
    orderValue,
    orderType
  ) {
    return db
      .collection(collection)
      .where(dbValue, operationString, requestedValue)
      .orderBy(orderValue, orderType)
      .get();
  }
}

module.exports = CollectionQueries;
