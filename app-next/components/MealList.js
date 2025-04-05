"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import styles from "./MealList.module.css";

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
    <div className={styles.mealList}>
      <h1 className={styles.heading}>Meals</h1>
      <ul>
        {meals.map((meal) => (
          <li key={meal.id} className={styles.mealItem}>
            <h2 className={styles.mealTitle}>{meal.title}</h2>
            <p className={styles.mealInfo}>
              Date: {new Date(meal.when).toLocaleString()}
            </p>
            <p className={styles.mealInfo}>Location: {meal.location}</p>
            <p className={styles.mealInfo}>Price: {meal.price}</p>
            <p className={styles.mealInfo}>
              Max Reservations: {meal.max_reservations}
            </p>
            <p className={styles.mealInfo}>Description: {meal.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
