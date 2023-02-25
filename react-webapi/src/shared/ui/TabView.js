import * as React from 'react' ;

import { useMeasure } from 'react-use';

import { useTheme } from '@mui/styles';

import tagStyled from 'styled-components';

import {
    Tab,
    Tabs
} from '@mui/material' ;

const TabView = (props) => {
    const theme = useTheme();

    const {
        viewList
    } = props ;

    const viewCtrl = React.useRef();
    const [selectedTab, setSelectedTab] = React.useState(0);

    const [ setViewCtrl, {height} ] = useMeasure();

    const a11yProps = (index) => {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;
    
        return (
            <TabPanelMain
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
            {
                value === index && (
                    <div sx={{ p: '2px' }}>
                        {children}
                    </div>
                )
            }
            </TabPanelMain>
        );
    }

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleChangeTab = (index) => {
        setSelectedTab(index);
    };

    React.useEffect(() => {
       setViewCtrl(viewCtrl.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <TabViewMain theme={theme}
            ref={viewCtrl}
        >
            {
                viewList && <>
                    <Tabs
                        value={selectedTab}
                        onChange={handleChange}
                        aria-label="full width tabs example"
                    >
                        { viewList.map((view, index) => (
                            <Tab label={view.tabLabel} {...a11yProps(index)} key={index} />
                        )) }
                    </Tabs>
                    { viewList.map((view, index) => (
                        <TabPanel key={index} value={selectedTab} index={index}>
                            <TabViewContainer
                                height={height - 45}
                            >
                                {view.tabView}
                            </TabViewContainer>
                        </TabPanel>

                    )) }
                </>
            }
        </TabViewMain>
    )
}

export default TabView;

const TabViewMain = tagStyled.div`
    height : 100%;
    box-sizing : border-box;

    & .MuiTabs-indicator {
        display: flex ;
        justify-content: center ;
        background-color: transparent ;
    }

    & .MuiTab-root {
        color : ${props => props.theme.palette.primary.dark};
        text-transform : capitalize ;
        font-size : 15 ;
        height : 45px;
    }

    & .Mui-selected {
        background : white;
        border-top-left-radius : 10px;
        border-top-right-radius : 10px;
    }
`
export const TabPanelMain = tagStyled.div`
`
export const TabViewContainer = tagStyled.div`
    padding : 10px;
    
    height : ${props => props.height}px;

    background : white;

    overflow-y :auto;
    overflow-x : hidden;
`