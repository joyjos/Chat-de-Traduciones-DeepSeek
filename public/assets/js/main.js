let translateButton = document.querySelector("#translateButton");

translateButton.addEventListener("click", async() => {

    let inputText = document.querySelector("#inputText");

    // Valor a traducir
    const text = inputText.value.trim();

    // Lenguaje de destino
    const targetLang = document.querySelector("#targetLang").value;

    if(!text) return false;

    // Meter el mensaje del usuario a la caja de mensajes
    const userMesagge = document.createElement("div");
    userMesagge.className = "chat__message chat__message--user";
    userMesagge.textContent = text;

    const messagesContainer = document.querySelector(".chat__messages");
    messagesContainer.appendChild(userMesagge);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Petición Ajax al BackEnd
    try {
        const response = await fetch("/api/traducir", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                text,
                targetLang
            })
        });

        const data = await response.json();

        //alert(data.translatedText);

        // Agregar el mensaje de la IA al chat
        const botMessage = document.createElement("div");
        botMessage.className = "chat__message chat__message--bot";
        botMessage.textContent = data.translatedText;

        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

    } catch (error) {
        console.log("Error:", error);
    }

    // Agregar el mensaje de la IA al chat


    // Vaciar el input de tipo text
    inputText.value = "";
})