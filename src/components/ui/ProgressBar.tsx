import { useProgress } from '@react-three/drei';
import { Show } from '@src/components/utils/Show.tsx';

export function ProgressBar() {
  const { progress, loaded, total, errors } = useProgress();

  return (
    <div className="progress-container">
      <div className="progress-count">{progress.toFixed(2)}%</div>
      <div className="progress">
        <div className="bar" style={{ width: progress + '%' }}></div>
        <div className="info">
          <p>
            <Show when={loaded !== total} fallback="Click Enter so start">
              Downloading assets {loaded} of {total}
            </Show>
          </p>
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
