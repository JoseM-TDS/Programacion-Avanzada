export const fetchHabits = async () => {
    const response = await fetch("https://localhost:3000/habits");
    if(!response.ok) {
        throw new Error("Failed to fetch habits");
    }
    return response;
}