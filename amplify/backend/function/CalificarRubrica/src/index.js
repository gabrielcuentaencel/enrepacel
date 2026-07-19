const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {
        if (!event.body) {
            return { statusCode: 400, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ error: "Cuerpo vacío." }) };
        }

        const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        const { calificacionRubricaA, calificacionRubricaB, calificacionRubricaC } = body;

        if (calificacionRubricaA === undefined || calificacionRubricaB === undefined || calificacionRubricaC === undefined) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "Los campos calificacionRubricaA, B y C son obligatorios." })
            };
        }

        const idCalificacionEnRubricas = Date.now();

        const params = {
            TableName: "Rubricas-dev",
            Item: {
                idCalificacionEnRubricas,
                calificacionRubricaA,
                calificacionRubricaB,
                calificacionRubricaC
            }
        };

        await docClient.send(new PutCommand(params));
        return {
            statusCode: 201,
            headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*" },
            body: JSON.stringify({ idCalificacionEnRubricas })
        };
    } catch (error) {
        return { statusCode: 500, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ error: error.message }) };
    }
};

