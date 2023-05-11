import React, { useState } from 'react';
import axios from 'axios';

function DownloadPage() {
  const [url, setUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await axios.get(`https://api.instagram.com/oembed?url=`);
    setVideoUrl(result.data.thumbnail_url.split('/')[4]);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Instagram Video URL:
          <input type="text" value={url} onChange={handleUrlChange} />
        </label>
        <button type="submit">Download</button>
      </form>
      {videoUrl && (
        <a href={`https://www.instagram.com/p//?__a=1`} download>Download Video</a>
      )}
    </div>
  );
}

export default DownloadPage;