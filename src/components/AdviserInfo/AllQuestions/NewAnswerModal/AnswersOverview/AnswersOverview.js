import React from 'react';

import AnswerOverview from './AnswerOverview/AnswerOverview';

const AnswersOverview = props => {
  return props.answers.map((item, index) => {
    return (
      <AnswerOverview
        questionType={props.questionType}
        answersCount={props.answers.length - 1}
        index={index}
        key={item.id}
        updateIsAnswerActive={props.updateIsAnswerActive}
        closeDeactivateWarning={props.closeDeactivateWarning}
        showDeactivateWarning={props.showDeactivateWarning}
        deactivateAnswer={props.deactivateAnswer}
        deleteAnswer={props.deleteAnswer}
        editAnswer={props.editAnswer}
        reorderAnswer={props.reorderAnswer}
        activeAdviser={props.activeAdviser}
        {...item}
      />
    );
  });
};

export default AnswersOverview;
