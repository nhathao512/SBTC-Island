export default function TrexLighting() {
  return (
    <>
      {/* Ambient — boosted so the model is visible */}
      <ambientLight intensity={0.6} />

      {/* Key light from upper-left front — primary visibility */}
      <directionalLight
        position={[3, 4, 3]}
        intensity={1.5}
        color="#FFF5E6"
      />

      {/* Fill light from front */}
      <directionalLight
        position={[0, 1, 6]}
        intensity={0.8}
        color="#FFFFFF"
      />

      {/* Warm amber rim light from behind-right */}
      <pointLight
        position={[-3, 2, -4]}
        intensity={3.0}
        color="#C8742A"
        distance={14}
        decay={2}
      />

      {/* Cool fill from below-left */}
      <pointLight
        position={[2, -2, 2]}
        intensity={0.4}
        color="#2A3CC8"
        distance={8}
        decay={2}
      />
    </>
  )
}
