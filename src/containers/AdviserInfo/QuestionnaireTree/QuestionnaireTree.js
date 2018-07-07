import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { deepCopy } from 'fast-deep-copy';

import classes from './QuestionnaireTree.scss';
import QuestionCreateItem from '../../../components/QuestionnaireTree/QuestionCreateItem/QuestionCreateItem';
import QuestionCheckboxItem from '../../../components/QuestionnaireTree/QuestionCheckboxItem/QuestionCheckboxItem';
import { idGenerator } from '../../../helpers/helpers';
import { colorGenerator } from '../../../helpers/helpers';
import { QuestionSteps } from './QuestionSteps';
import QuestionStep from '../../../components/QuestionnaireTree/QuestionStep/QuestionStep';
import axios from '../../../services/axios';
import { questionnaireTree } from '../../../translations/translations';
import Loader from '../../../components/shared/Loader/Loader';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import withProviderConsumer from '../../../hoc/withProviderConsumer/withProviderConsumer';
import URLS from '../../../constants/urls';
import { withRouter } from 'react-router-dom';

class QuestionnaireTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeHeight: 'auto'
    };
  }

  componentDidMount() {
    this.fetchTree();
  }

  componentDidUpdate() {}

  static fetchTreeModalCallback = history => {
    history.push(`${URLS.root}`);
  };

  fetchTree = async () => {
    try {
      const response = await axios.get(`/${this.props.match.params.id || ''}`, {
        params: {},
        errorMsg: 'questionnaireTree'
      });

      if (response) {
        QuestionSteps.forEach(step => {
          step.ref = React.createRef();

          step.forEach(question => {
            question.ref = React.createRef();
          });
        });

        let mockSteps = [];

        this.setState(
          { steps: [...QuestionSteps] },
          () => QuestionSteps.length && this.addAnswerColor(QuestionSteps)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  clickButton = async () => {
    const stepsCopy = [];
    try {
      const response = await axios.get('/', {
        params: {},
        errorMsg: questionnaireTree
      });

      if (response) {
        stepsCopy.forEach(step => {
          step.ref = React.createRef();

          step.forEach(question => {
            question.ref = React.createRef();
          });
        });

        this.setState({ steps: [...QuestionSteps] }, () =>
          this.addAnswerColor(stepsCopy)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Check/uncheck answer
   */
  checkAnswer = (stepIndex, questionId, answerId) => {
    const stepsCopy = [...this.state.steps];

    stepsCopy[stepIndex].forEach(question => {
      if (question.id === questionId) {
        question.answers.forEach((answer, answerIndex) => {
          if (answer.id === answerId) {
            answer.isSelected = !answer.isSelected;

            let answerData = {
              questionId: question.id,
              questionColor: question.parent.answerColor,
              questionTop: question.top,
              stepIndex,
              ...answer
            };

            if (!answer.isSelected) {
              this.removePathAfterUncheck(answerData);
            } else {
              // clear selected with no parent
              stepsCopy.forEach(step => {
                step.forEach(question => {
                  if (question.type !== 'create') {
                    question.answers.forEach(answer => {
                      if (
                        question.id !== answerData.questionId &&
                        !this.hasAnswerChild(
                          {
                            id: answer.id
                          },
                          stepsCopy
                        )
                      ) {
                        answer.isSelected = false;
                      }
                    });
                  }
                });
              });

              // generate new color and add + button
              let firstSelectedAnswer = question.answers.find(
                innerAnswer => innerAnswer.isSelected
              );

              const selectedAnswers = question.answers.filter(
                answer => answer.isSelected
              );

              if (selectedAnswers.length > 1) {
                const color = colorGenerator();
                const answerWithParentColor = selectedAnswers.find(
                  answer =>
                    answer.color === question.parent.answerColor &&
                    this.hasAnswerChild({
                      id: answer.id
                    })
                );

                selectedAnswers.forEach(answer => {
                  if (!answerWithParentColor) {
                    answer.color = question.parent.answerColor;
                  } else {
                    if (
                      !this.hasAnswerChild({
                        id: answer.id
                      })
                    ) {
                      answer.color = color;
                    }
                  }
                });
              } else {
                firstSelectedAnswer.color = question.parent.answerColor;
              }

              answer.canCreate = true;
              answerData = { ...answerData, canCreate: answer.canCreate };

              this.addNewPathAfterCheck(answerData);
            }
          }
        });
      }
    });
  };

  addNewPathAfterCheck = answerData => {
    const stepsCopy = [...this.state.steps];
    console.log(stepsCopy[2]);

    //Do Something

    const filteredSteps = stepsCopy.filter(step => step.length);

    this.setState(
      { steps: filteredSteps },
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
              (nextQuestion.type !== 'create' &&
                nextQuestion.parent.answerId === answerData.id) ||
              (nextQuestion.parent.moreAnswers &&
                nextQuestion.parent.moreAnswers.indexOf(answerData.id) !== -1)
            ) {
              const parentCopy = { ...nextQuestion };

              hasChild = answerData.returnParent ? parentCopy : true;
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

  /**
   * Initial generating of answer color
   */
  addAnswerColor = steps => {
    const stepsCopy = steps || [...this.state.steps];

    this.handleRepetitiveQuestion(stepsCopy);

    stepsCopy.forEach((step, stepIndex) => {
      step.forEach(question => {
        question.answers.forEach(answer => {
          answer.color = colorGenerator();
          answer.canCreate = !this.hasAnswerChild(
            {
              stepIndex,
              id: answer.id
            },
            stepsCopy
          );
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

    this.addQuestionColor(stepsCopy);
  };

  /**
   * Get parent question
   */
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

  /**
   * Add and update question color
   */
  addQuestionColor = (steps, answerData) => {
    let stepsCopy = [...steps];

    stepsCopy.forEach((step, stepIndex) => {
      step.forEach(question => {
        if (stepIndex !== 0) {
          let parentQuestion = this.getParentQuestion(
            stepsCopy,
            stepIndex,
            question
          );

          // Check if parent question exists and set colors depending on selected answers
          if (parentQuestion) {
            let selectedParentAnswer = parentQuestion.answers.find(
              stepAnswer =>
                stepAnswer.isSelected &&
                this.hasAnswerChild({
                  stepIndex: parentQuestion.index,
                  id: stepAnswer.id,
                  stepsCopy
                })
            );

            if (
              selectedParentAnswer &&
              question.parent.answerId === selectedParentAnswer.id
            ) {
              question.parent.answerColor = parentQuestion.parent.answerColor;
            } else {
              // If not the first selected answer add color of the selected one
              question.parent.answerColor = parentQuestion.answers.find(
                answer => answer.id === question.parent.answerId
              ).color;
            }

            let firstSelectedAnswer = question.answers.find(
              answer =>
                answer.isSelected &&
                this.hasAnswerChild({
                  stepIndex: parentQuestion.index,
                  id: answer.id,
                  stepsCopy
                })
            );

            // Add parent color to new qeustion from first selected answer
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
              }
            }
          }
        } else {
          // Add the first selected answer color of the root question
          const firstSelectedAnswer = question.answers.find(
            answer => answer.isSelected
          );

          if (firstSelectedAnswer) {
            question.parent.answerColor = firstSelectedAnswer.color;
          }
        }
      });
    });

    // update answer color based on child question
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
          }
        });
      });
    });

    if (answerData) {
      this.toggleQuestionHeight(stepsCopy, answerData.questionColor);
    }

    const filteredSteps = stepsCopy.filter(step => step.length);

    // Here after steps are updated we calculate the height of each question
    this.setState({ steps: filteredSteps }, () =>
      this.calculateQuestionTopOffset(stepsCopy)
    );
  };

  /**
   * Calculate each question position top
   */
  calculateQuestionTopOffset = (stepsCopy, isAddAnswer) => {
    stepsCopy.forEach((step, stepIndex) => {
      let positionSum = 0;

      step.forEach((question, questionIndex) => {
        question.index = questionIndex;
        question.stepIndex = stepIndex;
        question.height =
          question.type !== 'create'
            ? ReactDOM.findDOMNode(question.ref.current).clientHeight
            : question.height;

        // sum all prepending divs clienthHeigh in the step column
        if (stepIndex !== 0 && questionIndex !== 0) {
          const prevQuestion = stepsCopy[stepIndex][questionIndex - 1];

          question.top =
            prevQuestion.top +
            (prevQuestion.type !== 'create'
              ? ReactDOM.findDOMNode(prevQuestion.ref.current).clientHeight
              : prevQuestion.height) +
            20;
        } else {
          question.top = 0;
        }
      });
    });

    // After all questions have already set top property we can update them based on parent position top
    this.updateQuestionPosition(stepsCopy, isAddAnswer);
  };

  //Update Question Position start
  /**
   * Update new question position base on parent top
   */
  updateQuestionPosition = (stepsCopy, isAddAnswer) => {
    this.updateBasedOn(stepsCopy);

    const filteredSteps = stepsCopy.filter(step => step.length);

    this.setState({ steps: filteredSteps }, () =>
      this.setTreeHeight(filteredSteps)
    );
  };

  updateBasedOn = stepsCopy => {
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

    if (stepsCopy[1] && stepsCopy[1].length) {
      lastQuestionMain = stepsCopy[1][stepsCopy[1].length - 1];
      let maxTopElement = this.findMaxTop(lastQuestionMain, stepsCopy);

      if (maxTopElement) {
        treeHeight =
          maxTopElement.top +
          (maxTopElement.type !== 'create'
            ? ReactDOM.findDOMNode(maxTopElement.ref.current).clientHeight
            : maxTopElement.height) +
          20;
      } else {
        treeHeight =
          lastQuestionMain.top +
          (lastQuestionMain.type !== 'create'
            ? ReactDOM.findDOMNode(lastQuestionMain.ref.current).clientHeight
            : lastQuestionMain.height) +
          20;
      }
    } else {
      treeHeight =
        ReactDOM.findDOMNode(stepsCopy[0][0].ref.current).clientHeight + 20;
    }

    this.setState({ treeHeight });
  };

  setPositionBasedOnParent = (stepsCopy, isAddAnswer) => {
    stepsCopy.forEach((step, stepIndex) => {
      step.forEach((question, questionIndex) => {
        if (stepIndex !== 0) {
          let parentQuestion = this.getParentQuestion(
            stepsCopy,
            stepIndex,
            question
          );

          if (parentQuestion) {
            // If question color mathes parent color set it's position the same as parent
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

  setQuestionPositionBasedOnPrev = (stepsCopy, isAddAnswer) => {
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
              (prevMaxTopElement.type !== 'create'
                ? ReactDOM.findDOMNode(prevMaxTopElement.ref.current)
                    .clientHeight
                : prevMaxTopElement.height) +
              20;
          } else {
            question.top =
              prevQuestionInStep.maxTop +
              (prevQuestionInStep.type !== 'create'
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
  //Update Question Position end

  /**
   * Remove branch path from unchecked root
   */
  removePathAfterUncheck = answerData => {
    const stepsCopy = [...this.state.steps];

    this.cleanCreateQuestionItem(stepsCopy);

    // Remove 1st column question explicitly
    if (answerData.stepIndex === 0 && stepsCopy.length > 1) {
      stepsCopy[1] = stepsCopy[1].filter(
        question => question.parent.answerColor !== answerData.color
      );

      stepsCopy[0][0].answers.forEach(answer => {
        if (answer.id === answerData.id) {
          answer.isActive = false;
        }
      });
    }

    // Remove first selected question with the same color
    stepsCopy.forEach((step, stepIndex) => {
      stepsCopy[stepIndex] = step.filter(question => {
        const child = this.hasAnswerChild(
          {
            stepIndex: stepIndex,
            id: answerData.id,
            returnParent: true
          },
          stepsCopy
        );
        let canRemove;

        if (child && child.parent.moreAnswers) {
          let childQuestion = stepsCopy[child.stepIndex].find(
            question => question.id === child.id
          );

          if (childQuestion.parent.moreAnswers.length) {
            childQuestion.parent.moreAnswers = childQuestion.parent.moreAnswers.filter(
              answerId => answerId !== answerData.id
            );
          } else {
            delete childQuestion.parent.moreAnswers;
            canRemove = true;
          }
        }

        return (
          answerData.stepIndex >= stepIndex ||
          answerData.childId !== question.id
        );
      });
    });

    // Remove questions with no parents
    stepsCopy.forEach((step, stepIndex) => {
      stepsCopy[stepIndex] = step.filter(
        question =>
          stepIndex === 0 ||
          this.getParentQuestion(stepsCopy, stepIndex, question)
      );
    });

    // Reset answer active or answer with no childs
    stepsCopy.forEach((step, stepIndex) => {
      step.forEach(question => {
        question.answers.forEach(answer => {
          if (
            answer.id === answerData.id ||
            (stepIndex !== stepsCopy.length - 1 &&
              !stepsCopy[stepIndex + 1].find(
                question => question.parent.answerColor === answerData.color
              ))
          ) {
            answer.isActive = false;
          }
        });
      });
    });

    if (answerData.stepIndex === 0) {
      stepsCopy[0].forEach(question => {
        const nextSelectedAnswer = question.answers.find(
          answer => answer.isSelected
        );

        if (nextSelectedAnswer) {
          answerData.questionColor = nextSelectedAnswer.color;
        }
      });
    }

    const filteredSteps = stepsCopy.filter(step => step.length);

    this.setState({ steps: filteredSteps }, () =>
      this.addQuestionColor(filteredSteps, answerData)
    );
  };

  toggleQuestionHeight = (stepsCopy, questionColor) => {
    this.cleanCreateQuestionItem(stepsCopy);

    stepsCopy.forEach(step => {
      step.forEach(question => {
        question.questionWrapperHeight =
          question.parent.answerColor === questionColor ||
          question.answers.find(
            answer => answer.color === questionColor && answer.isSelected
          )
            ? 'auto'
            : 0;
        question.answerWrapperHeight =
          question.parent.answerColor === questionColor ||
          question.answers.find(
            answer => answer.color === questionColor && answer.isSelected
          )
            ? '200px'
            : 0;
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
              answer.isActive =
                answer.color === questionColor ||
                answer.color === question.parent.answerColor;
            });
          }
        }
      });
    });

    stepsCopy.reverse();
  };

  /**
   * event handler
   */
  openBranch = questionColor => {
    const stepsCopy = [...this.state.steps];

    this.toggleQuestionHeight(stepsCopy, questionColor);

    const filteredSteps = stepsCopy.filter(step => step.length);

    this.setState({ steps: filteredSteps }, () =>
      this.addQuestionColor(filteredSteps)
    );
  };

  /**
   * event handler
   */
  addNewQuestion = answerData => {
    const stepsCopy = [...this.state.steps];

    this.cleanCreateQuestionItem(stepsCopy);

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
      type: 'create',
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
        answerId: answerData.answerId
      },
      id: answerData.answerId
    };

    if (answerData.stepIndex < stepsCopy.length - 1) {
      if (typeof nextQuestionChildIndex === 'boolean') {
        stepsCopy[answerData.stepIndex + 1].push({ ...question });
      } else {
        stepsCopy[answerData.stepIndex + 1].splice(question.insertIndex, 0, {
          ...question
        });
      }
    } else {
      stepsCopy.push([{ ...question }]);
    }

    const filteredSteps = stepsCopy.filter(step => step.length);

    this.updateQuestionPosition(filteredSteps, true);
  };

  cleanCreateQuestionItem = stepsCopy => {
    stepsCopy.forEach((step, stepIndex) => {
      stepsCopy[stepIndex] = step.filter(
        question => question.type !== 'create'
      );
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

  renderSteps = () => {
    return this.state.steps.map((step, stepIndex) => {
      return (
        <QuestionStep key={idGenerator()} ref={step.ref}>
          {step.map((question, questionIndex) => {
            return question.type !== 'create' ? (
              <QuestionCheckboxItem
                key={idGenerator()}
                stepIndex={stepIndex}
                answers={question.answers}
                txt={question.txt}
                type={question.type}
                checkAnswer={this.checkAnswer}
                groupName={question.groupName}
                groupDescription={question.groupDescription}
                parent={question.parent}
                questionWrapperHeight={question.questionWrapperHeight}
                questionTop={`${question.top}px`}
                questionId={question.id}
                questionColor={question.parent.answerColor}
                questionHeight={question.height}
                questionIndex={questionIndex}
                answerWrapperHeight={question.answerWrapperHeight}
                toggleQuestionHeight={this.openBranch}
                addNewQuestion={this.addNewQuestion}
                ref={question.ref}
              />
            ) : (
              <QuestionCreateItem
                key={idGenerator()}
                questionTop={question.top}
                questionColor={question.color}
                questionHeight={`${question.height}px`}
                questionIndex={questionIndex}
              />
            );
          })}
        </QuestionStep>
      );
    });
  };

  render() {
    return this.state.steps ? (
      this.state.steps.length ? (
        <div
          className={classes.QuestionnaireTree}
          style={{ height: `${this.state.treeHeight + 30}px` }}
        >
          {this.renderSteps()}
        </div>
      ) : (
        <Fragment>
          <QuestionCreateItem />
          <br />
          <br />
          <button onClick={this.clickButton}>Click me</button>
        </Fragment>
      )
    ) : (
      <Loader />
    );
  }
}

export default withErrorHandler(
  QuestionnaireTree,
  axios,
  QuestionnaireTree.fetchTreeModalCallback
);
