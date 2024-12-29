export const fetchAllQueues = async (): Promise<Array<{ name: string; length: number }>> => {
    const response = await fetch('http://localhost:8000/api/all_queues/fetchall');
    if (!response.ok) {
        throw new Error(`Error fetching queues: ${response.statusText}`);
    }
    return await response.json();
};

export const fetchMessageFromQueue = async (queueName: string, ms: number = 10): Promise<{ status: number; message: string }> => {
    const response = await fetch(`http://localhost:8000/api/${queueName}?ms=${ms}`);
    if (!response.ok) {
        throw new Error(`Error fetching message: ${response.statusText}`);
    }
    return await response.json();
};