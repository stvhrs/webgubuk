import PropTypes from "prop-types";

import { setActiveSort } from "./func/product";

const ShopTag = ({ tags, getSortParams }) => {
  return (
    <div className="sidebar-widget mt-30">
      <h4 className="pro-sidebar-title">Mapel </h4>
      <div className="sidebar-widget-tag mt-10 mb-30">
        {tags ? (
          <ul>
            {tags.map((tag, key) => {
              return (
                <li key={key}>
                  <button
                    onClick={e => {
                      getSortParams("tag", tag);
                      setActiveSort(e);
                    }}
                  >
                    {tag}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          "No tags found"
        )}
      </div>
    </div>
  );
};

ShopTag.propTypes = {
  getSortParams: PropTypes.func,
  tags: PropTypes.array
};

export default ShopTag;
