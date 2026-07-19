const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    
    try {
        if (!event.pathParameters || !event.pathParameters.idExamen || !event.pathParameters.textoPregunta) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "Faltan parámetros obligatorios en la URL." }),
            };
        }

        // Convertimos idExamen a número de forma estricta
        const idExamenNum = Number(event.pathParameters.idExamen);
        const textoPregunta = decodeURIComponent(event.pathParameters.textoPregunta);

        if (isNaN(idExamenNum)) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "El idExamen debe ser un número válido." }),
            };
        }

        // Generamos valores numéricos para cumplir con el esquema NoSQL creado
        const idPregunta = Date.now();
        const nroPreguntaStr = `P-${idPregunta}`; // nroPregunta fue creado como String en tu CLI

        const params = {
            TableName: "PreguntasDelExamen-dev",
            Item: {
                idPregunta: idPregunta,         // Tipo número (N)
                idExamen: idExamenNum,          // Tipo número (N)
                nroPregunta: nroPreguntaStr,    // Tipo string (S)
                textoPregunta: textoPregunta    // Tipo string (S)
            }
        };

        await docClient.send(new PutCommand(params));

        return {
            statusCode: 201,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({ idPregunta, idExamen: idExamenNum }),
        };

    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ error: "Error interno al agregar la pregunta.", detalle: error.message }),
        };
    }
};

