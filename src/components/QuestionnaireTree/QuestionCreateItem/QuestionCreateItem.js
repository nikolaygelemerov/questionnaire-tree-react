import React, { PureComponent } from 'react';

import classes from './QuestionCreateItem.scss';
import items from '../../../styles/components/_switch-item.scss';
import PlusButton from '../../shared/PlusButton/PlusButton';
import { idGenerator } from '../../../helpers/helpers';

class QuestionCreateItem extends PureComponent {
  render() {
    const mockAnswers = ['Volvo', 'Saab', 'Opel', 'Audi'];
    const answers = this.props.answers || mockAnswers;
    return (
      <div
        className={`${items.SwitchItem} ${classes.QuestionCreateItem}`}
        style={{
          borderColor: this.props.questionColor,
          top: this.props.questionTop,
          height: this.props.questionHeight
        }}
      >
        <div className={`${items.Content} ${classes.Content}`}>
          <div className={`${items.Image}`}>
            <PlusButton backgroundColor={this.props.questionColor} />
          </div>
        </div>
        <div className={classes.SelectWrapper}>
          <select>
            {answers.map(element => (
              <option key={idGenerator()} value={element}>
                {element}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default QuestionCreateItem;
