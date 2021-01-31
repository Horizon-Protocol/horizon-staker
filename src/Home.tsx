import { makeStyles } from "@material-ui/core/styles";
import StakeCard from "@components/StakeCard";

const useStyles = makeStyles({
  container: {
    padding: 36,
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <StakeCard />
    </div>
  );
}
