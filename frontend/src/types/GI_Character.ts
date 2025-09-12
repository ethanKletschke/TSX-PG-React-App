/**
 * An interface that defines a row of the returned data
 * from the database.
 * @author Ethan Kletschke
 */
export default interface GI_Character {
  charName: string;
  lvl: number;
  element: string;
  weapon: string;
  constellation: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  rarity: 4 | 5;
}
