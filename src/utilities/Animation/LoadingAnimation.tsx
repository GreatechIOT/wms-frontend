import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../../assets/lottie/loading.json';
const LoadingAnimation = () => {
    return <Player src={loadingAnimation} className="player" style={{ height: '400px', width: '400px' }} loop autoplay />;
};

export default LoadingAnimation;
