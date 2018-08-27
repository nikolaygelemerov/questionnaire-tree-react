import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import classes from './QuestionnaireTree.scss';
import QuestionCreateItem from '../../../components/QuestionnaireTree/QuestionCreateItem/QuestionCreateItem';
import QuestionItem from '../../../components/QuestionnaireTree/QuestionItem/QuestionItem';
import { idGenerator } from '../../../services/helpers';
import { colorGenerator } from '../../../services/helpers';
import { idStringReplace } from '../../../services/helpers';
import QuestionStep from '../../../components/QuestionnaireTree/QuestionStep/QuestionStep';
import axios from '../../../services/axios';
import { questionnaireTree } from '../../../translations/translations';
import Loader from '../../../components/shared/Loader/Loader';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import URLS from '../../../constants/urls';
import { TREE } from '../../../constants/backendUrls';
import {
  QUESTIONNAIRE_TREE,
  BUTTON_TYPES,
  ACTION_BUTTON_ORANGE,
  TREE_COLORS
} from '../../../constants/constants';
import * as actionCreators from '../../../store/actions';
import withProviderConsumer from '../../../hoc/withProviderConsumer/withProviderConsumer';
import Modal from '../../../components/shared/Modal/Modal';
import ActionButton from '../../../components/shared/ActionButton/ActionButton';
import { QuestionSteps } from './QuestionSteps';

class QuestionnaireTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeHeight: 'auto',
      questions: [],
      isRequestExecuted: false,
      showModal: false,
      clickedQuestioniId: '',
      clickedAnswerData: {},
      answersWrapperScrollTop: 0,
      colorsUsed: []
    };

    this.advisorId = this.props.match.params.id;
    this.colorsUsed = [];
    this.treeRef = React.createRef();
    this.treeScrollX = 0;
  }

  componentDidMount() {
    // this.props.dispatch(
    //   actionCreators.addAdviserId(this.props.match.params.id, () => {
    //     this.getTree();
    //   })
    // );

    QuestionSteps.forEach(step => {
      step.ref = React.createRef();

      step.forEach(question => {
        question.ref = React.createRef();

        if (!question.parent) {
          question.parent = {
            questionId: null,
            answerId: null,
            answerIndex: null
          };
        }
      });
    });

    const filteredSteps = QuestionSteps.filter(step => step.length);

    this.setState({ steps: filteredSteps, isRequestExecuted: true }, () =>
      this.addAnswerColor()
    );
  }

  componentDidUpdate() {}

  navigateToMainPage = history => {
    history.push(`${URLS.root}`);
  };

  fetchQuestions = answerData => {
    const treeNode = ReactDOM.findDOMNode(this.treeRef.current);
    if (treeNode) {
      this.treeScrollX = treeNode.scrollLeft;
    }

    if (answerData && this.handleExistingCreateQuestion(answerData)) {
      return;
    } else {
      this.setState({ isRequestExecuted: false }, async () => {
        try {
          const response = await axios.get(
            idStringReplace(TREE.get.availableQustions, this.advisorId),
            {
              errorMsg: questionnaireTree.availableQuestionsErrMsg,
              errorCallback: () => {}
            }
          );

          let questions = {};

          if (response.data) {
            questions = { ...response.data };
          }

          questions = Object.keys(questions).map(
            propName => questions[propName]
          );

          this.setState(
            {
              questions: [...questions],
              isRequestExecuted: true
            },
            () => {
              this.state.isRequestExecuted &&
                this.state.steps &&
                this.state.steps.length &&
                answerData &&
                this.addNewQuestion(answerData, questions);
            }
          );
        } catch (error) {
          console.error(error);
        }
      });
    }
  };

  addQuestionToTree = params => {
    const treeNode = ReactDOM.findDOMNode(this.treeRef.current);
    if (treeNode) {
      this.treeScrollX =
        treeNode.scrollLeft - QUESTIONNAIRE_TREE.questionItemWidth;
    }

    this.setState({ isRequestExecuted: false }, async () => {
      try {
        const response = await axios.post(
          idStringReplace(TREE.post.questionToTree, this.advisorId),
          { ...params },
          {
            errorMsg: questionnaireTree.addQuestionErrMsg,
            errorCallback: this.getTree
          }
        );

        this.fetchTree(response, true);
      } catch (error) {
        console.error(error);
      }
    });
  };

  getTree = params => {
    this.setState({ isRequestExecuted: false }, async () => {
      try {
        const response = await axios.get(
          idStringReplace(TREE.get.tree, this.advisorId),
          {
            errorMsg: questionnaireTree.treeErroMsg,
            errorCallback: this.fetchQuestions
          }
        );
        this.fetchTree(response);
      } catch (error) {
        console.error(error);
      }
    });
  };

  removeAfterAnswerUncheck = answerData => {
    const stepsCopy = [...this.state.steps];
    const hasChild = this.hasAnswerChild(
      { id: answerData.id, returnCreateParent: true },
      stepsCopy
    );

    if (!hasChild || hasChild.type === QUESTIONNAIRE_TREE.typeCreate) {
      const stepsCopy = [...this.state.steps];

      stepsCopy[answerData.stepIndex].forEach(question => {
        if (question.id === answerData.quesitonId) {
          question.answers.forEach(answer => {
            if (answer.id === answerData.id) {
              answer.isParent = false;
            }
          });
        }
      });

      if (hasChild) {
        //this.getTree(); fetch from backend optionally else:
        stepsCopy.forEach((step, stepIndex) => {
          if (stepsCopy[stepIndex + 1]) {
            stepsCopy[stepIndex + 1].forEach(question => {
              if (question.id === hasChild.id) {
                question.parent.answerId = hasChild.parent.answerId.filter(
                  id => id !== answerData.id
                );

                if (!question.parent.answerId.length) {
                  this.cleanCreateQuestionItem(stepsCopy);
                }
              }
            });
          }
        });

        const filteredSteps = stepsCopy.filter(step => step.length);

        this.calculateQuestionTopOffset(filteredSteps);
      } else {
        const filteredSteps = stepsCopy.filter(step => step.length);

        this.setState({ steps: filteredSteps });
      }
    } else {
      this.setState(
        { isRequestExecuted: false, showModal: false, clickedAnswerData: {} },
        async () => {
          try {
            const response = await axios.delete(
              `${idStringReplace(TREE.delete.answer, this.advisorId)}${
                answerData.id
              }`,
              {
                errorMsg: questionnaireTree.deleteAnswerErrMsg
              }
            );

            this.fetchTree(response);
          } catch (error) {
            console.error(error);
          }
        }
      );
    }
  };

  removeAfterQuestionClick = async questionId => {
    this.setState(
      { isRequestExecuted: false, clickedQuestioniId: null, showModal: false },
      async () => {
        try {
          const response = await axios.delete(
            `${idStringReplace(
              TREE.delete.question,
              this.advisorId
            )}${questionId}`,
            {
              errorMsg: questionnaireTree.deleteQuestionErrMsg
            }
          );
          this.fetchTree(response);
        } catch (error) {
          console.error(error);
        }
      }
    );
  };

  fetchTree = (response, triggerScroll) => {
    const questionSteps = [...response.data];
    this.colorsUsed = [];

    if (questionSteps.length) {
      questionSteps.forEach(step => {
        step.ref = React.createRef();

        step.forEach(question => {
          question.ref = React.createRef();

          if (!question.parent) {
            question.parent = {
              questionId: null,
              answerId: null,
              answerIndex: null
            };
          }
        });
      });

      const filteredSteps = questionSteps.filter(step => step.length);

      this.setState({ steps: filteredSteps, isRequestExecuted: true }, () => {
        this.state.isRequestExecuted &&
          this.addAnswerColor(filteredSteps, triggerScroll);
      });
    } else {
      this.setState({ steps: [] }, () => this.fetchQuestions());
    }
  };

  checkAnswer = (stepIndex, questionId, answerId, scrollTop) => {
    const stepsCopy = [...this.state.steps];

    stepsCopy[stepIndex].forEach(question => {
      if (question.id === questionId) {
        question.answers.forEach((answer, answerIndex) => {
          if (answer.id === answerId) {
            //if answer is already checked do nothing
            if (answer.isParent) {
              return;
            }

            answer.isParent = !answer.isParent;

            let answerData = {
              questionId: question.id,
              questionColor: question.parent.answerColor,
              questionTop: question.top,
              stepIndex,
              ...answer
            };

            if (!answer.isParent) {
              answer.activeCreateChild = false;

              stepsCopy[stepIndex].forEach(innerQuestion => {
                if (innerQuestion.id === question.id) {
                  innerQuestion.answers.forEach(innerAnswer => {
                    if (!innerAnswer.isParent) {
                      innerAnswer.activeCreateChild = false;
                    }
                  });
                }
              });
              if (
                this.hasAnswerChild(
                  {
                    id: answer.id
                  },
                  stepsCopy
                )
              ) {
                this.setState({
                  showModal: true,
                  clickedAnswerData: {
                    id: answerData.id,
                    stepIndex: answerData.stepIndex
                  }
                });
              } else {
                this.removeAfterAnswerUncheck({
                  ...answerData,
                  activeCreateChild: false
                });
              }
            } else {
              stepsCopy.forEach(step => {
                step.forEach(question => {
                  if (question.type !== QUESTIONNAIRE_TREE.typeCreate) {
                    question.answers.forEach(answer => {
                      if (
                        question.id !== answerData.questionId &&
                        !this.hasAnswerChild(
                          {
                            id: answer.id
                          },
                          stepsCopy
                        ) &&
                        question.type !== QUESTIONNAIRE_TREE.typeCheckbox &&
                        question.type !== QUESTIONNAIRE_TREE.typeSlider
                      ) {
                        answer.isParent = false;
                      } else if (
                        !this.hasAnswerChild(
                          {
                            id: answer.id,
                            returnCreateParent: true
                          },
                          stepsCopy
                        )
                      ) {
                        answer.activeCreateChild = false;
                      }
                    });
                  }
                });
              });

              let firstSelectedAnswer = question.answers.find(
                innerAnswer => innerAnswer.isParent
              );

              const selectedAnswers = question.answers.filter(
                answer => answer.isParent
              );

              if (selectedAnswers.length > 1) {
                const answerWithParentColor = selectedAnswers.find(
                  answer =>
                    answer.color === question.parent.answerColor &&
                    this.hasAnswerChild(
                      {
                        id: answer.id
                      },
                      stepsCopy
                    )
                );

                let parentCreateItem;
                selectedAnswers.forEach(answer => {
                  const parentCreate = this.hasAnswerChild(
                    {
                      id: answer.id,
                      returnCreateParent: true
                    },
                    stepsCopy
                  );

                  if (typeof parentCreate === 'object') {
                    parentCreateItem = parentCreate;
                  }
                });

                selectedAnswers.forEach(answer => {
                  if (!answerWithParentColor) {
                    answer.color = question.parent.answerColor;
                  } else if (
                    !this.hasAnswerChild(
                      {
                        id: answer.id
                      },
                      stepsCopy
                    )
                  ) {
                    if (parentCreateItem) {
                      answer.color = parentCreateItem.parent.answerColor;
                    } else {
                      answer.color = this.getUniqueColor(answer.branchLevel);
                    }
                  }
                });
              } else {
                if (stepIndex !== 0) {
                  firstSelectedAnswer.color = question.parent.answerColor;
                } else {
                  const color = this.getUniqueColor(answer.branchLevel);

                  firstSelectedAnswer.color = color;
                  question.parent.answerColor = firstSelectedAnswer.color;
                }
              }

              answer.canCreate = true;
              answerData = { ...answerData, canCreate: answer.canCreate };

              this.addNewPathAfterCheck(answerData, scrollTop);
            }
          }
        });
      }
    });
  };

  addNewPathAfterCheck = (answerData, scrollTop) => {
    const stepsCopy = [...this.state.steps];
    const filteredSteps = stepsCopy.filter(step => step.length);

    this.setState(
      { steps: filteredSteps, answersWrapperScrollTop: scrollTop },
      () => false && this.addAnswerColor(stepsCopy)
    );
  };

  hasAnswerChild = (answerData, steps) => {
    const stepsCopy = steps || [...this.state.steps];
    let hasChild;

    stepsCopy.forEach((step, stepIndex) => {
      step.forEach(question => {
        if (stepIndex !== stepsCopy.length - 1) {
          stepsCopy[stepIndex + 1].forEach(nextQuestion => {
            if (
              (nextQuestion.type !== QUESTIONNAIRE_TREE.typeCreate &&
                nextQuestion.parent.answerId === answerData.id) ||
              (nextQuestion.parent.moreAnswers &&
                nextQuestion.parent.moreAnswers.indexOf(answerData.id) !== -1)
            ) {
              const parentCopy = { ...nextQuestion };
              hasChild = answerData.returnParent ? parentCopy : true;
            }

            if (
              answerData.returnCreateParent &&
              nextQuestion.type === QUESTIONNAIRE_TREE.typeCreate &&
              (nextQuestion.parent.answerId &&
                nextQuestion.parent.answerId.indexOf(answerData.id) !== -1)
            ) {
              hasChild = nextQuestion;
            }
          });
        }
      });
    });

    return hasChild;
  };

  hasQuestionChild = questionId => {
    const stepsCopy = [...this.state.steps];
    let hasChild;

    stepsCopy.forEach((step, stepIndex) => {
      if (stepIndex !== stepsCopy.length - 1) {
        stepsCopy[stepIndex + 1].forEach(nextQuestion => {
          if (nextQuestion.parent.questionId === questionId) {
            hasChild = true;
          }
        });
      }
    });

    return hasChild;
  };

  addAnswerColor = (steps, triggerScroll) => {
    const stepsCopy = steps || [...this.state.steps];

    this.handleRepetitiveQuestion(stepsCopy);
    this.addBranchLevel(stepsCopy);

    stepsCopy.forEach((step, stepIndex) => {
      step.forEach(question => {
        let uniqueChildIds = [];
        question.answers.forEach(answer => {
          const answerChild = this.hasAnswerChild(
            {
              stepIndex,
              id: answer.id,
              returnParent: true
            },
            stepsCopy
          );

          if (
            question.type === QUESTIONNAIRE_TREE.typeCheckbox ||
            question.type === QUESTIONNAIRE_TREE.typeSlider
          ) {
            if (question.answers.find(answer => answer.isParent)) {
              answer.isParent = true;
            } else {
              answer.isParent = false;
            }
          } else {
            answer.activeCreateChild = false;
            answer.canCreate = !answerChild;

            if (answerChild) {
              answer.childId = answerChild.id;

              if (stepIndex !== 0) {
                let firstSelectedAnswer;
                let firstAnswerChild;

                firstSelectedAnswer = question.answers.find(answer => {
                  firstAnswerChild = this.hasAnswerChild(
                    {
                      id: answer.id,
                      returnParent: true
                    },
                    stepsCopy
                  );

                  return answer.isParent && firstAnswerChild;
                });

                if (
                  !firstSelectedAnswer ||
                  (firstSelectedAnswer && firstSelectedAnswer.id !== answer.id)
                ) {
                  answer.color = this.getUniqueColor(
                    answer.branchLevel,
                    answer
                  );
                }
              } else {
                if (uniqueChildIds.indexOf(answer.childId)) {
                  uniqueChildIds.push(answer.childId);
                  answer.color = this.getUniqueColor(
                    answer.branchLevel,
                    answer
                  );
                }
              }
            }
          }
        });

        if (stepIndex !== 0) {
          let parentQuestion = stepsCopy[stepIndex - 1].find(
            stepQuestion => stepQuestion.id === question.parent.questionId
          );

          parentQuestion.parent.answerColor = parentQuestion.answers.find(
            answer => answer.id === question.parent.answerId
          ).color;
        }
      });
    });

    this.addQuestionColor(stepsCopy, null, triggerScroll);
  };

  getParentQuestion = (stepsCopy, stepIndex, question) =>
    stepsCopy[stepIndex - 1].find(
      stepQuestion => stepQuestion.id === question.parent.questionId
    );

  handleRepetitiveQuestion = stepsCopy => {
    stepsCopy.forEach((step, stepIndex) => {
      const repetetiveList = stepsCopy[stepIndex].filter(
        (question, questionIndex, arr) => {
          return (
            arr.map(mapObj => mapObj.id).indexOf(question.id) !== questionIndex
          );
        }
      );

      stepsCopy[stepIndex] = stepsCopy[stepIndex].filter(
        (question, questionIndex, arr) => {
          return (
            arr.map(mapObj => mapObj.id).indexOf(question.id) === questionIndex
          );
        }
      );

      stepsCopy[stepIndex].forEach(question => {
        let repetetiveToQuestion = repetetiveList.filter(
          repetetiveQuestion => repetetiveQuestion.id === question.id
        );

        if (repetetiveToQuestion.length) {
          question.parent.moreAnswers = repetetiveToQuestion.map(
            repetetiveQuestion => repetetiveQuestion.parent.answerId
          );
        }
      });
    });
  };

  addQuestionColor = (steps, answerData, triggerScroll) => {
    let stepsCopy = [...steps];

    stepsCopy.forEach((step, stepIndex) => {
      step.forEach(question => {
        if (stepIndex !== 0) {
          let parentQuestion = this.getParentQuestion(
            stepsCopy,
            stepIndex,
            question
          );

          if (parentQuestion) {
            let selectedParentAnswer = parentQuestion.answers.find(
              stepAnswer =>
                stepAnswer.isParent &&
                this.hasAnswerChild(
                  {
                    stepIndex: parentQuestion.index,
                    id: stepAnswer.id
                  },
                  stepsCopy
                )
            );

            if (
              selectedParentAnswer &&
              question.parent.answerId === selectedParentAnswer.id
            ) {
              question.parent.answerColor = parentQuestion.parent.answerColor;
            } else {
              question.parent.answerColor = parentQuestion.answers.find(
                answer => answer.id === question.parent.answerId
              ).color;
            }

            let firstSelectedAnswer = question.answers.find(
              answer =>
                answer.isParent &&
                this.hasAnswerChild(
                  {
                    stepIndex: parentQuestion.index,
                    id: answer.id
                  },
                  stepsCopy
                )
            );

            if (firstSelectedAnswer) {
              const selectedAnswers = question.answers.find(
                answer => answer.color === question.parent.answerColor
              );

              if (
                !selectedAnswers ||
                (answerData &&
                  answerData.color === question.parent.answerColor) ||
                (selectedAnswers && !answerData)
              ) {
                firstSelectedAnswer.color = question.parent.answerColor;

                this.colorsUsed = this.colorsUsed.filter(
                  color => color !== firstSelectedAnswer.branchColor
                );
              }
            }
          }
        } else {
          const firstSelectedAnswer = question.answers.find(
            answer => answer.isParent
          );

          if (firstSelectedAnswer) {
            question.parent.answerColor = firstSelectedAnswer.color;
          }
        }
      });
    });

    stepsCopy.forEach((step, stepIndex) => {
      step.forEach(question => {
        question.answers.forEach(answer => {
          const child = this.hasAnswerChild(
            {
              stepIndex: stepIndex,
              id: answer.id,
              returnParent: true
            },
            stepsCopy
          );

          if (child) {
            answer.childId = child.id;

            if (child.parent.moreAnswers) {
              answer.color = child.parent.answerColor;
            }

            if (question.type === QUESTIONNAIRE_TREE.typeCreate) {
              question.answers.forEach(
                answer => (answer.color = child.parent.answerColor)
              );
            }
          }

          if (question.type === QUESTIONNAIRE_TREE.typeSlider) {
            if (question.parent.answerColor) {
              question.answers.forEach(
                answer => (answer.color = question.parent.answerColor)
              );
            }
          }

          if (question.type === QUESTIONNAIRE_TREE.typeCheckbox) {
            if (question.parent.answerColor) {
              question.answers.forEach(
                answer => (answer.color = question.parent.answerColor)
              );
            }

            if (question.answers.find(answer => answer.isParent)) {
              question.answers.forEach(answer => (answer.isParent = true));
            }
          }
        });
      });
    });

    if (answerData) {
      this.toggleQuestionHeight(stepsCopy, answerData.questionColor);
    }

    this.calculateQuestionTopOffset(stepsCopy, [], triggerScroll);
  };

  calculateQuestionTopOffset = (stepsCopy, questions = [], createQuestion) => {
    stepsCopy.forEach((step, stepIndex) => {
      step.forEach((question, questionIndex) => {
        question.index = questionIndex;
        question.stepIndex = stepIndex;
        question.height =
          question.type !== QUESTIONNAIRE_TREE.typeCreate
            ? ReactDOM.findDOMNode(question.ref.current).clientHeight
            : question.height;

        if (stepIndex !== 0 && questionIndex !== 0) {
          const prevQuestion = stepsCopy[stepIndex][questionIndex - 1];

          question.top =
            prevQuestion.top +
            (prevQuestion.type !== QUESTIONNAIRE_TREE.typeCreate
              ? ReactDOM.findDOMNode(prevQuestion.ref.current).clientHeight
              : prevQuestion.height) +
            20;
        } else {
          question.top = 0;
        }
      });
    });

    this.updateQuestionPosition(stepsCopy);

    const treeHeight = this.setTreeHeight(stepsCopy);

    const filteredSteps = stepsCopy.filter(step => step.length);

    this.setState(
      {
        steps: filteredSteps,
        questions: [...questions],
        treeHeight
      },
      () => createQuestion && this.scrollOnQuestionAdd(createQuestion)
    );
  };

  updateQuestionPosition = stepsCopy => {
    stepsCopy.forEach(step => {
      step.forEach(question => {
        this.setPositionBasedOnParent(stepsCopy);
        this.setQuestionPositionBasedOnPrev(stepsCopy);
        this.setPositionBasedOnParent(stepsCopy);
      });
    });
  };

  setTreeHeight = stepsCopy => {
    let lastQuestionMain;
    let treeHeight;
    const mainQuestion = stepsCopy[0][0];

    if (stepsCopy[1] && stepsCopy[1].length) {
      lastQuestionMain = stepsCopy[1][stepsCopy[1].length - 1];
      let maxTopElement = this.findMaxTop(lastQuestionMain, stepsCopy);

      if (maxTopElement) {
        if (
          maxTopElement.top +
            (maxTopElement.type !== QUESTIONNAIRE_TREE.typeCreate
              ? ReactDOM.findDOMNode(maxTopElement.ref.current).clientHeight
              : maxTopElement.height) >=
          mainQuestion.top +
            ReactDOM.findDOMNode(mainQuestion.ref.current).clientHeight
        ) {
          treeHeight =
            maxTopElement.top +
            (maxTopElement.type !== QUESTIONNAIRE_TREE.typeCreate
              ? ReactDOM.findDOMNode(maxTopElement.ref.current).clientHeight
              : maxTopElement.height) +
            20;
        } else {
          treeHeight =
            ReactDOM.findDOMNode(mainQuestion.ref.current).clientHeight + 20;
        }
      } else {
        if (
          lastQuestionMain &&
          lastQuestionMain.top +
            (lastQuestionMain.type !== QUESTIONNAIRE_TREE.typeCreate
              ? ReactDOM.findDOMNode(lastQuestionMain.ref.current).clientHeight
              : lastQuestionMain.height) >=
            mainQuestion.top +
              ReactDOM.findDOMNode(mainQuestion.ref.current).clientHeight
        ) {
          treeHeight =
            lastQuestionMain.top +
            (lastQuestionMain.type !== QUESTIONNAIRE_TREE.typeCreate
              ? ReactDOM.findDOMNode(lastQuestionMain.ref.current).clientHeight
              : lastQuestionMain.height) +
            20;
        } else {
          treeHeight =
            ReactDOM.findDOMNode(mainQuestion.ref.current).clientHeight + 20;
        }
      }
    } else {
      treeHeight =
        ReactDOM.findDOMNode(mainQuestion.ref.current).clientHeight + 20;
    }

    return treeHeight;
  };

  setPositionBasedOnParent = stepsCopy => {
    stepsCopy.forEach((step, stepIndex) => {
      step.forEach((question, questionIndex) => {
        if (stepIndex !== 0) {
          let parentQuestion = this.getParentQuestion(
            stepsCopy,
            stepIndex,
            question
          );

          if (parentQuestion) {
            if (
              parentQuestion.parent.answerColor ===
                question.parent.answerColor ||
              parentQuestion.parent.answerColor === question.color
            ) {
              let top = Math.max(question.top, parentQuestion.top);

              question.top = top;
              parentQuestion.top = top;
            }
          }
        }
      });
    });
  };

  setQuestionPositionBasedOnPrev = stepsCopy => {
    stepsCopy.forEach(step => {
      step.forEach(question => {
        const maxTopElement = this.findMaxTop(question, stepsCopy);

        if (maxTopElement) {
          question.maxTop = maxTopElement.top;
        } else {
          question.maxTop = question.top;
        }
      });
    });

    stepsCopy.forEach((step, stepIndex) => {
      step.forEach((question, questionIndex) => {
        if (questionIndex !== 0) {
          const prevQuestionInStep = stepsCopy[stepIndex][questionIndex - 1];
          const prevMaxTopElement = this.findMaxTop(
            prevQuestionInStep,
            stepsCopy
          );

          if (prevMaxTopElement) {
            question.top =
              prevQuestionInStep.maxTop +
              (prevMaxTopElement.type !== QUESTIONNAIRE_TREE.typeCreate
                ? ReactDOM.findDOMNode(prevMaxTopElement.ref.current)
                    .clientHeight
                : prevMaxTopElement.height) +
              20;
          } else {
            question.top =
              prevQuestionInStep.maxTop +
              (prevQuestionInStep.type !== QUESTIONNAIRE_TREE.typeCreate
                ? ReactDOM.findDOMNode(prevQuestionInStep.ref.current)
                    .clientHeight
                : prevQuestionInStep.height) +
              20;
          }
        }
      });
    });
  };

  findRootQuestion = (childQuestion, rootQuestion, steps) => {
    const stepsCopy = steps || [...this.state.steps];
    let rootQuestionNew = childQuestion;
    let rootQuestionList = [];

    stepsCopy.reverse();

    stepsCopy.forEach((step, stepIndex) => {
      step.forEach(question => {
        if (question.id === rootQuestionNew.parent.questionId) {
          rootQuestionNew = question;
          rootQuestionList.push(rootQuestionNew);
        }
      });
    });

    stepsCopy.reverse();

    let rootQuestionOutput = rootQuestionList.find(
      rootQuestionEl => rootQuestionEl.id === rootQuestion.id
    );

    return rootQuestionOutput;
  };

  findAllQuestionWithRoot = (rootQuestion, steps) => {
    const stepsCopy = steps || [...this.state.steps];
    let allQuestionsWithRoot = [];

    stepsCopy.forEach((step, stepIndex) => {
      step.forEach((question, questionIndex) => {
        if (this.findRootQuestion(question, rootQuestion, stepsCopy)) {
          allQuestionsWithRoot.push(question);
        }
      });
    });

    return allQuestionsWithRoot;
  };

  findMaxTop = (rootQuestion, steps) => {
    let children = this.findAllQuestionWithRoot(rootQuestion, steps);
    let maxTopElement;
    children.forEach((child, childIndex) => {
      if (childIndex === 0) {
        maxTopElement = child;
      } else {
        if (child.top > maxTopElement.top) {
          maxTopElement = child;
        }
      }
    });

    return maxTopElement;
  };

  toggleQuestionHeight = (stepsCopy, questionColor) => {
    this.cleanCreateQuestionItem(stepsCopy);

    stepsCopy.forEach(step => {
      step.forEach(question => {
        question.questionWrapperHeight =
          question.parent.answerColor === questionColor ||
          question.answers.find(
            answer => answer.color === questionColor && answer.isParent
          )
            ? QUESTIONNAIRE_TREE.answerBoxDefaultHeight
            : 0;
        question.answerWrapperHeight =
          question.parent.answerColor === questionColor ||
          question.answers.find(
            answer => answer.color === questionColor && answer.isParent
          )
            ? QUESTIONNAIRE_TREE.answerBoxCustomHeight
            : 0;

        question.answers.forEach(answer => {
          if (answer.isParent && answer.activeCreateChild) {
            answer.isParent = false;
            answer.activeCreateChild = false;
          }

          answer.activeCreateChild = false;
        });
      });
    });

    this.toggleParentQuestionHeight(stepsCopy, questionColor);
  };

  toggleParentQuestionHeight = (stepsCopy, questionColor) => {
    stepsCopy.reverse();

    stepsCopy.forEach(step => {
      step.forEach(question => {
        if (question.questionWrapperHeight && question.answerWrapperHeight) {
          const parentQuestion = stepsCopy
            .map(innerStep => {
              return innerStep.find(
                innerQuestion => innerQuestion.id === question.parent.questionId
              );
            })
            .filter(element => element)[0];

          if (parentQuestion) {
            parentQuestion.questionWrapperHeight =
              question.questionWrapperHeight;
            parentQuestion.answerWrapperHeight = question.answerWrapperHeight;
            parentQuestion.openedChildQuestionColor =
              question.parent.answerColor;

            parentQuestion.answers.forEach(answer => {
              answer.isActiveAnswer =
                answer.color === questionColor ||
                answer.color === question.parent.answerColor;
            });
          }
        }
      });
    });

    stepsCopy.reverse();
  };

  openBranch = (questionColor, scrollTop) => {
    const stepsCopy = [...this.state.steps];

    this.toggleQuestionHeight(stepsCopy, questionColor);

    const filteredSteps = stepsCopy.filter(step => step.length);

    this.setState(
      { steps: filteredSteps, answersWrapperScrollTop: scrollTop },
      () => this.addQuestionColor(filteredSteps)
    );
  };

  addNewQuestion = (answerData, questions) => {
    const stepsCopy = [...this.state.steps];

    this.cleanCreateQuestionItem(stepsCopy, answerData);
    this.activateAnswerOnQuestionAdd(answerData, stepsCopy);

    const parentQuestionTop = this.findMaxTop(
      { id: answerData.questionId },
      stepsCopy
    );
    const hasQuestionChild = this.hasQuestionChild(answerData.questionId);
    const nextQuestionChildIndex = this.checkNextQuestionChild(
      stepsCopy,
      answerData.stepIndex,
      answerData.questionIndex
    );

    const question = {
      type: QUESTIONNAIRE_TREE.typeCreate,
      insertIndex: nextQuestionChildIndex,
      top:
        hasQuestionChild && parentQuestionTop
          ? parentQuestionTop.top + parentQuestionTop.height + 20
          : parseInt(answerData.questionTop, 10),
      color: hasQuestionChild ? answerData.color : answerData.questionColor,
      height: answerData.questionHeight,
      parent: {
        questionId: answerData.questionId,
        answerColor: answerData.color,
        answerId: []
      },
      stepIndex: answerData.stepIndex
    };

    if (answerData.stepIndex < stepsCopy.length - 1) {
      if (typeof nextQuestionChildIndex === 'boolean') {
        stepsCopy[answerData.stepIndex + 1].push(question);
      } else {
        stepsCopy[answerData.stepIndex + 1].splice(
          question.insertIndex,
          0,
          question
        );
      }
    } else {
      stepsCopy.push([question]);
    }

    this.fillNewQuestionAnswerIds(stepsCopy, answerData);

    const filteredSteps = stepsCopy.filter(step => step.length);

    this.calculateQuestionTopOffset(filteredSteps, questions, {
      top: question.top,
      stepIndex: question.stepIndex
    });
  };

  cleanCreateQuestionItem = (stepsCopy, answerData) => {
    stepsCopy.forEach((step, stepIndex) => {
      stepsCopy[stepIndex] = step.filter(
        question => question.type !== QUESTIONNAIRE_TREE.typeCreate
      );
    });

    stepsCopy.forEach(step => {
      step.forEach(question => {
        if (question.answers) {
          question.answers.forEach(answer => {
            if (
              !this.hasAnswerChild({ id: answer.id }, stepsCopy) &&
              answerData &&
              answerData.color !== answer.color
            ) {
              answer.isParent = false;
            }
          });
        }
      });
    });
  };

  checkNextQuestionChild = (stepsCopy, stepIndex, questionIndex) => {
    const nextQuestion = stepsCopy[stepIndex].find(
      (innerQuestion, innerQuestionIndex) =>
        questionIndex < innerQuestionIndex &&
        this.hasQuestionChild(innerQuestion.id)
    );

    if (nextQuestion) {
      if (stepsCopy[stepIndex + 1]) {
        let nextQuestionFirstChild = stepsCopy[stepIndex + 1].find(
          question => question.parent.questionId === nextQuestion.id
        );

        if (nextQuestionFirstChild) {
          return nextQuestionFirstChild.index;
        } else {
          return true;
        }
      }
    } else {
      return true;
    }
  };

  checkCheckBox = (answerData, steps) => {
    let canReturn;

    if (
      answerData.type !== QUESTIONNAIRE_TREE.typeRadioButton &&
      answerData.type !== QUESTIONNAIRE_TREE.typeRadio
    ) {
      const stepsCopy = steps || [...this.state.steps];

      stepsCopy[answerData.stepIndex].forEach(question => {
        if (question.id === answerData.questionId) {
          let hasAtleastOneChild = question.answers.find(
            answer => typeof answer.childId !== 'undefined'
          );

          if (hasAtleastOneChild) {
            const parent = this.hasAnswerChild(
              {
                id: hasAtleastOneChild.id,
                returnParent: true
              },
              stepsCopy
            );

            this.addQuestionToTree({
              questionId: parent.id,
              answerIdList: [answerData.answerId]
            });

            canReturn = true;
          }
        }
      });
    }

    return canReturn;
  };

  handleExistingCreateQuestion = (answerData, steps) => {
    const stepsCopy = steps || [...this.state.steps];

    let canReturn;

    if (stepsCopy[answerData.stepIndex + 1]) {
      stepsCopy[answerData.stepIndex + 1].forEach(question => {
        if (
          question.type === QUESTIONNAIRE_TREE.typeCreate &&
          answerData.color === question.parent.answerColor
        ) {
          const parentAnswers = stepsCopy[answerData.stepIndex][
            answerData.questionIndex
          ].answers
            .filter(
              answer =>
                answer.color === question.parent.answerColor && answer.isParent
            )
            .map(answer => answer.id);

          question.parent.answerId = [...parentAnswers];

          canReturn = true;
        }
      });
    }

    if (canReturn) {
      this.activateAnswerOnQuestionAdd(answerData, stepsCopy);
    }

    const filteredSteps = stepsCopy.filter(step => step.length);

    this.setState({ steps: filteredSteps });

    return canReturn;
  };

  fillNewQuestionAnswerIds = (stepsCopy, answerData) => {
    if (stepsCopy[answerData.stepIndex + 1]) {
      stepsCopy[answerData.stepIndex + 1].forEach(question => {
        if (
          question.type === QUESTIONNAIRE_TREE.typeCreate &&
          answerData.color === question.parent.answerColor
        ) {
          const filterCondition =
            answerData.type !== QUESTIONNAIRE_TREE.typeCheckbox &&
            answerData.type !== QUESTIONNAIRE_TREE.typeSlider;
          let parentAnswers;

          parentAnswers = stepsCopy[answerData.stepIndex][
            answerData.questionIndex
          ].answers
            .filter(
              answer =>
                filterCondition
                  ? answer.color === question.parent.answerColor &&
                    answer.isParent
                  : answer.color === question.parent.answerColor
            )
            .map(answer => answer.id);

          question.parent.answerId = [...parentAnswers];
        }
      });
    }
  };

  activateAnswerOnQuestionAdd = (answerData, steps) => {
    const stepsCopy = steps || [...this.state.steps];

    stepsCopy.forEach(step => {
      step.forEach(question => {
        if (question.answers) {
          question.answers.forEach(answer => {
            answer.activeCreateChild =
              answer.color === answerData.color &&
              question.id === answerData.questionId;
          });
        }
      });
    });
  };

  showModal = questionId => {
    this.setState({ showModal: true, clickedQuestioniId: questionId });
  };

  renderSteps = () => {
    return this.state.steps.map((step, stepIndex) => {
      return (
        <QuestionStep key={idGenerator()} ref={step.ref}>
          {step.map((question, questionIndex) => {
            return question.type !== QUESTIONNAIRE_TREE.typeCreate ? (
              <QuestionItem
                key={idGenerator()}
                stepIndex={stepIndex}
                answers={question.answers}
                txt={question.questionText}
                type={question.type}
                checkAnswer={this.checkAnswer}
                groupName={question.publicName}
                groupDescription={question.internalName}
                parent={question.parent}
                questionWrapperHeight={question.questionWrapperHeight}
                questionTop={`${question.top}px`}
                questionId={question.id}
                questionColor={question.parent.answerColor}
                questionHeight={question.height}
                questionIndex={questionIndex}
                answerWrapperHeight={question.answerWrapperHeight}
                toggleQuestionHeight={this.openBranch}
                fetchQuestions={this.fetchQuestions}
                removeAfterQuestionClick={this.showModal.bind(
                  this,
                  question.id
                )}
                ref={question.ref}
                answersWrapperScrollTop={this.state.answersWrapperScrollTop}
              />
            ) : (
              <QuestionCreateItem
                key={idGenerator()}
                questionTop={question.top}
                questionColor={question.color}
                questionHeight={`${question.height}px`}
                questionIndex={questionIndex}
                parent={question.parent}
                questionList={this.state.questions}
                addQuestionToTree={this.addQuestionToTree}
                generateRandomColor={() =>
                  this.getUniqueColor(question.branchLevel)
                }
              />
            );
          })}
        </QuestionStep>
      );
    });
  };

  closeModalOnSuccess = () => {
    this.removeAfterQuestionClick(this.state.quesitonId);
  };

  closeModalAfterAnswerUncheck = () => {
    const stepsCopy = [...this.state.steps];
    stepsCopy[this.state.clickedAnswerData.stepIndex].forEach(question => {
      question.answers.forEach(answer => {
        if (answer.id === this.state.clickedAnswerData.id) {
          answer.isParent = true;
        }
      });
    });
    const filteredSteps = stepsCopy.filter(step => step.length);
    this.setState({
      steps: [...filteredSteps],
      showModal: false,
      clickedQuestioniId: null,
      clickedAnswerData: {}
    });
  };

  getUniqueColor = (branchLevel, isAnswerRead) => {
    const color =
      branchLevel > 3
        ? this.findUniqueRandomColor()
        : this.findUniqueStepColor(branchLevel) || this.findUniqueRandomColor();

    if (isAnswerRead) {
      this.colorsUsed.push(color);
    }

    return color;
  };

  findUniqueRandomColor = () => {
    let randomColor = colorGenerator();

    if (this.colorsUsed.indexOf(randomColor) > -1) {
      randomColor = colorGenerator();
    }

    return randomColor;
  };

  findUniqueStepColor = treeLevel => {
    const branchColors = TREE_COLORS[`branchLevel_${treeLevel}`];
    let branchColorIndex = 0;

    while (branchColors && branchColorIndex <= branchColors.length - 1) {
      if (this.colorsUsed.indexOf(branchColors[branchColorIndex]) === -1) {
        return branchColors[branchColorIndex];
      }

      branchColorIndex++;
    }

    //all colors from the defined ones for that treeLevel are used
    return undefined;
  };

  addBranchLevel = stepsCopy => {
    stepsCopy.forEach((step, stepIndex) => {
      step.forEach(question => {
        if (stepIndex !== stepsCopy.length - 1) {
          let questionBrachLevelCounter = 0;

          stepsCopy[stepIndex + 1].forEach(nextQuestion => {
            if (nextQuestion.parent.questionId === question.id) {
              questionBrachLevelCounter++;
              nextQuestion.branchLevel = questionBrachLevelCounter;
            }
          });
        } else {
          question.branchLevel = 1;
        }

        if (stepIndex !== 0) {
          stepsCopy[stepIndex - 1].forEach(prevQuestion => {
            let branchLevel;

            if (prevQuestion.answers && prevQuestion.answers.length) {
              branchLevel = prevQuestion.answers.find(answer => true)
                .branchLevel;

              question.answers.forEach(answer => {
                if (
                  question.type !== QUESTIONNAIRE_TREE.typeCheckbox &&
                  question.type !== QUESTIONNAIRE_TREE.typeSlider
                ) {
                  answer.branchLevel = branchLevel + 1;
                } else {
                  answer.branchLevel = branchLevel;
                }
              });
            }
          });
        } else {
          question.answers.forEach(answer => {
            if (
              question.type !== QUESTIONNAIRE_TREE.typeCheckbox &&
              question.type !== QUESTIONNAIRE_TREE.typeSlider
            ) {
              answer.branchLevel = 1;
            } else {
              answer.branchLevel = undefined;
            }
          });
        }
      });
    });
  };

  scrollOnQuestionAdd = createQuestion => {
    if (typeof createQuestion.top !== 'undefined') {
      window.scroll({
        top: createQuestion.top
      });
    }

    ReactDOM.findDOMNode(this.treeRef.current).scroll({
      left: this.treeScrollX + QUESTIONNAIRE_TREE.questionItemWidth,
      behavior: 'smooth'
    });
  };

  render() {
    const proceedButton = (
      <ActionButton
        title={questionnaireTree.deleteQuestionModalButton}
        type={BUTTON_TYPES.button}
        clicked={() =>
          (this.state.clickedQuestioniId &&
            this.removeAfterQuestionClick(this.state.clickedQuestioniId)) ||
          (Object.keys(this.state.clickedAnswerData).length &&
            this.removeAfterAnswerUncheck(this.state.clickedAnswerData))
        }
        addClass={ACTION_BUTTON_ORANGE}
      />
    );
    return this.state.isRequestExecuted &&
      this.state.steps &&
      this.state.steps.length ? (
      <div
        ref={this.treeRef}
        className={classes.QuestionnaireTree}
        style={{ height: `${this.state.treeHeight + 30}px` }}
      >
        <Modal
          title={
            this.state.clickedQuestioniId
              ? questionnaireTree.deleteQuestionWarningTitle
              : questionnaireTree.uncheck
          }
          classWidth={classes.ModalWrapper}
          proceedButton={proceedButton}
          afterModalClose={() =>
            (this.state.clickedQuestioniId &&
              this.setState({
                showModal: false,
                clickedQuestioniId: null,
                clickedAnswerData: {}
              })) ||
            (Object.keys(this.state.clickedAnswerData).length &&
              this.closeModalAfterAnswerUncheck())
          }
          show={this.state.showModal}
        >
          <div className={classes.Content}>
            <div className={classes.Question}>
              {questionnaireTree.deleteQuestionModalQuestion}
            </div>
            <div className={classes.AnswerWrapper}>
              <div className={classes.AnswerTitle}>
                {questionnaireTree.deleteQuestionModalAnswerTitle}
              </div>
              <div className={classes.Answer}>
                {questionnaireTree.deleteQuestionModalAnswer}
              </div>
            </div>
          </div>
        </Modal>
        {this.renderSteps()}
      </div>
    ) : this.state.isRequestExecuted ? (
      <QuestionCreateItem
        generateRandomColor={() => this.getUniqueColor(1)}
        questionList={this.state.questions}
        addQuestionToTree={this.addQuestionToTree}
      />
    ) : (
      <Loader />
    );
  }
}

export default withErrorHandler(
  withProviderConsumer(QuestionnaireTree, ['activeAdviser', 'dispatch']),
  axios
);
