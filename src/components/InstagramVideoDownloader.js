import React, { useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

const InstagramVideoDownloader = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async (event) => {
    event.preventDefault();
    setIsCopied(false);
    setError("");

    try {
      const response = await axios.get(
        `https://api.instagram.com/oembed?url=${videoUrl}`
      );

      const videoUrl = response.data.thumbnail_url.replace(
        "s150x150",
        "s1080x1080"
      );

      setVideoUrl(videoUrl);
    } catch (error) {
      setError("Error downloading video. Please check the URL.");
    }
  };

  const handleCopy = () => {
    setIsCopied(true);
  };

  return (
    <div>
      <h1>Instagram Video Downloader</h1>
      <form onSubmit={handleDownload}>
        <input
          type="text"
          value={videoUrl}
          onChange={(event) => setVideoUrl(event.target.value)}
          placeholder="Enter Instagram video URL"
        />
        <button type="submit">Download</button>
      </form>
      {videoUrl && (
        <div>
          <video src={videoUrl} controls width="500" height="auto" />
          <CopyToClipboard text={videoUrl} onCopy={handleCopy}>
            <button>{isCopied ? "Copied!" : "Copy URL"}</button>
          </CopyToClipboard>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default InstagramVideoDownloader;
