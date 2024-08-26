// Importar el cliente DynamoDB del SDK v3
const { DynamoDBClient, DescribeTableCommand } = require('@aws-sdk/client-dynamodb');

// Configurar la región
const client = new DynamoDBClient({ region: 'us-east-2' }); // Reemplaza 'us-west-2' con tu región de AWS

const tableName = 'Tasks'; // Reemplaza 'Tasks' con el nombre de tu tabla

const validateTable = async () => {
    try {
        const params = {
            TableName: tableName,
        };

        const command = new DescribeTableCommand(params);
        const response = await client.send(command);

        if (response.Table.TableStatus === 'ACTIVE') {
            console.log(`La tabla ${tableName} está activa y lista para su uso.`);
        } else {
            console.log(`La tabla ${tableName} no está activa.`);
        }
    } catch (error) {
        console.error('Error al validar la tabla:', error);
    }
};

validateTable();