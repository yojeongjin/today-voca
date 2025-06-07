import Lottie from 'lottie-react';
import confettie from '../../../../public/json/confetti.json';

const Confetti = () => {
  return <Lottie animationData={confettie} loop={true} />;
};

export default Confetti;
