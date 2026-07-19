const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    
    try {
        if (!event.pathParameters || !event.pathParameters.idExamen) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "Falta el parámetro idExamen en la URL." }),
            };
        }

        const idExamenNum = Number(event.pathParameters.idExamen);

        if (isNaN(idExamenNum)) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "El idExamen debe ser un número válido." }),
            };
        }

        const params = {
            TableName: "PreguntasDelExamen-dev",
            // Filtra los registros que pertenezcan al idExamen recibido
            FilterExpression: "idExamen = :idExamenTarget",
            ExpressionAttributeValues: {
                ":idExamenTarget": idExamenNum
            },
            ProjectionExpression: "idPregunta, idExamen, nroPregunta, textoPregunta"
        };

        const resultado = await docClient.send(new ScanCommand(params));

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify(resultado.Items || []),
        };

    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ error: "Error interno al consultar las preguntas.", detalle: error.message }),
        };
    }
};

