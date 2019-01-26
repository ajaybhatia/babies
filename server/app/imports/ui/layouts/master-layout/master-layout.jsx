import React, { Component } from 'react';

class MasterLayoutComponent extends Component {
  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
  }

  componentDidMount() { }

  componentWillUnmount() {
  }

  render() { return (<div>{ this.props.children }</div>); }
}

const MasterLayout = MasterLayoutComponent;
export { MasterLayout };
