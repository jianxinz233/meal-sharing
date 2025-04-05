"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function MealList() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch(api("/meals"));
        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        const data = await response.json();
        setMeals(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchMeals();
  }, []);
  if (loading) {
    return <p>Loading meals...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (meals.length === 0) {
    return <p>No meals found</p>;
  }
  return (
    <div>
      <h1>Meals</h1>
      <ul>
        {meals.map((meal) => (
          <li key={meal.id}>
            <h2>{meal.title}</h2>
            <p>Date: {new Date(meal.when).toLocaleString()}</p>
            <p>Location: {meal.location}</p>
            <p>Price: {meal.price}</p>
            <p>Max Reservations: {meal.max_reservations}</p>
            <p>Description: {meal.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
