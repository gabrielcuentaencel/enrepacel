const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {
        if (!event.pathParameters || !event.pathParameters.idRespuestaEvaluada) {
            return { statusCode: 400, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ error: "Falta idRespuestaEvaluada en la URL." }) };
        }

        const idRespuestaEvaluadaNum = Number(event.pathParameters.idRespuestaEvaluada);
        if (isNaN(idRespuestaEvaluadaNum)) {
            return { statusCode: 400, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ error: "El idRespuestaEvaluada debe ser un número válido." }) };
        }

        if (!event.body) {
            return { statusCode: 400, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ error: "El cuerpo de la petición está vacío." }) };
        }

        const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        const { textoComentario } = body;

        if (!textoComentario) {
            return { statusCode: 400, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ error: "El campo 'textoComentario' es obligatorio." }) };
        }

        const idPreferenciaEstudiante = Date.now();

        const params = {
            TableName: "PreferenciaDelEstudiante-dev",
            Item: {
                idPreferenciaEstudiante,
                idRespuestaEvaluada: idRespuestaEvaluadaNum,
                textoComentario
            }
        };

        await docClient.send(new PutCommand(params));
        return {
            statusCode: 201,
            headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*" },
            body: JSON.stringify({ idPreferenciaEstudiante })
        };
    } catch (error) {
        return { statusCode: 500, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ error: error.message }) };
    }
};

