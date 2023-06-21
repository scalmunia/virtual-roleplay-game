type Classes = 'barbarian' | 'bard' | 'warlock' | 'cleric' | 'druid' | 'ranegr' | 'fighter' | 'sorcerer' | 'wizard' | 'monk' | 'paladin' | 'rogue';

type Abilities = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
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
        charisma: 0,
        constitution: 0,
        dexterity: 0,
        intelligence: 0,
        strength: 0,
        wisdom: 0
    }
  }

  create(character: { name: string; class: Classes; abilities: Abilities; }) {
    this.name = character.name;
    this.level = 1;
    this.class = character.class;

    if (character.abilities.charisma > 20) {
      throw new Error('abilityOverMaxValueAllowed')
    }
    
    this.abilities = {
      charisma: character.abilities.charisma,
      constitution: character.abilities.constitution,
      dexterity: character.abilities.dexterity,
      intelligence: character.abilities.intelligence,
      strength: character.abilities.strength,
      wisdom: character.abilities.wisdom
    }
  }
}