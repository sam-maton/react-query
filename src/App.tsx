import { useState, useEffect } from "react";
import { Button } from "./components/button";
import "./App.css";
import { useQuery } from "@tanstack/react-query";

type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
  };
};

async function getPokemonById(id: number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data = await response.json();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data;
}

function App() {
  // Basic React Query example
  const [id, setId] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["todos", id],
    queryFn: () => getPokemonById(id),
  });
  return (
    <div className="w-40 m-auto flex flex-col gap-4 pt-20">
      <div className="flex flex-col items-center">
        {isLoading ? (
          <div className="w-24 h-24"></div>
        ) : (
          <img
            className="w-24 h-24"
            src={data?.sprites["front_default"]}
            alt="The current pokemon image"
          />
        )}
        <h2 className="capitalize">{isLoading ? "loading..." : data?.name}</h2>
      </div>
      <div className="flex flex-row justify-around">
        <Button
          disabled={id < 2}
          onClick={() => {
            setId((id) => id - 1);
          }}
        >
          Prev
        </Button>
        <Button
          onClick={() => {
            setId((id) => id + 1);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

// function App() {
//   // Basic useEffect example
//   const [id, setId] = useState(1);
//   const [pokemon, setPokemon] = useState<Pokemon | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     let ignore = false;
//     const getPokemonById = async () => {
//       setLoading(true);
//       const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
//       const data = await response.json();

//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       if (!ignore) {
//         setPokemon(data);
//         setLoading(false);
//       }
//     };

//     getPokemonById();

//     return () => {
//       ignore = true;
//     };
//   }, [id]);
//   return (
//     <div className="w-40 m-auto flex flex-col gap-4 pt-20">
//       <div className="flex flex-col items-center">
//         {loading ? (
//           <div className="w-24 h-24"></div>
//         ) : (
//           <img
//             className="w-24 h-24"
//             src={pokemon?.sprites["front_default"]}
//             alt="The current pokemon image"
//           />
//         )}
//         <h2 className="capitalize">{loading ? "loading..." : pokemon?.name}</h2>
//       </div>
//       <div className="flex flex-row justify-around">
//         <Button
//           disabled={id < 2}
//           onClick={() => {
//             setId((id) => id - 1);
//           }}
//         >
//           Prev
//         </Button>
//         <Button
//           onClick={() => {
//             setId((id) => id + 1);
//           }}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }

export default App;
