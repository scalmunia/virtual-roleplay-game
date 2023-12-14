import { Abilities, ICharacter } from "./Character";
import { ABILITY_SCORES_AND_MODIFIERS } from "./character.constants";

export function calcAbilityModifier(character: ICharacter, ability: keyof Abilities): number {
  if (!character || !character.abilities) return 0;

  const abilityValue = character.abilities[ability];
  if (abilityValue === undefined) return 0;

  const modifier = ABILITY_SCORES_AND_MODIFIERS[abilityValue as keyof typeof ABILITY_SCORES_AND_MODIFIERS];

  let finalModifier = modifier;

  // Recorrer el equipo y aplicar modificadores adicionales si se encuentra el ability en attributes
  character.equipment.forEach((equipment) => {
    equipment.attributes.forEach((attribute) => {
      if (attribute.name === ability) {
        finalModifier += attribute.bonus;
      }
    });
  });

  return finalModifier;
}