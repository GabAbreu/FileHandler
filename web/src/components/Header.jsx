import axios from "axios";

export default function Header(){
    return(
        <header className="w-full flex items-center justify-between px-8 py-4 bg-white">
            <div className="flex gap-2 items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/124/124837.png" alt="file" className="w-6 h-6" />
                <h1 className="font-semibold text-xl">FileHandler</h1>
            </div>
            <nav className="flex gap-4">
                <a /*href=""*/ className="hover:text-blue-500 cursor-pointer">Upload</a>
                •
                <a /*href=""*/ className="hover:text-blue-500 cursor-pointer">List</a>
                •
                <a /*href=""*/ className="hover:text-blue-500 cursor-pointer">Download</a>
            </nav>
        </header>
    )
}