import './LoadingSpinner.css';  // Импортируем CSS для анимации

function LoadingSpinner() {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    );
}

export default LoadingSpinner;