import {
  PayloadAction,
  createSlice,
  nanoid,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { EPlayerType, IAppState, MODALS } from "types/App";
import { TLocation, TUser } from "types/User";
import { TZone } from "types/Zone";
import AuthController from "api/controllers/authController";

const initialState: IAppState = {
  ready: false,
  modal: null,
  user: undefined,
  loggedIn: false,
  playerType: undefined,
  authLoading: false,
  game: {
    id: "",
    foxId: "",
    players: [],
    zoneId: "",
    code: "",
    time: 120000,
  },
};

export const logInUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string, password: string },
    { rejectWithValue, dispatch }) => {
    const res = await new AuthController().login(username, password);
    if (!res || (res && !res.ok)) {
      rejectWithValue(res?.error)
      return
    }
    console.log("SIGNED IN")
    // Save Token
    localStorage.setItem('__fat_token__', res.data.token)
    // Run Me to get User
    dispatch(me())
    // Return userId
    return res.data.userId
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (params: { username: string, password: string, firstname: string, lastname: string, email: string },
    { rejectWithValue, dispatch }) => {
    const res = await new AuthController().register(params);
    if (!res || (res && !res.ok)) {
      rejectWithValue(res?.error)
      return
    }
    console.log("REGISTERED")
    // Save Token
    localStorage.setItem('__fat_token__', res.data.token)
    // Return userId
    return res.data
  }
)

export const me = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    const res = await new AuthController().me()
    if (!res.ok) {
      rejectWithValue(res.error)
      return
    }
    return res.data
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    // Remove token
    localStorage.removeItem('__fat_token__')
  }
)

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
// export const loadGame = createAsyncThunk(
//   "app/loadGame",
//   async ({ id, joining }: { id: number; joining?: boolean }) => {
//     const api = new API();
//     const game =
//     // joining
//     //   ? await api.games.getOneFromCode(id)
//     //   :
//       await api.games.getOne(id);
//     return game;
//   }
// );
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
// export const addZone = createAsyncThunk(
//   'app/createZone',
//   async (zone: TZone, { dispatch }) => {
//     const api = new API()
//     try {
//       await api.zones.create(zone)
//       dispatch(enqueueSnack('Zone ajoutee', { variant: 'success' }))
//     } catch {
//       dispatch(enqueueSnack('Erreur lors de l\'ajout de la zone', { variant: 'error' }))
//     }
//   }
// )

function resetError(state: IAppState) {
  if (state.error)
    state.error = ''
}

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
    userLoggedIn(state) {
      state.loggedIn = true;
    },
    userLoggedOut(state) {
      state.loggedIn = false;
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
    // LOGIN
    builder.addCase(logInUser.pending, (state) => {
      resetError(state);
      state.authLoading = true
    })
    builder.addCase(logInUser.fulfilled, (state) => {
      resetError(state);
      state.authLoading = false
      state.loggedIn = true;
    })
    builder.addCase(logInUser.rejected, (state, action) => {
      state.authLoading = false
      state.loggedIn = false
      state.error = action.error.message
    })
    // ME
    builder.addCase(me.pending, (state) => {
      resetError(state);
      state.authLoading = true
    })
    builder.addCase(me.fulfilled, (state, action) => {
      state.authLoading = false
      resetError(state);
      state.loggedIn = true;
      state.user = action.payload;
    })
    builder.addCase(me.rejected, (state, action) => {
      state.authLoading = false
      state.error = action.error.message
    })
    // LOGOUT
    builder.addCase(logout.pending, (state) => {
      state.authLoading = true
      resetError(state);
    })
    builder.addCase(logout.fulfilled, (state) => {
      resetError(state);
      state.authLoading = false
      state.loggedIn = false;
      state.user = undefined;
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.authLoading = false
      state.error = action.error.message
    })
    // REGISTER
    builder.addCase(registerUser.pending, (state) => {
      resetError(state);
      state.authLoading = true
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      resetError(state);
      state.loggedIn = true;
      state.authLoading = false
      if (!action.payload) return
      state.user = action.payload.user
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.authLoading = false
      state.error = action.error.message
    })
  },
});

export const {
  appReady,
  appOpenModal,
  appCloseModal,
  userLoggedIn,
  userLoggedOut,
  updatePlayerType,
  updateFoxId,
  updateZoneId,
  localAddPlayerToGame,
} = appSlice.actions;

export default appSlice.reducer;

export const selectUserId = (state: RootState) => state.app.user?._id;
export const selectUserLoggedIn = (state: RootState) => state.app.loggedIn;
export const selectModal = (state: RootState) => state.app.modal;
export const selectUser = (state: RootState) => state.app.user;
export const selectAppReady = (state: RootState) => state.app.ready;
export const selectPlayerType = (state: RootState) => state.app.playerType;
export const selectGame = (state: RootState) => state.app.game;
export const selectFoxId = (state: RootState) => state.app.game?.foxId;
export const selectAuthLoading = (state: RootState) => state.app.authLoading;
// export const selectFoxPos = (state: RootState) => state.app.game?.foxPos;
export const selectGamePlayers = (state: RootState) => state.app.game?.players;
export const selectGameZone = (state: RootState) => state.app.game?.zoneId;
