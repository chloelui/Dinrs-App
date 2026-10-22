function StudentCard({ student, isConnected, onToggleConnect }) {
    return (
        <article className="student-card">
            <div className="avatar">
                <svg viewBox="0 0 80 80" aria-hidden="true">
                    <circle cx="40" cy="31" r="11" />
                    <path d="M16 80 C16 58 28 48 40 48 C52 48 64 58 64 80 Z" />
                </svg>
            </div>
            <h2 className="student-name">{student.name}</h2>
            <p className="student-meta">
                {student.year} · {student.major}
            </p>
            <p className="student-halls">Usually at: {student.halls.join(", ")}</p>
            <div className="tag-row">
                {student.foods.map((food) => (
                    <span key={food} className="tag">
                        {food}
                    </span>
                ))}
            </div>
            <button className={isConnected ? "btn-connect connected" : "btn-connect"} onClick={() => onToggleConnect(student.id)}>
                {isConnected ? "Connected" : "Connect"}
            </button>
        </article>
    );
}

export default StudentCard;