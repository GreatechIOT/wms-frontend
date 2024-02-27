import { Blocks } from 'react-loader-spinner';

const LoadingAnimation = () => {
    return (
        <div style={{ margin: '10% 0% 10% 45%' }}>
            <Blocks
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                color="#00bea6"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
            />
        </div>
    );
};

export default LoadingAnimation;
