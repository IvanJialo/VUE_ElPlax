// Ejemplo en un composable: src/composables/useDatabase.js
import turso from "@/services/tursoClient";

export function useDatabase() {
  const fetchData = async () => {
    try {
      const data = await turso.execute("SELECT * FROM estudiantes");
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return { fetchData };
}