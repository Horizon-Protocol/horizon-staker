import { Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { cardContent } from "@utils/theme/common";

const CardSection = withStyles({
  root: {
    ...cardContent,
  },
})(Box);

export default CardSection;
