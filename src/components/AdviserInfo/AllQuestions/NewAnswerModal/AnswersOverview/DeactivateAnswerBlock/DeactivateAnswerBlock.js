import React from 'react';
import { Link } from 'react-router-dom';

import styles from './DeactivateAnswerBlock.scss';
import { deactivateAnswer as translations } from '../../../../../../translations/translations';
import {
  ACTION_BUTTON_WHITE_ORANGE,
  ACTION_BUTTON_WHITE
} from '../../../../../../constants/constants';
import URLS from '../../../../../../constants/urls';

import ActionButton from '../../../../../shared/ActionButton/ActionButton';

const DeactivateAnswerBlock = props => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Header}>
        <div className={styles.HeaderImage} />
        <div className={styles.HeaderText}>{translations.headerText}</div>
      </div>
      <div className={styles.Content}>
        <div className={styles.Question}>{translations.question}</div>
        <div className={styles.AnswerWrapper}>
          <div className={styles.AnswerTitle}>{translations.answerTitle}</div>
          <div className={styles.Answer}>{translations.answer}</div>
          <Link
            className={styles.Link}
            to={`${URLS.mainData}${URLS.questionnaireTree}/${
              props.activeAdviser
            }`}
          >
            {translations.linkText}
          </Link>
        </div>
      </div>
      <div className={styles.Footer}>
        <div className={styles.Cancel}>
          <ActionButton
            title={translations.cancelButton}
            clicked={() => props.closeWarning(props.answerId)}
            addClass={ACTION_BUTTON_WHITE}
          />
        </div>
        <div className={styles.Proceed}>
          <ActionButton
            clicked={() => props.deactivateAnswer(props.answerId)}
            title={translations.confirmButton}
            addClass={ACTION_BUTTON_WHITE_ORANGE}
          />
        </div>
      </div>
    </div>
  );
};

export default DeactivateAnswerBlock;
