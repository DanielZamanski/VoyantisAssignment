import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMessageFromQueue } from "../api";

const QueuePage: React.FC = () => {
  const { queueName } = useParams<{ queueName: string }>();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchNext = async () => {
    try {
      setError(null);
      const response = await fetchMessageFromQueue(queueName!);
      if (response.status === 204) {
        setMessage("No messages available");
      } else {
        setMessage(response.message);
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div>
      <h1>Queue: {queueName}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p>Message: {message}</p>}
      <button onClick={handleFetchNext}>Read Next</button>
    </div>
  );
};

export default QueuePage;
