import React, { Component, Fragment } from 'react';

import classes from './QuestionView.scss';
import buttons from '../../../../styles/_buttons.scss';
import Toggler from '../../../shared/Toggler/Toggler';
import Question from './Question/Question';
import { allQuestions } from '../../../../translations/translations';
import Filters from './Filters/Filters';
import { QUESTION } from '../../../../constants/constants';
import PlusButtonSmall from '../../../shared/PlusButtonSmall/PlusButtonSmall';

class QuestionView extends Component {
  state = {
    toggleQuestion: true
  };

  toggle = () => {
    this.setState(prevState => {
      return { toggleQuestion: !prevState.toggleQuestion };
    });
  };

  addQuestionImageClass = () => {
    switch (this.props.question.answerType.id) {
      case QUESTION.typeCheckbox:
        return classes.QuestionCheckbox;
      case QUESTION.typeRadio:
        return classes.QuestionRadio;
      case QUESTION.typeSlider:
        return classes.QuestionSlider;
      default:
        break;
    }
  };

  render() {
    const addAnswerBlock = (
      <PlusButtonSmall
        click={() => this.props.addAnswer(this.props.question.id)}
        text={allQuestions.addAnswer}
      />
    );
    const footer = this.props.question.hasAnswers ? (
      <p className={classes.EditAnswersContainer}>
        <a onClick={() => this.props.editAnswers(this.props.question.id)}>
          {allQuestions.editAnswer}
        </a>
      </p>
    ) : (
      <div
        className={`${classes.EditAnswersContainer} ${classes.ClearPadding}`}
      >
        {addAnswerBlock}
      </div>
    );

    const filters =
      this.props.question.answers.length > 0 ? (
        <Toggler
          scroll={true}
          className={`${this.state.toggleQuestion ? classes.Active : null}`}
          toggle={!this.state.toggleQuestion}
          title={allQuestions.filter}
          toggleAction={this.toggle}
        >
          <div className={classes.FixedSize}>
            <Filters
              addAnswerBlock={addAnswerBlock}
              answers={this.props.question.answers}
            />
          </div>
        </Toggler>
      ) : (
        <p className={classes.NoFilters}>{allQuestions.noFilters}</p>
      );

    const question = (
      <Question
        question={this.props.question.questionText}
        answers={this.props.question.answers}
        answerType={this.props.question.answerType.type}
        disableAnswers={true}
      />
    );

    const questionToggler =
      this.props.question.answers.length > 0 ? (
        <Toggler
          scroll={true}
          toggle={this.state.toggleQuestion}
          title={
            this.state.toggleQuestion
              ? allQuestions.openQuestionTitle
              : allQuestions.closedQuestionTitle
          }
          toggleAction={this.toggle}
        >
          {question}
        </Toggler>
      ) : (
        <Fragment>
          <p className={classes.NoFilters}>{allQuestions.openQuestionTitle}</p>
          {question}
          {!this.props.question.hasAnswers ? addAnswerBlock : null}
        </Fragment>
      );

    return (
      <div className={classes.QuestionCardContainer}>
        <div className={classes.QuestionGroupName}>
          <div className={classes.QuestionTitleWrapper}>
            <div
              className={`${
                classes.GroupImage
              } ${this.addQuestionImageClass()}`}
            />
            <div className={classes.GroupTitle}>
              {this.props.question.publicName}
            </div>
          </div>
          <div
            className={`${classes.GroupButton} ${buttons.Edit}`}
            onClick={() => this.props.editQuestion(this.props.question.id)}
          />
        </div>
        <div className={classes.GroupDescription}>
          {this.props.question.internalName}
        </div>
        <div
          className={`${classes.ToggleWrapper} ${
            this.state.toggleQuestion ? classes.Active : null
          }`}
        >
          {questionToggler}
        </div>
        <div className={classes.FooterWrapper}>
          <div
            className={`${classes.ToggleWrapper} ${
              !this.state.toggleQuestion ? classes.Active : null
            } ${classes.FilterToggler}`}
          >
            {filters}
          </div>
          {footer}
        </div>
      </div>
    );
  }
}

export default QuestionView;
