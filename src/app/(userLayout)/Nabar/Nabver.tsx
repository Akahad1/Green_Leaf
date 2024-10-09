import Link from "next/link";

const Nabver = () => {
  return (
    <div className="top-0 sticky z-50 w-full">
      <div className="navbar bg-base-100  border-b  w-[90%] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Link href="/imageGallery">Image gallery</Link>
              </li>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/aboutUs">About Us</Link>
              </li>
              <li>
                <Link href="/contactUs ">Contact Us </Link>
              </li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-xl">
            {/* <Image src={brandLogo} width={30} height={30} alt="brand logo" /> */}
            Green Leaf
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/imageGallery">Image gallery</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/aboutUs">About Us</Link>
            </li>
            <li>
              <Link href="/contactUs ">Contact Us </Link>
            </li>
            <button></button>
          </ul>
        </div>
        <div className="navbar-end">
          <Link
            href="/blogs/create"
            className="btn btn-accent text-white rounded-full px-5"
          >
            Post Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nabver;
