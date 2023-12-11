import { BsPerson } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { HiOutlineDocumentText } from "react-icons/hi";
import {
  MdOutlineDashboard,
  MdOutlineSupportAgent,
  MdReviews,
} from "react-icons/md";

export const acctOfficerNavList = [
  {
    id: 1,
    iconName: <MdOutlineDashboard />,
    text: "Dashboard",
    href: "/account_officer"
  },
  {
    id: 2,
    iconName: <GiPoliceOfficerHead />,
    text: "Manage Drivers",
    href: "/account_officer/mgt_drivers"
  },
  {
    id: 3,
    iconName: <MdReviews />,
    text: "Drivers Reviews",
    href: "/account_officer/review"
  },
  {
    iconName: <HiOutlineDocumentText />,
    text: "Drivers Documents",
    href: "/account_officer/document_mgt"
  },
  {
    id: 4,
    iconName: <FiSend />,
    text: "Message",
    href: "/account_officer/message"
  },
  {
    id: 5,
    iconName: <BsPerson />,
    text: "Profile",
    href: "/account_officer/profile"
  },
  {
    id: 6,
    iconName: <MdOutlineSupportAgent />,
    text: "Support",
    href: "/account_officer/support"
  }
];
export const officerManagerNavList = [
  {
    id: 1,
    iconName: <MdOutlineDashboard />,
    text: "Dashboard",
    href: "/officers_manager",
  },
  {
    id: 2,
    iconName: <GiPoliceOfficerHead />,
    text: "Manage Officers",
    href: "/officers_manager/mgt_officer",
  },
  {
    id: 3,
    iconName: <MdReviews />,
    text: "Officer's Reviews",
    href: "/officers_manager/review",
  },
  {
    id: 4,
    iconName: <FiSend />,
    text: "Message",
    href: "/officers_manager/messages",
  },
  {
    id: 5,
    iconName: <BsPerson />,
    text: "Profile",
    href: "/officers_manager/profile",
  },
  {
    id: 6,
    iconName: <MdOutlineSupportAgent />,
    text: "Support",
    href: "/officers_manager/support",
  },
];
