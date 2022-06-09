import Link from "next/link"

export default function NavBar(){
    return <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 border-b-2">
    <div className="container flex flex-wrap justify-between items-center mx-auto">
    <Link href="/">
    <a className="flex items-center">
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">WaniKani</span>
    </a>  
    </Link>
    <div className="flex md:order-2">
        <Link href="/profile">
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Profile</button>
        </Link>
    </div>
    <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
      <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        <li>
          <Link href="/level/">
            <a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Levels</a>
          </Link>
        </li>
      </ul>
    </div>
    </div>
  </nav>
}