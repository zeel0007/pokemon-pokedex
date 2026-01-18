import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const typeColors = {
  fire: "#ff6b3d",
  ghost: "#a855f7",
  fighting: "#f97316",
  steel: "#94a3b8",
  poison: "#c084fc",
  flying: "#60a5fa",
  default: "#ffffff",
};

export default function Card() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonId, setPokemonId] = useState(1);

  // FETCH POKEMON
  useEffect(() => {
    async function fetchPokemon() {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      const data = await res.json();

      setPokemon({
        id: data.id,
        name: data.name,
        image:
          data.sprites.other["official-artwork"].front_default ||
          data.sprites.front_default,
        types: data.types.map((t) => t.type.name),
        power:
          data.stats.find((s) => s.stat.name === "attack")
            ?.base_stat || 80,
      });
    }

    fetchPokemon();
  }, [pokemonId]);

  if (!pokemon) {
    return (
      <div className="h-[calc(100vh-80px)] bg-[#0a0a0f] flex items-center justify-center">
        <p className="text-white/60 animate-pulse">
          Loading Pokémon...
        </p>
      </div>
    );
  }

  const glow =
    typeColors[pokemon.types[0]] || typeColors.default;

  const updatePokemon = () => {
    setPokemonId((prev) => prev + 1);
  };

  const randomPokemon = () => {
    const randomId = Math.floor(Math.random() * 1017) + 1;
    setPokemonId(randomId);
  };

  return (
    <div className="h-[calc(100vh-80px)] relative top-20 bg-[#0a0a0f] flex items-center justify-center">

      {/* CARD */}
      <motion.div
        key={pokemon.id}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="
          relative
          w-[280px] h-[460px]
          rounded-[26px]
          bg-gradient-to-b from-[#141421] to-[#0b0b14]
          border border-white/10
          shadow-[0_30px_100px_rgba(0,0,0,0.8)]
        "
      >

        {/* shine */}
        <motion.div
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r
          from-transparent via-white/10 to-transparent
          rounded-[26px]"
        />

        {/* glow */}
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2
          w-[220px] h-[220px] blur-3xl opacity-50"
          style={{ background: glow }}
        />

        {/* pokemon image */}
        <motion.img
          src={pokemon.image}
          alt={pokemon.name}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="
            absolute -top-24 left-1/2 -translate-x-1/2
            w-[220px] z-32 mix-blend-lighten 
          "
          style={{ filter: `drop-shadow(0 30px 60px ${glow})` }}
        />

        {/* info panel */}
        <div
          className="absolute bottom-16 w-full px-5 py-5
          bg-white/5 backdrop-blur-xl
          border-t border-white/10-" 
        >
          <h2 className="text-xl text-white font-semibold text-center capitalize">
            {pokemon.name}
          </h2>

          <div className="flex justify-center gap-2 mt-3">
            {pokemon.types.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs rounded-full
                bg-white/10 border border-white/20
                text-white capitalize" 
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-5">
            <p className="text-xs text-zinc-400 mb-1">Power</p>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pokemon.power}%` }}
                transition={{ duration: 0.8 }}
                className="h-full"
                style={{ background: glow }}
              />
            </div>
          </div>
        </div>

        {/* BUTTONS — INSIDE CARD */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
          <button
            onClick={updatePokemon}
            className="
              px-5 py-2 rounded-full
              bg-white/10 backdrop-blur-xl
              border border-white/20
              text-white text-sm font-semibold
              hover:bg-white/20 hover:scale-105
              transition-all
            "
          >
            Update
          </button>

          <button
            onClick={randomPokemon}
            className="
              px-5 py-2 rounded-full
              bg-white/10 backdrop-blur-xl
              border border-white/20
              text-white text-sm font-semibold
              hover:bg-white/20 hover:scale-105
              transition-all
            "
          >
            Random
          </button>
        </div>
      </motion.div>
    </div>
  );
}
