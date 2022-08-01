import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import ListItem from '@mui/material/ListItem';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

import FuseNavBadge from '../../FuseNavBadge';

const Root = styled(ListItem)(({ theme, ...props }) => ({
  height: 40,
  width: '100%',
  borderRadius: '6px',
  margin: '0 0 4px 0',
  paddingRight: 12,
  paddingLeft: props.itempadding,
  cursor: 'pointer',
  textDecoration: 'none!important',
  '&:hover': {
    color: '#023E73',
    fontWeight: 'bold !important'
  },
  '&.active': {
    fontWeight: 'bold !important',
    color: '#023E73',
    backgroundColor: '#D0E9FF',
    pointerEvents: 'none',
    transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
    '& > .fuse-list-item-text-primary': {
      color: '#023E73',
      fontWeight: 'bold !important'
    },
    '& > .fuse-list-item-icon': {
      color: 'inherit',
    },
  },
  '& >.fuse-list-item-icon': {
    marginRight: 12,
    color: 'inherit',
  },
  '& > .fuse-list-item-text': {},
}));

function FuseNavVerticalItem(props) {
  
  const { item, nestedLevel, onItemClick } = props;

  const itempadding = nestedLevel > 0 ? 28 + nestedLevel * 16 : 12;

  return useMemo(
    () => (
      <Root
        button
        component={NavLinkAdapter}
        to={item.url}
        activeClassName="active"
        className="fuse-list-item"
        onClick={() => onItemClick && onItemClick(item)}
        exact={item.exact}
        itempadding={itempadding}
        role="button"
      >
        {item.icon && (
          <Icon
            className={clsx('fuse-list-item-icon', item.iconClass)}
            color="action"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {item.icon}
          </Icon>
        )}

        <p
          className="fuse-list-item-text"
          classes={{ primary: 'text-13' }}
        >
          {item.title}
        </p>

        {item.badge && <FuseNavBadge badge={item.badge} />}
      </Root>
    ),
    [item, itempadding, onItemClick]
  );
}

FuseNavVerticalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string,
  }),
};

FuseNavVerticalItem.defaultProps = {};

const NavVerticalItem = FuseNavVerticalItem;

export default NavVerticalItem;
