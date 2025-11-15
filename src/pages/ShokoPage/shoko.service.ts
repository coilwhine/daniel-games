import type { ShokoPlayer } from "./models/shokoPlayer.model";

class ShokoService {
  private shokoPlayers: ShokoPlayer[] = [];

  public getShokoPlayers(): ShokoPlayer[] {
    const shokoPlayers = localStorage.getItem("shoko_players");

    if (shokoPlayers) {
      this.shokoPlayers = JSON.parse(shokoPlayers);
    }

    return this.shokoPlayers;
  }

  public addNewPlayer(): void {
    const playerTemplate: ShokoPlayer = {
      id: this.shokoPlayers.length + 1,
      name: "",
      balls: [],
    };

    this.shokoPlayers = [...this.shokoPlayers, playerTemplate];
    localStorage.setItem("shoko_players", JSON.stringify(this.shokoPlayers));
  }

  public deletePlayer(id: number): void {
    this.shokoPlayers = this.shokoPlayers.filter((player) => player.id !== id);
    localStorage.setItem("shoko_players", JSON.stringify(this.shokoPlayers));
  }

  public updatePlayerName(id: number, newName: string): void {
    this.shokoPlayers = this.shokoPlayers.map((player) => {
      if (player.id === id) {
        return { ...player, name: newName };
      }
      return player;
    });

    localStorage.setItem("shoko_players", JSON.stringify(this.shokoPlayers));
  }
}

const shokoService = new ShokoService();
export default shokoService;
