const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {
        // 1. Validar parámetros obligatorios de la URL (pathParameters)
        if (!event.pathParameters || !event.pathParameters.idRespuesta || !event.pathParameters.idEvaluador || !event.pathParameters.idCalificacionEnRubricas) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "Faltan parámetros identificadores (idRespuesta, idEvaluador o idCalificacionEnRubricas) en la URL." })
            };
        }

        const idRespuestaNum = Number(event.pathParameters.idRespuesta);
        const idEvaluadorNum = Number(event.pathParameters.idEvaluador);
        const idCalificacionEnRubricasNum = Number(event.pathParameters.idCalificacionEnRubricas);

        if (isNaN(idRespuestaNum) || isNaN(idEvaluadorNum) || isNaN(idCalificacionEnRubricasNum)) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "Los identificadores enviados en la URL deben ser valores numéricos válidos." })
            };
        }

        // 2. Validar el cuerpo de la petición POST (textoFeedback)
        if (!event.body) {
            return { 
                statusCode: 400, 
                headers: { "Access-Control-Allow-Origin": "*" }, 
                body: JSON.stringify({ error: "El cuerpo de la petición (body) está vacío." }) 
            };
        }

        const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        const { textoFeedback } = body;

        if (!textoFeedback) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "El campo 'textoFeedback' es obligatorio dentro del JSON del cuerpo." })
            };
        }

        // 3. Generar idRespuestaEvaluada único
        const idRespuestaEvaluada = Date.now();

        const params = {
            TableName: "RespuestasEvaluadas-dev",
            Item: {
                idRespuestaEvaluada,                        // Clave primaria (N)
                idRespuesta: idRespuestaNum,                // (N)
                idEvaluador: idEvaluadorNum,                // (N)
                idCalificacionEnRubricas: idCalificacionEnRubricasNum, // (N)
                textoFeedback                               // (S)
            }
        };

        // 4. Guardar en DynamoDB
        await docClient.send(new PutCommand(params));
        
        return {
            statusCode: 201,
            headers: { 
                "Access-Control-Allow-Origin": "*", 
                "Access-Control-Allow-Headers": "*" 
            },
            body: JSON.stringify({ idRespuestaEvaluada })
        };
    } catch (error) {
        console.error("Error al evaluar pregunta:", error);
        return { 
            statusCode: 500, 
            headers: { "Access-Control-Allow-Origin": "*" }, 
            body: JSON.stringify({ error: "Error interno en el servidor.", detalle: error.message }) 
        };
    }
};

