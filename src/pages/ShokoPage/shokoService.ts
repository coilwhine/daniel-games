import type { ShokoGamePlayer } from "./models/shokoGame.model";
import type { ShokoPlayer } from "./models/shokoPlayer.model";

class ShokoService {
  private shokoPlayers: ShokoPlayer[] = [];
  private correntGame: ShokoGamePlayer[] = [];
  private gameBalls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  public getShokoPlayers(): ShokoPlayer[] {
    const shokoPlayers = localStorage.getItem("shoko_players");

    if (shokoPlayers) {
      this.shokoPlayers = JSON.parse(shokoPlayers);
    }

    return this.shokoPlayers;
  }

  public getCorrentGame(): ShokoGamePlayer[] {
    const shokoGame = localStorage.getItem("shoko_game");

    if (shokoGame) {
      this.correntGame = JSON.parse(shokoGame);
    }

    return this.correntGame;
  }

  public addNewPlayer(): void {
    const playerTemplate: ShokoPlayer = {
      id: crypto.randomUUID(),
      name: "",
    };

    this.shokoPlayers = [...this.shokoPlayers, playerTemplate];
    localStorage.setItem("shoko_players", JSON.stringify(this.shokoPlayers));
    this.resetGame();
  }

  public deletePlayer(id: string): void {
    this.shokoPlayers = this.shokoPlayers.filter((player) => player.id !== id);
    localStorage.setItem("shoko_players", JSON.stringify(this.shokoPlayers));
    this.resetGame();
  }

  public updatePlayerName(id: string, newName: string): void {
    this.shokoPlayers = this.shokoPlayers.map((player) => {
      if (player.id === id) {
        return { ...player, name: newName };
      }
      return player;
    });

    localStorage.setItem("shoko_players", JSON.stringify(this.shokoPlayers));
    this.resetGame();
  }

  public divideToPlayers() {
    const gameBalls = [...this.gameBalls].sort(() => Math.random() - 0.5);
    const players = this.getShokoPlayers();
    const numberOfBollsForPlayers = Math.floor(
      gameBalls.length / players.length
    );

    this.correntGame = [];

    for (let i = 0; i < players.length; i++) {
      const sortedBoals = gameBalls
        .splice(0, numberOfBollsForPlayers)
        .sort((a, b) => a - b);

      const game: ShokoGamePlayer = {
        playerId: players[i].id,
        playerName: players[i].name,
        balls: sortedBoals,
      };

      this.correntGame.push(game);
    }

    localStorage.setItem("shoko_game", JSON.stringify(this.correntGame));
  }

  public resetGame() {
    this.correntGame = [];
    localStorage.removeItem("shoko_game");
  }
}

const shokoService = new ShokoService();
export default shokoService;
