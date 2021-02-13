import React from 'react';

import { Form, Field, FormElement, FieldWrapper } from '@progress/kendo-react-form';
import { Label, Hint, Error } from '@progress/kendo-react-labels';
import { TextArea } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';

const textAreaValidator = (value) => !value ?
    "Please enter a text." : "d";

const FormTextArea = (fieldRenderProps) => {
    const { validationMessage, touched, label, id, valid, disabled, hint, type, optional, max, value, ...others } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hindId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';

    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={valid} editorDisabled={disabled} optional={optional}>{label}</Label>
            <div className={'k-form-field-wrap'}>
                <TextArea
                    valid={valid}
                    type={type}
                    id={id}
                    disabled={disabled}
                    maxlength={max}
                    rows={4}
                    ariaDescribedBy={`${hindId} ${errorId}`}
                    {...others}
                />
                <span class="k-form-hint" style={{ position: 'absolute', right: 0 }}>{value} / {max}</span>
                {
                    showHint &&
                    <Hint id={hindId}>{hint}</Hint>
                }
                {
                    showValidationMessage &&
                    <Error id={errorId}>{validationMessage}</Error>
                }
            </div>
        </FieldWrapper>
    );
};

export default FormTextArea;