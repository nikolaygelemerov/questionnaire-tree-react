import React, { Component, Fragment } from 'react';

import styles from './AllQuestions.scss';
import NewQuestionModal from '../../../components/AdviserInfo/AllQuestions/NewQuestionModal/NewQuestionModal';
import NewAnswerModal from '../../../components/AdviserInfo/AllQuestions/NewAnswerModal/NewAnswerModal';
import * as actionCreators from '../../../store/actions';
import withProviderConsumer from '../../../hoc/withProviderConsumer/withProviderConsumer';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import AddQuestion from '../../../components/AdviserInfo/AllQuestions/QuestionView/AddQuestion/AddQuestion';
import ROUTES from '../../../constants/urls';
import { QUESTION } from '../../../constants/backendUrls';
import { ACTION_BUTTON_WHITE_ORANGE } from '../../../constants/constants';
import {
  allQuestions,
  createAnswer as translations
} from '../../../translations/translations';
import axios from '../../../services/axios';
import {
  idGenerator,
  idStringReplace,
  stringReplace
} from '../../../services/helpers';
import QuestionView from '../../../components/AdviserInfo/AllQuestions/QuestionView/QuestionView';
import Loader from '../../../components/shared/Loader/Loader';

const URLS = { ...ROUTES, ...QUESTION };

class AllQuestions extends Component {
  state = {
    questionsCatalog: [],
    active: true,
    questionTogglers: [],
    showNewQuestionModal: false,
    showNewAnswerModal: false,
    showOverview: false,
    activeQuestion: null,
    areQuestionsLoaded: false
  };

  componentDidMount() {
    this.props.dispatch(
      actionCreators.addAdviserId(this.props.match.params.id, () => {
        this.loadQuestions();
      })
    );
  }
  showNewQuestionModal = (event, activeQuestion) => {
    const state = {
      showNewQuestionModal: true,
      activeQuestion: activeQuestion
    };
    this.setState(state);
  };

  showNewAnswerModal = (newQuestion, showOverview) => {
    this.setState({
      showNewAnswerModal: true,
      activeQuestion: newQuestion,
      showOverview: showOverview
    });
  };

  closeNewQuestionModal = shouldTriggerQuestionsLoad => {
    this.setState({ showNewQuestionModal: false });
    if (shouldTriggerQuestionsLoad === true) {
      this.loadQuestions();
    }
  };

  closeNewAnswerModal = () => {
    this.loadQuestions();
    this.setState({ showNewAnswerModal: false });
  };

  saveNewQuestion = (newQuestion, isEditing) => {
    this.closeNewQuestionModal(true);
    if (!isEditing) {
      this.showNewAnswerModal(newQuestion, false);
    }
  };

  editQuestion = async questionId => {
    try {
      const response = await axios.get(
        stringReplace(URLS.get.question, [
          { key: '{advisorId}', value: this.props.activeAdviser },
          { key: '{questionId}', value: questionId }
        ]),
        {
          params: {},
          errorMsg: translations.getQuestionError
        }
      );
      this.showNewQuestionModal(null, response.data);
    } catch (error) {
      console.error(error);
    }
  };

  editAnswers = async questionId => {
    try {
      const response = await axios.get(
        stringReplace(URLS.get.question, [
          { key: '{advisorId}', value: this.props.activeAdviser },
          { key: '{questionId}', value: questionId }
        ]),
        {
          params: {},
          errorMsg: translations.getQuestionError
        }
      );
      this.showNewAnswerModal(response.data, true);
    } catch (error) {
      console.error(error);
    }
  };

  addAnswer = async questionId => {
    try {
      const response = await axios.get(
        stringReplace(URLS.get.question, [
          { key: '{advisorId}', value: this.props.activeAdviser },
          { key: '{questionId}', value: questionId }
        ]),
        {
          params: {},
          errorMsg: translations.getQuestionError
        }
      );
      this.showNewAnswerModal(response.data, false);
    } catch (error) {
      console.error(error);
    }
  };

  loadQuestions = () => {
    axios
      .get(idStringReplace(URLS.get.questions, this.props.activeAdviser))
      .then(result => {
        this.setState({
          questionsCatalog: [...result.data],
          areQuestionsLoaded: true
        });
      });
  };

  render() {
    let addQuestionButton = {
      clicked: this.showNewQuestionModal,
      title: allQuestions.addQuestionBtn,
      navigateTo: false,
      route: URLS.mainData,
      addClass: `${ACTION_BUTTON_WHITE_ORANGE}`
    };

    const newAnswerModal = this.state.showNewAnswerModal ? (
      <NewAnswerModal
        overflowY={'auto'}
        addQuestionImageClass={this.addQuestionImageClass}
        showOverview={this.state.showOverview}
        activeQuestion={this.state.activeQuestion}
        onModalClose={this.closeNewAnswerModal}
        show={this.state.showNewAnswerModal}
      />
    ) : null;

    const newQuestionModal = this.state.showNewQuestionModal ? (
      <NewQuestionModal
        closeNewQuestionModal={this.closeNewQuestionModal}
        activeQuestion={this.state.activeQuestion}
        saveNewQuestion={this.saveNewQuestion}
        onModalClose={this.closeNewQuestionModal}
        show={this.state.showNewQuestionModal}
      />
    ) : null;

    const content = (
      <Fragment>
        {this.state.questionsCatalog.map(question => {
          return (
            <QuestionView
              addAnswer={this.addAnswer}
              editAnswers={this.editAnswers}
              editQuestion={this.editQuestion}
              key={idGenerator()}
              question={question}
            />
          );
        })}
        <AddQuestion
          mainClasses={styles.AddCardContainer}
          button={addQuestionButton}
        />
        {newAnswerModal}
        {newQuestionModal}
      </Fragment>
    );

    return this.state.areQuestionsLoaded ? content : <Loader />;
  }
}

export default withErrorHandler(
  withProviderConsumer(AllQuestions, ['activeAdviser', 'dispatch']),
  axios
);
