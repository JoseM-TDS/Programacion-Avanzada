type Habits = {
    title: string;
    description: string;
}

type HabitsProps = {
    habits: Habits[];
}

export default function Habits({habits}: HabitsProps){
    return (
        <ul>
            {habits.map((habit) => (
                <li key={habit.title}>{habit.title}</li>
            ))}
        </ul>
    )

}