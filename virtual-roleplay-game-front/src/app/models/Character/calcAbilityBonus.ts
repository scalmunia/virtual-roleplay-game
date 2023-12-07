import { Abilities, Bonus, ICharacter } from "./Character";
import { ABILITY_SCORES_AND_MODIFIERS } from "./character.constants";

export function calcAbilityModifier(character: ICharacter, ability: keyof Abilities) {
  if (character.hasOwnProperty(ability)) {
    const abilityValue = character[ability];
    const modifier = ABILITY_SCORES_AND_MODIFIERS[abilityValue as keyof typeof ABILITY_SCORES_AND_MODIFIERS];

    // Calcular el modificador final añadiendo el equipo
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

  return 0;
}

export function calcAbilitiesBonus(character: ICharacter): Bonus {
  return {
    charisma: calcAbilityModifier(character, 'charisma'),
    constitution: calcAbilityModifier(character, 'constitution'),
    dexterity: calcAbilityModifier(character, 'dexterity'),
    intelligence: calcAbilityModifier(character, 'intelligence'),
    strength: calcAbilityModifier(character, 'strength'),
    wisdom: calcAbilityModifier(character, 'wisdom'),
  }
}