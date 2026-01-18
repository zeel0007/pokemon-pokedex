import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const randomId = Math.floor(Math.random() * 1017) + 1;

    async function fetchPokemon() {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      const data = await res.json();

      setPokemon({
        id: data.id,
        name: data.name,
        image:
          data.sprites.other["official-artwork"].front_default ||
          data.sprites.front_default,
        types: data.types.map((t) => t.type.name),
      });
    }

    fetchPokemon();
  }, []);

  if (!pokemon) {
    return (
      <div className="h-[calc(100vh-80px)] bg-[#0a0a0f] flex items-center justify-center ">
        <p className="text-white/60 animate-pulse text-lg">
          Loading Pokémon...
        </p>
      </div>
    );
  }

  return (
    <div className="relative top-20 h-[calc(100vh-80px)] bg-[#0a0a0f] overflow-hidden">

      {/* background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-purple-600/20 blur-[180px] rounded-full" />
      </div>

      {/* hero section */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">

        {/* floating pokemon */}
        <motion.img
          key={pokemon.id}
          src={pokemon.image}
          alt={pokemon.name}
          className="w-[520px] drop-shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -22, 0],
          }}
          transition={{
            opacity: { duration: 0.6 },
            scale: { duration: 0.6 },
            y: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />

        {/* name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-4xl font-bold text-white capitalize tracking-wide"
        >
          {pokemon.name}
        </motion.h1>

        {/* types */}
        <div className="flex gap-3 mt-4">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="px-4 py-1 text-sm rounded-full
              bg-white/10 border border-white/20
              text-white capitalize backdrop-blur-md"
            >
              {type}
            </span>
          ))}
        </div>

        {/* subtitle */}
        <p className="mt-6 text-zinc-400 text-center max-w-md">
          Discover Pokémon from every region.  
          Explore stats, abilities, and evolutions in one place.
        </p>
      </div>
    </div>
  );
};

export default Home;
