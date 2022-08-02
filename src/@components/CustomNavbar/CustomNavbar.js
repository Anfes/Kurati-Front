import { Grid, AppBar, Toolbar, Avatar } from '@mui/material';
import CustomButton from '@components/CustomButton';

const CustomNavbar = (props) => {
  const { loginButton, singInButton, notifications, search, user, funcionario } = props;

  return (
    <div className="w-full">
      <AppBar position="fixed" style={{ boxShadow: 'none', background: 'unset' }}>
        <Grid container justifyContent="center">
          <Grid item xs={11} lg={10}>
            <Toolbar className="flex flex-col md:flex-row justify-center md:justify-between py-10 px-0">
              <div className="flex items-center">
                <a href={funcionario ? '/iniciar-sesion-funcionario' : '/'}>
                  <img
                    src="/assets/images/logos/kurati_white_logo.png"
                    style={{ width: '10.8rem' }}
                    alt="logo vigpro"
                  />
                </a>
                <div className="mx-10 h-16 w-2" />
              </div>
              <div className="flex items-center mt-12 md:mt-0">
                <div className="mx-10">{search}</div>
                {!user ? (
                  <div className="flex items-center">
                    <div className="mx-10">
                      <CustomButton label="Servicios" className="linkButton" height="medium" />
                    </div>
                    <div className="mx-10">
                      <CustomButton label="Clientes" className="linkButton" height="medium" />
                    </div>
                    <div className="mx-10">
                      <CustomButton label="Nosotros" className="linkButton" height="medium" />
                    </div>
                    <div className="mx-10">
                      <CustomButton label="Contáctanos" className="linkButton" height="medium" />
                    </div>
                    <div className="mx-10">
                      <CustomButton label="FAQ" className="linkButton" height="medium" />
                    </div>
                    <div className="mx-10">
                      <CustomButton label="Blog" className="linkButton" height="medium" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mx-10">{notifications}</div>
                    <div className="flex items-center">
                      <p>nombre</p>
                      <p>rol</p>
                      <Avatar>sss</Avatar>
                    </div>
                  </div>
                )}
              </div>
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
};

export default CustomNavbar;
