import { BoardElements } from '@src/components/ui/BoardElements';

export function GameSettings() {
  return (
    <div className="main-container">
      <div className="main-trapezoid">
        <div className="trapezoid settings">
          <span className="header">Settings</span>
        </div>
      </div>
      <div className="wrapper-outline">
        <div className="wrapper">
          <div className="wrapper-border">
            <div className="input-container">
              <div className="mx-auto my-5 max-w-md rounded-2xl p-3">
                <div className="input-group my-2">
                  <label htmlFor="volume" className="mb-3 text-sm">
                    Background Volume
                  </label>
                  <input id="volume" type="range" min="1" max="100" step="1" className="input-slider" />
                  <datalist id="datalist">
                    <option value="1">|</option>
                    <option value="10">|</option>
                    <option value="20">|</option>
                    <option value="30">|</option>
                    <option value="40">|</option>
                    <option value="50">|</option>
                    <option value="60">|</option>
                    <option value="70">|</option>
                    <option value="80">|</option>
                    <option value="90">|</option>
                    <option value="100">|</option>
                  </datalist>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BoardElements />
    </div>
  );
}
