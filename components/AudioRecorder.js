// ✅ AudioRecorder.js
import { useState, useRef } from 'react';

export default function AudioRecorder({ onTranscription }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorderRef.current.ondataavailable = event => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
        console.log('🎧 Blob duration (approx):', blob.size, 'bytes');

        if (blob.size < 1000) {
          console.warn('⚠️ El audio grabado está vacío o demasiado corto.');
          alert('La grabación fue demasiado corta o falló. Intenta nuevamente.');
          return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Audio = reader.result.split(',')[1];
          console.log('📤 Enviando audio base64:', base64Audio.slice(0, 50), '...');
          const result = await onTranscription(base64Audio);
          console.log('✅ Transcription result:', result);
        };
        reader.readAsDataURL(blob);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error('❌ Error al acceder al micrófono:', err);
      alert('No se pudo acceder al micrófono. Revisa los permisos del navegador.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={recording ? stopRecording : startRecording}
      >
        {recording ? '🛑 Detener grabación' : '🎙️ Comenzar grabación'}
      </button>
    </div>
  );
}





