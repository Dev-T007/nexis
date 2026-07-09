import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import {
  Home,
  PlaySquare,
  ThumbsUp,
  History,
  ListVideo,
  Users,
  LayoutDashboard,
  MessageSquare,
  Bookmark,
} from "lucide-react";
import { selectCurrentUser, selectIsAuthenticated } from "../../features/auth/authSlice";

const Sidebar = ({ isOpen }) => {
  const currentUser = useSelector(selectCurrentUser);
  const username = currentUser?.username || '';

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: PlaySquare, label: "Subscriptions", path: "/subscriptions" },
    { icon: History, label: "History", path: "/history" },
    { icon: ThumbsUp, label: "Liked Videos", path: "/liked-videos" },
    { icon: Bookmark, label: "Saved Videos", path: "/saved-videos" },
    { icon: Users, label: "My Channel", path: `/channel/${username}` },
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  ];

  return (
    <aside
      className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] bg-zinc-950 border-r border-zinc-800 transition-all duration-300 z-40 overflow-y-auto overflow-x-hidden
        ${isOpen ? 'w-56' : 'w-16'}`}
    >
      <nav className="py-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          return (
            <NavLink
              key={path}
              to={path}
              className={({isActive}) => `flex items-center gap-4 px-4 py-3 text-sm transition-colors rounded-lg mx-1 my-0.5
                ${
                  isActive
                    ? 'bg-zinc-800 text-white font-medium'
                    : 'text-zinc-400 hover:bg-zinc-900  hover:text-white'
                }`}
            >
              <Icon size={20} className="shrink-0" />
              {isOpen && <span className="truncate">{label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;