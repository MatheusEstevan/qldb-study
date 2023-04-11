const qldb = require('amazon-qldb-driver-nodejs');

async function createTable(txn) {
    await txn.execute("CREATE TABLE Payment");
}

async function createIndex(txn) {
    await txn.execute("CREATE INDEX ON Payment (PaymentId)");
}


async function fetchDocuments(txn) {
    return await txn.execute("SELECT * FROM Payment");
}

async function insertDocument(txn) {
    const Payment = {
        id: 2,
        PaymentType: "4"
    };
    await txn.execute("INSERT INTO Payment ?", Payment);
}

async function main() {
    // Use default settings
    const driver = new qldb.QldbDriver("poc-teste-qldb");

    var resultList = await driver.executeLambda(async(txn) => {
        // console.log("Create table pAYMENT");
        // const result = await createTable(txn);
        // console.log("Create index on payment");
        // await createIndex(txn);
        // console.log("Insert document");
        const result = await insertDocument(txn);
        // const result = await createIndex(txn);
        return result;
    });

    // Pretty print the result list
    console.log("The result is ", JSON.stringify(resultList, null, 2));
    driver.close();
}

main();