import * as React from 'react';

interface IAppProps {
  url?: string;
}

const PlayVideo: React.FC<IAppProps> = (props) => {
  const { url } = props;
  console.log(url, 'url');

  return (
    <div>
      {url && (
        <video style={{ width: ' 100%', height: '100%' }} controls autoPlay src={url}></video>
      )}
    </div>
  );
};

export default PlayVideo;
