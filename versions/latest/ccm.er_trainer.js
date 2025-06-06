/**
 * @overview ccmjs-based web component for training relations in an ER diagram
 * @author André Kless <andre.kless@web.de> 2021-2022
 * @license The MIT License (MIT)
 * @version 6.0.0
 * @domain https://orca-nrw.github.io/er_trainer/
 */

( () => {
  const component = {
    name: 'er_trainer',
    ccm: 'https://orca-nrw.github.io/er_trainer/versions/latest/libs/ccm/ccm.min.js',
    config: {
//    "anytime_finish": true,
      "css": [ "ccm.load",
        [  // serial
          "https://orca-nrw.github.io/er_trainer/versions/latest/libs/bootstrap-5/css/bootstrap.min.css",
          "https://orca-nrw.github.io/er_trainer/versions/latest/resources/styles.min.css"
        ],
        { "url": "https://orca-nrw.github.io/er_trainer/versions/latest/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" }
      ],
//    "data": { "store": [ "ccm.store" ] },
      "default": {
        "format": "svg",
        "images": [ "e", "1", "c", "n", "cn", "r", "s" ],
        "notation": "abrial",
        "path": "https://orca-nrw.github.io/er_trainer/versions/latest/resources/img/"
      },
      "feedback": true,
      "helper": [ "ccm.load", { "url": "https://orca-nrw.github.io/er_trainer/versions/latest/libs/ccm/helper.min.js", "type": "module" } ],
      "html": [ "ccm.load", { "url": "https://orca-nrw.github.io/er_trainer/versions/latest/resources/templates.min.js", "type": "module" } ],
      "lang": [ "ccm.start", "https://orca-nrw.github.io/er_trainer/versions/latest/libs/lang/ccm.lang.min.js", {
        "active": "de",
        "translations": {
          "de": [ "ccm.load", { "url": "https://orca-nrw.github.io/er_trainer/versions/latest/resources/resources.min.js#de", "type": "module" } ],
          "en": [ "ccm.load", { "url": "https://orca-nrw.github.io/er_trainer/versions/latest/resources/resources.min.js#en", "type": "module" } ]
        }
      } ],
      "legend": true,
      "modal": [ "ccm.start", "https://orca-nrw.github.io/er_trainer/versions/latest/libs/modal/ccm.modal.min.js", {
        "backdrop_close": true,
        "content": "",
        "closed": true,
        "buttons": ""
      } ],
      "notations": [ "ccm.load", { "url": "https://orca-nrw.github.io/er_trainer/versions/latest/resources/resources.min.js#notations", "type": "module" } ],
//    "number": 5,
//    "onchange": event => console.log( event ),
      "onfinish": { "log": true, "restart": true },
//    "onready": event => console.log( event ),
//    "onstart": event => console.log( event ),
      "phrases": [ "ccm.load", { "url": "https://orca-nrw.github.io/er_trainer/versions/latest/resources/resources.min.js#phrases", "type": "module" } ],
      "retry": true,
      "skip": true,
      "show_solution": true,
      "shuffle": true,
      "text": [ "ccm.load", { "url": "https://orca-nrw.github.io/er_trainer/versions/latest/resources/resources.min.js#de", "type": "module" } ],
//    "user": [ "ccm.start", "https://orca-nrw.github.io/er_trainer/versions/latest/libs/user/ccm.user.js" ],
      "values": [ [ "1", "c", "n", "cn" ], [ "t", "p", "d", "n" ] ]
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * app state data
       * @type {Object}
       */
      let data;

      /**
       * current selected notation
       * @type {string}
       */
      let notation;

      /**
       * current phrase number
       * @type {number}
       */
      let phrase_nr;

      /**
       * when the instance is created, when all dependencies have been resolved and before the dependent sub-instances are initialized and ready
       * @returns {Promise<void>}
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // set title of modal dialog
        this.modal.title = this.text.legend;

        // uniform notations data
        for ( const key in this.notations ) {
          let notation = this.notations[ key ];
          this.notations[ key ] = {
            key: notation.key,
            title: notation.title,
            swap: !!notation.swap,
            centered: !!notation.centered,
            left: notation.left || this.default.left,
            images: ( notation.images || this.default.images ).map( image => image.includes( '.' ) ? image : ( notation.path || this.default.path ) + notation.key + '/' + image + '.' + ( notation.format || this.default.format ) ),
            comment: notation.comment
          };
        }

        // uniform phrases data
        if ( $.isObject( this.phrases ) ) this.phrases = Object.values( this.phrases ).map( phrase => { delete phrase.key; return phrase; } );

      };

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {
        if ( !this.number ) this.number = this.phrases.length;      // use all phrases as default
        this.onready && await this.onready( { instance: this } );   // trigger 'ready' event
      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // load app state data
        data = await $.dataset( this.data );
        const initial = {
          correct: 0,
          notation: notation || data.notation || this.default.notation,
          sections: [],
          total: this.number
        };
        data = data.sections && data.sections.length < data.phrases.length ? data: initial;

        // no loaded phrases? => take required number of original phrases and shuffle them
        if ( !data.phrases ) {
          data.phrases = $.clone( this.phrases );
          this.shuffle && $.shuffleArray( data.phrases );
          data.phrases = data.phrases.slice( 0, this.number );
        }

        // render first phrase
        phrase_nr = data.sections.length ? data.sections.length : 0; nextPhrase();

        // render language selection and user login/logout
        const aside = this.element.querySelector( 'aside' );
        if ( aside ) {
          aside && this.lang && !this.lang.getContext() && $.append( aside, this.lang.root );
          aside && this.user && $.append( aside, this.user.root );
        }

        // set content of modal dialog for legend table
        this.html.render( this.html.legend( this ), this.modal.element.querySelector( 'main' ) );

        // trigger 'start' event
        this.onstart && await this.onstart( { instance: this } );

      };

      /**
       * returns current app state data
       * @returns {Object}
       */
      this.getValue = () => $.clone( data );

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {

        /** when selected entry for displayed notation changes */
        onNotation: ( value, show_solution ) => {
          if ( data.phrases[ phrase_nr - 1 ].entities.length > 2 && this.notations[ value ].swap ) return;
          data.notation = value;
          render( show_solution );
          this.onchange && this.onchange( { event: 'notation', instance: this } );
        },

        /** when 'legend' button is clicked */
        onLegend: () => {
          this.modal.open();
          this.lang.translate( this.modal.element );
          this.onchange && this.onchange( { event: 'legend', instance: this } );
        },

        /** when selected entry of a selector box changes */
        onSelect: ( nr, value ) => {
          setInput( nr, value );
          render();
          this.onchange && this.onchange( { event: 'input', instance: this, phrase: phrase_nr, nr: nr, value: value } );
        },

        /** when 'submit' button is clicked */
        onSubmit: () => {
          const section = data.sections[ phrase_nr - 1 ];
          if ( section.correct !== undefined || section.input.includes( '' ) ) return;
          section.correct = section.input.toString() === data.phrases[ phrase_nr - 1 ].solution.toString();
          section.correct && data.correct++;
          this.feedback && this.element.classList.add( section.correct ? 'correct' : 'failed' );
          render();
          this.onchange && this.onchange( { event: 'submit', instance: this, phrase: phrase_nr } );
          !this.feedback && events.onNext();
        },

        /** when 'retry' button is clicked */
        onRetry: () => {
          const section = data.sections[ phrase_nr - 1 ];
          if ( !this.retry || section.correct !== false ) return;
          section.retry = section.retry ? section.retry + 1 : 1;
          delete section.correct;
          this.element.classList.remove( 'failed' );
          render();
          this.onchange && this.onchange( { event: 'retry', instance: this, phrase: phrase_nr } );
        },

        /** when 'solution' button is clicked */
        onSolution: () => {
          if ( !this.show_solution || data.sections[ phrase_nr - 1 ].correct !== false ) return;
          render( true );
          this.onchange && this.onchange( { event: 'solution', instance: this, phrase: phrase_nr } );
        },

        /** when 'next' button is clicked */
        onNext: () => {
          if ( !this.skip && data.sections[ phrase_nr - 1 ].correct === undefined || phrase_nr === this.number ) return;
          reset();
          nextPhrase();
          this.onchange && this.onchange( { event: 'next', instance: this, phrase: phrase_nr } );
        },

        /** when 'finish' button is clicked */
        onFinish: () => {
          if ( !this.onfinish || !this.skip && data.sections[ phrase_nr - 1 ].correct === undefined || !this.anytime_finish && phrase_nr < this.number ) return;
          reset();
          this.onfinish && $.onFinish( this );
        }

      };

      /** starts the next phrase */
      const nextPhrase = () => {
        phrase_nr++;
        data.sections.push( { input: data.phrases[ phrase_nr - 1 ].solution.map( () => '' ) } );

        // ternary relation in a swapped notation? => switch to not swapped notation (= Abrial)
        if ( data.phrases[ phrase_nr - 1 ].entities.length > 2 && this.notations[ data.notation ].swap )
          data.notation = Object.values( this.notations ).find( notation => !notation.swap ).key;

        render();
      };

      /**
       * renders current phrase
       * @param {boolean} [show_solution] - reveal correct solution
       */
      const render = show_solution => {
        this.html.render( this.html.main( this, data, events, phrase_nr, show_solution ), this.element );
        this.element.querySelectorAll( '[selected]' ).forEach( option => option.selected = true );  // workaround for lit-html bug
        this.lang && this.lang.translate();
      };

      /** resets visual feedback and selected input values */
      const reset = () => {
        this.element.classList.remove( 'correct', 'failed' );
        this.element.querySelectorAll( '[selected]' ).forEach( option => option.selected = false );
        this.element.querySelectorAll( '[type="radio"]' ).forEach( radio => radio.checked = false );
      };

      /**
       * updates selected value of a selector box in app state data
       * @param {number} nr - selector box number (1: left, 2: middle, 3: right)
       * @param {string} value - selected value
       */
      const setInput = ( nr, value ) => {
        const section = data.sections[ phrase_nr - 1 ];
        if ( !section.input ) section.input = [];
        section.input[ nr - 1 ] = value;
      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();