import React, { useState } from "react";
import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: 'AKIAYCU2B3CRZY4A45M7',
    secretAccessKey: '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',
    region: 'us-east-2'
  });

const AWSPlayer = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBuffer, setAudioBuffer] = useState(null);

  const loadAudio = async () => {
    const s3 = new AWS.S3();
    const response = await s3.getObject({ Bucket: "jakesmusicbucket", Key: audioUrl }).promise();
    const blob = new Blob([response.Body], { type: "audio/mp3" });
    const buffer = await blob.arrayBuffer();
    setAudioBuffer(buffer);
  };

  const togglePlay = () => {
    if (!audioBuffer) {
      loadAudio();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
      {audioBuffer && (
        <audio controls={true} src={URL.createObjectURL(new Blob([audioBuffer], { type: "audio/mp3" }))} />
      )}
    </div>
  );
};

export default AWSPlayer;
