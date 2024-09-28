/* eslint-disable react/prop-types */
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormSubmitButton from "../../common/FormSubmitButton";
import InputField from "../../common/InputField";
import ModalCloseButton from "./ModalCloseButton";

export default function AddUserModal(props) {
  const { showModal, setShowModal, text } = props;
  const [loading, setLoading] = useState(false);

  // Validation schema using Yup
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    address: yup.string().required("Address is required"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number must be digits"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    setLoading(true);
    // Process the form data
    console.log(data);
    setLoading(false);
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
                      label='Name'
                      name='name'
                      type='text'
                      placeholder='Enter physician name'
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
                  </div>
                  <div className='flex w-full flex-col md:w-1/2'>
                    <InputField
                      label='Address'
                      name='address'
                      type='text'
                      placeholder='Enter your address'
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
                  </div>
                </div>
                <div className='mt-11'>
                  <FormSubmitButton>Add User </FormSubmitButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
