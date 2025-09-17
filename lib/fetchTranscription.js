export async function fetchTranscription(audioBase64, fileName = "audio.webm") {
  const endpoint = "https://bldbhm2vjl.execute-api.us-east-1.amazonaws.com/dev/transcribe"; // Ruta correcta

  if (!audioBase64 || typeof audioBase64 !== "string") {
    console.error("❌ audioBase64 está vacío o no es válido.");
    return {
      success: false,
      error: "Audio inválido o vacío.",
    };
  }

  try {
    console.log("📤 Enviando audio base64 a Lambda (primeros 50 caracteres):", audioBase64.slice(0, 50));

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        audioBase64,
        fileName,
      }),
    });

    if (!response.ok) {
      console.error("❌ Error HTTP:", response.status);
      const errorText = await response.text();
      console.error("🔍 Respuesta de error:", errorText);
      throw new Error(`Error de red: ${errorText}`);
    }

    const data = await response.json();

    return {
      success: true,
      transcript: data.transcript || data.text || "",
      item: data.item || "",
      precio_compra: data.precio_compra || "",
      moneda: data.moneda || "",
      cliente: data.cliente || "",
    };
  } catch (error) {
    console.error("❌ Error al transcribir:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}