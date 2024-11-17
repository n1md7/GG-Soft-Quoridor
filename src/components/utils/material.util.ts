import { Material, MeshStandardMaterial } from 'three';

export const isMeshStandardMaterial = (
  material: Material | Material[],
): material is MeshStandardMaterial | MeshStandardMaterial[] => {
  if (Array.isArray(material)) {
    return material.every((m) => m instanceof MeshStandardMaterial);
  }

  return material instanceof MeshStandardMaterial;
};

export const isMeshBasicMaterial = (material: Material | Material[]): boolean => {
  if (Array.isArray(material)) {
    return material.every((m) => m instanceof MeshStandardMaterial);
  }

  return material instanceof MeshStandardMaterial;
};

export const setWireframe = (value: boolean, material: Material | Material[]): void => {
  if (!Array.isArray(material)) {
    if (isMeshStandardMaterial(material)) {
      material.wireframe = value;
    }

    return;
  }

  material.forEach((m) => setWireframe(value, m));
};
