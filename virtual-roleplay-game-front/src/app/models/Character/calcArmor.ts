import { ICharacter } from "./Character";

export function calcArmor(character: ICharacter) {
  // console.log('character', character);
  const minimumArmorValue: number = 10;

  let armorValue = minimumArmorValue
  character.equipment.forEach((equipment) => {
    equipment.attributes.forEach((attribute) => {
      if (attribute.name === 'armor') {
        armorValue += attribute.bonus;
      }
    });
  });

  return armorValue;
}