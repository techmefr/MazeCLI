import { Player } from "./Player";
import { Monster } from "./Monster";

export function startBattle(player: Player, monster: Monster) {
  while (player.hp > 0 && monster.hp > 0) {
    console.log(`Combat ! HP Joueur: ${player.hp}, HP Monstre: ${monster.hp}`);
    player.attack(monster);
    if (monster.isAlive()) {
      player.hp -= monster.attack();
    }
    console.log(`Après l'attaque : HP Joueur: ${player.hp}, HP Monstre: ${monster.hp}`);
  }

  if (player.hp <= 0) {
    console.log("Game Over ! Le joueur a été tué par le monstre.");
  } else if (!monster.isAlive()) {
    console.log("Le monstre a été vaincu !");
  }
}
