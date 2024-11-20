import { useProgress } from '@react-three/drei';
import { Show } from '@src/components/utils/Show.tsx';

export function ProgressBar() {
  const { progress, loaded, total, errors } = useProgress();
  return (
    <div className="progress-container">
      <div className="progress-count">
        <Show when={loaded !== total} fallback={'Done'}>
          {progress.toFixed(2)}%
        </Show>
      </div>
      <div className="progress">
        <div className="bar" style={{ width: progress + '%' }}></div>
        <div className="info">
          <Show
            when={loaded !== total}
            fallback={
              <p className="blink-text">
                Click <b>Enter</b> to start
              </p>
            }
          >
            <p>
              Downloading assets {loaded} of {total}
            </p>
          </Show>
        </div>
        <Show when={errors.length > 0}>
          <div className="errors">
            <h3>Errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </Show>
      </div>
    </div>
  );
}
