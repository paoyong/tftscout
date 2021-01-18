import PlayerTile from "./PlayerTile.js";
import React from "react";
import cloneDeep from "lodash/cloneDeep";
import "purecss/build/pure.css";
import "./App.css";

function getStartState() {
  const startState = {
    rename: true,
    past: {
      past: 0,
      state: 0,
    },
    present: {
      elim_c: 0,
      players: [
        { id: "1", name: "", status: "active", c: 0 },
        { id: "2", name: "", status: "active", c: 0 },
        { id: "3", name: "", status: "active", c: 0 },
        { id: "4", name: "", status: "active", c: 0 },
        { id: "5", name: "", status: "active", c: 0 },
        { id: "6", name: "", status: "active", c: 0 },
        { id: "7", name: "", status: "active", c: 0 },
      ],
      matchHistory: [],
    },
  };
  return cloneDeep(startState);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlayerTileClick = this.handlePlayerTileClick.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.renameToggle = this.renameToggle.bind(this);
    this.state = getStartState();
  }

  handleText(e) {
    const players = this.state.present.players;
    players[e.target.id - 1].name = e.target.value;
    this.setState({
      players: players,
    });
  }

  renameToggle() {
    const rename_toggle = !this.state.rename;
    this.setState({
      rename: rename_toggle,
    });
  }

  handleReset(e) {
    const s = getStartState();

    this.setState({
      rename: s.rename,
      past: {
        past: s.past.past,
        state: s.past.state,
      },
      present: {
        elim_c: s.present.elim_c,
        players: s.present.players,
        matchHistory: s.present.matchHistory,
      },
    });
  }

  handlePlayerTileClick(e) {
    const i = e.target.id - 1;
    const new_players = this.state.present.players;
    const snapshot_past = cloneDeep(this.state.past);
    const snapshot_present = cloneDeep(this.state.present);

    var new_matchHistory = cloneDeep(this.state.present.matchHistory)
    var new_matchHistoryPlayer = cloneDeep(new_players[i]);


    // Match
    if (e.buttons === 1) {
      new_players[i].status = "matched";
      new_players.forEach((p, index) => {
        if (p.status !== "eliminated") {
            if (p.c !== 0 || index === i) {
                if (p.c >= (4 - this.state.present.elim_c)) {
                    p.c = 0;
                    p.status = "active"
                } else {
                   p.c++;
                }
            }
        }

      });

      new_matchHistoryPlayer.status = "matched";
      new_matchHistory.push(new_matchHistoryPlayer)

      this.setState({
        past: {
          past: snapshot_past,
          state: snapshot_present,
        },
        present: {
            elim_c: this.state.present.elim_c,
            players: new_players,
            matchHistory: new_matchHistory
        }
      });

    // Eliminate
    } else if (e.buttons === 2) {

      new_players[i].status = "eliminated";
      new_players.forEach((p) => {
        if (p.status === "matched") {
          p.c = 0;
          p.status = "active";
        }
      });

      new_matchHistoryPlayer.status = "eliminated";
      new_matchHistory.push(new_matchHistoryPlayer);

      this.setState({
        past: {
          past: snapshot_past,
          state: snapshot_present,
        },
        present: {
            elim_c: this.state.present.elim_c + 1,
            players: new_players,
            matchHistory: new_matchHistory
        }
      });
    }
  }

  handleUndo(e) {
    const past = cloneDeep(this.state.past);
    const pastpast = cloneDeep(this.state.past.past);
    this.setState({
      past: pastpast,
      present: {
        elim_c: past.state.elim_c,
        players: past.state.players,
        matchHistory: past.state.matchHistory,
      },
    });
  }

  TabRename() {
    if (this.state.rename) {
      return <label tabIndex="0" onFocus={this.renameToggle}></label>;
    }
  }
  render() {
    console.log(this.state);
    const ActiveList = this.state.present.players.map((p) => {
      if (p.status != "eliminated") {
        return (
          <PlayerTile
            id={p.id}
            status={p.status}
            c={p.c}
            handlePlayerTileClick={this.handlePlayerTileClick}
            handleEliminate={this.handleEliminate}
            handleText={this.handleText}
            name={p.name}
            rename={this.state.rename}
          />
        );
      }
    });

    const EliminatedList = this.state.present.players.map((p) => {
      if (p.status === "eliminated") {
        return (
          <PlayerTile
            id={p.id}
            status={p.status}
            handlePlayerTileClick={this.handlePlayerTileClick}
            handleEliminate={this.handleEliminate}
            handleText={this.handleText}
            name={p.name}
            rename={this.state.rename}
          />
        );
      }
    });

    const MatchHistoryList = this.state.present.matchHistory.map((p) => {
        var status = "";
        if (p.status === "matched") {
            status = "⚔️" 
        } else {
            status = "❌"
        }
        return <span><button class="button-xsmall pure-button">{status + this.state.present.players[p.id-1].name + " "}</button>&nbsp;</span>
    });

    return (
      <div className={"bg " + (this.state.rename ? "ahri-good" : "ahri-evil")}>
        <div onContextMenu={(e) => e.preventDefault()} className="app">
          <div className="header">
            <h1>TFT SCOUTER</h1>
                      <p>🔴 = possible to face them next round</p>
          </div>
          <div className="players-list">
              {ActiveList}
              {EliminatedList}
          </div>

          <div className="pure-g bottom-buttons-group">
            <div class="pure-u-3-5">
              {this.TabRename()}
              <button
                className={
                  "rename-button pure-button "
                }
                onClick={this.renameToggle}
                tabindex="-1"
              > Toggle
              </button>
              <span>{this.state.rename ? " Rename Mode" : " Match Mode"} </span>

            </div>
            <div class="pure-u-2-5">
              <div
                class="pure-button-group undo-rename-group"
                role="group"
                aria-label="..."
              >
                <button
                  className="undo-button pure-button"
                  onClick={this.handleUndo}
                  tabindex="-1"
                  disabled={this.state.past.past === 0}
                >
                  Undo
                </button>

                <button
                  className="reset-button pure-button"
                  onClick={this.handleReset}
                  tabindex="-1"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <p>
            {this.state.rename
              ? "⌨️ TAB to cycle through and rename"
              : "🖱️ CLICK on names when you match with them"}
          </p>
          <p>
            {this.state.rename
              ? "⌨️ TAB again at the end to go to match mode"
              : "🖱️ RIGHT-CLICK to eliminate"}
          </p>
          <h2>Match History</h2>
           {this.state.present.matchHistory.length === 0 ? "<empty>" : MatchHistoryList}
          <footer>
            {" "}
            Made by Pao Yong with React.js -{" "}
            <a href="https://github.com/paoyong/tftscout">GitHub</a>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
