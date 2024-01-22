import { createSlice } from "@reduxjs/toolkit";

interface score {
  id: number;
  avatar: string;
  rank: number;
  score: number;
  name: string;
}

const ScoreState: score[] = [];

export const scorePlay = createSlice({
  name: "scoreplay",
  initialState: ScoreState,
  reducers: {
    SCORE_PLAY: (state, action) => {
      const payload = action.payload;

      state.unshift(payload);
    },
    RESET_SCORE: (state, _) => {
      state = ScoreState;
    },
  },
});

export const { SCORE_PLAY, RESET_SCORE } = scorePlay.actions;

export const ScorePlayReducer = scorePlay.reducer;
