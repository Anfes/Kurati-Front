import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  continerTitle: {
    backgroundColor: '#CDFFF7',
    display: 'flex',
    flexDirection: 'row-reverse',
  },
}));

const CustomProceedingsTable = (props) => {
  const { title, content, section } = props;
  const classes = useStyles();
  return (
    <div>
      <Accordion>
        <AccordionSummary
          className={classes.continerTitle}
          expandIcon={<ExpandMoreIcon style={{ color: '#3ABDA8' }} className="text-32" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="flex justify-between w-full items-center">
            <Typography style={{ color: '#3ABDA8' }} className="font-semibold text-18">
              {title}
            </Typography>
            <Typography style={{ color: '#3ABDA8' }} className="font-semibold text-14">
              {section}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>{content}</AccordionDetails>
      </Accordion>
    </div>
  );
};
export default CustomProceedingsTable;
