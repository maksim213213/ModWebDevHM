import React from 'react';

class BuggyWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shouldThrow: false, seconds: 0 };
    this.timer = null;
    this.tick = null;
  }

  componentDidMount() {
    const delay = 2000 + Math.random() * 13000;
    this.setState({ seconds: Math.ceil(delay / 1000) });

    this.timer = setTimeout(() => {
      this.setState({ shouldThrow: true });
    }, delay);

    this.tick = setInterval(() => {
      this.setState((s) => ({ seconds: s.seconds - 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearInterval(this.tick);
  }

  render() {
    if (this.state.shouldThrow) throw new Error(`${this.props.name} failed`);
    return (
      <div style={{ border: '1px solid black', padding: '5px', margin: '3px' }}>
        <b>{this.props.name}</b> — {this.state.seconds}s
      </div>
    );
  }
}

export default BuggyWidget;
