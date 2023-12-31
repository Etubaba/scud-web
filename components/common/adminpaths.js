export const adminPaths = [
  "/driver_profile/driver_trips",
  "/driver_profile/driver_document",
  "/driver_profile/driver_referral",
  "/driver_profile/driver_payment",
  "/driver_profile",
  "/driver_profile/vehicle_info",
  "/driver_profile/support",
  "/driver_profile/payout_preferences",
  "/driver_profile/driver_invoice",
  "/rider_profile",
  "/rider_profile/profile",
  "/rider_profile/settings",
  "/rider_profile/trips_history",
  "/rider_profile/payment",
  "/rider_profile/promotions",
  "/rider_profile/referral",
  "/rider_profile/settings",
  "/rider_profile/support",
  "/rider_profile/about",
  "/driver_profile/profile",
  "/driver_profile/transactions/[id]",
  "/driver_profile/earnings",
  "/driver_profile/chats/[id]",
  "/rider_profile/chats/[id]",
  "/driver_profile/driver_incentives",
  "/driver_profile/chats/callpage",
  "/rider_profile/chats/callpage",
  "/driver_profile/addacct",
  "/complete-signup",
  "/admin",
  "/admin/profile",
  "/admin/admin_mgt/roles_permissions",
  "/admin/admin_mgt/admin_users",
  "/admin/driver_mgt/manage_driver",
  "/admin/driver_mgt/reviews",
  "/admin/driver_mgt/driver_docs",
  "/admin/email/send_email",
  "/admin/email/email-template",
  "/admin/email/email-template/create_template",
  "/admin/email/settings",
  "/admin/payment_mgt/gateways",
  "/admin/payment_mgt/currency",
  "/admin/payment_mgt/earnings",
  "/admin/payment_mgt/fees",
  "/admin/payment_mgt/fares",
  "/admin/trips_mgt/canceled_reasons",
  "/admin/trips_mgt/ride_request",
  "/admin/trips_mgt/add-reason",
  "/admin/trips_mgt/payments",
  "/admin/trips_mgt/trips",
  "/admin/trips_mgt/rating",
  "/admin/rider_mgt/message_rider",
  "/admin/rider_mgt/rider_mgt",
  "/admin/rider_mgt/reviews",
  "/admin/rider_mgt/promo",
  "/admin/referral_mgt/driver_ref",
  "/admin/referral_mgt/rider_ref",
  "/admin/referral_mgt/settings",
  "/admin/referral_mgt/settings/create",
  "/admin/vehicle_mgt/all_vehicles",
  "/admin/vehicle_mgt/vehicle_type",
  "/admin/vehicle_mgt/vehicle_make",
  "/admin/vehicle_mgt/vehicle_model",
  "/admin/incentive_mgt/incentive",
  "/admin/incentive_mgt/driver_incentive",
  "/admin/incentive_mgt/details",
  "/admin/message/messages",
  "/admin/message/send_msg",
  "/admin/manual_ride/bookings",
  "/admin/manual_ride/view_bookings",
  "/admin/location/language",
  "/admin/location/country",
  "/admin/location/state",
  "/admin/location/city",
  "/admin/location/locations",
  "/admin/map_mgt/map_view",
  "/admin/map_mgt/heatmap",
  "/admin/site/settings",
  "/admin/site/metas",
  "/admin/site/static_page",
  "/admin/support/faqs",
  "/admin/support/support_mgt",
  "/admin/support/joinus",
  "/admin/admin_mgt/create_roles",
  "/admin/admin_mgt/create_admin",
  "/admin/driver_mgt/add_docs",
  "/admin/driver_mgt/document_mgt",
  "/admin/driver_mgt/we_owe",
  "/admin/driver_mgt/add-driverpages/add_driver",
  "/admin/driver_mgt/add-driverpages/upload_license",
  "/admin/driver_mgt/add-driverpages/vehicle_details",
  "/admin/driver_mgt/add-driverpages/bank_details",
  "/admin/driver_mgt/review_details/[id]",
  "/admin/driver_mgt/promo_progress",
  "/admin/driver_mgt/progress_details",
  "/admin/email/create_email",
  "/admin/payment_mgt/add_currency",
  "/admin/payment_mgt/add_gateway",
  "/admin/trips_mgt/trip_details",
  "/admin/trips_mgt/user-trips/all_trips",
  "/admin/rider_mgt/rider_details",
  "/admin/rider_mgt/rider_profile",
  "/admin/rider_mgt/create_promo",
  "/admin/rider_mgt/review_details",
  "/admin/rider_mgt/edit_profile",
  "/admin/rider_promo_setting/promo_progress",
  "/admin/rider_promo_setting/progress_details",
  "/admin/referral_mgt/referral_details",
  "/admin/referral_mgt/details",
  "/admin/incentive_mgt/edit_tier",
  "/admin/driver_mgt/owing",
  `/admin/driver_mgt/owe_details`,
  "/admin/driver_mgt/driver_promo",
  "/admin/driver_mgt/add_promo",
  "/admin/payment_mgt/add_fare",
  "/admin/payment_mgt/notifications",
  "/admin/payment_mgt/withdrawer_request",
  "/admin/vehicle_mgt/add_vehicle_model",
  "/admin/driver_mgt/driver_profile",
  "/admin/vehicle_mgt/add_vehicle_makes",
  "/admin/vehicle_mgt/add_vehicle_type",
  "/admin/vehicle_mgt/add_vehicle",
  "/admin/location/add/add_language",
  "/admin/location/add/add_location",
  "/admin/location/add/add_city",
  "/admin/location/add/add_country",
  "/admin/support/add_faq",
  "/admin/site/add_page",
  "/admin/site/api_credentials",
  "/admin/payment_mgt/owe_amt",
  "/admin/support/acct_officer/account_officer",
  "/admin/support/officer_manager/officer_mgt",
  "/admin/support/acct_officer/acctofficer_details",
  "/admin/support/acct_officer/officer_profile",
  "/admin/support/acct_officer/all_chat",
  "/admin/support/acct_officer/all_review",
  "/admin/support/officer_manager/manager_details",
  "/admin/support/officer_manager/manager_profile",
  "/admin/support/officer_manager/all_review",
  "/admin/support/officer_manager/all_chat",
  "/admin/support/messages",
  "/admin/support/company_address",
  "/admin/support/company_address/add_address",
  "/officer_profile/account_officer",
  "/officer_profile/account_officer/profile",
  "/officer_profile/account_officer/driver_profile",
  "/officer_profile/account_officer/review",
  "/officer_profile/account_officer/message",
  "/officer_profile/account_officer/mgt_drivers",
  "/officer_profile/account_officer/support",
  "/officer_profile/account_officer/callpage",
  "/officer_profile/officers_manager",
  "/officer_profile/officers_manager/profile",
  "/officer_profile/officers_manager/review",
  "/officer_profile/officers_manager/messages",
  "/officer_profile/officers_manager/mgt_officer",
  "/officer_profile/officers_manager/support",
  "/officer_profile/account_officer/review_details",
  "/officer_profile/officers_manager/officers_details",
  "/officer_profile/officers_manager/review_details",
  "/officer_profile/officers_manager/callpage",
  "/admin/incentive_mgt/rewards_logic",
  "/admin/driver_mgt/drivers_we_are_owing",
  "/admin/auth",
  "/admin/email/review",
  "/admin/support/manage_support",
  "/admin/support/manage_support/issues",
  "/admin/support/manage_support/add_question",
  "/admin/support/officer_manager/assign_officer",
  "/admin/support/manage_support/issues/[id]",
  "/admin/support/manage_support/issues/new_question",
  "/admin/support/manage_support/issues/edit_category_heading",
  "/admin/rider_mgt/review_details/[id]",
  "/admin/rider_promo_setting",
  "/admin/support/sos",
  "/admin/support/sos/sos_details",
  "/admin/support/sos/sos_settings",
  "/admin/rider_promo_setting/add_promo",
  "/officer_profile/account_officer/review_details/[id]",
  "/admin/driver_mgt/document_details",
  "/officer_profile/account_officer/document_mgt",
  "/officer_profile/account_officer/document_details",
  "/admin/support/audit_trail"
];
