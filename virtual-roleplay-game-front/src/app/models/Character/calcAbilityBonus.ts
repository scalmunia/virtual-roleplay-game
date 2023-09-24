import { Abilities, ICharacter } from "./Character";
import { ABILITY_SCORES_AND_MODIFIERS } from "./character.constants";

export function calcAbilityModifier(character: ICharacter, ability: keyof Abilities) {
  // console.log('character', character);

  if (character.hasOwnProperty(ability)) {
    const abilityValue = character[ability];
    // console.log('abilityValue', abilityValue)
    const modifier = ABILITY_SCORES_AND_MODIFIERS[abilityValue as keyof typeof ABILITY_SCORES_AND_MODIFIERS];

    //Calcular el modificador final añadiendo el equipo
    let finalModifier = modifier;

    // Recorrer el equipo y aplicar modificadores adicionales si se encuentra el ability en attributes
    character.equipment.forEach((equipment) => {
      equipment.attributes.forEach((attribute) => {
        if (attribute.name === ability) {
          // console.log('-----------------attribute.bonus', typeof attribute.bonus)
          finalModifier += parseInt(attribute.bonus);
        }
      });
    });

    // Actualizar la propiedad del personaje con el modificador final
    // console.log('finalModifier', finalModifier)
    character[ability] = abilityValue + finalModifier;
    // console.log('character[ability]', character[ability])

    return finalModifier;
  }

  return 0;
}
