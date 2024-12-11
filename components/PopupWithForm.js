import Popup from './Popup.js';

class PopupWithForm extends Popup{
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupElement.querySelector('.popup__form');

    }

    _getInputValues() { 
        this._inputList = this._popupElement.querySelectorAll('.popup__input');

        const inputValues = {};
        this._inputList.forEach(input => {
            inputValues[input.name] = input.value;
          });
        return inputValues;
    }

    setEventListeners() { 
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const inputValues = this._getInputValues();
            this._handleFormSubmit(inputValues);
        });
    }

    /* setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const inputValues = this._getInputValues();
            this._handleFormSubmit(evt);
            this._getInputValues();
            this.close();
            this._popupElement.reset();
        });
    } */
} 
    
export default PopupWithForm;