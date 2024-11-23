export function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        color: 'white',
        top: 0,
        left: 0,
        zIndex: 999,
        fontWeight: 'bold',
      }}
    >
      <span>Loading...</span>
    </div>
  );
}
