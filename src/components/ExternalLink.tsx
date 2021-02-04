import { Button, ButtonProps, Link } from "@material-ui/core";
import { CallMade } from "@material-ui/icons";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledLink = withStyles(({ palette }) => ({
  root: {
    display: "block",
  },
}))(Link);

const StyledButton = withStyles(({ palette }) => ({
  root: {
    color: "#FFF",
    height: 32,
    borderRadius: "16px",
    backgroundColor: palette.secondary.main,
  },
}))(Button);

const StyledEndIcon = withStyles(() => ({
  root: {
    color: "#FFF",
  },
}))(CallMade);

const useStyles = makeStyles(() => ({
  logo: {
    height: 18,
  },
}));

interface Props extends ButtonProps {
  logo?: string;
}

export default function ExternalLink({ logo, children, ...props }: Props) {
  const classes = useStyles();

  return (
    <StyledLink href='https://baidu.com' color='primary' underline='none'>
      <StyledButton
        variant='contained'
        color='secondary'
        fullWidth
        startIcon={
          logo ? <img src={logo} alt='logo' className={classes.logo} /> : null
        }
        endIcon={<CallMade />}
        size='small'
        {...props}
      >
        {children}
      </StyledButton>
    </StyledLink>
  );
}
