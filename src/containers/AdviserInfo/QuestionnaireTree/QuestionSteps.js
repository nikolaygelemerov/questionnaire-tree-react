export const QuestionSteps = [
  [
    {
      internalName: 'q1 Mobilitat',
      publicName: 'Mobilitat-Viel wenig unterwegs',
      questionText: 'How are you?',
      id: 'q1',
      parentId: null,
      type: 'Radiobutton (Einfachauswahl)',
      parent: { questionId: null, answerId: null, answerIndex: null },
      answers: [
        {
          id: 'q1_a1',
          isParent: true
        },
        {
          id: 'q1_a2',
          isParent: true
        },
        {
          id: 'q1_a3',
          isParent: true
        }
      ]
    }
  ],
  [
    {
      internalName: 'q2 Display',
      publicName: 'Display-Bild & Videobeargbeitung',
      questionText: 'What are you doing?',
      id: 'q2',
      type: 'Radiobutton (Einfachauswahl)',
      parent: { questionId: 'q1', answerId: 'q1_a1', answerIndex: 0 },
      answers: [
        {
          id: 'q2_a1',
          isParent: true
        },
        {
          id: 'q2_a2',
          isParent: true
        },
        {
          id: 'q2_a3',
          isParent: false
        }
      ]
    },
    {
      internalName: 'q3 Mobilitat',
      publicName: 'Mobilitat-Viel wenig unterwegs',
      id: 'q3',
      questionText: 'Is everything ok?',
      type: 'Radiobutton (Einfachauswahl)',
      parent: { questionId: 'q1', answerId: 'q1_a2', answerIndex: 2 },
      answers: [
        {
          id: 'q3_a1',
          isParent: true
        },
        {
          id: 'q3_a2',
          isParent: true
        },
        {
          id: 'q3_a3',
          isParent: true
        },
        {
          id: 'q3_a4',
          isParent: false
        },
        {
          id: 'q3_a5',
          isParent: true
        }
      ]
    },
    {
      internalName: 'q34 Mobilitat',
      publicName: 'Mobilitat-Viel wenig unterwegs',
      id: 'q34',
      questionText: 'Is everything ok?',
      type: 'Radiobutton (Einfachauswahl)',
      parent: { questionId: 'q1', answerId: 'q1_a3', answerIndex: 2 },
      answers: [
        {
          id: 'q34_a1',
          isParent: false
        },
        {
          id: 'q34_a2',
          isParent: false
        },
        {
          id: 'q34_a3',
          isParent: true
        },
        {
          id: 'q34_a4',
          isParent: false
        },
        {
          id: 'q34_a5',
          isParent: false
        }
      ]
    }
  ],
  [
    {
      internalName: 'q4 Grafikkarte',
      publicName: 'Grafikkarte-Gaming',
      isMain: true,
      questionText: 'What are you doing?',
      id: 'q4',
      type: 'Radiobutton (Einfachauswahl)',
      parent: { questionId: 'q2', answerId: 'q2_a1', answerIndex: 0 },
      answers: [
        {
          id: 'q4_a1',
          isParent: false
        },
        {
          id: 'q4_a2',
          isParent: false
        },
        {
          id: 'q4_a3',
          isParent: false
        }
      ]
    },
    {
      internalName: 'q145 Mobilitat',
      publicName: 'Mobilitat-Viel wenig unterwegs',
      questionText: 'How are you?',
      id: 'q145',
      parentId: null,
      type: 'Radiobutton (Einfachauswahl)',
      parent: { questionId: 'q2', answerId: 'q2_a2', answerIndex: 1 },
      answers: [
        {
          id: 'q145_a1',
          isParent: true
        },
        {
          id: 'q145_a2',
          isParent: true
        },
        {
          id: 'q145_a3',
          isParent: true
        }
      ]
    },
    {
      internalName: 'q5 Trafikkarte',
      publicName: 'Grafikkarte-Gaming',
      id: 'q5',
      questionText: 'Is everything ok?',
      type: 'Radiobutton (Einfachauswahl)',
      parent: { questionId: 'q3', answerId: 'q3_a1', answerIndex: 0 },
      answers: [
        {
          id: 'q5_a1',
          isParent: false
        },
        {
          id: 'q5_a2',
          isParent: false
        },
        {
          id: 'q5_a3',
          isParent: false
        }
      ]
    },
    {
      internalName: 'q6 GMlrafikkarte',
      publicName: 'Grafikkarte-Gaming',
      id: 'q6',
      questionText: 'Is everything ok?',
      type: 'Radiobutton (Einfachauswahl)',
      parent: { questionId: 'q3', answerId: 'q3_a2', answerIndex: 1 },
      answers: [
        {
          id: 'q6_a1',
          isParent: true
        },
        {
          id: 'q6_a2',
          isParent: true
        },
        {
          id: 'q6_a3',
          isParent: true
        }
      ]
    },
    {
      internalName: 'q7 Mobilitat',
      publicName: 'Mobilitat-Gaming',
      id: 'q7',
      questionText: 'Is everything ok?',
      type: 'Radiobutton (Einfachauswahl)',
      parent: { questionId: 'q3', answerId: 'q3_a3', answerIndex: 2 },
      answers: [
        {
          id: 'q7_a1',
          isParent: true
        },
        {
          id: 'q7_a2',
          isParent: false
        },
        {
          id: 'q7_a3',
          isParent: false
        }
      ]
    },
    {
      internalName: 'q343 Mobilitat',
      publicName: 'Mobilitat-Viel wenig unterwegs',
      id: 'q343',
      questionText: 'Is everything ok?',
      type: 'Radiobutton (Einfachauswahl)',
      parent: { questionId: 'q34', answerId: 'q34_a3', answerIndex: 2 },
      answers: [
        {
          id: 'q3_a1',
          isParent: true
        },
        {
          id: 'q3_a2',
          isParent: true
        },
        {
          id: 'q3_a3',
          isParent: true
        },
        {
          id: 'q3_a4',
          isParent: false
        },
        {
          id: 'q3_a5',
          isParent: true
        }
      ]
    }
  ],
  [
    {
      internalName: 'q14 Mobilitat',
      publicName: 'Mobilitat-Gaming',
      id: 'q14',
      questionText: 'Is everything ok?',
      type: 'Radiobutton (Einfachauswahl)',
      parent: { questionId: 'q6', answerId: 'q6_a3', answerIndex: 2 },
      answers: [
        {
          id: 'q14_a1',
          isParent: true
        },
        {
          id: 'q14_a2',
          isParent: true
        },
        {
          id: 'q14_a3',
          isParent: false
        }
      ]
    },
    {
      internalName: 'q8 Mobilitat',
      publicName: 'Mobilitat-Gaming',
      id: 'q8',
      questionText: 'Is everything ok?',
      type: 'Radiobutton (Einfachauswahl)',
      parent: { questionId: 'q7', answerId: 'q7_a1', answerIndex: 0 },
      answers: [
        {
          id: 'q8_a1',
          isParent: true
        },
        {
          id: 'q8_a2',
          isParent: true
        },
        {
          id: 'q8_a3',
          isParent: true
        }
      ]
    }
  ],
  [
    {
      internalName: 'q99 Mobilitat',
      publicName: 'Mobilitat-Gaming',
      id: 'q99',
      questionText: 'Is everything ok?',
      type: 'Radiobutton (Einfachauswahl)',
      parent: { questionId: 'q14', answerId: 'q14_a1', answerIndex: 0 },
      answers: [
        {
          id: 'q99_a1',
          isParent: true
        },
        {
          id: 'q99_a2',
          isParent: true
        },
        {
          id: 'q99_a3',
          isParent: true
        }
      ]
    },
    {
      internalName: 'q102 Mobilitat',
      publicName: 'Mobilitat-Gaming',
      id: 'q102',
      questionText: 'Is everything ok?',
      type: 'Radiobutton (Einfachauswahl)',
      parent: { questionId: 'q14', answerId: 'q14_a2', answerIndex: 1 },
      answers: [
        {
          id: 'q102_a1',
          isParent: true
        },
        {
          id: 'q102_a2',
          isParent: true
        },
        {
          id: 'q102_a3',
          isParent: false
        }
      ]
    },
    {
      internalName: 'q9 Testerat',
      publicName: 'Testerat-Gaming',
      id: 'q9',
      questionText: 'Is Niki ok?',
      type: 'Radiobutton (Einfachauswahl)',
      parent: { questionId: 'q8', answerId: 'q8_a1', answerIndex: 0 },
      answers: [
        {
          id: 'q9_a1',
          isParent: true
        },
        {
          id: 'q9_a2',
          isParent: false
        },
        {
          id: 'q9_a3',
          isParent: false
        }
      ]
    },
    {
      internalName: 'q10 Pe6terat',
      publicName: 'Pe6terat-Gaming',
      id: 'q10',
      questionText: 'Is Niki ok?',
      type: 'Radiobutton (Einfachauswahl)',
      parent: { questionId: 'q8', answerId: 'q8_a2', answerIndex: 1 },
      answers: [
        {
          id: 'q10_a1',
          isParent: true
        },
        {
          id: 'q10_a2',
          isParent: false
        },
        {
          id: 'q10_a3',
          isParent: false
        }
      ]
    },
    {
      internalName: 'q11 Kresterat',
      publicName: 'Kresterat-Gaming',
      id: 'q11',
      questionText: 'Is Donnie ok?',
      type: 'Radiobutton (Einfachauswahl)',
      parent: { questionId: 'q8', answerId: 'q8_a3', answerIndex: 2 },
      answers: [
        {
          id: 'q11_a1',
          isParent: false
        },
        {
          id: 'q11_a2',
          isParent: false
        },
        {
          id: 'q11_a3',
          isParent: false
        }
      ]
    }
  ],
  [
    {
      internalName: 'q113 Mobilitat',
      publicName: 'Mobilitat-Gaming',
      id: 'q113',
      questionText: 'Is everything ok?',
      type: 'Radiobutton (Einfachauswahl)',
      parent: { questionId: 'q102', answerId: 'q102_a1', answerIndex: 0 },
      answers: [
        {
          id: 'q113_a1',
          isParent: true
        },
        {
          id: 'q113_a2',
          isParent: true
        },
        {
          id: 'q113_a3',
          isParent: false
        }
      ]
    },
    {
      internalName: 'q114 Mobilitat',
      publicName: 'Mobilitat-Gaming',
      id: 'q114',
      questionText: 'Is everything ok?',
      type: 'Radiobutton (Einfachauswahl)',
      parent: { questionId: 'q102', answerId: 'q102_a2', answerIndex: 1 },
      answers: [
        {
          id: 'q114_a1',
          isParent: true
        },
        {
          id: 'q114_a2',
          isParent: true
        },
        {
          id: 'q114_a3',
          isParent: false
        }
      ]
    }
  ]
];
