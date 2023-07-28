import React, { useEffect, useRef } from 'react';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import Overlay from './Overlay';

const Tour = () => {
  const anchorRef = useRef(null);
  const tourRef = useRef(null);
  const [useOverLay, setUseOverlay] = React.useState(true);
  useEffect(() => {
    const tour = new Shepherd.Tour({
      useModalOverlay: useOverLay,
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
          when: {
            show() {
              // Show the overlay only for the first step
              const overlay = document.querySelector(
                '.shepherd-modal-overlay-container'
              );
              if (overlay) overlay.style.display = 'none';
            },
          },
        },
        {
          id: 'step1',
          text: 'Welcome to the 2 Tour!',
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
          when: {
            show() {
              // Show the overlay only for the first step
              const overlay = document.querySelector(
                '.shepherd-modal-overlay-container'
              );
              if (overlay) overlay.style.display = 'block';
            },
          },
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
    </>
  );
};

export default Tour;
