type Environment = 'local' | 'crazygames' | 'disabled';

export declare global {
  interface Window {
    CrazyGames: {
      SDK: {
        init: () => Promise<{
          environment: Environment;
          initOptions: unknown;
          version: string;
        }>;
        sdk: {
          getEnvironment: () => Promise<Environment>;
          environment: Environment;
          ad: {
            requestAd: (
              type: 'rewarded' | 'midgame',
              callbacks: {
                adFinished: () => void;
                adStarted: () => void;
                adError: (error: { code: 'unfilled' | 'adblock' | 'other'; message: string }) => void;
              },
            ) => Promise<unknown>;
            hasAdblock: () => Promise<unknown>;
          };
          user: {
            get isUserAccountAvailable(): boolean;
            get systemInfo(): {
              countryCode: string;
              locale: string;
              device: {
                type: 'desktop' | 'tablet' | 'mobile';
              };
              os: {
                name: 'Windows' | 'Mac OS' | 'iOS' | 'Android' | 'Linux' | 'Chrome OS';
                version: string;
              };
              browser: {
                name: 'Chrome' | 'Firefox' | 'Safari' | 'Edge' | 'Opera' | 'Other';
                version: string;
              };
              applicationType: 'google_play_store' | 'apple_store' | 'pwa' | 'web';
            };
            getUser(): {
              username: string;
              profilePictureUrl: string;
            };
          };
          data: {
            clear(): void;
            getItem(key: string): string | null;
            removeItem(key: string): void;
            setItem(key: string, value: string): void;
          };
          banner: {
            requestBanner: (options: Record<string, unknown>) => Promise<void>;
            clearBanner: (name: string) => Promise<void>;
            clearAllBanners: () => Promise<void>;
          };
          game: {
            /**
             * The happytime() method can be called on various player achievements (beating a boss, reaching a highscore, etc.).
             * It makes the website celebrate (for example by launching some confetti). There is no need to call this when a level
             * is completed, or an item is obtained.
             */
            happytime: () => Promise<void>;
            /**
             * The gameplayStop() function has to be called on every game break (entering a menu, switching level, pausing the game, ...)
             * don't forget to call gameplayStart() when the gameplay resumes.
             */
            gameplayStop: () => Promise<void>;
            /**
             * The gameplayStart() function has to be called whenever the player starts playing or resumes playing after a break
             * (menu/loading/achievement screen, game paused, etc.).
             */
            gameplayStart: () => Promise<void>;
            /**
             * The loadingStart() function has to be called whenever you start loading your game.
             */
            loadingStart: () => Promise<void>;
            /**
             * The loadingStop() function has to be called when the loading is complete and eventually the gameplay starts.
             */
            loadingStop: () => Promise<void>;
          };
        };
      };
    };
  }
}
