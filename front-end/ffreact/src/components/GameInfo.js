export default function GameInfo({ game }) {
  return (
    <>
      <h1>
        {game.map((game) => game.title)} Released:{" "}
        {game.map((game) => game.releaseDate)} Platform:{" "}
        {game.map((game) => game.platform)}{" "}
      </h1>
      <img src={game.map((game) => game.picture)}></img>
      <p>Description: {game.map((game) => game.description)}</p>
    </>
  );
}
