import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BiHash } from "react-icons/bi";
import { BsGenderAmbiguous, BsPerson } from "react-icons/bs";
import RefreshIcon from "../RefreshIcon";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

//driver table
export const driverTableHead = [
  {
    name: "Id",
    iconName: <BiHash className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
  },
  {
    name: "First Name",
    iconName: <BsPerson className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
  },
  {
    name: "Last Name",
    iconName: <BsPerson className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
  },
  {
    name: "Email",
    iconName: <AiOutlineMail className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
  },
  {
    name: "Gender",
    iconName: <BsGenderAmbiguous className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
  },
  {
    name: "Phone",
    iconName: <AiOutlinePhone className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
  },

  {
    name: "Status",
    iconName: <RefreshIcon />
  }
];

export const displayDriverkeys = [
  {
    key: "id"
  },
  {
    key: "first_name"
  },
  {
    key: "last_name"
  },
  {
    key: "email"
  },
  {
    key: "gender"
  },
  {
    key: "phone"
  },

  {
    key: "is_active"
  }
];

//roles table

export const rolesTableHead = [
  {
    name: "Id",
    iconName: <BiHash className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
  },
  {
    name: "Role name",
    iconName: <BsPerson className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
  },
  {
    name: "Display Name",
    iconName: <BsPerson className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
  }
];

export const rolesDisplayKeys = [
  {
    key: "id"
  },
  {
    key: "name"
  },
  {
    key: "name"
  }
];

export const adminTableHead = [
  {
    name: "Id",
    iconName: <BiHash className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
  },
  {
    name: "Userame",
    iconName: <BsPerson className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
  },
  {
    name: "Roles",
    iconName: (
      <MdOutlineAdminPanelSettings className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
    )
  },
  {
    name: "Email",
    iconName: <AiOutlineMail className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
  },

  {
    name: "Status",
    iconName: <RefreshIcon />
  }
];
