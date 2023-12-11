import { BASE_URL } from "../../../api/base";
import Layout from "../../../components/Admin/Layout";
import SearchInput from "../../../components/admincomponents/SearchInput";
import WithrawerCompo from "../../../components/admincomponents/WithrawerCompo";
import Pagination from "../../../components/common/Pagination";
import { validateToken } from "../../../components/services/validateToken";
import EmptyTable from "../../../components/common/EmptyTable";
import { WithdrawReq } from "../../../dummy";
import { AiOutlineCar } from "react-icons/ai";
import { useState } from "react";

const we_owe = ({ drivers }) => {
  const [search, setSearch] = useState("");

  const driversWeOwe = drivers.data;
  return (
    <div>
      <p className="tracking-wide font-semibold mb-5 text-sm md:text-lg">Drivers We're Owing</p>

      {driversWeOwe.length !== 0 && (
        <div className="  mb-7 md:flex hidden  items-center md:justify-between">
          <p className="text-sm  text-textColor"> Drivers We're Owing</p>
          <SearchInput value={search} setValue={setSearch} style={"mb-5 md:mb-0"} />
        </div>
      )}

      {driversWeOwe.length === 0 ? (
        <EmptyTable title={"No Unpaid Drivers"} name={"unpaid drivers"} Icon={AiOutlineCar} />
      ) : (
        <div>
          {driversWeOwe
            .filter((el) => {
              if (search === "") return el;
              else if (
                el.user.first_name.toLowerCase().includes(search.toLowerCase()) ||
                el.user.last_name.toLowerCase().includes(search.toLowerCase())
              )
                return el;
            })
            ?.map((item, idx) => (
              <WithrawerCompo we_owe={true} key={idx} item={item} />
            ))}
        </div>
      )}

      <div className="my-6"> {/* <Pagination /> */}</div>
    </div>
  );
};

we_owe.getLayout = Layout;
export default we_owe;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const res = await fetch(`${BASE_URL}payments/owe/drivers`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const drivers = await res.json();

  if (drivers?.statusCode !== undefined && drivers?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }
  return {
    props: {
      drivers
    }
  };
}
