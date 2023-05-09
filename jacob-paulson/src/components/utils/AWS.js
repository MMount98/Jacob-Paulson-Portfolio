import React, { useState } from "react";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: `${process.env.REACT_APP_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.REACT_APP_SECERT_ACCESS_KEY}`,
  region: `${process.env.REACT_APP_REGION}`,
});

const AWSPlayer = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBuffer, setAudioBuffer] = useState(null);

  const loadAudio = async () => {
    const s3 = new AWS.S3();
    const response = await s3
      .getObject({ Bucket: "jakesmusicbucket", Key: audioUrl })
      .promise();
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
        <audio
          controls={true}
          src={URL.createObjectURL(
            new Blob([audioBuffer], { type: "audio/mp3" })
          )}
        />
      )}
    </div>
  );
};

export default AWSPlayer;
