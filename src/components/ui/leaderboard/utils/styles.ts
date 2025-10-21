export const getTabButtonStyle = (isActive: boolean) => ({
  padding: '8px 20px',
  margin: '0 10px',
  borderRadius: '8px',
  backgroundColor: isActive ? '#83ff00' : '#272a35',
  color: isActive ? '#1f2941' : '#fff',
  cursor: 'pointer',
  fontFamily: 'Chelsea-Market, sans-serif',
  fontSize: 'clamp(15px, 2vw, 17px)',
  fontWeight: 'bold',
  textTransform: 'capitalize' as const,
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(10px)',
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
  scrollbarWidth: 'thin' as const,
  scrollbarColor: '#00e0ea #1f2941',
  paddingRight: '10px',
});

export const getEmptyStateStyle = () => ({
  textAlign: 'center' as const,
  color: '#c9cafd',
  padding: '40px 20px',
  fontFamily: 'Chelsea-Market, sans-serif',
  fontSize: 'clamp(15px, 2vw, 17px)',
});
