import React from "react";
import QueueItem from "./QueueItem";

interface QueueListProps {
  queues: Array<{ name: string; length: number }>;
}

const QueueList: React.FC<QueueListProps> = ({ queues }) => (
  <div>
    {queues.map((queue) => (
      <QueueItem key={queue.name} name={queue.name} length={queue.length} />
    ))}
  </div>
);

export default QueueList;
