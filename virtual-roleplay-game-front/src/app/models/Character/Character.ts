import { calcAbilitiesBonus } from './calcAbilityBonus';
import { POINT_COST_OF_ABILITY_SCORES } from './character.constants';

type Classes =
  | 'barbarian'
  | 'bard'
  | 'warlock'
  | 'cleric'
  | 'druid'
  | 'ranger'
  | 'fighter'
  | 'sorcerer'
  | 'wizard'
  | 'monk'
  | 'paladin'
  | 'rogue';

export type Abilities = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

export type Bonus = Abilities;

export type Attack = {
  proficiency: boolean;
  name: string;
  ability: string;
  damage: number;
};

export type Equipment = {
  id: string;
  img: string;
  name: string;
  quality: string;
  description: string;
  attributes: Array<{
    name: string,
    bonus: number,
    effect: string
  }>
};

export interface ICharacter {
  _id: string;
  avatar: string | null;
  name: string | null;
  level: number | 1;
  class: Classes | null;
  abilities: Abilities;
  skills: {
    [key: string]: boolean;
  };
  attacks: Attack[];
  description: string | null;
  equipment: Equipment[];
}

export class Character implements ICharacter {
  _id: string;
  avatar: string | null
  name: string | null;
  level: number | 1;
  class: Classes | null;
  abilities: Abilities;
  skills: ICharacter['skills'];
  attacks: Attack[];
  description: string | null;
  equipment: Equipment[];

  constructor(character?: ICharacter) {
    this._id = character?._id || '';
    this.avatar = character?.avatar || null;
    this.name = character?.name || null;
    this.level = character?.level || 1;
    this.class = character?.class || null;
    this.abilities = character?.abilities || {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0
    };
    this.skills = character?.skills || {};
    this.attacks = character?.attacks || [];
    this.description = character?.description || null;
    this.equipment = character?.equipment || [];
  }

  create(character: Omit<ICharacter, '_id'>) {
    const totalAbilityPoints = 27;
    let availableAbilityPoints = totalAbilityPoints;

    // Seteos
    this.avatar = character.avatar;
    this.name = character.name;
    this.level = character.level;
    this.class = character.class;

    this.abilities = {
      strength: character.abilities.strength,
      dexterity: character.abilities.dexterity,
      constitution: character.abilities.constitution,
      intelligence: character.abilities.intelligence,
      wisdom: character.abilities.wisdom,
      charisma: character.abilities.charisma,
    };

    this.attacks = character.attacks;
    this.description = character.description;
    this.equipment = character.equipment?.map(equipmentItem => ({
      id: equipmentItem.id,
      img: equipmentItem.img,
      name: equipmentItem.name,
      quality: equipmentItem.quality,
      description: equipmentItem.description,
      attributes: equipmentItem.attributes?.map(attribute => ({
        name: attribute.name,
        bonus: attribute.bonus,
        effect: attribute.effect
      }))

    }));

    // Validaciones
    for (const ability in character.abilities) {
      const value = character.abilities[ability as keyof Abilities];

      if (!character.name) throw new Error('nameRequired');
      if (!character.class) throw new Error('classRequired');

      // Chequea que las habilidades tienen sus valores en el rango definido
      if (value < 8) throw new Error('abilityBelowMinValueAllowed');
      if (value > 15) throw new Error('abilityOverMaxValueAllowed');

      // Chequea que las puntuaciones asignadas no exceden el máximo
      //1º convertir a type, 2º hacer keyof
      const abilityPoints =
        POINT_COST_OF_ABILITY_SCORES[
        value as keyof typeof POINT_COST_OF_ABILITY_SCORES
        ];

      availableAbilityPoints = availableAbilityPoints - abilityPoints;
    }

    if (availableAbilityPoints < 0) {
      throw new Error('creationPointsForAbilitiesExceeded');
    }
  }
}
