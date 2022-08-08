import CustomNavbar from '@components/CustomNavbar';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { LeftArrowIcon, RightArrowIcon } from '@components/FuseSvgIcon';

import Home from './components/Home';
import Aliados from './components/Aliados';
import Singularidad from './components/Singularidad';
import Enfoque from './components/Enfoque';
import Testimonios from './components/Testimonios';
import Especialistas from './components/Especialistas';
import InfoContacto from './components/InfoContacto';
import Footer from './components/Footer';

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '50%',
        display: 'block',
        transform: 'translate(0, -50%)',
        cursor: 'pointer',
        right: '-50px',
      }}
    >
      <RightArrowIcon />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '50%',
        display: 'block',
        transform: 'translate(0, -50%)',
        cursor: 'pointer',
        left: '-50px',
      }}
    >
      <LeftArrowIcon />
    </div>
  );
}

const next = {
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
function Landing() {
  return (
    <div>
      <div>
        <CustomNavbar />
      </div>
      <div>
        <Home />
      </div>
      <div>
        <Aliados next={next} />
      </div>
      <div>
        <Singularidad />
      </div>
      <div>
        <Enfoque next={next} />
      </div>
      <div>
        <Testimonios next={next} />
      </div>
      <div>
        <Especialistas next={next} />
      </div>
      <div>
        <InfoContacto/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default Landing;
