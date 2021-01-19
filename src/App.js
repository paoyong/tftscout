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
    future: {
      future: 0,
      state: 0,
    },
  };
  return cloneDeep(startState);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlayerTileClick = this.handlePlayerTileClick.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleRedo = this.handleRedo.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.renameToggle = this.renameToggle.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.matchGhost = this.matchGhost.bind(this);
    this.state = getStartState();
    this.current_id_list = [];
    this.hotkey_list = ['a', 's', 'z', 'x', 'c', 'v', 'b'];
  }

  match(e) {
    if (this.state.present.players[e.target.id - 1].status !== "eliminated") {
      this.handlePlayerTileClick(e);
    }
  }
  // Keyboard hotkeys
  handleKeyPress(e) {
    console.log(e.shiftKey)
    var new_e = { target: { id: 0 }, buttons: 1 };

    if (e.shiftKey)
        new_e.buttons = 2;

    if (!this.state.rename) {
      switch (e.keyCode) {
        // a
        case 65:
          new_e.target.id = this.current_id_list[0];
          this.match(new_e);
          break;
        // s
        case 83:
          new_e.target.id = this.current_id_list[1];
          this.match(new_e);
          break;
        // z
        case 90:
          new_e.target.id = this.current_id_list[2];
          this.match(new_e);
          break;
        // x
        case 88:
          new_e.target.id = this.current_id_list[3];
          this.match(new_e);
          break;
        // c
        case 67:
          new_e.target.id = this.current_id_list[4];
          this.match(new_e);
          break;
        // v
        case 86:
          new_e.target.id = this.current_id_list[5];
          this.match(new_e);
          break;
        // b
        case 66:
          new_e.target.id = this.current_id_list[6];
          this.match(new_e);
          break;
        // g
        case 71:
          if (!this.state.rename) {
            this.matchGhost();
          }
          break;
      }
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
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
      future: {
        future: s.future.future,
        state: s.future.state,
      },
    });
  }

  matchGhost() {
    const new_players = this.state.present.players;
    const snapshot_past = cloneDeep(this.state.past);
    const snapshot_present = cloneDeep(this.state.present);

    var new_matchHistory = cloneDeep(this.state.present.matchHistory);
      new_players.forEach((p, index) => {
        if (p.status !== "eliminated") {
          if (p.c !== 0) {
            if (this.state.present.elim_c > 3) {
                if (p.c >= 1) {
                    p.c = 0;
                    p.status = "active";
                } else {
                    p.c++;
                }
            }
            else if (p.c >= 4 - this.state.present.elim_c) {
              p.c = 0;
              p.status = "active";
            } else {
              p.c++;
            }
          }
        }
      });

      const newGhostPlayer = {name: "Ghost", "status": "ghost"}
      new_matchHistory.push(newGhostPlayer);

      this.setState({
        past: {
          past: snapshot_past,
          state: snapshot_present,
        },
        present: {
          elim_c: this.state.present.elim_c,
          players: new_players,
          matchHistory: new_matchHistory,
        },
      });

    }

  handlePlayerTileClick(e) {
    const i = e.target.id - 1;
    const new_players = this.state.present.players;
    const snapshot_past = cloneDeep(this.state.past);
    const snapshot_present = cloneDeep(this.state.present);

    var new_matchHistory = cloneDeep(this.state.present.matchHistory);
    var new_matchHistoryPlayer = cloneDeep(new_players[i]);

    // Match
    if (e.buttons === 1) {
      new_players[i].status = "matched";
      new_players.forEach((p, index) => {
        if (p.status !== "eliminated") {
          if (index === i) p.c++
          else if (p.c !== 0) {
            if (this.state.present.elim_c > 3) {
                if (p.c >= 1) {
                    p.c = 0;
                    p.status = "active";
                } else {
                    p.c++;
                }
            }
            else if (p.c >= 4 - this.state.present.elim_c) {
              p.c = 0;
              p.status = "active";
            } else {
              p.c++;
            }
          }
        }
      });

      new_matchHistoryPlayer.status = "matched";
      new_matchHistory.push(new_matchHistoryPlayer);

      this.setState({
        past: {
          past: snapshot_past,
          state: snapshot_present,
        },
        present: {
          elim_c: this.state.present.elim_c,
          players: new_players,
          matchHistory: new_matchHistory,
        },
      });

      // Eliminate
    } else if (e.buttons === 2) {
      new_players[i].status = "eliminated";

      // reset if 3 players left
      if (this.state.present.elim_c >= 4) {
         new_players.forEach((p) => {
        if (p.status === "matched") {
          p.c = 0;
          p.status = "active";
        }
      });
      }

      new_matchHistoryPlayer.status = "eliminated";
      new_matchHistory.push(new_matchHistoryPlayer);

      const new_elim_c = this.state.present.elim_c + 1;

      this.setState({
        past: {
          past: snapshot_past,
          state: snapshot_present,
        },
        present: {
          elim_c: new_elim_c,
          players: new_players,
          matchHistory: new_matchHistory,
        },
      });
      console.log(this.state.present.elim_c)
    }
  }

  handleUndo(e) {
    const present = cloneDeep(this.state.present);
    const future = cloneDeep(this.state.future);
    const past = cloneDeep(this.state.past);
    const pastpast = cloneDeep(this.state.past.past);
    this.setState({
      past: pastpast,
      present: {
        elim_c: past.state.elim_c,
        players: past.state.players,
        matchHistory: past.state.matchHistory,
      },
      future: {
        future: future,
        state: present,
      },
    });
  }

  handleRedo(e) {
    const past = cloneDeep(this.state.past);
    const present = cloneDeep(this.state.present);
    const future = cloneDeep(this.state.future);
    const futurefuture = cloneDeep(this.state.future.future);
    this.setState({
      past: {
        past: past,
        state: present,
      },
      present: {
        elim_c: future.state.elim_c,
        players: future.state.players,
        matchHistory: future.state.matchHistory,
      },
      future: futurefuture,
    });
  }

  TabRename() {
    if (this.state.rename) {
      return <label tabIndex="0" onFocus={this.renameToggle}></label>;
    }
  }
  render() {
    this.current_id_list = [];
    var c = -1;

    const ActiveList = this.state.present.players.map((p) => {
      if (p.status !== "eliminated") {
        this.current_id_list.push(p.id);
        c++;
        return (
          <PlayerTile
            key={p.id}
            id={p.id}
            status={p.status}
            c={p.c}
            handlePlayerTileClick={this.handlePlayerTileClick}
            handleEliminate={this.handleEliminate}
            handleText={this.handleText}
            name={p.name}
            rename={this.state.rename}
            hotkey={this.hotkey_list[c]}
          />
        );
      }
    });

    const EliminatedList = this.state.present.players.map((p) => {
      if (p.status === "eliminated") {
        this.current_id_list.push(p.id);
        c++;
        return (
          <PlayerTile
            key={p.id}
            id={p.id}
            status={p.status}
            handlePlayerTileClick={this.handlePlayerTileClick}
            handleEliminate={this.handleEliminate}
            handleText={this.handleText}
            name={p.name}
            rename={this.state.rename}
            hotkey={p.hotkey}
          />
        );
      }
    });

    const MatchHistoryList = this.state.present.matchHistory.map((p, i) => {
      var status = "";
      var name = "";
      if (p.status === "matched") {
        status = "⚔️";
        name = this.state.present.players[p.id - 1].name;
      } else if (p.status === "ghost") {
        status = "👻";
        name = "Ghost"
      } else {
        status = "❌";
        name = this.state.present.players[p.id - 1].name;
      }
      return (
        <button
          tabIndex="-1"
          className="match-history-button button-xsmall pure-button"
        >
          {status + name}
        </button>
      );
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
          <div className="pure-g">
              <div className="pure-u-5-5 player-tile">
                <button className="pure-button ghost-button" onClick={this.matchGhost} disabled={this.state.rename}>👻 Ghost (G) - Add One Round</button>
                <span className={"hotkey-label ghost-hotkey-label " + (this.state.rename ? "ghost-hotkey-label-light":"")}  >g</span>
              </div>
          </div>

          <div className="pure-g bottom-buttons-group">
            <div className="pure-u-2-5">
              {this.TabRename()}
              <button
                className={"rename-button pure-button "}
                onClick={this.renameToggle}
                tabIndex="-1"
              >
                {" "}
                Toggle
              </button>
              <span className="noselect">
                {this.state.rename ? " Rename" : " Match"}{" "}
              </span>
            </div>
            <div className="pure-u-3-5 ">
              <div
                className="pure-button-group undo-rename-group"
                role="group"
                aria-label="..."
              >
                <button
                  className="undo-button pure-button"
                  onClick={this.handleUndo}
                  tabIndex="-1"
                  disabled={this.state.past.past === 0}
                >
                  Undo
                </button>
                <button
                  className="redo-button pure-button"
                  onClick={this.handleRedo}
                  tabIndex="-1"
                  disabled={this.state.future.future === 0}
                >
                  Redo
                </button>

                <button
                  className="reset-button pure-button red"
                  onClick={this.handleReset}
                  tabIndex="-1"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <p className="noselect">
            {this.state.rename
              ? "⌨️ TAB to cycle through and rename"
              : "🖱️ Left Click  ⌨️ aszxcvbg: Match "}
          </p>
          <p className="noselect">
            {this.state.rename
              ? "⌨️ TAB again at the end to go to match mode"
              : "🖱️ Right Click ⌨️ SHIFT aszxcvb: Eliminate"}
          </p>
          <h2>Match History</h2>
          <div className="match-history-list">
            {this.state.present.matchHistory.length === 0
              ? "<empty>"
              : MatchHistoryList}
          </div>
          <footer>
            {" "}
          <a href="https://github.com/paoyong/tftscout">GitHub</a> •&nbsp;  
          <a href="https://github.com/paoyong/tftscout#algorithm">Algorithm</a> •  Art Copyright
            Riot Games
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
