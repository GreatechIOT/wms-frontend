// Available options for REACT_APP_ENV: local, test_server, production
interface configProps {
    hostname: string;
    frontend_port: string;
    backend_port: string;
}
console.log('REACT ENV', process.env.REACT_APP_ENV);
const system_name = "WMS"
const loginDevConfig = {
    hostname: 'http://localhost',
    frontend_port: '3000',
    backend_port: '1007'
};

const loginProdConfig = {
    hostname: 'http://iot-tls.greatech-group.com',
    frontend_port: '3000',
    backend_port: '1007'
};

const loginTestProdConfig = {
    hostname: 'http://192.168.0.25',
    frontend_port: '3000',
    backend_port: '1007'
};

const devConfig = {
    hostname: 'http://localhost',
    frontend_port: '3000',
    backend_port: '1008'
};

const prodConfig = {
    hostname: 'http://192.168.0.24',
    frontend_port: '3000',
    backend_port: '1008'
};

const testProdConfig = {
    hostname: 'http://192.168.0.25',
    frontend_port: '3000',
    backend_port: '1008'
};

let config: configProps;
let loginConfig: configProps;

if (process.env.REACT_APP_ENV === 'production') {
    config = prodConfig;
    loginConfig = loginProdConfig;
} else if (process.env.REACT_APP_ENV === 'test_server') {
    config = testProdConfig;
    loginConfig = loginTestProdConfig;
} else {
    config = devConfig;
    loginConfig = loginDevConfig;
}
export { config as default, loginConfig, system_name };
