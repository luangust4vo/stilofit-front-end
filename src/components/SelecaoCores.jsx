import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { useController, useFormContext } from 'react-hook-form';

function ColorPicker({ name, label }) {
    const { control } = useFormContext();
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name,
        control,
        defaultValue: '#3498db', // Define uma cor padrão
    });

    const [showPicker, setShowPicker] = useState(false);

    const togglePicker = () => setShowPicker(!showPicker);
    const closePicker = () => setShowPicker(false);

    return (
        <div className="form-group" style={{ position: 'relative' }}>
            <label>{label}</label><br />
            <button
                type="button"
                onClick={togglePicker}
                style={{
                    backgroundColor: value,
                    color: '#fff',
                    padding: '10px 27px',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 0 5px rgba(0,0,0,0.2)'
                }}
            >
                Selecione a cor
            </button>
            {
        showPicker && (
            <div style={{ position: 'absolute', zIndex: 2 }}>
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    }}
                    onClick={closePicker}
                />
                <SketchPicker
                    color={value}
                    onChange={(color) => onChange(color.hex)}
                />
            </div>
        )
    }

    { error && <p className="error" style={{ color: 'red' }}>{error.message}</p> }
        </div >
    );
}

export default ColorPicker;
