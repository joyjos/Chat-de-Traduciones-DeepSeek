// Importar dependencias
import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

// Cargar configuración API Key
dotenv.config();

// Cargar Express
const app = express();
const PORT = process.env.PORT || 3000;

// Servir FrontEnd
app.use("/", express.static("public"));

// Middleware para procesar JSON (convierto JSON a un Objeto de JavaScript)
app.use(express.json());

// Instancia de OpenAI y pasarle el API Key
const openai = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: process.env.DEEPSEEK_API_KEY
});

console.log("API KEY:", process.env.DEEPSEEK_API_KEY);
console.log("***BASE URL***", openai.baseURL);

// Ruta/endpoint/url
app.post("/api/traducir", async(req, res) => {
    // Funcionalidad de traducir con IA
    const {text, targetLang} = req.body;

    const promptSystem1 = "Eres un traductor profesional";
    const promptSystem2 = "Solo puedes responder con una traducción directa del texto que el usuario te envíe"
                            + "Cualquier otra respuesta o conversación está prohibida";
    const promptUser =`Traduce el siguiente texto al ${targetLang}: ${text}`
    // Llamar al LLM o modelo de OpenAI

    try {
        const completion = await openai.chat.completions.create({
            model: "deepseek-chat",
            messages: [
                {role: "system", content: promptSystem1},
                {role: "system", content: promptSystem2},
                {role: "user", content: promptUser}
            ],
            max_tokens: 500,
            response_format: {type: "text"}
        });

        const translatedText = completion.choices[0].message.content;

        return res.status(200).json({translatedText});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Error al traducir"});
    }

    /* return res.status(200).json({
        message: "Hola qué tal, soy una ruta en Node",
        content: req.body
    }); */
})

// Servir el BackEnd
app.listen(PORT, () =>  {
    console.log("Servidor corriendo correctamente en http://localhost:" + PORT);
});