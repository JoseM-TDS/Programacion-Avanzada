import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { fetchHabits } from "./habitAPI";

type Habit = {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    days: number;
    lastDone: Date;
    lastUpdate: Date;
    startedAt: Date;
}

type HabitState = {
    habits: Habit[];
    status: Record<string, "idle" | "loading" | "success" | "failed">;
    error: Record<string, string | null>;
}

const initialState: HabitState = {
    habits: [],
    status: {},
    error: {}
}

export const fetchHabitsThunk = createAsyncThunk('habits/fetchHabits', async () => {
    const response = await fetchHabits();
    const responseJson = await response.json();
    return responseJson;
})

export const markAsDoneThunk = createAsyncThunk('habits/markAsDone', async (habitId: string, {rejectWithValue}) => {
    const response = await fetch(`http://localhost:3001/habits/markasdone/${habitId}`, {
        method: "POST",
    });
    const responseJson = await response.json();
    if (!response.ok) {
        return rejectWithValue("Habito no se ha marcado como completado");
    }else if (responseJson.message.toString() === "Habito se ha reiniciado") {
        return rejectWithValue(responseJson.message);
    }else {
        return responseJson.message;
    }
});

const habitSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        addHabits: (state, action) => {
            state.habits = action.payload;
        },
        addHabit: (state, action) => {
            state.habits.push(action.payload);
        },
        removeHabit: (state, action) => {
            state.habits = state.habits.filter(habit => habit._id !== action.payload);
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchHabitsThunk.fulfilled, (state, action) => {
            state.habits = action.payload;
        }).addCase(markAsDoneThunk.fulfilled, (state, action) => {
            state.status[action.meta.arg] = "success";
            state.error[action.meta.arg] = null;
        }).addCase(markAsDoneThunk.rejected, (state, action) => {
            state.status[action.meta.arg] = "failed";
            state.error[action.meta.arg] = action.payload as string;
        })
    }
});

export const { addHabits } = habitSlice.actions;
export default habitSlice.reducer;