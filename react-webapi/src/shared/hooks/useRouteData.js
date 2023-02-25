import * as React from 'react';

import { routeData } from 'src/utils/routeData';

const RouteContext = React.createContext({});

export const RouteProvider = ({ children }) => {
    const [selectedRouteData, setSelectedRouteData] = React.useState({...routeData.home, key : 'home'}) ;

    const provider = {
        selectedRouteData,

        onChangeRoute: (routeData) => {
            setSelectedRouteData(routeData);
        },
    };

    return (
        <RouteContext.Provider value={provider}>
            {children}
        </RouteContext.Provider>
    );
};

const useRouteData = () => React.useContext(RouteContext);

export default useRouteData;
