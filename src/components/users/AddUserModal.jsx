/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import ModalCloseButton from "./ModalCloseButton";

export default function AddUserModal(props) {
  console.log(props);

  const { showModal, setShowModal, text } = props;
  const [loading, setLoading] = useState(false);

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
          className={`py-7.6 fixed left-0 top-0 z-99999 flex h-screen w-full items-center justify-center bg-black/90 px-4 dark:bg-dark/70 sm:px-8 `}>
          <div
            ref={divRef}
            className='shadow-7 relative h-auto max-h-[calc(100vh-60px)] w-full max-w-[900px] scale-100 transform overflow-y-auto rounded-[25px] bg-white transition-all dark:bg-black'>
            <ModalCloseButton closeModal={setShowModal} />

            <div className='flex flex-wrap gap-5.5 border-b border-stroke p-4 dark:border-stroke-dark sm:p-7.5 xl:p-10'>
              <h3 className='mb-1.5 font-satoshi text-custom-2xl font-bold tracking-[-.5px] text-dark dark:text-white'>
                {text}
              </h3>

              <form className='w-full space-y-4'>
                <div className='mt-2 items-center md:flex'>
                  <div className='flex w-full flex-col md:w-1/2'>
                    <div className='mb-4'>
                      <label className='mb-2 block font-satoshi text-base font-medium text-dark dark:text-white'>
                        Name
                      </label>
                      <input
                        type='text'
                        placeholder='Enter physician name'
                        className='w-full rounded-lg border border-gray-3 px-5.5 py-3 text-dark outline-none dark:border-stroke-dark dark:bg-black dark:text-white'
                      />
                    </div>

                    <div className='mb-4'>
                      <label className='mb-2 block font-satoshi text-base font-medium text-dark dark:text-white'>
                        Email Address
                      </label>
                      <input
                        type='email'
                        placeholder='jhon@gmail.com'
                        className='w-full rounded-lg border border-gray-3 px-5.5 py-3 text-dark outline-none dark:border-stroke-dark dark:bg-black dark:text-white'
                      />
                    </div>
                  </div>
                </div>
                <div className='mt-11'>
                  <button>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
