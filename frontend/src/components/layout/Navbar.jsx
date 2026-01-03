import { UserButton } from "@clerk/clerk-react";
import { Home, Workflow, FileText } from "lucide-react";
import { NavLink } from "react-router";

const navLinks = [
    {
        name: "Home",
        link: "/home",
        icon: <Home className="w-4 h-4" />
    },
    {
        name: "Record",
        link: "/record",
        icon: <FileText className="w-4 h-4" />
    },
    {
        name: "Process",
        link: "/process",
        icon: <Workflow className="w-4 h-4" />
    }
];

export const Navbar = () => {
    return (
        <section className="w-full h-[64px] flex justify-between items-center bg-[#ffffff] border-b border-bg-zinc-700 border-box px-6 py-4">
            <nav className="w-max flex justify-center gap-4">
                {navLinks.map((navlink, index) => (
                    <NavLink
                        to={navlink.link}
                        key={index}
                        className={({ isActive }) =>
                            `text-md font-semibold flex flex-row gap-2 items-center px-3 py-[5.5px] rounded-full transition-all duration-200 
                  ${isActive
                                ? 'bg-black text-white shadow-sm'
                                : 'text-gray-700 hover:bg-gray-200 hover:text-black'
                            }`
                        }
                    >
                        {navlink.icon}
                        {navlink.name}
                    </NavLink>
                ))}
            </nav>
            <UserButton />
        </section>
    )
}