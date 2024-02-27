import logo from 'assets/images/wmsLogo.png';

export const AuthenticationLogo = () => {
    return (
        <div className="flex align-items-center mb-5 logo-container">
            <img src={logo} className="login-logo mr-3" alt="login-logo" />
            <h4>WMS</h4>
        </div>
    );
};
