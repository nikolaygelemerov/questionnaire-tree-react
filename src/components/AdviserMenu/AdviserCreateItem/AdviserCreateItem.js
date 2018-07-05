import React from 'react';

import classes from './AdviserCreateItem.scss';
import items from '../../../styles/components/_switch-item.scss';
import ActionButton from '../../shared/ActionButton/ActionButton';
import PlusButton from '../../shared/PlusButton/PlusButton';
import { adviserMenu, common } from '../../../translations/translations';
import { ACTION_BUTTON_WHITE_ORANGE } from '../../../constants/constants';
import URLS from '../../../constants/urls';

const AdviserCreateItem = props => {
  const translations = { ...adviserMenu, ...common };
  const buttonData = {
    title: translations.confirm,
    navigateTo: true,
    route: URLS.mainData,
    addClass: ACTION_BUTTON_WHITE_ORANGE
  };

  return (
    <div className={`${items.SwitchItem} ${classes.AdviserCreateItem}`}>
      <div className={items.Content}>
        <div className={items.Image}>
          <PlusButton />
        </div>
        <div className={items.Title}>{translations.createItemTitle}</div>
        <div className={classes.ButtonWrapper}>
          <ActionButton {...buttonData} />
        </div>
      </div>
    </div>
  );
};

export default AdviserCreateItem;
