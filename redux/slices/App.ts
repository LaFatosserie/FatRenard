import {
  PayloadAction,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import API from "../../api/fatapi";
import { RootState } from "redux/store";
import { EPlayerType, IAppState, MODALS } from "types/App";
import { TLocation, TUser } from "types/User";
import { TZone } from "types/Zone";

const initialState: IAppState = {
  ready: false,
  modal: null,
  user: undefined,
  loggedIn: false,
  playerType: undefined,
  game: {
    id: "",
    foxId: "",
    players: [],
    zoneId: "",
    code: "",
    time: 120000,
  },
};

// export const createGame = createAsyncThunk(
//   "app/newGame",
//   async (
//     {
//       zoneId,
//       username,
//       userId,
//       time,
//     }: { zoneId: string; username: string; userId: string; time: number },
//     { dispatch }
//   ) => {
//     const api = new API();
//     const gameId = await api.games.create(zoneId, username, time, userId);
//     dispatch(loadGame({ id: gameId }));
//     return gameId;
//   }
// );
export const signInWithToken = createAsyncThunk(
  'app/signInWithToken',
  async (token: string, { rejectWithValue }) => {
    const api = new API()
    let user;
    try {
      user = await api.users.getByToken(token)
      localStorage.setItem('__fat_token__', token)
    } catch (e: any) {
      rejectWithValue(e)
    }
    return user?.data
  }
)
export const loadGame = createAsyncThunk(
  "app/loadGame",
  async ({ id, joining }: { id: number; joining?: boolean }) => {
    const api = new API();
    const game =
    // joining
    //   ? await api.games.getOneFromCode(id)
    //   :
      await api.games.getOne(id);
    return game;
  }
);
// export const addPlayerToGame = createAsyncThunk(
//   "app/addPlayerToGame",
//   async (
//     { gameId, playerId }: { gameId: string; playerId: string },
//     { rejectWithValue, dispatch }
//   ) => {
//     const api = new API();
//     const r = await api.games.addPlayerToGame(gameId, playerId);
//     if (r) {
//       dispatch(enqueueSnack(r, { variant: "error" }));
//       rejectWithValue(r);
//     }
//     return playerId;
//   }
// );
export const addZone = createAsyncThunk(
  'app/createZone',
  async (zone: TZone) => {
    const api = new API()
    await api.zones.create(zone)
  }
)

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    appReady(state) {
      state.ready = true;
    },
    appOpenModal(state, action: PayloadAction<{ name: MODALS; params: any }>) {
      state.modal = action.payload;
    },
    appCloseModal(state) {
      state.modal = null;
    },
    updatePlayerType(state, action: PayloadAction<EPlayerType>) {
      state.playerType = action.payload;
    },
    updateUser(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
      state.loggedIn = true;
    },
    userLoggedIn(state) {
      state.loggedIn = true;
    },
    userLoggedOut(state) {
      localStorage.removeItem('__fat_token__')
      state.loggedIn = false;
      state.user = undefined;
    },
    updateZoneId(state, action: PayloadAction<string>) {
      if (state.game) state.game.zoneId = action.payload;
    },
    updateFoxId(state, action: PayloadAction<string>) {
      if (state.game) state.game.foxId = action.payload;
    },
    // updateFoxPos(state, action: PayloadAction<TLocation>) {
    //   if (state.game) state.game.foxPos = action.payload;
    // },
    localAddPlayerToGame(state, action: PayloadAction<string[]>) {
      const toAdd: string[] = [];
      action.payload.forEach((p) => {
        if (!state.game.players.includes(p)) toAdd.push(p);
      });
      state.game.players = [...state.game.players, ...toAdd];
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(createGame.fulfilled, (state, action) => {
    //   state.game.id = action.payload;
    // });
    // builder.addCase(loadGame.fulfilled, (state, action) => {
    //   state.game = action.payload;
    // });
    // builder.addCase(addPlayerToGame.fulfilled, (state, action) => {
    //   if (!state.game.players.includes(action.payload))
    //     state.game.players = [...state.game.players, action.payload];
    // });
    builder.addCase(signInWithToken.fulfilled, (state, action) => {
      state.user = action.payload
      state.loggedIn = true
      state.modal = null
    })
  },
});

export const {
  appReady,
  appOpenModal,
  appCloseModal,
  updateUser,
  userLoggedIn,
  userLoggedOut,
  updatePlayerType,
  updateFoxId,
  // updateFoxPos,
  updateZoneId,
  localAddPlayerToGame,
} = appSlice.actions;

export default appSlice.reducer;

export const selectUserId = (state: RootState) => state.app.user?.id;
export const selectUserLoggedIn = (state: RootState) => state.app.loggedIn;
export const selectModal = (state: RootState) => state.app.modal;
export const selectUser = (state: RootState) => state.app.user;
export const selectAppReady = (state: RootState) => state.app.ready;
export const selectPlayerType = (state: RootState) => state.app.playerType;
export const selectGame = (state: RootState) => state.app.game;
export const selectFoxId = (state: RootState) => state.app.game?.foxId;
// export const selectFoxPos = (state: RootState) => state.app.game?.foxPos;
export const selectGamePlayers = (state: RootState) => state.app.game?.players;
export const selectGameZone = (state: RootState) => state.app.game?.zoneId;
