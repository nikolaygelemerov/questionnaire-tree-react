import React from 'react';

import styles from './NewQuestionBlock.scss';
import { allQuestions } from '../../../../translations/translations';
import PlusButton from '../../../shared/PlusButton/PlusButton';
import ActionButton from '../../../shared/ActionButton/ActionButton';
import { ACTION_BUTTON_WHITE_ORANGE } from '../../../../constants/constants';

const NewQuestionBlock = props => {
  return (
    <div className={styles.NewQuestionBlock}>
      <div className={styles.Image}>
        <PlusButton />
      </div>
      <div className={styles.ButtonWrapper}>
        <ActionButton
          clicked={props.showNewQuestionModal}
          title={allQuestions.newQuestionButton}
          addClass={ACTION_BUTTON_WHITE_ORANGE}
        />
      </div>
    </div>
  );
};

export default NewQuestionBlock;
