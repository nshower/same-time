/**
 * Fuzzy indeed.
 */
addEventListener( 'DOMContentLoaded', (e) => {

    /**
     * Change color scheme just cause.
     */
    const dark  = '(prefers-color-scheme: dark)';
    const light = '(prefers-color-scheme: light)';

    /**
     * Things to do when the scheme changes.
     *
     * @param {string} scheme light|dark
     */
    function changeWebsiteTheme(scheme) {
        const shortcutIcon = document.getElementById( 'shortcut_icon' );
        if ( 'dark' === scheme ) {
            shortcutIcon.setAttribute('href', shortcutIcon.getAttribute('href').replace('light', 'dark'));
        } else {
            shortcutIcon.setAttribute('href', shortcutIcon.getAttribute('href').replace('dark', 'light'));   
        }
    }

    /**
     * detect color scheme.
     */
    function detectColorScheme() {
        if ( !window.matchMedia ) {
            return;
        }

        /**
         * Verify when things change.
         *
         * @param {mediaQueryList} matches Media match list
         * @param {string}         media   Media Query
         * @returns 
         */
        function listener({ matches, media }) {
            if ( !matches ) {
                // Not matching anymore = not interesting
                return;
            }

            if (media === dark) {
                changeWebsiteTheme('dark');
            } else if (media === light) {
                changeWebsiteTheme('light');
            }
        }

        const mqDark = window.matchMedia(dark);
        mqDark.addEventListener('change', listener);
        listener( mqDark, dark );

        const mqLight = window.matchMedia(light);
        mqLight.addEventListener('change', listener);
        listener( mqLight, light );
    }

    detectColorScheme();


    /**
     * let's do time things
     */
    function tick() {
        const hourHand   = document.querySelector('.hour-hand');
        const minuteHand = document.querySelector('.minute-hand');
        const secondHand = document.querySelector('.second-hand');
    
        let currentDate    = new Date();
        let currentHours   = currentDate.getHours();
        let currentMinutes = currentDate.getMinutes();
        let currentSeconds = currentDate.getSeconds();

        setHours( hourHand, currentHours, currentMinutes );
        setMinutes( minuteHand, currentMinutes, currentSeconds );
        setSeconds( secondHand, currentSeconds );
    }

    function setHours( hand, hours, minutes ) {
        const maxHours   = 12;
        const multiplier = ( 360 / maxHours ).toFixed(2);
        let deg          = 0.0;

        if ( hours > maxHours ) {
            hours = hours - maxHours;
        }
        hours = parseFloat(hours) + parseFloat((minutes / 100).toFixed(2));
        deg     = hours * multiplier;

        hand.style.transform = 'rotate(' + deg + 'deg)';
    }

    function setMinutes( hand, minutes, seconds ) {
        const maxMinutes = 60;
        const multiplier = ( 360 / maxMinutes ).toFixed(2);
        let   deg        = 0.0;

        minutes = parseFloat(minutes) + parseFloat((seconds / 100).toFixed(2));
        deg     = minutes * multiplier;

        hand.style.transform = 'rotate(' + deg + 'deg)';
    }

    function setSeconds( hand, seconds ) {
        const maxSeconds = 60;
        const multiplier = ( 360 / maxSeconds ).toFixed(2);
        const deg          = seconds * multiplier;

        hand.style.transform = 'rotate(' + deg + 'deg)';
    }

    tick();

    setInterval(
        tick,
        1000
    );
    
});
