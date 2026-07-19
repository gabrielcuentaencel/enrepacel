const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    
    try {
        // 1. Validar parámetros de la URL (pathParameters)
        if (!event.pathParameters || !event.pathParameters.idEstudiante || !event.pathParameters.idPregunta) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "Faltan idEstudiante o idPregunta en la URL." }),
            };
        }

        const idEstudianteNum = Number(event.pathParameters.idEstudiante);
        const idPreguntaNum = Number(event.pathParameters.idPregunta);

        if (isNaN(idEstudianteNum) || isNaN(idPreguntaNum)) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "Los identificadores de la URL deben ser números válidos." }),
            };
        }

        // 2. Validar el cuerpo de la petición (POST Body)
        if (!event.body) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "El cuerpo de la petición (body) está vacío." }),
            };
        }

        const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        const { textoRespuesta } = body;

        if (!textoRespuesta) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "El campo 'textoRespuesta' es obligatorio en el JSON." }),
            };
        }

        // 3. Generar idRespuesta numérico único
        const idRespuesta = Date.now();

        // 4. Parámetros para guardar en DynamoDB
        const params = {
            TableName: "RespuestasDeEstudiantes-dev",
            Item: {
                idRespuesta: idRespuesta,        // Clave primaria (N)
                idEstudiante: idEstudianteNum,   // (N)
                idPregunta: idPreguntaNum,       // (N)
                textoRespuesta: textoRespuesta   // (S)
            }
        };

        await docClient.send(new PutCommand(params));

        return {
            statusCode: 201,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({ idRespuesta }),
        };

    } catch (error) {
        console.error("Error al registrar respuesta:", error);
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ error: "Error interno en el servidor.", detalle: error.message }),
        };
    }
};

