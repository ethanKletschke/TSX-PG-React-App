import { useEffect, useState } from "react";
import TableRow from "./components/TableRow/TableRow";
import type GI_Character from "./types/GI_Character";

export default function App() {
  // The character rows
  const [chars, setChars] = useState<GI_Character[]>([]);
  // A flag indicating if the page is loading or not.
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch the data from the database API
  useEffect(() => {
    fetch("http://localhost:3000/api/chars")
      .then(res => res.json())
      .then((data: GI_Character[]) => {
        setChars(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  // Display that the page is loading if the server hasn't returned data yet
  if (isLoading || chars.length === 0) {
    return (
      <main>

        <h2>Loading...</h2>
        <p>Try refresh the page if it doesn't load.</p>
      </main>
    )
  }

  return (
    <main>
      <h1>Genshin Characters</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>XP Level</th>
            <th>Element</th>
            <th>Weapon</th>
            <th>Constellation</th>
            <th>Rarity (Stars)</th>
          </tr>
        </thead>
        <tbody>
          {/* Display the returned data as rows in a table */}
          {chars.map(genchar => (
            <TableRow
              char={genchar}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}
