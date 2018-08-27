import React, { PureComponent, Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './QuestionItem.scss';
import items from '../../../styles/components/_switch-item.scss';
import { idGenerator } from '../../../services/helpers';
import Answer from '../Answer/Answer';
import {
  CREATE_ANSWER,
  QUESTIONNAIRE_TREE
} from '../../../constants/constants';

class QuestionItem extends PureComponent {
  constructor(props) {
    super(props);

    this.answersWrapperRef = React.createRef();
    this.answerWrapperNode = null;
  }

  componentDidMount() {
    this.answerWrapperNode = ReactDOM.findDOMNode(
      this.answersWrapperRef.current
    );

    this.answerWrapperNode.scroll({
      top: this.props.answersWrapperScrollTop
    });
  }

  addQuestionType = () => {
    switch (this.props.type) {
      case QUESTIONNAIRE_TREE.typeCheckbox:
        return QUESTIONNAIRE_TREE.typeCheckbox;
      case QUESTIONNAIRE_TREE.typeRadioButton:
        return QUESTIONNAIRE_TREE.typeRadio;
      case QUESTIONNAIRE_TREE.typeSlider:
        return QUESTIONNAIRE_TREE.typeSlider;
      case QUESTIONNAIRE_TREE.typeCreate:
        return QUESTIONNAIRE_TREE.typeCreate;
      default:
        break;
    }
  };

  addQuestionImageClass = () => {
    switch (this.props.type) {
      case QUESTIONNAIRE_TREE.typeCheckbox:
        return classes.QuestionCheckbox;
      case QUESTIONNAIRE_TREE.typeRadio:
        return classes.QuestionRadio;
      case QUESTIONNAIRE_TREE.typeSlider:
        return classes.QuestionSlider;
      default:
        break;
    }
  };

  render() {
    const serverAnswers = this.props.answers;
    // const sliderFilters =
    //   serverAnswers && serverAnswers[0]
    //     ? serverAnswers[0].numericFilters.concat(
    //         serverAnswers[0].specialFilters
    //       )
    //     : [];

    // const slider = (
    //   <div className={classes.Slider}>
    //     <div className={classes.SliderLine}>
    //       <div className={classes.SliderCircle} />
    //     </div>
    //     <div className={classes.TextsWrapper}>
    //       {sliderFilters[0] &&
    //       typeof sliderFilters[0].minPropertyValue !== 'undefined' ? (
    //         <div className={classes.Text}>
    //           <p className={classes.MinSliderValue}>
    //             Min: {sliderFilters[0].minPropertyValue}
    //           </p>
    //           <p className={classes.MinSliderValue}>
    //             {sliderFilters[0].propertyGroupName}
    //             {sliderFilters[0].type === CREATE_ANSWER.numericFilter
    //               ? `(${sliderFilters[0].propertyName})`
    //               : null}
    //           </p>
    //         </div>
    //       ) : null}
    //       {sliderFilters[0] && sliderFilters[0].maxPropertyValue ? (
    //         <div className={classes.Text}>
    //           <p className={classes.MaxSliderValue}>
    //             Max: {sliderFilters[0].maxPropertyValue}
    //           </p>
    //           <p className={classes.MaxSliderValue}>
    //             {sliderFilters[0].propertyGroupName}
    //             {sliderFilters[0].type === CREATE_ANSWER.numericFilter
    //               ? `(${sliderFilters[0].propertyName})`
    //               : null}
    //           </p>
    //         </div>
    //       ) : null}
    //     </div>
    //   </div>
    // );
    const slider = null;

    const borderTopColor = this.props.parent.answerColor;
    const answers = serverAnswers.map((answer, index) => {
      return (
        <Answer
          key={idGenerator()}
          type={this.addQuestionType()}
          txt={answer.txt}
          isParent={answer.isParent}
          isActive={answer.isActive}
          isActiveAnswer={answer.isActiveAnswer}
          canCreate={answer.canCreate}
          answer={answer.answer}
          answerId={answer.id}
          additionalText={answer.additionalText}
          color={answer.color}
          activeCreateChild={answer.activeCreateChild}
          checkAnswer={() =>
            !answer.isParent &&
            this.props.checkAnswer(
              this.props.stepIndex,
              this.props.questionId,
              answer.id,
              this.answerWrapperNode.scrollTop
            )
          }
          stepIndex={this.props.stepIndex}
          questionId={this.props.questionId}
          questionColor={this.props.questionColor}
          questionHeight={this.props.questionHeight}
          questionTop={this.props.questionTop}
          questionWrapperHeight={this.props.questionWrapperHeight}
          questionIndex={this.props.questionIndex}
          answerWrapperHeight={this.props.answerWrapperHeight}
          toggleQuestionHeight={() =>
            this.props.toggleQuestionHeight(
              answer.color,
              this.answerWrapperNode.scrollTop
            )
          }
          fetchQuestions={this.props.fetchQuestions}
        />
      );
    });

    const answersJsx =
      this.props.type !== QUESTIONNAIRE_TREE.typeSlider ? (
        <Fragment>{answers}</Fragment>
      ) : (
        <Fragment>
          <div className={classes.SliderContentWrapper}>
            <div className={classes.SliderBar}>
              {slider}
              <div className={classes.SliderCircle} />
            </div>
            <div className={classes.SliderAnswerWrapper}>{answers}</div>
          </div>
        </Fragment>
      );
    return (
      <div
        className={`${items.SwitchItem} ${classes.QuestionItem}`}
        style={{
          borderTop:
            this.props.stepIndex === 0
              ? `1px solid ${QUESTIONNAIRE_TREE.defaultBorderColor}`
              : 'none',
          top: this.props.questionTop
        }}
      >
        {this.addQuestionType() !== QUESTIONNAIRE_TREE.typeCreate && (
          <div
            className={classes.RemoveQuestion}
            onClick={this.props.removeAfterQuestionClick}
          />
        )}
        <div
          className={classes.BorderTop}
          style={{
            backgroundColor: borderTopColor,
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
                this.props.stepIndex !== 0
                  ? 'none'
                  : `1px solid ${QUESTIONNAIRE_TREE.defaultBorderColor}`,
              cursor: this.props.stepIndex === 0 ? 'auto' : 'pointer'
            }}
          >
            <div
              className={`${
                classes.GroupImage
              } ${this.addQuestionImageClass()}`}
            />
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
                  ? QUESTIONNAIRE_TREE.answerBoxDefaultHeight
                  : this.props.questionWrapperHeight
            }}
          >
            <div className={classes.QuestionText}>{this.props.txt}</div>
            <div
              className={classes.AnswerWrapperCover}
              style={{
                height:
                  this.props.stepIndex === 0
                    ? QUESTIONNAIRE_TREE.answerBoxCustomHeight
                    : this.props.answerWrapperHeight
              }}
            />
            <div
              ref={this.answersWrapperRef}
              className={classes.AnswersWrapper}
              style={{
                height:
                  this.props.stepIndex === 0
                    ? QUESTIONNAIRE_TREE.answerBoxCustomHeight
                    : this.props.answerWrapperHeight
              }}
            >
              {answersJsx}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionItem;
