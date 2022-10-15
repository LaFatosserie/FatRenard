import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import API from "../../api/fatapi";
import { RootState } from "redux/store";
import { EntityState } from "types/App";
import type { TUser } from "types/User";

// Adapter
const peopleAdapter = createEntityAdapter<TUser>({
  selectId: (person) => person.id,
  sortComparer: (a, b) => a.firstname.localeCompare(b.firstname),
});

// Async Thunks
// export const fetchAllPlayers = createAsyncThunk(
//   "people/fetchAllPlayers",
//   async () => {
//     const api = new API();
//     const people = await api.users.getAll();
//     return people;
//   }
// );
// export const fetchPlayer = createAsyncThunk(
//   "people/fetchOnePlayer",
//   async (id: string) => {
//     const api = new API();
//     const person = await api.players.getOne(id);
//     return person;
//   }
// );
// export const addPlayer = createAsyncThunk(
//   "people/addPlayer",
//   async (person: TUser) => {
//     const api = new API();
//     const personId = await api.players.addPlayer(person);
//     person.id = personId;
//     return person;
//   }
// );
// export const removePlayer = createAsyncThunk(
//   "people/removePlayer",
//   async (id: string) => {
//     const api = new API();
//     await api.players.deletePlayer(id);
//     return id;
//   }
// );
// export const updatePosition = createAsyncThunk(
//   'people/updatePlayer',
//   async ({
//     id,
//     location,
//   }: {
//     person: TPlayer
//     firstname: string
//     lastname: string
//     nickname: string
//   }) => {
//     const api = new API()
//     await api.people.updatePlayer(person.id, firstname, lastname, nickname)
//     const changes = {
//       ...person,
//       changes: {
//         firstname,
//         lastname,
//         nickname,
//       },
//     }
//     return changes
//   },
// )

const initialState = peopleAdapter.getInitialState({
  status: "idle",
  error: null,
} as EntityState);

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
//     builder.addCase(fetchAllPlayers.pending, (state) => {
//       state.status = "loading";
//     });
//     builder.addCase(fetchAllPlayers.fulfilled, (state, action) => {
//       state.status = "succeded";
//       peopleAdapter.upsertMany(state, action.payload);
//     });
//     builder.addCase(addPlayer.pending, (state) => {
//       state.status = "loading";
//     });
//     builder.addCase(addPlayer.fulfilled, (state, action) => {
//       state.status = "succeded";
//       peopleAdapter.addOne(state, action.payload);
//     });
//     builder.addCase(fetchPlayer.pending, (state) => {
//       state.status = "loading";
//     });
//     builder.addCase(fetchPlayer.fulfilled, (state, action) => {
//       if (!action.payload) {
//         state.status = "errored";
//         return;
//       }
//       state.status = "succeded";
//       peopleAdapter.addOne(state, action.payload);
//     });
//     builder.addCase(removePlayer.pending, (state) => {
//       state.status = "loading";
//     });
//     builder.addCase(removePlayer.fulfilled, (state, action) => {
//       state.status = "succeded";
//       peopleAdapter.removeOne(state, action.payload);
//     });
  },
});

// Reducers
export default peopleSlice.reducer;

// Selectors
export const { selectAll: selectAllPlayers, selectById: selectPlayerById } =
  peopleAdapter.getSelectors<RootState>((state) => state.people);
export const selectPlayersLoading = (state: RootState) =>
  state.people.status === "loading";
