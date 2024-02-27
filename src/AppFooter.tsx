import logo from './assets/images/wmsLogo.png';

const AppFooter = (props: any) => {
    return (
        <div className="layout-footer">
            <div className="footer-logo-container">
                <img id="footer-logo" src={logo} alt="atlantis-layout" />
                <span className="copyright ml-2">WMS</span>
            </div>
            <span className="copyright">&#169; Greatech Integration (M) Sdn. Bhd. - {new Date().getFullYear()} </span>
            <span className="copyright">Version {process.env.REACT_APP_VERSION_INFO} | Developed and maintained by IoT Team</span>
        </div>
    );
};

export default AppFooter;
