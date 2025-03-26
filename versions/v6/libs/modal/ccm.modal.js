/**
 * @overview ccmjs-based web component for a modal dialog
 * @author Tea Kless <tea.kless@web.de>, 2018-2019
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (3.1.0)
 */

( () => {
  const component = {
    name: 'modal',
    ccm: 'https://orca-nrw.github.io/er_trainer/versions/v6/libs/ccm/ccm.min.js',
    config: {
//    "backdrop_close": true,
      "buttons": [
        {
          "html": "<button class='btn btn-secondary' data-close onclick='%%'>Close</button>",
          "onclick": () => {}
        }
      ],
//    "closed": true,
      "content": "My Content",
      "css": [ "ccm.load",
        [  // serial
          "https://orca-nrw.github.io/er_trainer/versions/v6/libs/bootstrap-4/css/bootstrap.min.css",
          "https://orca-nrw.github.io/er_trainer/versions/v6/libs/modal/resources/styles.min.css"
        ]
      ],
      "helper": [ "ccm.load", { "url": "https://orca-nrw.github.io/er_trainer/versions/v6/libs/ccm/helper.min.js", "type": "module" } ],
      "html": [ "ccm.load", { "url": "https://orca-nrw.github.io/er_trainer/versions/v6/libs/modal/resources/templates.min.js", "type": "module" } ],
//    "onclose": instance => {},
      "title": "My Header"
    },
    Instance: function () {

      let $;

      this.start = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // render main HTML template
        $.setContent( this.element, $.html( this.html.main, this.title ) );

        // modal dialog can be optionally closed by click on the backdrop area
        if ( this.backdrop_close ) this.element.querySelector( '#backdrop' ).dataset.close = '';

        // render content
        $.setContent( this.element.querySelector( 'main' ), $.isInstance( this.content ) ? this.content.root : $.html( this.content ) );

        // render footer buttons or remove footer
        if ( this.buttons )
          this.buttons.forEach( button => $.append( this.element.querySelector( 'footer' ), $.html( button.html, button.onclick ) ) );
        else
          $.remove( this.element.querySelector( 'footer' ) );

        // each button with a 'data-dismiss' attribute closes the modal dialog when clicked
        this.element.querySelectorAll( '[data-close]' ).forEach( button => button.addEventListener( 'click', () => this.close() ) );

        // is not standalone?
        if ( this.parent ) {
          const root = this.ccm.context.root( this );
          root.element.parentNode.appendChild( this.root );
          root.root.style.position = 'relative';
          this.root.setAttribute( 'style', 'position: absolute; width: 100%; height: 100%; top: 0; left: 0' );
        }

        // initially closed? => close modal dialog
        this.closed && this.close( true );

      };

      /** opens the modal dialog */
      this.open = () => {
        if ( this.parent ) document.body.style.overflowY = 'hidden';
        this.root.style.display = 'block';
        this.element.querySelector( '#dialog' ).classList.add( 'show' );
        this.ccm.context.root( this ).element.scrollIntoView( true );
      };

      /**
       * closes the modal dialog
       * @param {boolean} [init] - when it's the initial close
       */
      this.close = init => {
        if ( this.parent ) document.body.style.overflowY = 'unset';
        this.element.querySelector( '#dialog' ).classList.remove( 'show' );
        this.root.style.display = 'none';
        this.onclose && !init && this.onclose( this );
      };

      /** removes the modal dialog */
      this.remove = () => { this.close(); $.remove( this.root ); };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();