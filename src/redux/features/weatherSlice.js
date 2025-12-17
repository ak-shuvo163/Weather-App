import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  weatherData: [],
  loading: false,
  error: null,
}

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (cityName, {rejectWithValue}) => {
    try {
      const apikey = "0a9712b7529bdb7e220ff68357d5fc7e";
      const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apikey}`
    );
    const data = await response.json();
    if(data.cod !== 200){
      return rejectWithValue(data.message || 'City not found')
    }
    return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearWeatherData: (state) => {
      state.weatherData = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData.push(action.payload);
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { clearWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
