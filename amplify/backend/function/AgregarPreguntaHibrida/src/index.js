const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    
    try {
        // 1. Validar idExamen proveniente de la URL
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
                body: JSON.stringify({ error: "El idExamen en la URL debe ser un número válido." }),
            };
        }

        // 2. Validar textoPregunta proveniente del cuerpo (POST Body)
        if (!event.body) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "El cuerpo de la petición (body) está vacío." }),
            };
        }

        const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        const { textoPregunta } = body;

        if (!textoPregunta) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "El campo 'textoPregunta' es obligatorio dentro del cuerpo JSON." }),
            };
        }

        // 3. Estructurar claves numéricas únicas para DynamoDB
        const idPregunta = Date.now();
        const nroPreguntaStr = `P-${idPregunta}`;

        const params = {
            TableName: "PreguntasDelExamen-dev",
            Item: {
                idPregunta: idPregunta,
                idExamen: idExamenNum,
                nroPregunta: nroPreguntaStr,
                textoPregunta: textoPregunta // Admite texto largo sin problemas
            }
        };

        // 4. Insertar registro
        await docClient.send(new PutCommand(params));

        return {
            statusCode: 201,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({ 
                mensaje: "Pregunta insertada con éxito mediante canal híbrido.",
                idPregunta, 
                idExamen: idExamenNum 
            }),
        };

    } catch (error) {
        console.error("Error en Lambda híbrida:", error);
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ error: "Error interno en el servidor.", detalle: error.message }),
        };
    }
};

