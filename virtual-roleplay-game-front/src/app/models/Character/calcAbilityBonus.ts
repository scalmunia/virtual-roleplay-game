import { Abilities, ICharacter } from "./Character";
import { ABILITY_SCORES_AND_MODIFIERS } from "./character.constants";

export function calcAbilityModifier(character: ICharacter, ability: keyof Abilities) {
  if (character.hasOwnProperty(ability)) {
    const abilityValue = character[ability];
    const modifier = ABILITY_SCORES_AND_MODIFIERS[abilityValue as keyof typeof ABILITY_SCORES_AND_MODIFIERS];

    //Calcular el modificador final añadiendo el equipo
    let finalModifier = modifier;

    // Recorrer el equipo y aplicar modificadores adicionales si se encuentra el ability en attributes
    character.equipment.forEach((equipment) => {
      equipment.attributes.forEach((attribute) => {
        if (attribute.name === ability) {
          finalModifier += attribute.bonus;
        }
      });
    });

    // Actualizar la propiedad del personaje con el modificador final
    character[ability] = abilityValue + finalModifier;

    return finalModifier;
  }

  return 0;
}
