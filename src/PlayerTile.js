import React from "react";

class SmartInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // If in Rename mode, it is a regular text field
    if (this.props.status === "eliminated") {
      return (
        <div className="player-tile">
        <input
          className={this.props.color + " rename-off"}
          id={this.props.id}
          type="text"
          autoComplete="off"
          value={this.props.name}
          disabled
        />
        <span className="hotkey-label">{this.props.hotkey}</span>
        </div>
      );
    } else if (this.props.rename) {
      return (
        <div className="player-tile">
        <input
          className={this.props.color + " rename-on"}
          placeholder="<input name>"
          id={this.props.id}
          type="text"
          onChange={this.props.handleText}
          autoComplete="off"
          value={this.props.name}
        />
        <span className="hotkey-label">{this.props.hotkey}</span>
        </div>
      );
    } else {
      return (
        <div className="player-tile">

        <input
          className={this.props.color + " rename-off " + this.props.status}
          id={this.props.id}
          autoComplete="off"
          value={this.props.name}
          onMouseDown={this.props.handlePlayerTileClick}
          onContextMenu={(e) => e.preventDefault()}
          readOnly="readOnly"
          unselectable="on"
          tabIndex="-1"
        />
        <span className="hotkey-label">{this.props.c}</span>
        </div>
      );
    }
  }
}

class PlayerTile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var color = "";
    switch (this.props.status) {
      case "active":
        color = "red";
        break;
      case "matched":
        color = "green";
        break;
      case "eliminated":
        color = "grey";
        break;
    }

    return (
      <div className={"PlayerTile pure-g "}>
        <SmartInput
          rename={this.props.rename}
          c={this.props.c}
          color={color}
          id={this.props.id}
          handleText={this.props.handleText}
          handlePlayerTileClick={this.props.handlePlayerTileClick}
          name={this.props.name}
          status={this.props.status}
          hotkey={this.props.hotkey}
        />
      </div>
    );
  }
}

export default PlayerTile;
