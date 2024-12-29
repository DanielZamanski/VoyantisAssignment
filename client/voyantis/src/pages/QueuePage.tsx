import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMessageFromQueue } from "../api";

const QueuePage: React.FC = () => {
  const { queueName } = useParams<{ queueName: string }>();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFetchNext = async () => {
    setError(null);
    setIsLoading(true); // Show the loading indicator
    try {
      const response = await fetchMessageFromQueue(queueName!);
      setIsLoading(false); // Hide the loading indicator

      if (response.status === 204) {
        setMessage("No messages available");
      } else {
        setMessage(response.message);
      }
    } catch (err) {
      setIsLoading(false); // Hide the loading indicator
      setError((err as Error).message);
    }
  };

  return (
    <div>
      <h1>Queue: {queueName}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isLoading && <p style={{ color: "green" }}>Loading...</p>}
      {message && !isLoading && <p>Message: {message}</p>}
      <button onClick={handleFetchNext} disabled={isLoading}>
        Read Next
      </button>
    </div>
  );
};

export default QueuePage;
