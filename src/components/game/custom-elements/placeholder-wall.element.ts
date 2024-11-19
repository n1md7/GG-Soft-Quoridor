import { extend, Object3DNode } from '@react-three/fiber';
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

class PlaceholderWall extends Mesh {
  constructor() {
    super();
    this.geometry = new BoxGeometry(2, 2, 2);
    this.material = new MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.5 });

    this.position.set(0, 0.9, 0);
  }
}

extend({ PlaceholderWall });

declare module '@react-three/fiber' {
  interface ThreeElements {
    placeholderWall: Object3DNode<PlaceholderWall, typeof PlaceholderWall>;
  }
}
