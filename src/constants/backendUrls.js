export const TREE = {
  get: {
    availableQustions: '/admin/advisors/{id}/trees/availableQuestions',
    tree: '/admin/advisors/{id}/trees'
  },
  post: {
    questionToTree: '/admin/advisors/{id}/trees'
  },
  delete: {
    answer: '/admin/advisors/{id}/trees/answers/',
    question: '/admin/advisors/{id}/trees/questions/'
  }
};

export const ANSWER = {
  get: {
    answer:
      '/admin/advisors/{advisorId}/questions/{questionId}/answers/{answerId}',
    filters: '/admin/advisors/{advisorId}/questions/{questionId}/filters',
    answers: '/admin/advisors/{advisorId}/questions/{questionId}/answers'
  },
  post: {
    createAnswer: '/admin/advisors/{advisorId}/questions/{questionId}/answers'
  },
  delete: {
    answer:
      '/admin/advisors/{advisorId}/questions/{questionId}/answers/{answerId}'
  },
  put: {
    editAnswer:
      '/admin/advisors/{advisorId}/questions/{questionId}/answers/{answerId}',
    reorder: '/admin/advisors/{advisorId}/questions/{questionId}/orders'
  }
};

export const ADVISOR = {
  post: {
    create: '/admin/advisors'
  },
  put: {
    edit: {
      advisor: '/admin/advisors/'
    },
    changeState: '/admin/advisors/{id}/state'
  },
  get: {
    advisor: '/admin/advisors/',
    advisors: '/admin/advisors/',
    categories: '/admin/advisors/categories'
  },
  delete: {
    advisor: '/admin/advisors/'
  }
};

export const QUESTION = {
  post: {
    create: '/admin/advisors/{id}/questions'
  },
  put: {
    edit: '/admin/advisors/{advisorId}/questions/{questionId}'
  },
  delete: {
    question: '/admin/advisors/{advisorId}/questions/{questionId}'
  },
  get: {
    answerTypes: '/admin/questions/answers/types',
    question: '/admin/advisors/{advisorId}/questions/{questionId}',
    questions: '/admin/advisors/{id}/questions'
  }
};
