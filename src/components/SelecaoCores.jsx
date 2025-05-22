
import React from 'react';
import { SketchPicker } from 'react-color';
import { useController, useFormContext } from 'react-hook-form';

function ColorPicker({ name, label }) {
    const { control } = useFormContext();
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({ name, control });

    return (
        <div className="form-group">
            <label>{label}</label>
            <SketchPicker
                color={value || '#ffffff'}
                onChange={(color) => onChange(color.hex)}
            />
            {error && <p className="error">{error.message}</p>}
        </div>
    );
}

export default ColorPicker;
