import React, { PureComponent } from 'react';

import classes from './QuestionCreateItem.scss';
import items from '../../../styles/components/_switch-item.scss';
import PlusButton from '../../shared/PlusButton/PlusButton';
import { idGenerator } from '../../../services/helpers';
import { QUESTIONNAIRE_TREE } from '../../../constants/constants';

class QuestionCreateItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      questions: props.questionList || []
    };
  }

  selectQuestion = event => {
    const questionId = parseInt(event.target.value, 10);
    let params = { questionId };

    if (this.props.parent) {
      params = { ...params, answerIdList: this.props.parent.answerId };
    }

    this.props.addQuestionToTree(params);
  };

  render() {
    return this.state.questions ? (
      <div
        className={`${items.SwitchItem} ${classes.QuestionCreateItem}`}
        style={{
          borderColor:
            this.props.questionColor || this.props.generateRandomColor(),
          top:
            typeof this.props.questionTop !== 'undefined'
              ? this.props.questionTop
              : QUESTIONNAIRE_TREE.defaultCreateItemTopOffset,
          height:
            typeof this.props.questionHeight !== 'undefined'
              ? this.props.questionHeight
              : QUESTIONNAIRE_TREE.defaultCreateItemHeight
        }}
      >
        <div className={`${items.Content} ${classes.Content}`}>
          <div className={`${items.Image}`}>
            <PlusButton backgroundColor={this.props.questionColor} />
          </div>
        </div>
        <div className={classes.SelectWrapper}>
          <select onChange={this.selectQuestion}>
            <option key={idGenerator()}>Select question</option>
            {this.state.questions.map(question => (
              <option key={idGenerator()} value={question.id}>
                {question.publicName}
              </option>
            ))}
          </select>
        </div>
      </div>
    ) : null;
  }
}

export default QuestionCreateItem;
