import { useRef, useState } from "react";
import { PencilIcon, PlusIcon, CloseIcon } from "./Icons";

function ProfilePhotoEditor({ photoUrl, name, onChangePhoto, onRemovePhoto }) {
    const inputRef = useRef(null);
    const [error, setError] = useState("");

    function openPicker() {
        inputRef.current.click();   // opens OS file picker
    }

    function handleInputChange(event) {
        const chosen = event.target.files[0];
        event.target.value = "";    // picking same file again still fires onChange
        if (!chosen) return;

        if (!chosen.type.startsWith("image/")) {
            setError("Please choose an image file (JPG, PNG, etc.).");
            return;
        }

        setError("");
        onChangePhoto(chosen);
    }

    const hasPhoto = Boolean(photoUrl);

    return (
        <div>
            <div className="profile-avatar">
                {hasPhoto ? (
                    <img src={photoUrl} alt={`${name}'s profile`} />
                ) : (
                    <svg viewBox="0 0 80 80" aria-hidden="true">
                        <circle cx="40" cy="31" r="11" />
                        <path d="M16 80 C16 58 28 48 40 48 C52 48 64 58 64 80 Z" />
                    </svg>
                )}

                <div className={hasPhoto ? "avatar-overlay" : "avatar-overlay is-emtpy"}>
                    {hasPhoto ? (
                        <>
                            <button type="button" className="btn-outline btn-circle" onClick={openPicker} aria-label="Change profile photo">
                                <PencilIcon />
                            </button>
                            <button type="button" className="btn-danger btn-circle" onClick={onRemovePhoto} aria-label="Remove profile photo">
                                <CloseIcon />
                            </button>
                        </>
                    ) : (
                        <button type="button" className="btn-primary btn-circle" onClick={openPicker} aria-label="Add profile photo">
                            <PlusIcon />
                        </button>
                    )}
                </div>
            </div>

            <input ref={inputRef} type="file" accept="image/*" onChange={handleInputChange} hidden />

            {error && <p className="form-error">{error}</p>}
        </div>
    );
}

export default ProfilePhotoEditor;