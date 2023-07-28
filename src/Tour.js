import React, { useEffect, useRef } from 'react';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import Overlay from './Overlay';

const Tour = () => {
  const anchorRef = useRef(null);
  const tourRef = useRef(null);

  useEffect(() => {
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        classes: 'shepherd-theme-arrows, tour-window',
      },
      steps: [
        {
          id: 'step1',
          text: 'Welcome to the Tour!',
          attachTo: { element: '.first-element', on: 'bottom' },
          buttons: [
            {
              action() {
                return this.cancel();
              },
              classes: 'shepherd-button-secondary',
              text: 'Exit',
            },
            {
              action() {
                return this.next();
              },
              text: 'Next',
            },
          ],
          when:{
            show: () => {
              const node = document.querySelector('.first-element');
              console.log(node.style);
              node.style.borderRadius = '50%';
              node.style.background = 'white'
            }
          }
        },
      ],
    });

    tour.start();

    return () => {
      tour.complete();
    };
  }, []);

  return (
    <>
      <div className="first-element" ref={anchorRef}>
        This is the first element for the tour.
      </div>
      <div ref={tourRef}>{/* Render the tour content here */}</div>
      <Overlay anchorRef={anchorRef} tourRef={tourRef} />
    </>
  );
};

export default Tour;
