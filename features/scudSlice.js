import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuDrawer: false,
  signUpModal: false,
  resizeDiv: false,
  acct_officer_ischecked: false,
  origin: {
    lat: 4.77149,
    lng: 7.01435
  },
  destination: null,
  routescalculated: null,
  isAdminSideBar: false,
  selectedItemIndex: null,
  officerSideBar: false,
  signuplevel: 0,
  // driversignuplevel: 6,
  driversignuplevel:
    typeof window !== "undefined"
      ? Number(localStorage.getItem("driversignuplevel"))
        ? Number(localStorage.getItem("driversignuplevel"))
        : 1
      : 1,
  driversigninlevel: 1,
  ridersignuplevel:
    typeof window !== "undefined"
      ? Number(localStorage.getItem("ridersignuplevel"))
        ? Number(localStorage.getItem("ridersignuplevel"))
        : 1
      : 1,
  ridersigninlevel: 1,

  earnings: {
    time: "daily",
    category: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    data: []
  }
};

const scudSlice = createSlice({
  name: "scud",
  initialState,
  reducers: {
    handleSignupLevel: (state, action) => {
      state.signuplevel = action.payload;
    },
    handleEarnings: (state, action) => {
      state.earnings = action.payload;
    },
    handleDriverSignupLevel: (state, action) => {
      state.driversignuplevel = action.payload;
      localStorage.setItem("driversignuplevel", state.driversignuplevel);
    },
    handleDriverSigninLevel: (state, action) => {
      state.driversigninlevel = action.payload;
    },
    handleRidersignupLevel: (state, action) => {
      state.ridersignuplevel = action.payload;
      localStorage.setItem("ridersignuplevel", state.ridersignuplevel);
    },
    handleRidersigninLevel: (state, action) => {
      state.ridersigninlevel = action.payload;
    },
    goBackSignupLevel: (state, action) => {
      if (action.payload === "driversignup") {
        state.driversignuplevel -= 1;
        localStorage.setItem("driversignuplevel", state.driversignuplevel);
      } else if (action.payload === "driversignin") {
        state.driversigninlevel -= 1;
      } else if (action.payload === "ridersignup") {
        state.ridersignuplevel -= 1;
        localStorage.setItem("ridersignuplevel", state.ridersignuplevel);
      } else if (action.payload === "ridersignin") {
        state.ridersigninlevel -= 1;
      } else if (action.payload === "") {
        state.signuplevel -= 1;
      }
    },
    drawerOpen: (state, action) => {
      state.menuDrawer = action.payload;
    },
    modalToggle: (state, action) => {
      state.signInModal = action.payload;
    },
    modalToggle2: (state, action) => {
      state.signUpModal = action.payload;
    },
    handleResizeDiv: (state, action) => {
      state.resizeDiv = action.payload;
    },

    handleOrigin: (state, action) => {
      state.origin = action.payload;
    },
    handleDestination: (state, action) => {
      state.destination = action.payload;
    },
    handleRoute: (state, action) => {
      state.routescalculated = action.payload;
    },
    handleAdminSideBar: (state, action) => {
      state.isAdminSideBar = action.payload;
    },
    handleOfficerSideBar: (state, action) => {
      state.officerSideBar = action.payload;
    },
    handleSelectedItemIndex: (state, action) => {
      state.selectedItemIndex = action.payload;
    },
    handleOfficerCheck: (state, action) => {
      state.acct_officer_ischecked = action.payload;
    }
  }
});

export const {
  handleLogin,
  drawerOpen,
  modalToggle,
  modalToggle2,
  handleResizeDiv,
  handleOfficerCheck,
  handleOrigin,
  handleDestination,
  handleRoute,
  handleAdminSideBar,
  handleSignupLevel,
  handleDriverSigninLevel,
  handleDriverSignupLevel,
  handleRidersigninLevel,
  handleRidersignupLevel,
  goBackSignupLevel,
  handleOfficerSideBar,
  handleSelectedItemIndex,
  handleEarnings
} = scudSlice.actions;
export default scudSlice.reducer;
