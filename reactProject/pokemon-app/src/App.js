import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card/Card.js";
import { getAllPokemon } from "./utils/pokemon.js";
import { getPokemon } from "./utils/pokemon.js";
import Navbar from "./components/Navbar/Navbar.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  useEffect(() => {
    const fetchPokemonData = async function fetchPokemonData() {
      //すべてのポケモンのデータを取得
      let res = await getAllPokemon(initialURL);

      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setNextUrl(res.next);
      setPrevUrl(res.previous);
      // console.log(res.results);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    // console.log(data);
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);

  const handleNextPage = async () => {
    setLoading(true);
    let date = await getAllPokemon(nextUrl);
    await loadPokemon(date.results);
    setNextUrl(date.next);
    setPrevUrl(date.previous);
    setLoading(false);
  };
  const handlePrevPage = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let date = await getAllPokemon(prevUrl);
    await loadPokemon(date.results);
    setNextUrl(date.next);
    setPrevUrl(date.previous);
    setLoading(false);
  };
  return (
    <>
      <Navbar />
      <div className="App">
        {/* //¥ロード中の場合はロード中...と表示、ロードが終わったらポケモンデータを取得しましたと表示 */}
        {loading ? (
          <h1>ロード中...</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
