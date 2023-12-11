import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  phone: "",
  countryCode: "+234",
  userDetails: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null,
  isDriverLoggedIn: Cookies.get("isDriverLoggedIn") ? Cookies.get("isDriverLoggedIn") : false,
  isRiderLoggedIn: Cookies.get("isRiderLoggedIn") ? Cookies.get("isRiderLoggedIn") : false,
  isAdminIn: Cookies.get("isAdminLoggedIn") ? Cookies.get("isAdminLoggedIn") : false,
  // riderDetails: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("rider")) : null,
  // driverDetails: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("driver")) : null,
  adminDetails:
    typeof window !== "undefined" ? JSON.parse(localStorage.getItem("adminScud")) : null,
  signinOption: 1,
  signinEmail: "",
  referral_code:
    typeof window !== "undefined"
      ? sessionStorage.getItem("referralCode")
        ? sessionStorage.getItem("referralCode")
        : ""
      : "",
  extraSpace: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handlePhoneNo: (state, action) => {
      state.phone = action.payload;
    },
    handleSigninemail: (state, action) => {
      state.signinEmail = action.payload;
    },
    handleExtraSpace: (state, action) => {
      state.extraSpace = action.payload;
    },
    handleReferralCode: (state, action) => {
      state.referral_code = action.payload;
      sessionStorage.setItem("referralCode", state.referral_code);
    },
    handleSigninOption: (state, action) => {
      state.signinOption = action.payload;
    },
    handleRiderLogin: (state, action) => {
      state.isRiderLoggedIn = action.payload;
      Cookies.set("isRiderLoggedIn", state.isRiderLoggedIn, { expires: 30 });
    },

    handleDriverLogin: (state, action) => {
      state.isDriverLoggedIn = action.payload;
      Cookies.set("isDriverLoggedIn", state.isDriverLoggedIn, { expires: 30 });
    },
    handleAdminLogin: (state, action) => {
      state.isAdminIn = action.payload;
      Cookies.set("isAdminLoggedIn", state.isAdminIn, { expires: 30 });
    },
    handleCountryCode: (state, action) => {
      state.countryCode = action.payload;
    },
    handleUserProps: (state, action) => {
      state.userDetails = action.payload;
      localStorage.setItem("user", JSON.stringify(state.userDetails));
    },
    // handleRiderProps: (state, action) => {
    //   state.riderDetails = action.payload;
    //   localStorage.setItem("rider", JSON.stringify(state.riderDetails));
    // },
    // handleDriverProps: (state, action) => {
    //   state.driverDetails = action.payload;
    //   localStorage.setItem("driver", JSON.stringify(state.driverDetails));
    // },
    handleAdminProps: (state, action) => {
      state.adminDetails = action.payload;
      localStorage.setItem("adminScud", JSON.stringify(state.adminDetails));
    }
  }
});

export const {
  handleExtraSpace,
  handleLogin,
  handlePhoneNo,
  handleCountryCode,
  handleUserProps,
  handleAdminProps,
  handleAdminLogin,
  handleDriverLogin,
  handleRiderLogin,
  handleDriverProps,
  handleRiderProps,
  handleSigninOption,
  handleSigninemail,
  handleReferralCode
} = authSlice.actions;
export default authSlice.reducer;
