import { useEffect } from 'react';
import { MeshStandardMaterial } from 'three';

type GameMaterials = {
  PlatformMaterial?: MeshStandardMaterial;
  BlockMaterial?: MeshStandardMaterial;
  WallWhiteMaterial?: MeshStandardMaterial;
  WallBlackMaterial?: MeshStandardMaterial;
  PawnWhiteMaterial?: MeshStandardMaterial;
  PawnBlackMaterial?: MeshStandardMaterial;
  ContainerMaterial?: MeshStandardMaterial;
};

export function useMaterialEnhancements(materials: GameMaterials) {
  useEffect(() => {
    // Enhance Platform Material
    if (materials.PlatformMaterial) {
      materials.PlatformMaterial.metalness = 0.05;
      materials.PlatformMaterial.roughness = 0.9;
      materials.PlatformMaterial.envMapIntensity = 1.5;
      // materials.PlatformMaterial.clearcoat = 0.1;
      // materials.PlatformMaterial.clearcoatRoughness = 0.8;
      materials.PlatformMaterial.needsUpdate = true;
    }

    // Enhance Block Material
    if (materials.BlockMaterial) {
      materials.BlockMaterial.metalness = 0.1;
      materials.BlockMaterial.roughness = 0.7;
      materials.BlockMaterial.envMapIntensity = 2.0;
      // materials.BlockMaterial.clearcoat = 0.2;
      // materials.BlockMaterial.clearcoatRoughness = 0.3;
      materials.BlockMaterial.needsUpdate = true;
    }

    // Enhance White Wall Material (plastic-like)
    if (materials.WallWhiteMaterial) {
      materials.WallWhiteMaterial.metalness = 0.05;
      materials.WallWhiteMaterial.roughness = 0.8;
      materials.WallWhiteMaterial.envMapIntensity = 1.8;
      // materials.WallWhiteMaterial.clearcoat = 0.4;
      // materials.WallWhiteMaterial.clearcoatRoughness = 0.2;
      materials.WallWhiteMaterial.needsUpdate = true;
    }

    // Enhance Black Wall Material (metallic)
    if (materials.WallBlackMaterial) {
      materials.WallBlackMaterial.metalness = 0.9;
      materials.WallBlackMaterial.roughness = 0.2;
      materials.WallBlackMaterial.envMapIntensity = 2.5;
      // materials.WallBlackMaterial.clearcoat = 0.1;
      // materials.WallBlackMaterial.clearcoatRoughness = 0.1;
      materials.WallBlackMaterial.needsUpdate = true;
    }

    // Enhance White Pawn Material
    if (materials.PawnWhiteMaterial) {
      materials.PawnWhiteMaterial.metalness = 0.1;
      materials.PawnWhiteMaterial.roughness = 0.6;
      materials.PawnWhiteMaterial.envMapIntensity = 2.2;
      // materials.PawnWhiteMaterial.clearcoat = 0.5;
      // materials.PawnWhiteMaterial.clearcoatRoughness = 0.1;
      materials.PawnWhiteMaterial.needsUpdate = true;
    }

    // Enhance Black Pawn Material
    if (materials.PawnBlackMaterial) {
      materials.PawnBlackMaterial.metalness = 0.8;
      materials.PawnBlackMaterial.roughness = 0.3;
      materials.PawnBlackMaterial.envMapIntensity = 2.8;
      // materials.PawnBlackMaterial.clearcoat = 0.2;
      // materials.PawnBlackMaterial.clearcoatRoughness = 0.05;
      materials.PawnBlackMaterial.needsUpdate = true;
    }

    // Enhance Container Material
    if (materials.ContainerMaterial) {
      materials.ContainerMaterial.metalness = 0.3;
      materials.ContainerMaterial.roughness = 0.5;
      materials.ContainerMaterial.envMapIntensity = 1.8;
      // materials.ContainerMaterial.clearcoat = 0.3;
      // materials.ContainerMaterial.clearcoatRoughness = 0.3;
      materials.ContainerMaterial.needsUpdate = true;
    }
  }, [
    materials.PlatformMaterial,
    materials.BlockMaterial,
    materials.WallWhiteMaterial,
    materials.WallBlackMaterial,
    materials.PawnWhiteMaterial,
    materials.PawnBlackMaterial,
    materials.ContainerMaterial,
  ]);
}
