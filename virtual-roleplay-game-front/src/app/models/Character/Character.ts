import { POINT_COST_OF_ABILITY_SCORES } from "./character.constants";

type Classes = 'barbarian' | 'bard' | 'warlock' | 'cleric' | 'druid' | 'ranegr' | 'fighter' | 'sorcerer' | 'wizard' | 'monk' | 'paladin' | 'rogue';

export type Abilities = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

  /** Para definir que Abilities acepta cualquier propiedad cuyo valor sea number */
  // [key: string]: number;
};

export class Character {
  name: string | null;
  level: number;
  class: Classes | null;
  abilities: Abilities;

  constructor(character?: Character) {
    this.name = character?.name || null;
    this.level = character?.level || 1
    this.class = character?.class || null
    this.abilities = character?.abilities || {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0
    }
  }

  create(character: { name: string; class: Classes; abilities: Abilities; }) {
    let availableAbilityPoints = 27;

    // Validaciones
    for (const ability in character.abilities) {
      const value = character.abilities[ability as keyof Abilities];
      
      // Chequea que las habilidades tienen sus valores en el rango definido
      if (value < 8) throw new Error('abilityBelowMinValueAllowed');
      if (value > 15) throw new Error('abilityOverMaxValueAllowed');

      // Chequea que las puntuaciones asignadas no exceden el máximo
      //1º convertir a type, 2º hacer keyof
      const abilityPoints = POINT_COST_OF_ABILITY_SCORES[value as keyof typeof POINT_COST_OF_ABILITY_SCORES];

      availableAbilityPoints = availableAbilityPoints - abilityPoints;
      if (availableAbilityPoints < 0) throw new Error('creationPointsForAbilitiesExceeded');
    }

    // Seteos
    this.name = character.name;
    this.level = 1;
    this.class = character.class;

    this.abilities = {
      strength: character.abilities.strength,
      dexterity: character.abilities.dexterity,
      constitution: character.abilities.constitution,
      intelligence: character.abilities.intelligence,
      wisdom: character.abilities.wisdom,
      charisma: character.abilities.charisma
    }
  }
}