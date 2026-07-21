import {
  useCallback,
  useEffect,
  useState
} from "react";

import {
  getClasses
} from "../services/classService";

import {
  useRole
} from "./useRole";

export function useClasses() {

  const { role } = useRole();

  const [classes, setClasses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const carregarClasses = useCallback(async () => {

    if (!role) {
      setClasses([]);
      setLoading(false);
      return;
    }

    try {

      setLoading(true);
      setError(null);

      const data = await getClasses(role);

      setClasses(data ?? []);

    } catch (err) {

      console.error("Erro ao carregar turmas:", err);

      setError(err);

      setClasses([]);

    } finally {

      setLoading(false);

    }

  }, [role]);

  useEffect(() => {

    carregarClasses();

  }, [carregarClasses]);

  return {

    classes,

    loading,

    error,

    carregarClasses

  };

}