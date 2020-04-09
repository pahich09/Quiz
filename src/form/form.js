const createControl = (config, validation) => {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: '',
    }
}

const createOptionControl = (number) => {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number,
    }, {required: true})
}

export const createFormControls = () => {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым',
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}
export const validate = (value, validation = null) => {
    if (!validation) {
        return true
    }
    let isValid = true
    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }
    return isValid
}

export const validateForm = (formControls) => {
    let isFormValid = true;
    for (let control in formControls) {
        if (formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].valid && isFormValid
        }
    }
    return isFormValid
}
