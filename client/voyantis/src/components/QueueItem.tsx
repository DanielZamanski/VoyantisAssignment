import React from "react";
import { useNavigate } from "react-router-dom";

interface QueueItemProps {
  name: string;
  length: number;
}

const QueueItem: React.FC<QueueItemProps> = ({ name, length }) => {
  const navigate = useNavigate();

  const handleGoClick = () => {
    navigate(`/queue/${name}`);
  };

  return (
    <div style={{ marginBottom: "1em" }}>
      <p>
        Queue: {name} | Messages: {length}
      </p>
      <button onClick={handleGoClick}>Go</button>
    </div>
  );
};

export default QueueItem;
