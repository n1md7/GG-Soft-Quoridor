import { extend, Object3DNode } from '@react-three/fiber';
import { Group, Mesh, Object3D } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();

export class MyBoard extends Group {
  readonly blocks: Record<string, Mesh> = {};
  readonly walls: Record<string, Mesh> = {};
  readonly pawns: Record<string, Mesh> = {};
  readonly plates: Record<string, Mesh> = {};
  readonly containers: Record<string, Mesh> = {};

  constructor() {
    super();

    this.name = 'MyBoard';
    loader.load('./3D/board-v1.4.glb', (gltf: { scene: Object3D }) => {
      this.add(gltf.scene);

      gltf.scene.traverse((child: Object3D) => {
        if (child instanceof Mesh) {
          switch (true) {
            case child.name.startsWith('Wall'):
              this.walls[child.name] = child;
              break;
            case child.name.startsWith('Pawn'):
              this.pawns[child.name] = child;
              break;
            case child.name.startsWith('Plate'):
              this.plates[child.name] = child;
              break;
            case child.name.startsWith('Container'):
              this.containers[child.name] = child;
              break;
            case child.name.startsWith('Block'):
              this.blocks[child.name] = child;
              break;
            default:
              break;
          }
        }
      });
    });

    this.position.set(0, 0, 0);
  }
}

extend({ MyBoard });

declare module '@react-three/fiber' {
  interface ThreeElements {
    myBoard: Object3DNode<MyBoard, typeof MyBoard>;
  }
}
