import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { Button, Icon, Input, Paper, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

function CustomHeader(props) {

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <Icon
          component={motion.span}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.2 } }}
          className="text-24 md:text-32"
        >
          add_location_alt
        </Icon>
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
        >
          Ciudades
        </Typography>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      >
        <Button
          component={Link}
          to="/ciudad/new"
          className="whitespace-nowrap"
          variant="contained"
          color="secondary"
        >
          <span className="hidden sm:flex">Nueva ciudad</span>
          <span className="flex sm:hidden">Nueva ciudad</span>
        </Button>
      </motion.div>
    </div>
  );
}

export default CustomHeader;
