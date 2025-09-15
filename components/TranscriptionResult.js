
// ✅ TranscriptionResult.js
export default function TranscriptionResult({ transcript, data }) {
  if (!transcript) return null;
  return (
    <div className="mt-4 p-4 bg-gray-50 border rounded">
      <h2 className="text-lg font-semibold">📝 Transcripción</h2>
      <p className="italic mb-2">"{transcript}"</p>
      <ul className="list-disc pl-5">
        <li><strong>Item:</strong> {data.item}</li>
        <li><strong>Precio:</strong> {data.precio_compra} {data.moneda}</li>
        <li><strong>Cliente:</strong> {data.cliente}</li>
      </ul>
    </div>
  );
}

