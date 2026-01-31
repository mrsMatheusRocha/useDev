import { useState } from "react";

interface UseFetchOptions {
  url: string;
  method: "GET" | "PUT" | "POST" | "DELETE" | "PATCH";
  body?: unknown;
}

interface UseFetchResult<T> {
  data: T | null;
  error: Error | null;
  status: number | null;
  fetchData: () => Promise<void>;
}

export const useFetch = <T>(options: UseFetchOptions): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(options.url, {
        method: options.method || "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });
      setStatus(response.status);
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error as Error);
    }
  };

  return { data, error, status, fetchData };
};
