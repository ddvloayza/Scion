export async function fetchTranscription(audioBase64, fileName = "audio.webm") {
  const endpoint = "https://nzjsfinls5.execute-api.us-east-1.amazonaws.com/dev/transcribe"; // Ruta correcta

  try {
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