# TODO for Changing LandingPage Background to LDR.jpg with Fixed Scroll

- [ ] Add new CSS class `.bg-landingpage` in `src/index.css` with background image from `src/assets/LDR.jpg`.
  - Properties:
    - `background-image: url('/src/assets/LDR.jpg')`
    - `background-attachment: fixed`
    - `background-size: cover`
    - `background-position: center`
    - `background-repeat: no-repeat`
- [ ] Modify `src/components/LandingPage.tsx`
  - Replace `bg-soft-cream` with `bg-landingpage` in root div className.
- [ ] Test webpage to verify the new background and fixed scrolling behavior.
