export const getTabButtonStyle = (isActive: boolean) => ({
  padding: '8px 20px',
  margin: '0 4px',
  borderRadius: '8px',
  backgroundColor: isActive ? '#00e0ea' : 'rgba(255, 255, 255, 0.1)',
  color: isActive ? '#1f2941' : '#00e0ea',
  cursor: 'pointer',
  fontFamily: 'Corporation-Italic, sans-serif',
  fontSize: '14px',
  fontWeight: 'bold',
  textTransform: 'uppercase' as const,
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${isActive ? '#00e0ea' : 'rgba(0, 224, 234, 0.3)'}`,
});

export const getTabsContainerStyle = () => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
  marginTop: '20px',
  zIndex: 2,
  position: 'relative' as const,
  width: '100%',
});

export const getLeaderboardContainerStyle = () => ({
  maxHeight: '360px',
  overflowY: 'auto' as const,
  scrollbarWidth: 'thin' as const,
  scrollbarColor: '#00e0ea #1f2941',
  paddingRight: '10px',
});

export const getEmptyStateStyle = () => ({
  textAlign: 'center' as const,
  color: '#00e0ea',
  padding: '40px 20px',
  fontFamily: 'Corporation-Italic, sans-serif',
});
