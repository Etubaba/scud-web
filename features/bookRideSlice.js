import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connectedUser: null, //driver or rider details after connection
  tripEnded: false,
  paymentMethod: "Cash",
  driverArrived: false,
  tripStarted: false,
  showSelection: false,
  vehicleTypeId: null,
  amountPaid: "",

  // cancelReason: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("reasons")) : [],
  cancelReason:
    typeof window !== "undefined"
      ? localStorage.getItem("reasons")
        ? localStorage.getItem("reasons")
        : []
      : [],
  vehicleType:
    typeof window !== "undefined"
      ? localStorage.getItem("vehicleType")
        ? localStorage.getItem("vehicleType")
        : []
      : [],
  reasonModal: false,
  loadingModal: false
};

const bookRideSlice = createSlice({
  name: "bookride",
  initialState,
  reducers: {
    getConnectedUser: (state, action) => {
      state.connectedUser = action.payload;
    },
    setTripEnded: (state, action) => {
      state.tripEnded = action.payload;
    },
    setAmountPaid: (state, action) => {
      state.amountPaid = action.payload;
    },
    setTripStarted: (state, action) => {
      state.tripStarted = action.payload;
    },
    handlePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    handleDriverArriver: (state, action) => {
      state.driverArrived = action.payload;
    },
    handleSelectionComponent: (state, action) => {
      state.showSelection = action.payload;
    },
    handleReasonModal: (state, action) => {
      state.reasonModal = action.payload;
    },
    handleLoadingModal: (state, action) => {
      state.loadingModal = action.payload;
    },
    handleVehicleTypeId: (state, action) => {
      state.vehicleTypeId = action.payload;
    },
    handleCancelReason: (state, action) => {
      state.cancelReason = action.payload;
      localStorage.setItem("reasons", JSON.stringify(state.cancelReason));
    },
    handleVehicleType: (state, action) => {
      state.vehicleType = action.payload;
      localStorage.setItem("vehicleType", JSON.stringify(state.vehicleType));
    }
  }
});

export const {
  getConnectedUser,
  handleReasonModal,
  handleLoadingModal,
  setTripEnded,
  handlePaymentMethod,
  handleDriverArriver,
  setTripStarted,
  handleSelectionComponent,
  handleCancelReason,
  handleVehicleType,
  handleVehicleTypeId,
  setAmountPaid
} = bookRideSlice.actions;
export default bookRideSlice.reducer;
