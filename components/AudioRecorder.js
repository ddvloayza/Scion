// ✅ AudioRecorder.js
import { useState, useRef } from 'react';

export default function AudioRecorder({ onTranscription }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorderRef.current.ondataavailable = event => {
      audioChunks.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(',')[1];
        const result = await onTranscription(base64Audio);
        console.log('✅ Transcription result:', result);
      };
      reader.readAsDataURL(blob);
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
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





