import React from "react";
export class Movie extends React.Component {
  render() {
    return (
      <div>
        <video src={this.props.movie.linkvideo} controls />
      </div>
    );
  }
}
