export const QuestionSteps = [
  [
    {
      groupName: 'q1 Mobilitat',
      groupDescription: 'Mobilitat-Viel wenig unterwegs',
      txt: 'How are you?',
      id: 'q1',
      parentId: null,
      type: 'radio',
      parent: { questionId: null, answerId: null, answerIndex: null },
      answers: [
        {
          id: 'q1_a1',
          isSelected: true
        },
        {
          id: 'q1_a2',
          isSelected: true
        },
        {
          id: 'q1_a3',
          isSelected: true
        }
      ]
    }
  ],
  [
    {
      groupName: 'q2 Display',
      groupDescription: 'Display-Bild & Videobeargbeitung',
      txt: 'What are you doing?',
      id: 'q2',
      type: 'radio',
      parent: { questionId: 'q1', answerId: 'q1_a1', answerIndex: 0 },
      answers: [
        {
          id: 'q2_a1',
          isSelected: true
        },
        {
          id: 'q2_a2',
          isSelected: true
        },
        {
          id: 'q2_a3',
          isSelected: true
        },
        {
          id: 'q2_a4',
          isSelected: true
        }
      ]
    },
    {
      groupName: 'q3 Mobilitat',
      groupDescription: 'Mobilitat-Viel wenig unterwegs',
      id: 'q3',
      txt: 'Is everything ok?',
      type: 'radio',
      parent: { questionId: 'q1', answerId: 'q1_a2', answerIndex: 2 },
      answers: [
        {
          id: 'q3_a1',
          isSelected: true
        },
        {
          id: 'q3_a2',
          isSelected: true
        },
        {
          id: 'q3_a3',
          isSelected: true
        },
        {
          id: 'q3_a4',
          isSelected: false
        },
        {
          id: 'q3_a5',
          isSelected: true
        }
      ]
    },
    {
      groupName: 'q34 Mobilitat',
      groupDescription: 'Mobilitat-Viel wenig unterwegs',
      id: 'q34',
      txt: 'Is everything ok?',
      type: 'radio',
      parent: { questionId: 'q1', answerId: 'q1_a3', answerIndex: 2 },
      answers: [
        {
          id: 'q34_a1',
          isSelected: false
        },
        {
          id: 'q34_a2',
          isSelected: false
        },
        {
          id: 'q34_a3',
          isSelected: true
        },
        {
          id: 'q34_a4',
          isSelected: false
        },
        {
          id: 'q34_a5',
          isSelected: false
        }
      ]
    }
  ],
  [
    {
      groupName: 'q4 Grafikkarte',
      groupDescription: 'Grafikkarte-Gaming',
      isMain: true,
      txt: '1 What are you doing?',
      id: 'q4',
      type: 'radio',
      parent: { questionId: 'q2', answerId: 'q2_a1', answerIndex: 0 },
      answers: [
        {
          id: 'q4_a1',
          isSelected: false
        },
        {
          id: 'q4_a2',
          isSelected: false
        },
        {
          id: 'q4_a3',
          isSelected: false
        }
      ]
    },
    {
      groupName: 'q145 Mobilitat',
      groupDescription: 'Mobilitat-Viel wenig unterwegs',
      txt: 'How are you?',
      id: 'q145',
      parentId: null,
      type: 'radio',
      parent: { questionId: 'q2', answerId: 'q2_a2', answerIndex: 1 },
      answers: [
        {
          id: 'q145_a1',
          isSelected: true
        },
        {
          id: 'q145_a2',
          isSelected: true
        },
        {
          id: 'q145_a3',
          isSelected: true
        }
      ]
    },
    {
      groupName: 'q4 Grafikkarte',
      groupDescription: 'Grafikkarte-Gaming',
      isMain: true,
      txt: '3 What are you doing?',
      id: 'q4',
      type: 'radio',
      parent: { questionId: 'q2', answerId: 'q2_a4', answerIndex: 3 },
      answers: [
        {
          id: 'q4_a1',
          isSelected: false
        },
        {
          id: 'q4_a2',
          isSelected: false
        },
        {
          id: 'q4_a3',
          isSelected: false
        }
      ]
    },
    {
      groupName: 'q5 Trafikkarte',
      groupDescription: 'Grafikkarte-Gaming',
      id: 'q5',
      txt: 'Is everything ok?',
      type: 'radio',
      parent: { questionId: 'q3', answerId: 'q3_a1', answerIndex: 0 },
      answers: [
        {
          id: 'q5_a1',
          isSelected: false
        },
        {
          id: 'q5_a2',
          isSelected: false
        },
        {
          id: 'q5_a3',
          isSelected: false
        }
      ]
    },
    {
      groupName: 'q6 GMlrafikkarte',
      groupDescription: 'Grafikkarte-Gaming',
      id: 'q6',
      txt: 'Is everything ok?',
      type: 'radio',
      parent: { questionId: 'q3', answerId: 'q3_a2', answerIndex: 1 },
      answers: [
        {
          id: 'q6_a1',
          isSelected: false
        },
        {
          id: 'q6_a2',
          isSelected: true
        },
        {
          id: 'q6_a3',
          isSelected: true
        }
      ]
    },
    {
      groupName: 'q7 Mobilitat',
      groupDescription: 'Mobilitat-Gaming',
      id: 'q7',
      txt: 'Is everything ok?',
      type: 'radio',
      parent: { questionId: 'q3', answerId: 'q3_a3', answerIndex: 2 },
      answers: [
        {
          id: 'q7_a1',
          isSelected: true
        },
        {
          id: 'q7_a2',
          isSelected: true
        },
        {
          id: 'q7_a3',
          isSelected: false
        }
      ]
    },
    {
      groupName: 'q343 Mobilitat',
      groupDescription: 'Mobilitat-Viel wenig unterwegs',
      id: 'q343',
      txt: 'Is everything ok?',
      type: 'radio',
      parent: { questionId: 'q34', answerId: 'q34_a3', answerIndex: 2 },
      answers: [
        {
          id: 'q343_a1',
          isSelected: false
        },
        {
          id: 'q343_a2',
          isSelected: false
        },
        {
          id: 'q343_a3',
          isSelected: false
        },
        {
          id: 'q343_a4',
          isSelected: false
        },
        {
          id: 'q343_a5',
          isSelected: false
        }
      ]
    }
  ],
  [
    {
      groupName: 'q14 Mobilitat',
      groupDescription: 'Mobilitat-Gaming',
      id: 'q14',
      txt: 'Is everything ok?',
      type: 'radio',
      parent: { questionId: 'q6', answerId: 'q6_a3', answerIndex: 2 },
      answers: [
        {
          id: 'q14_a1',
          isSelected: true
        },
        {
          id: 'q14_a2',
          isSelected: true
        },
        {
          id: 'q14_a3',
          isSelected: false
        }
      ]
    },
    {
      groupName: 'q8 Mobilitat',
      groupDescription: 'Mobilitat-Gaming',
      id: 'q8',
      txt: 'Is everything ok?',
      type: 'radio',
      parent: { questionId: 'q7', answerId: 'q7_a2', answerIndex: 1 },
      answers: [
        {
          id: 'q8_a1',
          isSelected: true
        },
        {
          id: 'q8_a2',
          isSelected: true
        },
        {
          id: 'q8_a3',
          isSelected: true
        }
      ]
    }
  ],
  [
    {
      groupName: 'q99 Mobilitat',
      groupDescription: 'Mobilitat-Gaming',
      id: 'q99',
      txt: 'Is everything ok?',
      type: 'radio',
      parent: { questionId: 'q14', answerId: 'q14_a1', answerIndex: 0 },
      answers: [
        {
          id: 'q99_a1',
          isSelected: true
        },
        {
          id: 'q99_a2',
          isSelected: true
        },
        {
          id: 'q99_a3',
          isSelected: true
        }
      ]
    },
    {
      groupName: 'q102 Mobilitat',
      groupDescription: 'Mobilitat-Gaming',
      id: 'q102',
      txt: 'Is everything ok?',
      type: 'radio',
      parent: { questionId: 'q14', answerId: 'q14_a2', answerIndex: 1 },
      answers: [
        {
          id: 'q102_a1',
          isSelected: true
        },
        {
          id: 'q102_a2',
          isSelected: true
        },
        {
          id: 'q102_a3',
          isSelected: false
        }
      ]
    },
    {
      groupName: 'q9 Testerat',
      groupDescription: 'Testerat-Gaming',
      id: 'q9',
      txt: 'Is Niki ok?',
      type: 'radio',
      parent: { questionId: 'q8', answerId: 'q8_a1', answerIndex: 0 },
      answers: [
        {
          id: 'q9_a1',
          isSelected: true
        },
        {
          id: 'q9_a2',
          isSelected: false
        },
        {
          id: 'q9_a3',
          isSelected: false
        }
      ]
    },
    {
      groupName: 'q10 Pe6terat',
      groupDescription: 'Pe6terat-Gaming',
      id: 'q10',
      txt: 'Is Niki ok?',
      type: 'radio',
      parent: { questionId: 'q8', answerId: 'q8_a2', answerIndex: 1 },
      answers: [
        {
          id: 'q10_a1',
          isSelected: true
        },
        {
          id: 'q10_a2',
          isSelected: false
        },
        {
          id: 'q10_a3',
          isSelected: false
        }
      ]
    },
    {
      groupName: 'q11 Kresterat',
      groupDescription: 'Kresterat-Gaming',
      id: 'q11',
      txt: 'Is Donnie ok?',
      type: 'radio',
      parent: { questionId: 'q8', answerId: 'q8_a3', answerIndex: 2 },
      answers: [
        {
          id: 'q11_a1',
          isSelected: false
        },
        {
          id: 'q11_a2',
          isSelected: false
        },
        {
          id: 'q11_a3',
          isSelected: false
        }
      ]
    }
  ],
  [
    {
      groupName: 'q113 Mobilitat',
      groupDescription: 'Mobilitat-Gaming',
      id: 'q113',
      txt: 'Is everything ok?',
      type: 'radio',
      parent: { questionId: 'q102', answerId: 'q102_a1', answerIndex: 0 },
      answers: [
        {
          id: 'q113_a1',
          isSelected: true
        },
        {
          id: 'q113_a2',
          isSelected: true
        },
        {
          id: 'q113_a3',
          isSelected: false
        }
      ]
    },
    {
      groupName: 'q114 Mobilitat',
      groupDescription: 'Mobilitat-Gaming',
      id: 'q114',
      txt: 'Is everything ok?',
      type: 'radio',
      parent: { questionId: 'q102', answerId: 'q102_a2', answerIndex: 1 },
      answers: [
        {
          id: 'q114_a1',
          isSelected: true
        },
        {
          id: 'q114_a2',
          isSelected: true
        },
        {
          id: 'q114_a3',
          isSelected: false
        }
      ]
    }
  ]
];
