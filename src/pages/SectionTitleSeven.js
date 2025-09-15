import PropTypes from "prop-types";
import clsx from "clsx"

const SectionTitleSeven = ({
  titleText,
  subTitleText,
  positionClass,
  spaceClass,
  borderClass
}) => {
  return (
    <div className={clsx("section-title-8", positionClass, spaceClass, borderClass)}>
      <h3>{titleText}</h3>
      <p>{subTitleText}</p>
    </div>
  );
};

SectionTitleSeven.propTypes = {
  borderClass: PropTypes.string,
  positionClass: PropTypes.string,
  spaceClass: PropTypes.string,
  subTitleText: PropTypes.string,
  titleText: PropTypes.string
};

export default SectionTitleSeven;
