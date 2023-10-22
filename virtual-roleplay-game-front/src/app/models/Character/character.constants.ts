import { FormControl } from "@angular/forms";

export const POINT_COST_OF_ABILITY_SCORES = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9
};

export const ABILITY_SCORES_AND_MODIFIERS = {
  1: -5,
  2: -4,
  3: -4,
  4: -3,
  5: -3,
  6: -2,
  7: -2,
  8: -1,
  9: -1,
  10: +0,
  11: +0,
  12: +1,
  13: +1,
  14: +2,
  15: +2,
  16: +3,
  17: +3,
  18: +4,
  19: +4,
  20: +5,
  21: +5,
  22: +6,
  23: +6,
  24: +7,
  25: +7,
  26: +8,
  27: +8,
  28: +9,
  29: +9,
  30: +10
};

export const HIT_DICE_ACCORDING_TO_CLASSES = {
  'barbarian': 12,
  'bard': 8,
  'warlock': 8,
  'cleric': 8,
  'druid': 8,
  'ranger': 10,
  'fighter': 10,
  'sorcerer': 6,
  'wizard': 6,
  'monk': 8,
  'paladin': 10,
  'rogue': 8
};

export const PROFICIENCY_BONUS_ACORDING_TO_LEVEL = {
  1: +2,
  2: +2,
  3: +2,
  4: +2,
  5: +3,
  6: +3,
  7: +3,
  8: +3,
  9: +4,
  10: +4,
  11: +4,
  12: +4,
  13: +5,
  14: +5,
  15: +5,
  16: +5,
  17: +6,
  18: +6,
  19: +6,
  20: +6
};

export const SKILLS_LIST = [
  {
    id: 'Acrobacias',
    ability: 'dexterity'
  },
  {
    id: 'Arcanos',
    ability: 'intelligence',
  },
  {
    id: 'Atletismo',
    ability: 'strength'
  },
  {
    id: 'Engaño',
    ability: 'charisma'
  },
  {
    id: 'Historia',
    ability: 'intelligence',
  },
  {
    id: 'Interpretación',
    ability: 'charisma'
  },
  {
    id: 'Intimidación',
    ability: 'charisma'
  },
  {
    id: 'Investigación',
    ability: 'intelligence',
  },
  {
    id: 'Juego de manos',
    ability: 'dexterity'
  },
  {
    id: 'Medicina',
    ability: 'wisdom'
  },
  {
    id: 'Naturaleza',
    ability: 'intelligence',
  },
  {
    id: 'Percepción',
    ability: 'wisdom'
  },
  {
    id: 'Perspicacia',
    ability: 'wisdom'
  },
  {
    id: 'Persuasión',
    ability: 'charisma'
  },
  {
    id: 'Religión',
    ability: 'intelligence'
  },
  {
    id: 'Sigilo',
    ability: 'dexterity'
  },
  {
    id: 'Supervivencia',
    ability: 'dexterity'
  },
  {
    id: 'Trato con animales',
    ability: 'wisdom'
  }
]

export const CLASSES_TRANSLATION = {
  'barbarian': 'bárbaro',
  'bard': 'bardo',
  'warlock': 'brujo',
  'cleric': 'clérigo',
  'druid': 'druida',
  'ranger': 'explorador',
  'fighter': 'guerrero',
  'sorcerer': 'hechicero',
  'wizard': 'mago',
  'monk': 'monje',
  'paladin': 'paladín',
  'rogue': 'pícaro'
}

export const ABILITIES_TRANSLATION = {
  'hitPoints': 'Puntos de golpe',
  'armor': 'Armadura',
  'proficiency': 'Competencia',
  'strength': 'Fuerza',
  'dexterity': 'Destreza',
  'constitution': 'Constitución',
  'intelligence': 'Intelecto',
  'wisdom': 'Sabiduría',
  'charisma': 'Carisma'
}