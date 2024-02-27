export const AuthenticationFooter = () => {
    return (
        <div className="login-footer flex align-items-center justify-content-center text-center" style={{ position: 'static' }}>
            <span className="copyright">
                &#169; Greatech Integration (M) Sdn. Bhd. - {new Date().getFullYear()} <br />
                Version {process.env.REACT_APP_VERSION_INFO} | Developed and maintained by IoT Team
            </span>
        </div>
    );
};
