import { useMemo } from "react";
import { Backdrop } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useTimer } from "react-compound-timer";
import differenceInMilliseconds from "date-fns/differenceInMilliseconds";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    position: "relative",
  },
}));

const StyledBackdrop = withStyles({
  root: {
    position: "absolute",
    zIndex: 1,
    fontSize: 22,
    textAlign: "center",
  },
})(Backdrop);

interface Props {
  token: TokenEnum;
}

const startAt = new Date("2021-03-22T21:22:19Z");

const padZero = (num: number) => num.toString().padStart(2, "0");

export default function RoundStart({ token }: Props) {
  const milliSeconds = useMemo(
    () => (startAt ? differenceInMilliseconds(startAt, new Date()) : 0),
    [token]
  );

  const {
    value: { d, h, m, s },
  } = useTimer({
    initialTime: milliSeconds,
  });

  if (milliSeconds <= 0) {
    return null;
  }

  return (
    <StyledBackdrop open>
      {d ? `${d} Day${d > 1 ? "s" : ""} ` : ""}
      {padZero(h)} : {padZero(m)} : {padZero(s)}
    </StyledBackdrop>
  );
}
