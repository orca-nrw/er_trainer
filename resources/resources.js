/**
 * @overview data-based resources of ccmjs-based web component for training relations in an ER diagram
 * @author André Kless <andre.kless@web.de> 2022
 * @license The MIT License (MIT)
 */

/**
 * app configuration
 * @type {Object}
 */
export const config = {
  "css.1.1": "./resources/styles.css",
  "feedback": true,
  "legend": true,
  "number": 5,
  "retry": true,
  "show_solution": true,
  "shuffle": true
};

/**
 * default phrases data
 * @type {Object[]}
 */
export const phrases = [
  {
    "text": "Zu jedem Patienten gibt es eine Patientenakte.",
    "entities": [ "Patient", "Patientenakte" ],
    "relation": "hat",
    "solution": [ "1", "1" ]
  },
  {
    "text": "Eine Stadt kann ein U-Bahnnetz haben.",
    "entities": [ "Stadt", "U-Bahnnetz" ],
    "relation": "hat",
    "solution": [ "c", "1" ]
  },
  {
    "text": "Zu jedem Topf gibt es einen Deckel, es gibt allerdings auch Töpfe ohne Deckel (z.B. Wok).",
    "entities": [ "Topf", "Deckel" ],
    "relation": "hat",
    "solution": [ "1", "c" ]
  },
  {
    "text": "Zwischen zwei Haltestellen besteht eine oder keine Verbindung.",
    "entities": [ "Haltestelle 1", "Haltestelle 2" ],
    "relation": "verbindet",
    "solution": [ "c", "c" ]
  },
  {
    "text": "Ein Planet kann Monde haben, die ihn umkreisen.",
    "entities": [ "Planet", "Mond" ],
    "relation": "hat",
    "solution": [ "cn", "1" ]
  },
  {
    "text": "Ein Rucksack kann mehrere Gegenstände enthalten.",
    "entities": [ "Rucksack", "Gegenstand" ],
    "relation": "enthält",
    "solution": [ "cn", "c" ]
  },
  {
    "text": "Kunden kaufen Produkte.",
    "entities": [ "Kunde", "Produkt" ],
    "relation": "hat gekauft",
    "solution": [ "cn", "cn" ]
  },
  {
    "text": "Studenten besuchen Lehrveranstaltungen, in denen sie vom Professor am Ende geprüft werden. Manche Studenten brechen das Studium vorzeitig ab und manche Professoren sind nur forschend tätig.",
    "entities": [ "Student", "Professor", "Lehrveranstaltung" ],
    "relation": "prüft",
    "solution": [ "cn", "cn", "cn" ],
    "comments": [
      "Ein Student wird in mehreren Lehrveranstaltungen vom jeweiligen Professoren geprüft oder in gar keiner (hat sich nie für eine Prüfung angemeldet).",
      "Ein Professor prüft Studenten in mehreren Lehrveranstaltungen oder in gar keiner (nur forschend tätig).",
      "In einer Lehrveranstaltung wird mindestens ein Student vom Professor geprüft, allerdings erst am Ende des Semesters. Das bedeutet, dass eine Lehrveranstaltung schon vor der ersten Prüfung angelegt werden muss."
    ]
  },
  {
    "text": "Es soll protokolliert werden, welche Veranstaltung an welcher Location mit welchen Teilnehmern mit welchen Sponsoren stattgefunden hat.",
    "entities": [ "Veranstaltung", "Teilnehmer", "Location", "Sponsor" ],
    "relation": "findet statt",
    "solution": [ "cn", "cn", "cn", "cn" ]
  },
  {
    "text": "Eine Fluggesellschaft möchte protokollieren, welche Piloten mit welchen Flugzeugen auf welchen Flugrouten eingesetzt werden. Die Fluggesellschaft bietet auch Charterflüge an.",
    "entities": [ "Pilot", "Flugzeug", "Flugroute" ],
    "relation": "eingesetzt",
    "solution": [ "cn", "cn", "n" ],
    "comments": [
      "Ein Pilot kann mehrfach mit einem Flugzeug auf einer Flugroute eingesetzt werden oder auf gar keiner (reiner Charterpilot).",
      "Ein Flugzeug kann mehrfach von einem Piloten auf einer Flugroute eingesetzt werden oder auf gar keiner (reine Charterflüge).",
      "Eine Flugroute wird mindestens einmal von einem Piloten mit einem Flugzeug bedient (sonst würde sie gar nicht erst in die Datenbank aufgenommen werden)."
    ]
  },
  {
    "text": "Ein Mensch kann keine, eine oder mehrere Staatsangehörigkeiten besitzen.",
    "entities": [ "Mensch", "Staatsangehörigkeit" ],
    "relation": "besitzt",
    "solution": [ "cn", "n" ]
  },
  {
    "text": "Ein Buch hat mehrere Seiten.",
    "entities": [ "Buch", "Seite" ],
    "relation": "hat",
    "solution": [ "n", "1" ]
  },
  {
    "text": "Jeder Mitarbeiter hat einen Chef, der selbst auch Mitarbeiter ist.",
    "entities": [ "Mitarbeiter", "Mitarbeiter" ],
    "roles": [ "Chef", "" ],
    "relation": "ist Chef von",
    "solution": [ "n", "1" ],
    "comments": [
      "Ein Chef hat mindestens einen Mitarbeiter, sonst wäre er kein Chef. Allerdings ist es dann nicht ohne weiteres möglich einen Chef in der Datenbank anzulegen, wenn noch kein Mitarbeiter angegeben werden kann.",
      "Ein Mitarbeiter hat immer genau einen Chef. Dann muss allerdings auch der oberste Chef einen Chef haben. Für diesen einen Ausnahmefall kann der oberste Chef sich selbst als Chef angeben. Dies ist dann allerdings schwierig in die Datenbank einzutragen, da der oberste Chef noch nicht in der Datebank existiert, deshalb noch nicht auf sich selbst verweisen kann und deshalb nicht angelegt werden kann."
    ]
  },
  {
    "text": "Ein Wald hat Bäume.",
    "entities": [ "Wald", "Baum" ],
    "relation": "hat",
    "solution": [ "n", "c" ]
  },
  {
    "text": "Auf einem Rezept stehen Zutaten.",
    "entities": [ "Rezept", "Zutat" ],
    "relation": "hat",
    "solution": [ "n", "cn" ]
  },
  {
    "text": "Ein Haus hat Eigentümer und Eigentümer haben Häuser.",
    "entities": [ "Haus", "Eigentümer" ],
    "relation": "hat",
    "solution": [ "n", "n" ]
  },
  {
    "text": "Ein Kind hat eine (biologische) Mutter und einen (biologischen) Vater.",
    "entities": [ "Vater", "Mutter", "Kind" ],
    "relation": "hat",
    "solution": [ "n", "n", "1" ],
    "comments": [
      "Zu einem Vater gibt es genau eine Mutter und mindestens ein Kind.",
      "Zu einer Mutter gibt es genau einen Vater und mindestens ein Kind.",
      "Ein Kind hat genau eine Mutter und einen Vater."
    ]
  },
  {
    "text": "Ein Paketbote ist in der Regel ein Angestellter von DHL, Hermes oder DPD.",
    "entities": [ "Paketbote", "DHL", "Hermes", "DPD" ],
    "solution": [ "p", "d" ]
  },
  {
    "text": "Ein Hund kann ein Schäferhund, ein Mops oder ein Dackel sein.",
    "entities": [ "Hund", "Schäferhund", "Mops", "Dackel" ],
    "solution": [ "p", "n" ]
  },
  {
    "text": "Ein (biologischer) Elternteil ist entweder Mutter oder Vater.",
    "entities": [ "Elternteil", "Mutter", "Vater" ],
    "solution": [ "t", "d" ]
  },
  {
    "text": "An einer Hochschule gibt es Mitarbeiter und Studenten.",
    "entities": [ "Hochschulangehöriger", "Mitarbeiter", "Student" ],
    "solution": [ "t", "n" ],
    "comments": [
      "Neben Mitarbeitern und Studenten gibt es keine anderen Personengruppen an der Hochschule.",
      "Ein Student kann gleichzeitig auch ein Mitarbeiter (studentische Hilfskraft) und ein Mitarbeiter auch Student sein."
    ]
  }
];

/**
 * german texts and labels
 * @type {Object}
 */
export const de = {
  "correct": "Ihre letzte Antwort war richtig!",
  "correct_solution": "Richtige Lösung:",
  "disjoint": "disjunkt",
  "failed": "Ihre letzte Antwort war falsch!",
  "finish": "Neustart",
  "heading": "Bitte wählen Sie den zu der Phrase passenden Beziehungstyp in der Auswahlbox aus!",
  "non_disjoint": "nicht-disjunkt",
  "notation": "Notation:",
  "legend": "Legende",
  "next": "Weiter",
  "partial": "partiell",
  "phrase": "Phrase",
  "retry": "Korrigieren",
  "selection": [ "Bitte auswählen", "einfach", "bedingt", "mehrfach", "bedingt mehrfach" ],
  "solution": "Zeige Lösung",
  "submit": "Abschicken",
  "title": "ER-Trainer",
  "total": "total"
};

/**
 * english texts and labels
 * @type {Object}
 */
export const en = {
  "correct": "Your last answer was correct!",
  "correct_solution": "Correct solution:",
  "current_state": "You answered %% of %% phrases correctly!",
  "disjoint": "disjoint",
  "failed": "Your last answer was wrong!",
  "finish": "Restart",
  "heading": "Please select the relationship type in the selection box that matches the phrase!",
  "non_disjoint": "non-disjoint",
  "notation": "Notation:",
  "legend": "Legend",
  "next": "Next",
  "partial": "partial",
  "phrase": "Phrase",
  "retry": "Retry",
  "selection": [ "Please Choose", "simple", "conditional", "many", "conditional many" ],
  "solution": "Show Solution",
  "submit": "Submit",
  "title": "ER-Trainer",
  "total": "total"
};

/**
 * default notations data
 * @type {Object.<string,Object>}
 */
export const notations = {
  "abrial": {
    "key": "abrial",
    "title": "Abrial",
    "centered": true,
    "comment": "Die Abrial bzw. (min,max)-Notation gibt für jeden an einer Beziehung beteiligten Entitätstyp an, mit wie vielen Entitäten auf der anderen Seite eine Entität dieses Typs mindestens und höchstens in Beziehung steht."
  },
  "arrow": {
    "key": "arrow",
    "title": "Pfeilnotation",
    "swap": true,
    "left": "mirrored"
  },
  "chen": {
    "key": "chen",
    "title": "Chen",
    "swap": true,
    "centered": true,
    "comment": "In der Chen-Notation sind nur einfache und mehrfache Beziehungstypen (1 und N) darstellbar, da die Beziehungsmengen bei Chen nur in ihrer Maximalaussage genannt werden. Bei Phrasen die auf einen bedingten oder mehrfach bedingten Beziehungstyp hindeuten, sollte besser zu einer anderen Notation gewechselt werden."
  },
  "crow": {
    "key": "crow",
    "title": "Krähenfuß",
    "swap": true,
    "left": "mirrored"
  },
  "mc": {
    "key": "mc",
    "swap": true,
    "title": "MC"
  },
  "uml": {
    "key": "uml",
    "swap": true,
    "title": "UML"
  }
};