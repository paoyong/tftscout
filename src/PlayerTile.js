import React from "react";

class SmartInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // If in Rename mode, it is a regular text field
    if (this.props.rename) {
      return (
        <input
          className={this.props.color + " rename-on"}
          placeholder="<input name>"
          id={this.props.id}
          type="text"
          onChange={this.props.handleText}
          autocomplete="off"
          value={this.props.name}
        />
      );
    } else {
      return (
        <input
          className={this.props.color + " rename-off " + this.props.status}
          id={this.props.id}
          autocomplete="off"
          value={this.props.name}
          onMouseDown={this.props.handlePlayerTileClick}
          onContextMenu={(e) => e.preventDefault()}
          readonly="readonly"
          tabindex="-1"
        />
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
          color={color}
          id={this.props.id}
          handleText={this.props.handleText}
          handlePlayerTileClick={this.props.handlePlayerTileClick}
          name={this.props.name}
          status={this.props.status}
          handleEliminate={this.props.handleEliminate}
        />
      </div>
    );
  }
}

export default PlayerTile;
