import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const Jumping = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('https://voca-bucket.s3.ap-northeast-2.amazonaws.com/json/jumping.json')
      .then(res => res.json())
      .then(data => setAnimationData(data));
  }, []);

  if (!animationData) return null;

  return <Lottie animationData={animationData} loop />;
};

export default Jumping;
