import React from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="
        fixed top-0 left-0 w-full z-50
        bg-black/70 backdrop-blur-2xl
        border-b border-white/10
      "
    >
      <div className="max-w-7xl mx-auto px-10 py-4 flex items-center justify-between">

        {/* LEFT — LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
            <img
              src="logo-i.png"
              alt="logo"
              className="w-10"
            />
          </div>

          <span className="text-white font-semibold tracking-wider text-lg">
            Pokédex
          </span>
        </div>

        {/* CENTER — LINKS */}
        <div className="hidden md:flex gap-10 text-sm text-zinc-300">
          {["Home", "Explore", "Pokémon", "About"].map((item) => (
            <p
              key={item}
              className="
                cursor-pointer
                hover:text-white
                transition
                relative
                after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:w-0 after:bg-red-500
                hover:after:w-full after:transition-all
              "
            >
              {item}
            </p>
          ))}
        </div>

        {/* RIGHT — ACTION */}
        <button
          className="
            px-6 py-2 rounded-full
            bg-red-500/90 hover:bg-red-500
            text-white font-semibold text-sm
            shadow-[0_0_25px_rgba(239,68,68,0.4)]
            hover:scale-105
            transition-all
          "
        >
          Start Exploring
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
