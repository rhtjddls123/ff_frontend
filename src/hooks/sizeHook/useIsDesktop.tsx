import { useMediaQuery } from 'react-responsive';

const useIsDesktop = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return isDesktop;
};

export default useIsDesktop;
