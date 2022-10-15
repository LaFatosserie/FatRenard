import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import API from "../../api/fatapi";
import { RootState } from "redux/store";
import { EntityState } from "types/App";
import { TZone } from "types/Zone";

const zonesAdapter = createEntityAdapter<TZone>({
  selectId: (zone) => zone.id,
});

export const fetchAllZones = createAsyncThunk("zones/fetchAll", async () => {
  const api = new API();
  return api.zones.getAll();
});

const initialState = zonesAdapter.getInitialState({
  status: "idle",
  error: null,
} as EntityState);

const zonesSlice = createSlice({
  name: "zones",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllZones.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllZones.fulfilled, (state, action) => {
      state.status = "succeded";
      zonesAdapter.upsertMany(state, action.payload);
    });
  },
});

export default zonesSlice.reducer;

export const { selectAll: selectAllZones, selectById: selectZoneById } =
  zonesAdapter.getSelectors<RootState>((state) => state.zones);

export const selectZonesLoading = (state: RootState) =>
  state.zones.status === "loading";
