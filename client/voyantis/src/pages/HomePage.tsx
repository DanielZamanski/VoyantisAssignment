import React, { useEffect, useState } from "react";
import { fetchAllQueues } from "../api";
import QueueList from "../components/QueueList";

const HomePage: React.FC = () => {
  const [queues, setQueues] = useState<Array<{ name: string; length: number }>>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getQueues = async () => {
      try {
        const data = await fetchAllQueues();
        console.log(data);
        setQueues(data.map(([name, length]) => ({ name, length })));
      } catch (err) {
        setError((err as Error).message);
      }
    };
    getQueues();
  }, []);

  return (
    <div>
      <h1>Message Queues</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <QueueList queues={queues} />
    </div>
  );
};

export default HomePage;
