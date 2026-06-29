import { useEffect, useState } from "react";
import { getTurmas } from "../services/classroomService";

export function useTurmas() {
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTurmas() {
      try {
        setLoading(true);
        setError(null);

        const data = await getTurmas();

        setTurmas(data || []);
      } catch (err) {
        console.error("Erro ao carregar turmas:", err);
        setError(err);
        setTurmas([]);
      } finally {
        setLoading(false);
      }
    }

    loadTurmas();
  }, []);

  return {
    turmas,
    loading,
    error,
  };
}