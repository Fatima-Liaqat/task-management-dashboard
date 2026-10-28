import React, { Component } from 'react';

class ActivityLogger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: []
    };
  }

  // Lifecycle 1: Retreive initial logs from localStorage on mount
  componentDidMount() {
    const savedLogs = localStorage.getItem('activity_logs');
    if (savedLogs) {
      this.setState({ logs: JSON.parse(savedLogs) });
    }
    console.log('ActivityLogger Component Mounted');
  }

  // Lifecycle 2: Update state when props change & persist to localStorage
  componentDidUpdate(prevProps) {
    if (prevProps.logs !== this.props.logs) {
      this.setState({ logs: this.props.logs });
      localStorage.setItem('activity_logs', JSON.stringify(this.props.logs));
    }
  }

  // Lifecycle 3: Cleanup operations
  componentWillUnmount() {
    console.log('ActivityLogger Component Unmounted - Performing Cleanup');
  }

  render() {
    return (
      <div className="activity-logger">
  <h3>System Activity Log</h3>
  {this.state.logs.length === 0 ? (
    <div className="empty-state">No activity logged yet.</div>
  ) : (
    <ul className="log-list">
      {this.state.logs.map((log, index) => (
        <li key={index} className="log-item">{log}</li>
      ))}
    </ul>
  )}
</div>
    );
  }
}

export default ActivityLogger;