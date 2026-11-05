import { useRef, useState, useEffect } from "react";

function PhotoUpload({ file, onFileChange, error }) {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [typeError, setTypeError] = useState("");

    // Build temp URL for chosen file to show preview
    useEffect(() => {
        if (!file) {
            setPreviewUrl("");
            return;
        }
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        // Free memory when file changes or component unmounts
        return () => URL.revokeObjectURL(url);
    }, [file]);

    function handleBoxClick() {
        inputRef.current.click();   // opens OS file picker
    }

    function handleInputChange(event) {
        const chosen = event.target.files[0];
        if (!chosen) return;    // use closed picker w/o choosing

        if (!chosen.type.startsWith("image/")) {
            setTypeError("Please choose an image file (JPG, PNG, etc.).");
            return;
        }

        setTypeError("");
        onFileChange(chosen);

        // Reset so choosing same file again still triggers onChange
        event.target.value = "";
    }

    const shownError = typeError || error;

    return (
        <div>
            <button type="button" className="photo-upload" onClick={handleBoxClick}>
                {previewUrl ? (
                    <img src={previewUrl} alt="Preview of your chosen profile photo" />
                ) : (
                    <span className="photo-upload-text">Upload photo</span>
                )}
            </button>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                hidden
            />

            {file && <p className="photo-filename">{file.name} · click the box to change it</p>}
            {shownError && <p className="form-error">{shownError}</p>}
        </div>
    );
}

export default PhotoUpload