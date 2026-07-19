const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    
    try {
        const params = {
            TableName: "Examenes-dev",
            // ProjectionExpression optimiza la consulta devolviendo solo las columnas necesarias
            ProjectionExpression: "idExamen, textoExamen" 
        };

        // Realiza el escaneo completo de la tabla
        const resultado = await docClient.send(new ScanCommand(params));

        // Retorna la lista de exámenes encontrados
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify(resultado.Items || []),
        };

    } catch (error) {
        console.error("Error al listar exámenes:", error);
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ 
                error: "Error interno al obtener los exámenes.",
                mensajeError: error.message
            }),
        };
    }
};

