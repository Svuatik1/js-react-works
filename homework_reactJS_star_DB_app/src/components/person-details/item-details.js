import React, { Component } from "react";

import ErrorButton from "../error-button/error-button";
import SwapiService from "../../services/swapi-service";

import "./person-details.css";

export default class ItemDetails extends Component {
  swapiService = new SwapiService();

  state = {
    person: null,
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.swapiService.getPerson(itemId).then((item) => {
      this.setState({ item });
    });
  }

  render() {
    const { item } = this.state;
    if (!item) {
      return <span>Select a person from a list</span>;
    }

    const { id, name, gender, birthYear, eyeColor } = item;

    return (
      <div className="item-details card">
        <img
          className="item-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt="character"
        />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}
