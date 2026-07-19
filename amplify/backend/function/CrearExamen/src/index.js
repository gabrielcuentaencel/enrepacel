const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const crypto = require("crypto");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    
    try {
        // Validación segura de pathParameters
        if (!event.pathParameters || !event.pathParameters.textoExamen) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ 
                    error: "API Gateway no está enviando el parámetro correctamente.",
                    ayuda: "Verifica que tu ruta en API Gateway use llaves: /CrearExamen/{textoExamen}",
                    pathParametersRecibidos: event.pathParameters 
                }),
            };
        }

        const textoExamen = event.pathParameters.textoExamen;
        const idExamen = Date.now(); 

        const params = {
            TableName: "Examenes-dev",
            Item: {
                idExamen: idExamen,
                textoExamen: decodeURIComponent(textoExamen)
            }
        };

        // Guardar en DynamoDB
        await docClient.send(new PutCommand(params));

        return {
            statusCode: 201,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({ idExamen }),
        };

    } catch (error) {
        console.error("Error capturado:", error);
        // Devolvemos el mensaje de error real para diagnosticar el problema de inmediato
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ 
                error: "Error interno en la ejecución de la Lambda.",
                mensajeError: error.message,
                codigoError: error.code || error.$metadata?.httpStatusCode
            }),
        };
    }
};

