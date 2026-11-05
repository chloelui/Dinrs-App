import { useState, useRef, useEffect } from "react";
import { PencilIcon } from "./Icons";
import EditActions from "./EditActions";

function EditableText({ value, onSave, label, validate, multiline=false, alignTop=false, inputMode, maxLength, children,}) {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(value);
    const [error, setError] = useState("");
    const fieldRef = useRef(null);

    // Focus box and put cursor at end when edit mode starts
    useEffect(() => {
        if (isEditing) {
            const el = fieldRef.current;
            el.focus();
            el.setSelectionRange(el.value.length, el.value.length);
        }
    }, [isEditing]);

    function startEditing() {
        setDraft(value);
        setError("");
        setIsEditing(true);
    }

    function cancel() {
        setIsEditing(false);
        setError("");
    }

    function save() {
        const trimmed = draft.trim();
        const message = validate ? validate(trimmed) : "";
        if (message) {
            setError(message);
            return;
        }
        onSave(trimmed);
        setIsEditing(false);
    }

    function handleKeyDown(event) {
        if (event.key === "Escape") {
            cancel();
        } else if (event.key === "Enter" && !multiline) {
            event.preventDefault();
            save();
        }
    }

    if (!isEditing) {
        return (
            <div className={alignTop ? "editable-display align-top" : "editable-display"}>
                {children}
                <button type="button" className="icon-btn" onClick={startEditing} aria-label={`Edit ${label}`}>
                    <PencilIcon />
                </button>
            </div>
        );
    }

    const fieldProps = {
        ref: fieldRef,
        className: "form-input form-input-wide",
        value: draft,
        onChange: (event) => setDraft(event.target.value),
        onKeyDown: handleKeyDown,
        "aria-label": label,
    };

    return (
        <div className="editable-editing">
            {multiline ? (
                <textarea rows={4} {...fieldProps} />
            ) : (
                <input type="text" inputMode={inputMode} maxLength={maxLength} {...fieldProps} />
            )}
            {error && <p className="form-error">{error}</p>}
            <EditActions onSave={save} onCancel={cancel} />
        </div>
    );
}

export default EditableText;