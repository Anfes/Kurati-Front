import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { IconButton } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';

// import reducer from '../store';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { useHistory } from 'react-router-dom';
import Solicitud from './tabs/Solicitud';

const useStyles = makeStyles(() => ({
  tabTitle: {
    backgroundColor: '#252F3E',
    height: '100%',
    width: 200,
    webkitTransitionTimingFunction: 'linear',
    mozTransitionTimingFunction: 'linear',
    oTransitionTimingFunction: 'linear',
    transitionTimingFunction: 'linear',
    '&.MuiTabs-flexContainer': {
      marginTop: 50,
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#4FDFC8',
      marginRight: 10,
    },
  },
  tabTitleSmall: {
    backgroundColor: '#252F3E',
    height: '100%',
    width: 70,
    '&.MuiTabs-flexContainer': {
      marginTop: 50,
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#4FDFC8',
      marginRight: 10,
    },
  },
  tabName: {
    '&.MuiButtonBase-root.Mui-selected': {
      color: '#4FDFC8',
    },
    '&.MuiButtonBase-root': {
      color: '#BDD7EF',
      fontWeight: '500',
      fontSize: 15,
      marginTop: 10,
      marginBottom: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      textAlign: 'start',
    },
  },
  infoContainer: {
    borderRadius: 8,
    border: '1px solid #D1E3F5',
    width: '100%',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const CustomProceedingsTable = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [activeTitle, setActiveTitle] = useState(true);
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = (event) => {
    if (activeTitle) {
      setActiveTitle(false);
    } else {
      setActiveTitle(true);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}>
      <div>
        {activeTitle ? (
          <IconButton
            onClick={handleOpen}
            className="absolute w-12 h-12"
            style={{ marginLeft: 176, marginTop: 18, zIndex: 999 }}
          >
            <ArrowLeftIcon style={{ color: '#4FDFC8', fontSize: 70 }} />
          </IconButton>
        ) : (
          <IconButton
            onClick={handleOpen}
            className="absolute w-12 h-12"
            style={{ marginLeft: 19, marginTop: 18, zIndex: 999 }}
          >
            <ArrowRightIcon style={{ color: '#4FDFC8', fontSize: 70 }} />
          </IconButton>
        )}
        <Tabs
          className={activeTitle ? classes.tabTitle : classes.tabTitleSmall}
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab
            className={classes.tabName}
            style={{ marginTop: 70 }}
            icon={<AcUnitIcon className="mr-10" />}
            label={activeTitle ? 'Cronología' : ''}
            {...a11yProps(0)}
          />
          <Tab
            className={classes.tabName}
            icon={<AcUnitIcon className="mr-10" />}
            label={activeTitle ? 'Solicitud' : ''}
            {...a11yProps(1)}
          />
          <Tab
            className={classes.tabName}
            icon={<AcUnitIcon className="mr-10" />}
            label={activeTitle ? 'Evaluación' : ''}
            {...a11yProps(2)}
          />
          <Tab
            className={classes.tabName}
            icon={<AcUnitIcon className="mr-10" />}
            label={activeTitle ? 'Seguimiento' : ''}
            {...a11yProps(3)}
          />
          <Tab
            className={classes.tabName}
            icon={<AcUnitIcon className="mr-10" />}
            label={activeTitle ? 'Expedientes Relacionados' : ''}
            {...a11yProps(4)}
          />
        </Tabs>
      </div>
      <TabPanel value={value} index={0} className={classes.infoContainer}>
        <div className="w-full flex justify-center items-center mt-40">
          <Timeline position="alternate">
            <TimelineItem>
              <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right">
                <p className="text-primaryBlack text-16 font-semibold"> 12 de Octubre 2021 </p>
                <p className="text-primaryBlack text-14"> 12 de Octubre 2021 </p>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot style={{ background: '#EEF7FF', boxShadow: 'none' }}>
                  <HelpOutlineRoundedIcon style={{ color: '#B2DBFF' }} />
                </TimelineDot>
                <TimelineConnector style={{ background: '#BDD7EF' }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <p className="text-primary font-semibold text-16">
                  Solicitud Radicada en Ventanilla Única
                </p>
                <p className="text-14"> Carlos Muños </p>
                <p className="text-14"> Rol: Usuario </p>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <p className="text-primaryBlack text-16 font-semibold"> 12 de Octubre 2021 </p>
                <p className="text-primaryBlack text-14"> 12 de Octubre 2021 </p>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector style={{ background: '#BDD7EF' }} />
                <TimelineDot style={{ background: '#023E73' }}>
                  <HelpOutlineRoundedIcon style={{ color: '#4FDFC8' }} />
                </TimelineDot>
                <TimelineConnector style={{ background: '#BDD7EF' }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <p className="text-primary font-semibold text-16">
                  Solicitud Radicada en Ventanilla Única
                </p>
                <p className="text-14"> Carlos Muños </p>
                <p className="text-14"> Rol: Usuario </p>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.infoContainer}>
        <Solicitud />
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.infoContainer}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3} className={classes.infoContainer}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4} className={classes.infoContainer}>
        Item Five
      </TabPanel>
    </Box>
  );
};
export default CustomProceedingsTable;
