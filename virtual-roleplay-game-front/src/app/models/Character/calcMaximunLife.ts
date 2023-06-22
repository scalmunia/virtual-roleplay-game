import { HIT_DICE_ACCORDING_TO_CLASSES } from "./character.constants";
import { calcAbilityModifier } from 'src/app/models/Character/calcAbilityBonus';

type Classes = 'barbarian' | 'bard' | 'warlock' | 'cleric' | 'druid' | 'ranegr' | 'fighter' | 'sorcerer' | 'wizard' | 'monk' | 'paladin' | 'rogue';

export function calcMaximunLife(characterClass: Classes, constitution: number) {
  //sacar el dado de golpe
  const hitDice = HIT_DICE_ACCORDING_TO_CLASSES[characterClass as keyof typeof HIT_DICE_ACCORDING_TO_CLASSES];
  // const hitDice = HIT_DICE_ACCORDING_TO_CLASSES as any[typeof characterClass];

  //calcular el modificador de constitucion 
  const constitutionModifier = calcAbilityModifier(constitution);

  //sumar a hitDice el modif de constitución
  const maximunLife = hitDice + constitutionModifier;

  return maximunLife;
}



/*
NECESITO SABER
- clase del personaje -> por parametro
- dados de golpe -> a partir de HIT_DICE_ACCORDING_TO_CLASSES
- modificador por contitucion -> calculado con calcAbilitiBonus (pillar Constitucion)
*/