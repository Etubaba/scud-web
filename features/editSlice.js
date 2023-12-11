import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  incentive: null,
  vehicle_make: null,
  fare_edit: null,
  faq: null,
  cancel_reason: null,
  edit_adminUsers: null,
  edit_adminRoles: null,
  location: null,
  activate_country: null,
  promo: null,
  bank_details: null,
  incentive: null,
  vehicle_make: null,
  fare_edit: null,
  faq: null,
  cancel_reason: null,
  edit_adminUsers: null,
  edit_adminRoles: null,
  location: null,
  activate_country: null,
  emailOption: {
    recipient: 1,
    locations: null,
    emailBody: null,
    emailSubject: null,
    emailTemplate: null,
    users: [],
    notificationType: "mail"
  },
  questionEdit: {
    id: null,
    question: "",
    answer: ""
  },
  vehicle_type: {
    id: null,
    name: "",
    minimum_year: "From",
    maximum_year: "To (Optional)",
    is_active: " Select Status"
  },
  driverPromoEdit: {
    id: null,
    name: "",
    vehicle_type_ids: [],
    location_ids: [],
    trips: null,
    online_hours: null,
    expires_at: "",
    acceptance_rate: null,
    cancellation_rate: null,
    driver_score: null,
    is_active: null
  }
};

const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    editIncentive: (state, action) => {
      state.incentive = action.payload;
    },
    editDriverPromo: (state, action) => {
      state.driverPromoEdit = action.payload;
    },
    editPromo: (state, action) => {
      state.promo = action.payload;
    },
    editMake: (state, action) => {
      state.vehicle_make = action.payload;
    },
    handleEditQuestion: (state, action) => {
      state.questionEdit = action.payload;
    },
    editFare: (state, action) => {
      state.fare_edit = action.payload;
    },
    editFaq: (state, action) => {
      state.faq = action.payload;
    },
    editReason: (state, action) => {
      state.cancel_reason = action.payload;
    },
    handleEditAd: (state, action) => {
      state.edit_adminUsers = action.payload;
    },
    handleEditRoles: (state, action) => {
      state.edit_adminRoles = action.payload;
    },
    editLocation: (state, action) => {
      state.location = action.payload;
    },
    editVehicleType: (state, action) => {
      state.vehicle_type = action.payload;
    },
    editCountry: (state, action) => {
      state.activate_country = action.payload;
    },
    handleNotifcation: (state, action) => {
      state.emailOption.notificationType = action.payload;
    },
    handleEmailUsers: (state, action) => {
      state.emailOption.users = action.payload;
    },
    handleEmailBody: (state, action) => {
      state.emailOption.emailBody = action.payload;
    },
    handleEmailTemplate: (state, action) => {
      state.emailOption.emailTemplate = action.payload;
    },
    handleEmailSubject: (state, action) => {
      state.emailOption.emailSubject = action.payload;
    },
    handleEmailRecipient: (state, action) => {
      state.emailOption.recipient = action.payload;
    },
    handleLoaction: (state, action) => {
      state.emailOption.locations = action.payload;
    }
  }
});

export const {
  handleEditQuestion,
  editIncentive,
  editMake,
  editPromo,
  editDriverPromo,
  editFare,
  editFaq,
  editReason,
  handleEditAd,
  handleEditRoles,
  editLocation,
  editCountry,
  editUserBankDetails,
  handleEmailBody,
  handleEmailRecipient,
  handleEmailSubject,
  handleEmailTemplate,
  handleLoaction,
  handleNotifcation,
  editVehicleType,
  handleEmailUsers
} = editSlice.actions;

export default editSlice.reducer;
