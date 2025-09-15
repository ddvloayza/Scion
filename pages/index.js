// ✅ pages/index.js
import { useState } from 'react';
import AudioRecorder from '../components/AudioRecorder';
import TranscriptionResult from '../components/TranscriptionResult';
import { fetchTranscription } from '../lib/fetchTranscription';

export default function Home() {
  const [result, setResult] = useState(null);

  const handleTranscription = async (audioBase64) => {
    const data = await fetchTranscription(audioBase64);
    setResult(data);
    return data;
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🗣️ Transcribe tu audio</h1>
      <AudioRecorder onTranscription={handleTranscription} />
      <TranscriptionResult transcript={result?.transcript} data={result || {}} />
    </div>
  );
}