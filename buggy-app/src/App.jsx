import ErrorBoundary from './ErrorBoundary';
import BuggyWidget from './BuggyWidget';
import './App.css';

const zoneA = ['widget-1', 'widget-2', 'widget-3', 'widget-4'];
const zoneB = ['widget-5', 'widget-6', 'widget-7', 'widget-8'];
const zoneC = ['widget-9', 'widget-10', 'widget-11', 'widget-12'];

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Buggy App</h1>
        <p>
          Dashboard of 12 widgets that crash at random. Watch how
          ErrorBoundary placement changes the blast radius.
        </p>
      </header>

      <section className="zone">
        <div className="zone__header">
          <h2>Zone </h2>
          <p>
            Crashes are contained per card.
          </p>
        </div>
        <div className="zone__grid">
          {zoneA.map((name) => (
            <ErrorBoundary key={name} name={name}>
              <BuggyWidget name={name} />
            </ErrorBoundary>
          ))}
        </div>
      </section>

      <section className="zone zone--shared">
        <div className="zone__header">
          <h2>Zone B </h2>
          <p>
            The first crash takes down the whole zone.
          </p>
        </div>
        <ErrorBoundary name="Zone B">
          <div className="zone__grid">
            {zoneB.map((name) => (
              <BuggyWidget key={name} name={name} />
            ))}
          </div>
        </ErrorBoundary>
      </section>

      <section className="zone zone--shared">
        <div className="zone__header">
          <h2>Zone C</h2>
          <p>The first crash takes down the whole zone.</p>
        </div>
        <ErrorBoundary name="Zone C">
          <div className="zone__grid">
            {zoneC.map((name) => (
              <BuggyWidget key={name} name={name} />
            ))}
          </div>
        </ErrorBoundary>
      </section>
    </div>
  );
}

export default App;
