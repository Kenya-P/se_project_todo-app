import Popup from './Popup.js';

class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit, inputValues) {
        super({popupSelector});
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._inputList = this._popupElement.querySelectorAll('.popup__input');

    }

    _getInputValues() { 
        
        const inputValues = {};
        this._inputList.forEach((input) => { 
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    setEventListeners() { 
        super.setEventListeners();
        this._popupElement 
        .addEventListener('submit', (evt) => {
            evt.preventDefault();
            const inputValues = this._getInputValues();
            this._handleFormSubmit(this._getInputValues());
        });
    }
} 
    
export default PopupWithForm;