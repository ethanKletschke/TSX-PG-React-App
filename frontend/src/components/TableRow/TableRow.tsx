import type GI_Character from "../../types/GI_Character";

interface TableRowProps {
  char: GI_Character
}

export default function TableRow({ char }: TableRowProps) {
  // Destructure the char property
  const { charName, lvl, element, weapon, constellation, rarity } = char;

  // Return a table row with the database's data.
  return (
    <tr>
      <td>{charName}</td>
      <td>{lvl}</td>
      <td>{element}</td>
      <td>{weapon}</td>
      <td>{constellation}</td>
      <td>{rarity}</td>
    </tr>
  );
}
