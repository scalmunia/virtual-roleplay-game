export interface Character {
  currentHitPoints: number;
  playerId: string;
  position: Position;
  status: string[];
}

interface Position {
  x: number;
  y: number;
}