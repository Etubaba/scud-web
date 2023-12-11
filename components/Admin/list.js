import { FaCarSide, FaMapMarkedAlt, FaMedal, FaPager, FaUserCog } from "react-icons/fa";
import { VscKey } from "react-icons/vsc";
// import { TfiCar } from "react-icons/tfi";
import { GiPoliceCar, GiPoliceOfficerHead, GiTakeMyMoney } from "react-icons/gi";
import { useRouter } from "next/router";
// import { HiLanguage } from "react-icons/hi";

import {
  MdPayment,
  MdOutlineDashboard,
  MdOutlineLanguage,
  MdReviews,
  MdOutlineAccountBalanceWallet,
  MdOutlineLocationCity,
  MdOutlineSupportAgent,
  MdAttachMoney,
  MdOutlineMarkEmailRead
} from "react-icons/md";
import { RiFolderSettingsFill, RiMailSettingsLine } from "react-icons/ri";
import {
  AiOutlineCar,
  AiOutlineUserAdd,
  AiOutlineMail,
  AiOutlineMessage,
  AiOutlineQuestionCircle,
  AiOutlineShareAlt,
  AiOutlineSetting,
  AiOutlineWarning
} from "react-icons/ai";
import {
  HiOutlineDocumentText,
  HiOutlineOfficeBuilding,
  HiOutlineSpeakerphone,
  HiOutlineUserGroup
} from "react-icons/hi";
import { BiLoader, BiLogOut, BiMessageDots, BiMoney, BiSupport } from "react-icons/bi";
import { TbCarOff, TbCreditCard } from "react-icons/tb";

import { BsBell, BsFileEarmarkLock, BsFillPersonDashFill, BsGift } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { GoLocation } from "react-icons/go";

// import { GrUserSettings } from "react-icons/gr";

export const sideNavList = [
  {
    id: 0,
    title: "",
    child: [
      {
        iconName: <MdOutlineDashboard />,
        text: "Dashboard",
        href: ""
      }
    ]
  },
  {
    id: 1,
    title: "ADMIN MANAGEMENT",
    child: [
      {
        iconName: <VscKey />,
        text: "Roles & Permissions",
        href: "/admin_mgt/roles_permissions"
      },
      {
        iconName: <AiOutlineUserAdd />,
        text: "Admin Users",
        href: "/admin_mgt/admin_users"
      }
    ]
  },
  {
    id: 2,
    title: "DRIVERS MANAGEMENT",
    child: [
      {
        iconName: <GiPoliceOfficerHead />,
        text: "Manage Driver",
        href: "/driver_mgt/manage_driver"
      },
      {
        iconName: <HiOutlineDocumentText />,
        text: "Drivers Documents",
        href: "/driver_mgt/document_mgt"
      },
      {
        iconName: <MdReviews />,
        text: "Drivers Reviews",
        href: "/driver_mgt/reviews"
      },
      {
        iconName: <HiOutlineSpeakerphone />,
        text: "Driver Promo",
        href: "/driver_mgt/driver_promo"
      },
      // {
      //   iconName: <BiLoader />,
      //   text: "Promo Progress",
      //   href: "/driver_mgt/promo_progress"
      // },
      {
        iconName: <BsFillPersonDashFill />,
        text: "Outstanding Payment",
        href: "/driver_mgt/owing"
      },
      {
        iconName: <BsFillPersonDashFill />,
        text: " Unpaid Earnings",
        href: "/driver_mgt/we_owe"
      }
    ]
  },
  {
    id: 3,
    title: "EMAIL MANAGEMENT",
    child: [
      {
        iconName: <AiOutlineMail />,
        text: "Send Emails",
        href: "/email/send_email"
      },
      {
        iconName: <MdOutlineMarkEmailRead />,
        text: "Email Template",
        href: "/email/email-template"
      },
      {
        iconName: <RiMailSettingsLine />,
        text: "Email Setting",
        href: "/email/settings"
      }
    ]
  },
  {
    id: 4,
    title: "PAYMENT MANAGEMENT",
    child: [
      {
        iconName: <MdPayment />,
        text: "Payment Gateways",
        href: "/payment_mgt/gateways"
      },

      {
        iconName: <MdOutlineAccountBalanceWallet />,
        text: "Manage Earnings",
        href: "/payment_mgt/earnings"
      },
      {
        iconName: <GiTakeMyMoney />,
        text: "Manage Fees",
        href: "/payment_mgt/fees"
      },
      {
        iconName: <BiMoney />,
        text: "Manage Fares",
        href: "/payment_mgt/fares"
      },
      {
        iconName: <TbCreditCard />,
        text: "Manage Owe Anount",
        href: "/payment_mgt/owe_amt"
      },
      {
        iconName: <MdAttachMoney />,
        text: "Withdrawer Request",
        href: "/payment_mgt/withdrawer_request"
      },
      {
        iconName: <BsBell />,
        text: "Payment Notification",
        href: "/payment_mgt/notifications"
      }
    ]
  },
  {
    id: 5,
    title: "TRIP MANAGEMENT",
    child: [
      {
        iconName: <GiPoliceCar />,
        text: "Manage Ride Request",
        href: "/trips_mgt/ride_request"
      },
      {
        iconName: <TbCarOff />,
        text: "Canceled Reason",
        href: "/trips_mgt/canceled_reasons"
      },

      {
        iconName: <AiOutlineCar />,
        text: "Manage Trips",
        href: "/trips_mgt/trips"
      }
    ]
  },
  {
    id: 6,
    title: "RIDERS MANAGEMENT",
    child: [
      {
        iconName: <BiMessageDots />,
        text: "Riders Reviews",
        href: "/rider_mgt/reviews"
      },
      {
        iconName: <HiOutlineUserGroup />,
        text: "Manage Riders",
        href: "/rider_mgt/rider_mgt"
      },
      {
        iconName: <HiOutlineSpeakerphone />,
        text: "Riders Promo",
        href: "/rider_mgt/promo"
      }
    ]
  },
  {
    id: 16,
    title: "RIDER PROMO SETTINGS ",
    child: [
      {
        iconName: <FaUserCog />,
        text: "Rider Promo Setting",
        href: "/rider_promo_setting"
      }
    ]
  },
  {
    id: 7,
    title: "REFRRALS MANAGEMENT",
    child: [
      {
        id: 3,
        iconName: <AiOutlineSetting />,
        text: "Referral Settings",
        href: "/referral_mgt/settings"
      },
      {
        id: 1,
        iconName: <GiPoliceOfficerHead />,
        text: "Drivers Referrals",
        href: "/referral_mgt/driver_ref"
      },
      {
        id: 2,
        iconName: <HiOutlineUserGroup />,
        text: "Riders Referrals",
        href: "/referral_mgt/rider_ref"
      }
    ]
  },
  {
    id: 8,
    title: "VEHICLE MANAGEMENT",
    child: [
      {
        iconName: <FaCarSide />,
        text: "Vehicle Make",
        href: "/vehicle_mgt/vehicle_make"
      },
      // {
      //   iconName: <FaCarSide />,
      //   text: "Vehicle Model",
      //   href: "/vehicle_mgt/vehicle_model"
      // },
      {
        iconName: <FaCarSide />,
        text: "Vehicle Types",
        href: "/vehicle_mgt/vehicle_type"
      },
      {
        iconName: <FaCarSide />,
        text: "All Vehicles",
        href: "/vehicle_mgt/all_vehicles"
      }
    ]
  },
  {
    id: 9,
    title: "INCENTIVE MANAGEMENT",
    child: [
      {
        iconName: <BsGift />,
        text: "Manage Incentives",
        href: "/incentive_mgt/incentive"
      },

      {
        iconName: <GiPoliceOfficerHead />,
        text: "Driver Incentive",
        href: "/incentive_mgt/driver_incentive"
      }
      // {
      //   iconName: <FaMedal />,
      //   text: "Reward Logic",
      //   href: "/incentive_mgt/rewards_logic"
      // }
    ]
  },
  {
    id: 10,
    title: "MESSAGE MANAGEMENT",
    child: [
      {
        iconName: <FiSend />,
        text: "Send Message",
        href: "/message/send_msg"
      },
      {
        iconName: <AiOutlineMessage />,
        text: "Messages",
        href: "/message/messages"
      }
    ]
  },
  {
    id: 12,
    title: "LOCATION MANAGEMENT",
    child: [
      {
        iconName: <MdOutlineLanguage />,
        text: "Manage Country",
        href: "/location/country"
      },
      {
        iconName: <MdOutlineLocationCity />,
        text: "Manage State",
        href: "/location/state"
      },
      {
        iconName: <GoLocation />,
        text: "Locations",
        href: "/location/locations"
      }
    ]
  },
  {
    id: 13,
    title: "MAP MANAGEMENT",
    child: [
      {
        iconName: <FaMapMarkedAlt />,
        text: "Map View",
        href: "/map_mgt/map_view"
      }
    ]
  },
  {
    id: 14,
    title: "SITE MANAGEMENT",
    child: [
      {
        iconName: <BsFileEarmarkLock />,
        text: "API Credentials",
        href: "/site/api_credentials"
      }
      // {
      //   iconName: <RiFolderSettingsFill />,
      //   text: "Site Settings",
      //   href: "/site/settings"
      // }
    ]
  },
  {
    id: 15,
    title: "SUPPORT MANAGEMENT",
    child: [
      {
        iconName: <MdOutlineSupportAgent />,
        text: "Account officers",
        href: "/support/acct_officer/account_officer"
      },
      {
        iconName: <GiPoliceOfficerHead />,
        text: "Officers Manager",
        href: "/support/officer_manager/officer_mgt"
      },
      {
        iconName: <AiOutlineQuestionCircle />,
        text: "Manage FAQs",
        href: "/support/faqs"
      },
      {
        iconName: <AiOutlineWarning />,
        text: "SOS Settngs",
        href: "/support/sos"
      },

      {
        iconName: <AiOutlineShareAlt />,
        text: "Join Us Links",
        href: "/support/joinus"
      },
      {
        iconName: <BiSupport />,
        text: "Manage Support",
        href: "/support/manage_support"
      },
      {
        iconName: <FiSend />,
        text: "Messages",
        href: "/support/messages"
      },
      {
        iconName: <HiOutlineOfficeBuilding />,
        text: "Company Address",
        href: "/support/company_address"
      },

      {
        iconName: <RiFolderSettingsFill />,
        text: "Audit Trail",
        href: "/support/audit_trail"
      }
    ]
  }
];
