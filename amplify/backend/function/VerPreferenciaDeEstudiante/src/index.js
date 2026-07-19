const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {
        if (!event.pathParameters || !event.pathParameters.idPreferenciaEstudiante) {
            return { statusCode: 400, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ error: "Falta idPreferenciaEstudiante en la URL." }) };
        }

        const idPreferenciaEstudianteNum = Number(event.pathParameters.idPreferenciaEstudiante);
        if (isNaN(idPreferenciaEstudianteNum)) {
            return { statusCode: 400, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ error: "El parámetro idPreferenciaEstudiante debe ser un número." }) };
        }

        const params = {
            TableName: "PreferenciaDelEstudiante-dev",
            Key: {
                idPreferenciaEstudiante: idPreferenciaEstudianteNum
            },
            ProjectionExpression: "idRespuestaEvaluada, textoComentario"
        };

        const resultado = await docClient.send(new GetCommand(params));

        if (!resultado.Item) {
            return {
                statusCode: 404,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "Preferencia del estudiante no encontrada." })
            };
        }

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*" },
            body: JSON.stringify(resultado.Item)
        };
    } catch (error) {
        return { statusCode: 500, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ error: error.message }) };
    }
};

