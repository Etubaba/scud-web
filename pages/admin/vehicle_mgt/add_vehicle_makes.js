import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
   AiOutlineCheckCircle,
   AiOutlinrate,
   AiOutlinePhone,
   AiOutlineDollar,
} from 'react-icons/ai';
import { BsLock, BsPerson } from 'react-icons/bs';
import { TbActivityHeartbeat } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../../api/base';
import Layout from '../../../components/Admin/Layout';
import BreadCrumbs from '../../../components/common/BreadCrumbs';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Modal from '../../../components/common/Modal';
import Select from '../../../components/common/Select';
import { getToken } from '../../../components/services/refresh';
import { editMake } from '../../../features/editSlice';

const AddVehicleMake = () => {
   const [currencyname, setCurrencyname] = useState('');
   const [rate, setRate] = useState('');

   const [vmake, setVmake] = useState('Select vehicle makes');

   const [status, setStatus] = useState('Select Status');
   const [disabled, setDisabled] = useState(true);
   const [successModal, setSuccessModal] = useState(false);
   const [successAction, setSuccessAction] = useState('');
   const [loading, setLoading] = useState(false);

   const router = useRouter();
   const dispatch = useDispatch();
   const editId = useSelector((state) => state.edit.vehicle_make);

   const { enqueueSnackbar, closeSnackbar } = useSnackbar();

   const makes = ['BMW', 'Audi', 'Lexus', 'Toyota', 'Honda', 'Ford'];
   const statusList = ['Active', 'Inactive'];
   //change button from disable to able
   useEffect(() => {
      const admin = true;
      getToken(admin);
      if (vmake !== 'Select vehicle makes' && status !== 'Select Status') {
         setDisabled(false);
      }
   }, [vmake, status]);

   useEffect(() => {
      if (editId !== null) {
         setStatus(editId?.is_active ? 'Active' : 'Inactive');
         setVmake(editId?.name);
      }
   }, [editId]);

   // create vehicle make

   const createMake = async () => {
      setLoading(true);
      try {
         const AUTH_TOKEN = Cookies.get('adminAccessToken');
         axios.defaults.headers.common['Authorization'] =
            'Bearer ' + AUTH_TOKEN;
         axios.defaults.headers.get['Content-Type'] = 'application/json';
         const { data } = await axios.post(`${BASE_URL}vehicle-brands`, {
            name: vmake,
            is_active: status == 'Active' ? true : false,
         });
         if (data) {
            setLoading(false);
            setSuccessAction(vmake);
            setSuccessModal(true);
            setVmake('Select vehicle makes');
            setStatus('Select Status');
         }
      } catch (err) {
         setLoading(false);
         if (err.response) {
            const msg = err.response.data.message;
            for (let i = 0; i < msg.length; i++) {
               enqueueSnackbar(msg[i], {
                  variant: 'error',
               });
            }
         }
         console.log(err.message);
      }
   };
   const updateMake = async () => {
      setLoading(true);
      try {
         const AUTH_TOKEN = Cookies.get('adminAccessToken');
         axios.defaults.headers.common['Authorization'] =
            'Bearer ' + AUTH_TOKEN;
         axios.defaults.headers.get['Content-Type'] = 'application/json';
         const body = {
            name: vmake,
            is_active: status === 'Active' ? true : false,
         };
         if (body.name === editId?.name) delete body.name;
         if (body.is_active === editId?.is_active) delete body.active;

         const { data } = await axios.patch(
            `${BASE_URL}vehicle-brands/${editId?.id}`,
            body,
         );
         if (data) {
            setLoading(false);
            setSuccessAction(vmake);
            setSuccessModal(true);
            setVmake('Select vehicle makes');
            setStatus('Select Status');
            dispatch(editMake(null));
         }
      } catch (err) {
         setLoading(false);
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
         console.log(err.message);
      }
   };

   if (successModal) {
      setTimeout(() => setSuccessModal(false), 3000);
   }

   return (
      <div>
         {' '}
         <BreadCrumbs
            indexPath={'/admin/vehicle_mgt/vehicle_make'}
            index={'Vehicle Make'}
            secondItem="Add Vehicle Makes"
         />
         <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
            <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
               <p className="text-sm text-textColor mb-7">
                  Vehicle model details
               </p>
               <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
                  <div className="col-span-1">
                     <Select
                        data={makes}
                        style={'w-full p-3'}
                        positon={'p-4'}
                        value={vmake}
                        setValue={setVmake}
                        dropDownWidth={' w-[16.5rem] md:w-[27rem] mt-1'}
                        color=""
                     />
                  </div>

                  <div className="col-span-1">
                     <Select
                        data={statusList}
                        style={'w-full p-3'}
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
               onClick={() => router.push('/admin/payment_mgt/currency')}
               className="bg-white border min-w-[120px] md:min-w-[150px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-textColor mr-2"
            >
               Back
            </button>
            <Button
               loading={loading}
               disabled={disabled}
               onClick={editId === null ? createMake : updateMake}
               text={'Add Vehicle make'}
            />
         </div>
         <Modal onClose={() => setSuccessModal(false)} open={successModal}>
            <div className=" w-[20rem] md:w-[24rem]  h-auto">
               <div className="flex flex-col space-y-3 justify-center items-center">
                  <AiOutlineCheckCircle className="text-green-600 text-5xl" />
                  <p className="text-lg font-semibold mt-2">
                     {successAction} Added successfully.
                  </p>
                  <p className="text-sm text-center text-textColor mt-2">
                     {successAction} has been added as a vehicle make .
                  </p>
               </div>
            </div>
         </Modal>
      </div>
   );
};

AddVehicleMake.getLayout = Layout;
export default AddVehicleMake;
