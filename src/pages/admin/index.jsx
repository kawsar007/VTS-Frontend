import { FaHome } from "react-icons/fa";
import Layout from "./Layout";

const menuItems = [
  {
    label: "Analytics",
    items: [
      {
        name: "Dashboard",
        href: "/admin",
        icon: FaHome,
      },
      {
        name: "Analytics",
        href: "/admin/analytics",
        icon: FaHome,
      },
    ],
  },
  {
    label: "Content",
    items: [
      {
        name: "Guides",
        href: "/admin/guides",
        icon: FaHome,
      },
    ],
  },
];

const Admin = () => {
  return (
    <div>
      <Layout menuItems={menuItems}>
        <p>hello</p>
      </Layout>
      {/* <div className='w-full py-14 md:max-w-[1480px] m-auto max-w-[600px] px-4 md:px-0'>
        <div>
          <div className='flex h-screen'>
            <div className='w-2/12'>
              <Sidebar
                menuItems={menuItems}
              />
            </div>

            <div className='w-10/12 border p-4 mt-10'>
              <p>Right Section (10 columns)</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Admin;
