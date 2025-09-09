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
              <div className="input-wrapper">
                <div>
                  <div className="input-group my-2">
                    <label htmlFor="bg-volume" className="mb-3">
                      Background Volume:
                    </label>
                    <input id="bg-volume" type="range" min="1" max="100" step="1" className="input-slider" />
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
                  <div className="input-group my-2">
                    <label htmlFor="sound-volume" className="mb-3">
                      Sound effects:
                    </label>
                    <input id="sound-volume" type="range" min="1" max="100" step="1" className="input-slider" />
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

                {/*<div className="input-group my-2">*/}
                {/*  <label htmlFor="sound-volume" className="mb-3 text-sm">*/}
                {/*    Background song:*/}
                {/*  </label>*/}
                {/*</div>*/}

                {/*  <label className="game-radio">*/}
                {/*    <input type="radio" name="power" value="fire" />*/}
                {/*    <span className="radio-label">Fire</span>*/}
                {/*  </label>*/}

                {/*  <label className="game-radio">*/}
                {/*    <input type="radio" name="power" value="ice" />*/}
                {/*    <span className="radio-label">Ice</span>*/}
                {/*  </label>*/}

                {/*  <label className="game-radio">*/}
                {/*    <input type="radio" name="power" value="lightning" />*/}
                {/*    <span className="radio-label">Lightning</span>*/}
                {/*  </label>*/}
              </div>
            </div>
          </div>
        </div>
      </div>

      <BoardElements />
    </div>
  );
}
