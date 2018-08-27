export const common = {
  confirm: 'Anlegen',
  cancel: 'Abbrechen',
  error: 'ERROR',
  dontSave: 'Nicht speichern'
};

export const adviserMenu = {
  title: 'Wähle einen Kaufberater aus',
  createItemTitle: 'Neuer Kaufberater',
  confirmRemoveAdviser: 'Möchtest du den {Berater_name} wirklich löschen',
  confirmRemoveAdviserTitle: '{Berater_name} löschen',
  confirmRemoveButton: 'Kaufberater löschen',
  addAdviserErrorMsg: `Can't add advisor!`,
  adviserListErrorMsg: `Can't retrieve advisers!`,
  adviserDeleteErrorMsg: `Can't delete advisor!`,
  successfullyCreatedAdviserMsg: '<Berater Name> wurde gespeichert.'
};

export const adviserMainData = {
  categoryFieldTitle: 'Artikelkategorie',
  categoryFieldPlaceHolder: 'Bitte Artikelkategorie auswählen',
  categoryFieldTitleNotebooksOption: 'Notebooks',
  categoryFieldTitleTVsOption: 'TV',
  categoryFieldTitleTPrinterOption: 'Printer',
  categoryFieldTitleBeamerOption: 'Beamer',
  categoryFieldTitleWaschmaschineOption: 'Waschmaschine',
  categoryFieldTitleDishwashingOption: 'Dishwashing Machine',
  nameFieldTitle: 'Berater Name',
  nameFieldPlaceHolder: 'Bitte Name / Titel eingeben',
  urlFieldTitle: 'URL',
  urlFieldPlaceHolder: 'Bitte URL eingeben',
  imageFieldTitle: 'Titelbild',
  addImageLabel: 'Titelbild hochladen',
  seoFieldTitle: 'SEO Titel',
  seoFieldPlaceHolder: 'Bitte SEO Titel eingeben',
  descriptionFieldTitle: 'Beschreibung',
  descriptionFieldPlaceHolder: 'Bitte Beschreibung eingeben',
  indexFieldTitle: 'Indizieren',
  followIndexTitle: 'Folgen',
  categoryRequiredErrorMsg: 'Bitte wähle Artikelkategorie aus.',
  nameRequiredErrorMsg: 'Bitte gebe Berater Name ein.',
  URLRequiredErrorMsg: 'Bitte gebe URL ein.',
  answerTypeFieldPlaceholder: 'Bitte Antworttyp auswählen',
  promptModalTitle: 'Basis Daten speichern',
  promptModalContent:
    'Wenn du jetzt den Reiter wechselst, gehen alle neuen Angaben verloren. Möchtest du vorher Basis Daten speichern?',
  errorMessageTitle:
    ' Der Kaufberater konnte nicht gespeichert werden. Bitte überprüfe folgende Angaben:',
  uploadImageTooltip:
    'Das Titelbild für den Kaufberater. Format: 970 px Breite x variable Höhe px; Dateityp: .png und .jpg',
  errorMessageOnRquestFailed:
    'Der Kaufberater konnte nicht gespeichert werden. Bitte versuche es erneut.'
};

export const mainDataBlocks = {
  seoBlockTitle: 'SEO',
  baseDataBlockTitle: 'Basis Daten',
  baseDataBlockSecondaryTitle: 'Pflichtfelder',
  saveButtonLabel: 'Kaufberater speichern',
  addAdviserErrorMsg: `Can't add adviser!`,
  addCategoryErrorMsg: `Can't find categories!`,
  editAdvisorErrorMsg: `Can't update component`,
  getAdviserErrorMsg: `Can't retrieve adviser!`
};

export const adviserInfoNavBar = {
  baseData: 'Basis Daten',
  allQuestions: 'Fragenkatalog',
  questionnaireTree: 'Fragenbaum'
};

export const breadcrumbs = {
  root: 'Kaufberater-Tool',
  mainData: 'Kaufberater anlegen',
  questions: 'Questions',
  questionnaireTree: 'Tree'
};

export const questionnaireTree = {
  treeErroMsg: `Can't retrieve tree!`,
  addQuestionErrMsg: `Can't add question!`,
  availableQuestionsErrMsg: `Can't retrieve questions!`,
  deleteAnswerErrMsg: `Can't delete path!`,
  deleteQuestionErrMsg: `Can't delete question!`,
  deleteQuestionWarningTitle: 'Frage aus diesem Branch entfernen',
  deleteQuestionModalButton: 'Frage entfernen',
  deleteQuestionModalQuestion:
    'Möchtest du diese Frage wirklich aus dem Branch entfernen?',
  deleteQuestionModalAnswerTitle: 'Achtung:',
  deleteQuestionModalAnswer:
    'Alle nachfolgenden Fragen werden ebenfalls aus dem Branch entfernt.',
  uncheck: 'Uncheck'
};

export const allQuestions = {
  addQuestionBtn: 'Frage erstellen',
  editAnswer: 'Antworten bearbeiten',
  openQuestionTitle: 'Fragestellung',
  closedQuestionTitle: 'Fragedarstellung',
  filter: 'Filter',
  newQuestionButton: 'Frage erstellen',
  newAnswerButton: 'Antwort erstellen',
  newQuestionCreateErrorMsg: "Can't create question",
  charachtersExceededErrorMsg: 'Zeichenzahl überschritten',
  nameField: 'Name in Berater-Navigation',
  nameFieldPlaceholder: 'Bitte Name in Berater-Navigation eingeben',
  nameFieldTooltip:
    'Bezeichnet die Frage in der beraterinternen Navigation. Hilft dem Kunden die Relevanz der Fragen einzuschätzen. Beispielsweise "Mobilität"',
  backendNameField: 'Interner Name (Backend)',
  backendNameFieldTooltip:
    'Dient der Unterscheidung ähnlicher Fragen im backend. Spezifische Fragen können so besser z.B. im Fragenbaum erkannt werden. Beispielsweise "Display (für Gaming)"',
  backendNameFieldPlaceholder: 'Bitte Interner Name (backend) eingeben',
  questionField: 'Frage',
  questionFieldPlaceholder: 'Bitte Frage eingeben',
  answerTypeField: 'Antworttyp',
  answerTypeFieldPlaceholder: 'Bitte Antworttyp auswählen',
  answerTypeFieldTooltip: `Definiert Darstellung der Antworten im Frontend.
      Radiobutton: nur eine Antwort kann gewählt werden. Ermöglicht unterschiedliche Folgefragen je nach Auswahl.
      Checkbox: mehrere Antworten können gewählt werden.
      Slider: ein Bereich kann gewählt werden. Nur möglich für numerische Filter wie z.B. Preisspanne`,
  answerTypeRadioOption: 'Radiobutton (Einfachauswahl)',
  answerTypeCheckboxOption: 'Checkbox (Mehrfachauswahl)',
  answerTypeSliderOption: 'Slider (Regler)',
  deleteQuestion: 'Frage löschen',
  addAnswer: 'Antworten hinzfügen',
  noFilters: 'Keine Filters definiert',
  questionIsPartOfTree: 'Diese Frage wird gerade genutzt.',
  goToTree: 'Zum Fragenbaum',
  secondaryTitle: 'Pflichtfelder'
};

export const createAnswer = {
  newAnswerButton: 'Antwort erstellen',
  modalTitle: 'Antworten Übersicht',
  modalContentTitle: 'Antwort erstellen',
  addNewAnswerText: 'Weitere Antwort erstellen',
  addNewFilter: 'Weiteren Filter einstellen',
  descriptionTitle: 'Beschreibungstext',
  answerText: 'Antworttext',
  answerTextPlaceholder: 'Bitte Antworttext eingeben',
  answerAdditionalText: 'Beschreibungstext',
  answerAdditionalTextPlaceholder: 'Beschreibungstext eingeben (optional)',
  answerImage: 'Antwortbild',
  answerImageTooltipCheckbox:
    'Ein passendes Bild zur Antwort. Format: 360px Breite x variable Höhe, Dateityp: .jpg oder .png',
  answerImageTooltipRadio:
    'Ein passendes Bild zur Antwort. Format: 970px Breite x variable Höhe, Dateityp: .jpg oder .png',
  characters: 'Zeichen',
  charachtersExceededErrorMsg: 'Zeichenzahl überschritten',
  nameField: 'Name in Berater-Navigation',
  filterPropertyGroupText: 'Eigenschaftsgruppe',
  filterPropertyGroupPlaceHolder:
    'Bitte Eigenschaftsgrupper auswählen orer eingeben',
  filterPropertyText: 'Eigenschaft',
  filterPropertyPlaceholder: 'Bitte Eigenschaft auswählen oder eingeben',
  optionsPropertyText: 'Wert (Auswahl)',
  optionsPropertyPlaceholder: 'Bitte Wert auswählen oder suchen',
  deleteFilters: 'Filter löschen',
  radioText: 'Antwworttext',
  radioTextPlaceholder: 'Bitte Antworttext eingeben',
  radioInfo: 'Infotext',
  radioInfoPlaceholder: 'Infotext eingeben (optional)',
  fetchPropertyGroupsError: 'Unable to get property groups!',
  max: '-',
  min: 'Minimum - Maximum (Nur Zahlen)',
  suffix: 'Suffix',
  filtersTitle: 'Filters',
  fetchAnswerDataError: 'Unable to get answer data!',
  getQuestionError: 'Unable to get question data!',
  questionTypeSuffix: 'Einstellungen',
  questionTitleSuffixRadio: 'Einfachauswahl',
  questionTitleSuffixCheckBox: 'Mehrfachauswahl',
  questionTitleSuffixSlider: 'Regler',
  emptyFilePickerLabel: 'Antwortbild hochladen'
};

export const newQuestion = {
  characters: 'Zeichen'
};

export const deactivateAnswer = {
  headerText: 'Antwort deaktivieren',
  question: 'Möchtest du diese Antwort wirklich deaktivieren?',
  answerTitle: 'Achtung:',
  answer:
    'Alle nachfolgenden Fragen aus dem Branch werden ebenfalls deaktiviert.',
  linkText: 'Zum Fragebaum',
  confirmButton: 'Antwort deaktivieren',
  cancelButton: 'Abbrechen'
};
