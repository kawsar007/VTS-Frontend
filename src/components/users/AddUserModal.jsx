/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { axiosOpen } from "../../api/axios";
import InputField from "../../common/InputField";
import LoadingButton from "../../common/LoadingButton";
import ModalCloseButton from "./ModalCloseButton";

export default function AddUserModal(props) {
  const { showModal, setShowModal, text } = props;
  const [loading, setLoading] = useState(false);

  console.log(loading);
  const userId = 12;

  // Validation schema using Yup
  // const schema = yup.object().shape({
  //   first_name: yup.string().required("First Name is required"),
  //   last_name: yup.string().required("Last Name is required"),
  //   user_name: yup.string().required("Username is required"),
  //   email: yup.string().email("Invalid email").required("Email is required"),
  //   address_line_one: yup.string().required("Address Line One is required"),
  //   address_line_two: yup.string(),
  //   division: yup.string().required("Division is required"),
  //   district: yup.string().required("District is required"),
  //   phone: yup
  //     .string()
  //     .required("Phone number is required")
  //     .matches(/^\d+$/, "Phone number must be digits"),
  //   role: yup.string().required("Role is required"),
  //   is_active: yup.string().required("Status is required"),
  //   password: yup
  //     .string()
  //     .required("Password is required")
  //     .min(8, "Password must be at least 8 characters"),
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosOpen.post(
        `/user/create/info?id=${userId}`,
        data,
      );
      console.log(response.data);
      toast.success(response.data?.message);
      // Optionally, close the modal or reset the form here
    } catch (error) {
      console.error("Error adding user:", error);
      // Handle error appropriately
    } finally {
      setLoading(false); // Stop loading after the API call
    }
  };

  // ===== click outside of dropdown =====
  const divRef = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
          setShowModal(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  });

  return (
    <>
      {showModal && (
        <div
          className={`py-7.6 fixed left-0 top-0 z-99999 flex h-screen w-full items-center justify-center bg-black/60 px-4 sm:px-8 `}>
          <div
            ref={divRef}
            className='shadow-7 relative h-auto max-h-[calc(100vh-60px)] w-full max-w-[900px] scale-100 transform overflow-y-auto rounded-[25px] bg-white transition-all'>
            <ModalCloseButton closeModal={setShowModal} />

            <div className='flex flex-wrap gap-5.5 border-b border-stroke p-4 sm:p-7.5 xl:p-10'>
              <h3 className='mb-1.5 font-satoshi text-custom-2xl font-bold tracking-[-.5px] text-dark'>
                {text}
              </h3>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-full space-y-4'>
                <div className='mt-2 gap-5 items-center md:flex'>
                  <div className='flex w-full flex-col md:w-1/2'>
                    <InputField
                      label='First Name'
                      name='first_name'
                      type='text'
                      placeholder='Enter first name'
                      register={register}
                      errors={errors}
                    />

                    <InputField
                      label='Email Address'
                      name='email'
                      type='email'
                      placeholder='jhon@gmail.com'
                      register={register}
                      errors={errors}
                    />
                    <InputField
                      label='Address Line One'
                      name='address_line_one'
                      type='text'
                      placeholder='Enter address one'
                      register={register}
                      errors={errors}
                    />
                    <InputField
                      label='Division'
                      name='division'
                      type='text'
                      placeholder='Enter Division'
                      register={register}
                      errors={errors}
                    />
                    <InputField
                      label='Password'
                      name='password'
                      type='password'
                      placeholder='Enter password'
                      register={register}
                      errors={errors}
                    />
                    <div className='mt-4'>
                      <label className='mb-2 block font-satoshi text-base font-medium text-dark'>
                        Role
                      </label>
                      <select
                        {...register("role")}
                        className={`mt-1 block w-full rounded-md border p-[10px] sm:text-sm ${
                          errors.role ? "border-red-500" : ""
                        }`}>
                        <option value=''>Select Role</option>
                        <option value='admin'>Admin</option>
                        <option value='user'>User</option>
                        <option value='owner'>Owner</option>
                      </select>
                      {errors.role && (
                        <p className='text-red-500 text-sm'>
                          {errors.role.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='flex w-full flex-col md:w-1/2'>
                    <InputField
                      label='Last Name'
                      name='last_name'
                      type='text'
                      placeholder='Enter first name'
                      register={register}
                      errors={errors}
                    />
                    <InputField
                      label='Username'
                      name='user_name'
                      type='text'
                      placeholder='Enter your username'
                      register={register}
                      errors={errors}
                    />
                    <InputField
                      label='Address Line Two'
                      name='address_line_two'
                      type='text'
                      placeholder='Enter address two'
                      register={register}
                      errors={errors}
                    />
                    <InputField
                      label='District'
                      name='district'
                      type='text'
                      placeholder='Enter District'
                      register={register}
                      errors={errors}
                    />
                    <InputField
                      label='Phone'
                      name='phone'
                      type='text'
                      placeholder='Enter phone number'
                      register={register}
                      errors={errors}
                    />
                    <div className='mt-4'>
                      <label className='mb-2 block font-satoshi text-base font-medium text-dark'>
                        Is Active
                      </label>
                      <select
                        {...register("is_active")}
                        className={`mt-1 block w-full rounded-md border p-[10px] sm:text-sm ${
                          errors.is_active ? "border-red-500" : ""
                        }`}>
                        <option value=''>Select Status</option>
                        <option value='1'>Active</option>
                        <option value='0'>Inactive</option>
                      </select>
                      {errors.status && (
                        <p className='text-red-500 text-sm'>
                          {errors.is_active.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className='mt-11'>
                  {/* <FormSubmitButton>Add User </FormSubmitButton> */}
                  <LoadingButton
                    isLoading={loading}
                    text='Add User'
                    loadingText='Adding User...'
                    type='submit'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
