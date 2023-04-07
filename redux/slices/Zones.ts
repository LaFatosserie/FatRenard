import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import ZonesController from "api/controllers/zonesController";
import { toast } from "react-toastify";
import { RootState } from "redux/store";
import { EntityState } from "types/App";
import { TZone, Zone } from "types/Zone";

const zonesAdapter = createEntityAdapter<Zone>({
  selectId: (zone) => zone._id,
});

export const fetchAllZones = createAsyncThunk("zones/fetchAll", async (_, { rejectWithValue }) => {
  const res = await new ZonesController().getAll()
  if (!res || (res && !res.ok)) {
      toast(res.error, { type: 'error' })
      return rejectWithValue(res.error)
    }
  return res.data;
});

export const loadZone = createAsyncThunk("zones/loadOne", async (id: string, { rejectWithValue }) => {
  const res = await new ZonesController().getOne(id)
  if (!res || (res && !res.ok)) {
    toast(res.error, { type: 'error' })
    return rejectWithValue(res.error)
  }
  return res.data;
});

export const addZone = createAsyncThunk(
  'app/createZone',
  async (zone: TZone, { rejectWithValue }) => {
    const res = await new ZonesController().create(zone)
    if (!res || (res && !res.ok)) {
      toast(res.error, { type: 'error' })
      return rejectWithValue(res.error)
    }
    toast('Zone created !', { type: 'success' })
    return res.data
  }
)

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
    builder.addCase(fetchAllZones.rejected, (state, action) => {
      state.status = 'errored'
      state.error = action.payload as string
    })

    builder.addCase(loadZone.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loadZone.fulfilled, (state, action) => {
      state.status = "succeded";
      zonesAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(loadZone.rejected, (state, action) => {
      state.status = 'errored'
      state.error = action.payload as string
    })

    builder.addCase(addZone.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addZone.fulfilled, (state, action) => {
      state.status = "succeded";
      zonesAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(addZone.rejected, (state, action) => {
      state.status = 'errored'
      state.error = action.payload as string
    })
  },
});

export default zonesSlice.reducer;

export const { selectAll: selectAllZones, selectById: selectZoneById } =
  zonesAdapter.getSelectors<RootState>((state) => state.zones);

export const selectZonesLoading = (state: RootState) =>
  state.zones.status === "loading";
