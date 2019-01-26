import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Babies from "../../../api/babies/babies-collection";

class HomeComponent extends Component {
  state = {
    name: ""
  };

  _update = async _id => {
    const { name } = this.state;

    await Meteor.callWithPromise("babies.update", [
      _id,
      {
        name
      }
    ]);
  };

  render() {
    const { babies } = this.props;

    return (
      <div>
        <form
          onSubmit={async event => {
            event.preventDefault();
            const input = event.target.querySelector("input");

            const response = await Meteor.callWithPromise("babies.insert", {
              name: input.value,
              createdAt: new Date()
            });

            input.value = "";
          }}
        >
          <input type="text" />
          <button>Save</button>
        </form>
        <div>
          {babies.map(({ _id, name }) => {
            return (
              <p key={_id}>
                <input
                  type="text"
                  defaultValue={name}
                  onFocus={() => this.setState({ name })}
                  onChange={event => {
                    this.setState({ name: event.target.value });
                  }}
                  onKeyUp={async event => {
                    if (event.keyCode === 13) {
                      this._update(_id);
                    }
                  }}
                  onBlur={async () => this._update(_id)}
                />
                <button
                  type="button"
                  onClick={async () =>
                    await Meteor.callWithPromise("babies.remove", _id)
                  }
                >
                  Delete
                </button>
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}

const Home = withTracker(() => {
  Meteor.subscribe("babies.public");
  const babies = Babies.find({}).fetch();

  return {
    babies
  };
})(HomeComponent);

export { Home, HomeComponent };
