class FormValidator {
    constructor(settings, formEl) {
        if (!settings.inputSelector || !settings.submitButtonSelector) {
            throw new Error("Required settings are missing!");
        }

        this._formEl = formEl;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._errorSelectorTemplate = settings.errorSelectorTemplate || "#{inputId}-error";


    }

    _showInputError(inputElement) {
        if (!inputElement.id) {
            console.error("Input element is missing an ID. Error handling may not work.");
            return;
        }

        const errorSelector = this._errorSelectorTemplate.replace("{inputId}", inputElement.id);
        const errorElement = this._formEl.querySelector(errorSelector);

        inputElement.classList.add(this._inputErrorClass);
        if (errorElement) {
            errorElement.textContent = inputElement.validationMessage;
            errorElement.classList.add(this._errorClass);
        } else {
            console.warn(`Error element not found for selector: ${errorSelector}`);
        }
    }


    _hideInputError(inputElement) {
        if (!inputElement.id) {
            console.error("Input element is missing an ID. Error handling may not work.");
            return;
        }

        const errorSelector = this._errorSelectorTemplate.replace("{inputId}", inputElement.id);
        const errorElement = this._formEl.querySelector(errorSelector);

        inputElement.classList.remove(this._inputErrorClass);
        if (errorElement) {
            errorElement.textContent = "";
            errorElement.classList.remove(this._errorClass);
        }
    }

    _hasInvalidInput() { 
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
          });
    }

    _checkInputValidity(inputElement) { 
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
          } else {
            this._hideInputError(inputElement);
          }
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }
    

    _setEventListeners() { 
        this._inputList = Array.from(
            this._formEl.querySelectorAll(this._inputSelector)
        );
        this._buttonElement = this._formEl.querySelector(this._submitButtonSelector);

        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }
    
    resetValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });

        this._toggleButtonState();
    }

    enableValidation() {
        this._formEl.addEventListener("submit", (evt) => {
            this.resetValidation();
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}

export default FormValidator;