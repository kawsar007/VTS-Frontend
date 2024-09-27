import { useState } from "react";
import AddModal from "../../../common/modals/add-modal";

const people = [
  {
    name: "John Doe",
    address: "Madaripur",
    contact: "2569871",
    assigned_vehicle: "dk-metro-cha-003",
    image:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
  },
  {
    name: "John Doe",
    address: "Middle Badda, Dhaka",
    contact: "2454371",
    assigned_vehicle: "dk-metro-cha-003",
    image:
      "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  },
  {
    name: "John Doe",
    address: "Madaripur",
    contact: "2569871",
    assigned_vehicle: "dk-metro-cha-003",
    image:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
  },
  {
    name: "John Doe",
    address: "Middle Badda, Dhaka",
    contact: "2454371",
    assigned_vehicle: "dk-metro-cha-003",
    image:
      "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  },
  {
    name: "John Doe",
    address: "Madaripur",
    contact: "2569871",
    assigned_vehicle: "dk-metro-cha-003",
    image:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
  },
  {
    name: "John Doe",
    address: "Middle Badda, Dhaka",
    contact: "2454371",
    assigned_vehicle: "dk-metro-cha-003",
    image:
      "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  },
  {
    name: "John Doe",
    address: "Madaripur",
    contact: "2569871",
    assigned_vehicle: "dk-metro-cha-003",
    image:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
  },
  {
    name: "John Doe",
    address: "Middle Badda, Dhaka",
    contact: "2454371",
    assigned_vehicle: "dk-metro-cha-003",
    image:
      "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  },
  {
    name: "John Doe",
    address: "Madaripur",
    contact: "2569871",
    assigned_vehicle: "dk-metro-cha-003",
    image:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
  },
  {
    name: "John Doe",
    address: "Middle Badda, Dhaka",
    contact: "2454371",
    assigned_vehicle: "dk-metro-cha-003",
    image:
      "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  },
];

export function Manager() {
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);

  return (
    <>
      <section className='mx-auto w-full py-4'>
        <div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0'>
          <div>
            <h2 className='text-lg font-semibold'>All Managers</h2>
            <p className='mt-1 text-sm text-gray-700'>
              This is a list of all managers. You can add new managers, edit or
              delete existing ones.
            </p>
          </div>
          <div>
            <button
              onClick={() => setShowModal(true)}
              type='button'
              className='rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
              Create Manager
            </button>
          </div>
        </div>
        <div className='mt-6 flex flex-col'>
          <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
              <div className='overflow-hidden border border-gray-200 md:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr className='divide-x divide-gray-200'>
                      <th
                        scope='col'
                        className='px-4 py-3.5 text-left text-sm font-normal text-gray-500'>
                        <span>Name</span>
                      </th>
                      <th
                        scope='col'
                        className='px-12 py-3.5 text-left text-sm font-normal text-gray-500'>
                        Address
                      </th>

                      <th
                        scope='col'
                        className='px-4 py-3.5 text-left text-sm font-normal text-gray-500'>
                        Contact
                      </th>

                      <th
                        scope='col'
                        className='px-4 py-3.5 text-left text-sm font-normal text-gray-500'>
                        Assigned Vehicle
                      </th>
                      <th scope='col' className='relative px-4 py-3.5'>
                        <span>Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200 bg-white'>
                    {people.map((person) => (
                      <tr
                        key={person.name}
                        className='divide-x divide-gray-200'>
                        <td className='whitespace-nowrap px-4 py-4'>
                          <div className='flex items-center'>
                            <div className='h-10 w-10 flex-shrink-0'>
                              <img
                                className='h-10 w-10 rounded-full object-cover'
                                src={person.image}
                                alt=''
                              />
                            </div>
                            <div className='ml-4'>
                              <div className='text-sm font-medium text-gray-900'>
                                {person.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='whitespace-nowrap px-12 py-4'>
                          <div className='text-sm text-gray-900'>
                            {person.address}
                          </div>
                        </td>
                        <td className='whitespace-nowrap px-4 py-4'>
                          <div className='text-sm text-gray-500'>
                            {person.contact}
                          </div>
                        </td>
                        <td className='whitespace-nowrap px-4 py-4'>
                          <div className='text-sm text-gray-500'>
                            {person.assigned_vehicle}
                          </div>
                        </td>
                        <td className='whitespace-nowrap px-4 py-4 text-right text-sm font-medium'>
                          <a
                            href='#'
                            className='text-gray-500 hover:text-indigo-600'>
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-4 w-full border-gray-300'>
          <div className='mt-2 flex items-center justify-end'>
            <div className='space-x-2'>
              <button
                type='button'
                className='rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                &larr; Previous
              </button>
              <button
                type='button'
                className='rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <AddModal
          showModal={showModal}
          setShowModal={setShowModal}
          text={"Add Manager"}
          loading={false}
        />
      )}
    </>
  );
}
