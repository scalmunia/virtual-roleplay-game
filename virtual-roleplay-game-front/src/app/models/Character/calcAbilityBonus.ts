import { ABILITY_SCORES_AND_MODIFIERS } from "./character.constants";

export function calcAbilityModifier(abilityScore: number) {
  const modifier = ABILITY_SCORES_AND_MODIFIERS[abilityScore as keyof typeof ABILITY_SCORES_AND_MODIFIERS];

  return modifier;
}