import { useState } from "react";
import { Menu, Search, X } from "lucide-react";

function Navbar({ search, setSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="navbar">

        {/* Left - Report button */}
        <div className="navbar-left">
          <button className="report-button">
            + Report Item
          </button>
        </div>

        {/* Centre - Search */}
        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search lost items..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        {/* Right - Menu */}
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </header>

      {/* Dropdown menu */}
      {menuOpen && (
        <div className="navbar-menu">

          <button>
            Profile
          </button>

          <button>
            Items Found
          </button>

          <button>
            Items Lost
          </button>

          <div className="menu-divider" />

          <button className="logout-button">
            Logout
          </button>

        </div>
      )}
    </>
  );
}

export default Navbar;