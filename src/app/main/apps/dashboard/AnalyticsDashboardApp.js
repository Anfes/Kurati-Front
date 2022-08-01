import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import { motion } from 'framer-motion';
import reducer from './store';
import { selectWidgetsEntities, getWidgets } from './store/widgetsSlice';
import Widget2 from './widgets/Widget2';
import Widget3 from './widgets/Widget3';
import Widget4 from './widgets/Widget4';
import Widget5 from './widgets/Widget5';

function AnalyticsDashboardApp() {
  const dispatch = useDispatch();
  const widgets = useSelector(selectWidgetsEntities);

  useEffect(() => {
    dispatch(getWidgets());
  }, [dispatch]);

  if (_.isEmpty(widgets)) {
    return null;
  }

  const container = {
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full">
      <motion.div
        className="flex flex-col md:flex-row sm:p-8 container p-40"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-1 flex-col min-w-0 pt-16">
          <Typography
            component={motion.div}
            variants={item}
            className="px-16 pb-8 text-18 font-medium"
            color="textSecondary"
          >
            Dashboard:
          </Typography>
          <div className="flex flex-col sm:flex sm:flex-row pb-32">
            <motion.div variants={item} className="widget flex w-full sm:w-1/3 p-16">
              <Widget2 data={widgets.widget2} />
            </motion.div>
            <motion.div variants={item} className="widget flex w-full sm:w-1/3 p-16">
              <Widget3 data={widgets.widget3} />
            </motion.div>
            <motion.div variants={item} className="widget w-full sm:w-1/3 p-16">
              <Widget4 data={widgets.widget4} />
            </motion.div>
          </div>
          <Typography
            component={motion.div}
            variants={item}
            className="px-16 pb-8 text-18 font-medium"
            color="textSecondary"
          >
            Solicitudes:
          </Typography>
          <motion.div variants={item} className="widget w-full p-16 pb-48">
            <Widget5 data={widgets.widget5} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);
