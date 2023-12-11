import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
   AiOutlineCheckCircle,
   AiOutlineDollar,
   AiOutlinePercentage,
} from 'react-icons/ai';
import { BsHash, BsLock, BsPerson, BsTranslate } from 'react-icons/bs';
import { MdGTranslate } from 'react-icons/md';
import { TbActivityHeartbeat, TbWorld } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../../../api/base';
import Layout from '../../../../components/Admin/Layout';
import BreadCrumbs from '../../../../components/common/BreadCrumbs';
import Button from '../../../../components/common/Button';
import Input from '../../../../components/common/Input';
import Modal from '../../../../components/common/Modal';
import Select from '../../../../components/common/Select';

const Add_country = () => {
   const [countryname, setcountryname] = useState('');
   const [phone, setPhone] = useState('');
   const [code, setCode] = useState('');
   const [status, setStatus] = useState('Select Status');
   const [disabled, setDisabled] = useState(true);
   const [successModal, setSuccessModal] = useState(false);
   const [successAction, setSuccessAction] = useState(false);

   const router = useRouter();

   const statusList = ['Active', 'Inactive'];
   //change button from disable to able
   const countryToEdit = useSelector((state) => state.edit.activate_country);
   useEffect(() => {
      if (status !== 'Select Status') {
         setDisabled(false);
      }
   }, [phone, status, countryname]);

   useEffect(
      () => setStatus(countryToEdit.is_active ? 'Active' : 'Inactive'),
      [],
   );

   //activate country

   const activateCountry = async () => {
      try {
         const token = Cookies.get('adminAccessToken');
         axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
         axios.defaults.headers.get['Content-Type'] = 'application/json';
         const { data } = await axios.patch(
            `${BASE_URL}countries/${countryToEdit.id}`,
            { is_active: status === 'Active' ? true : false },
         );

         if (data) {
            setSuccessModal(true);
            setSuccessAction(data.is_active ? true : false);
         }
      } catch (err) {
         if (err.response) {
            const msg = err.response.data.message;
            if (typeof msg === 'string') {
               enqueueSnackbar(msg, {
                  variant: 'error',
               });
            } else {
               for (let i = 0; i < msg.length; i++) {
                  enqueueSnackbar(msg[i], {
                     variant: 'error',
                  });
               }
            }
         }
      }
   };

   if (successModal) {
      setTimeout(() => setSuccessModal(false), 3000);
   }

   return (
      <div>
         {' '}
         <BreadCrumbs
            secondItem={'Activate Country'}
            indexPath={'/admin/location/country'}
            index={'Manage Country'}
         />
         <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
            <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
               <p className="text-sm text-textColor mb-7">
                  {' '}
                  <p className="text-sm text-textColor mb-2">
                     Enter Country details
                  </p>
               </p>
               <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
                  <div className="col-span-1">
                     <p className="text-sm text-textColor mb-2">Country Name</p>
                     <Input
                        value={countryToEdit.name}
                        // onChange={(e) => setcountryname(e.target.value)}
                        Icon={BsTranslate}
                     />
                  </div>
                  <div className="col-span-1">
                     <p className="text-sm text-textColor mb-2">Short Name</p>
                     <Input
                        value={countryToEdit.iso3}
                        // onChange={(e) => setCode(e.target.value)}
                        Icon={BsTranslate}
                     />
                  </div>
                  <div className="col-span-1">
                     <p className="text-sm text-textColor mb-2">Phone Code</p>
                     <Input
                        value={countryToEdit.phone_code}
                        // onChange={(e) => setPhone(e.target.value)}
                        Icon={BsHash}
                     />
                  </div>

                  <div className="col-span-1">
                     <p className="text-sm text-textColor mb-2">Status</p>
                     <Select
                        data={statusList}
                        style={'w-full p-2'}
                        positon={'p-4'}
                        value={status}
                        setValue={setStatus}
                        dropDownWidth={' w-[16.5rem] md:w-[27rem] mt-1'}
                        color=""
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className="flex my-7 justify-between ">
            <button
               onClick={() => router.push('/driver_profile/driver_payment')}
               className="bg-white border min-w-[120px] md:min-w-[150px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-textColor mr-2"
            >
               Back
            </button>
            <Button
               disabled={disabled}
               onClick={activateCountry}
               text={'Update Country'}
            />
         </div>
         <Modal onClose={() => setSuccessModal(false)} open={successModal}>
            <div className=" w-[20rem] md:w-[24rem]  h-auto">
               <div className="flex flex-col space-y-3 justify-center items-center">
                  <AiOutlineCheckCircle className="text-green-600 text-5xl" />
                  <p className="text-lg font-semibold mt-2">
                     {countryToEdit.name}{' '}
                     {successAction ? 'activated' : 'deactivation'}.
                  </p>
                  <p className="text-sm text-center text-textColor mt-2">
                     {countryToEdit.name} has been{' '}
                     {successAction ? 'activated' : 'deactivation'}{' '}
                     successfully.
                  </p>
               </div>
            </div>
         </Modal>
      </div>
   );
};

Add_country.getLayout = Layout;
export default Add_country;
