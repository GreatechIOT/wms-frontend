import { useLocation } from 'react-router-dom';
import { BreadCrumb } from 'primereact/breadcrumb';

const AppBreadcrumb = (props: any) => {
    const urlBase = '#/';
    const location = useLocation();

    const activeRoute = props.routes.filter((route: any) => {
        return route.label.replace(/\s/g, '').toLowerCase() === location.pathname.toLowerCase().replace(/\s/g, '').slice(1) || route.label.replace(/\s/g, '').toLowerCase() === location.pathname.toLowerCase().split('/')[1];
    });

    let items;

    if (location.pathname === '/') {
        items = [
            { label: 'Home', url: urlBase + 'Home' }
        ];
    } else if (!activeRoute.length) {
        items = [{ label: '' }, { label: '' }];
    } else {
        items = [
            {
                label: activeRoute[0].parent,
                url: urlBase + activeRoute[0].parent_url
            },
            { label: activeRoute[0].label, url: urlBase + activeRoute[0].label_url }
        ];
    }

    const isStatic = () => {
        return props.menuMode === 'static';
    };

    return (
        <div className="layout-breadcrumb-container">
            <div className="layout-breadcrumb-left-items">
                {isStatic() && (
                    <button className="menu-button p-link" onClick={props.onMenuButtonClick}>
                        <i className="pi pi-bars"></i>
                    </button>
                )}

                <BreadCrumb model={items} className="layout-breadcrumb" />
            </div>
            {/* <div className="layout-breadcrumb-right-items">
                <button tabIndex={0} className="search-icon p-link" onClick={props.breadcrumbClick}>
                    <i className="pi pi-search"></i>
                </button>

                <div className={classNames('search-wrapper', { 'active-search-wrapper': props.searchActive })}>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search"></i>
                        <InputText placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} onClick={props.onInputClick} />
                    </span>
                </div>

                <span className="layout-rightmenu-button-desktop">
                    <Button label="Today" icon="pi pi-bookmark" className="layout-rightmenu-button" onClick={props.onRightMenuButtonClick}></Button>
                </span>

                <span className="layout-rightmenu-button-mobile">
                    <Button icon="pi pi-bookmark" className="layout-rightmenu-button" onClick={props.onRightMenuButtonClick}></Button>
                </span>
            </div> */}
        </div>
    );
};

export default AppBreadcrumb;
