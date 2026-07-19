const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    
    try {
        // 1. Validar el cuerpo de la petición POST
        if (!event.body) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "El cuerpo de la petición (body) está vacío." }),
            };
        }

        const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        const { nombreEvaluador, tipoEvaluador } = body;

        if (!nombreEvaluador || !tipoEvaluador) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "Los campos 'nombreEvaluador' y 'tipoEvaluador' son obligatorios en el JSON." }),
            };
        }

        // 2. Generar el idEvaluador numérico único
        const idEvaluador = Date.now();

        const params = {
            TableName: "Evaluadores-dev",
            Item: {
                idEvaluador: idEvaluador, // Tipo número (N)
                nombreEvaluador: nombreEvaluador,
                tipoEvaluador: tipoEvaluador
            }
        };

        // 3. Guardar en la base de datos
        await docClient.send(new PutCommand(params));

        return {
            statusCode: 201,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({ 
                mensaje: "Evaluador creado con éxito.",
                idEvaluador 
            }),
        };

    } catch (error) {
        console.error("Error al crear evaluador:", error);
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ error: "Error interno al procesar la solicitud.", detalle: error.message }),
        };
    }
};

