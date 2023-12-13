// import {useEffect} from 'react';
// import {useLocation} from '@remix-run/react';
// import ReactPixel from 'react-facebook-pixel';

// const ANALYTICS_IDS =  {pixelTrackingId: 730284285674428};
// const useAnalyticsHead = ({pixelTrackingId}) => {
//   const location = useLocation();

//   useEffect(() => {
//     if (pixelTrackingId) {
//       ReactPixel.pageView();
//     }
//   }, [location.pathname, pixelTrackingId]);
//   return;
// };

// export const AnalyticsHead = () => {
//   const {pixelTrackingId} = ANALYTICS_IDS;
//   useAnalyticsHead(ANALYTICS_IDS);
//   ReactPixel.init(pixelTrackingId);

//   return null;
// };
