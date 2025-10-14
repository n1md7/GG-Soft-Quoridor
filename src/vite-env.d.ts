/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_BASE_URL: string;
  VITE_TITLE: string;
  VITE_DESCRIPTION: string;
  VITE_RELEASE_VERSION: string;
  VITE_INCLUDE_SDK: 'YES' | 'NO';
  VITE_PLATFORM: 'development' | 'github' | 'crazy';
}

// declare global {
//   interface GLTFAction extends THREE.AnimationClip {
//     name: ActionName;
//   }
// }
//
// export {};
