function EditActions({ onSave, onCancel }) {
    return (
        <div className="edit-actions">
            <button type="button" className="btn-primary btn-small" onClick={onSave}>
                Save
            </button>
            <button type="button" className="btn-outline btn-small" onClick={onCancel}>
                Cancel
            </button>
        </div>
    );
}

export default EditActions;