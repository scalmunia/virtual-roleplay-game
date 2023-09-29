import { ABILITY_SCORES_AND_MODIFIERS, HIT_DICE_ACCORDING_TO_CLASSES } from "./character.constants";

export function calcMaximunLife(character) {
  // Calcular el dado de golpe
  const hitDice = HIT_DICE_ACCORDING_TO_CLASSES[character.characterClass as keyof typeof HIT_DICE_ACCORDING_TO_CLASSES];

  // Calcular el modificador de constitucion 
  const constitution = character.constitution;
  const modifier = ABILITY_SCORES_AND_MODIFIERS[constitution];

  // Calcular la vida máxima
  const maximunLife = hitDice + modifier;

  // Recorrer el equipo y aplicar modificadores adicionales si se encuentra hitPoint en attributes
  let hitPointValue = maximunLife;
  character.equipment.forEach((equipment) => {
    equipment.attributes.forEach((attribute) => {
      if (attribute.name === 'hitPoints') {
        hitPointValue += attribute.bonus;
      }
    });
  });

  return hitPointValue;
}