import React, { PureComponent } from 'react';

import classes from './QuestionCheckboxItem.scss';
import items from '../../../styles/components/_switch-item.scss';
import { idGenerator } from '../../../helpers/helpers';
import { colorGenerator } from '../../../helpers/helpers';
import Answer from '../Answer/Answer';

class QuestionCheckboxItem extends PureComponent {
  render() {
    const borderTopColor = this.props.parent.answerColor;
    const answers = this.props.answers.map((answer, index) => {
      return (
        <Answer
          key={idGenerator()}
          type={this.props.type}
          txt={answer.txt}
          isSelected={answer.isSelected}
          isActive={answer.isActive}
          canCreate={answer.canCreate}
          answerId={answer.id}
          color={answer.color}
          checkAnswer={this.props.checkAnswer}
          stepIndex={this.props.stepIndex}
          questionId={this.props.questionId}
          questionColor={this.props.questionColor}
          questionHeight={this.props.questionHeight}
          questionTop={this.props.questionTop}
          questionWrapperHeight={this.props.questionWrapperHeight}
          questionIndex={this.props.questionIndex}
          answerWrapperHeight={this.props.answerWrapperHeight}
          toggleQuestionHeight={this.props.toggleQuestionHeight}
          addNewQuestion={this.props.addNewQuestion}
        />
      );
    });
    return (
      <div
        className={`${items.SwitchItem} ${classes.QuestionCheckboxItem}`}
        style={{
          borderTop: this.props.stepIndex === 0 ? '1px solid #d9d9d9' : 'none',
          top: `${this.props.questionTop}`
        }}
      >
        <div
          className={classes.BorderTop}
          style={{
            backgroundColor: `${borderTopColor}`,
            display: this.props.stepIndex === 0 ? 'none' : 'block'
          }}
        />
        <div className={classes.QuestionContent}>
          <div
            className={classes.QuestionGroupName}
            onClick={() =>
              this.props.stepIndex !== 0 &&
              this.props.toggleQuestionHeight(this.props.parent.answerColor)
            }
            style={{
              borderTop:
                this.props.stepIndex !== 0 ? 'none' : '1px solid #d9d9d9',
              cursor: this.props.stepIndex === 0 ? 'auto' : 'pointer'
            }}
          >
            <div className={classes.GroupImage} />
            <span>{this.props.groupName}</span>
          </div>
          <div className={classes.GroupDescription}>
            {this.props.groupDescription}
          </div>
          <div
            className={classes.QuestionsWrapper}
            style={{
              height:
                this.props.stepIndex === 0
                  ? 'auto'
                  : `${this.props.questionWrapperHeight}`
            }}
          >
            <div className={classes.QuesstionText}>{this.props.txt}</div>
            <div
              className={classes.AnswersWrapper}
              style={{
                height:
                  this.props.stepIndex === 0
                    ? '200px'
                    : `${this.props.answerWrapperHeight}`
              }}
            >
              {answers}
              {answers.length < 4 && <div className={classes.AnswerMock} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionCheckboxItem;
