import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestRegressor
import joblib

# Load data
print("Loading data...")
data = pd.read_csv('data/processed/features_data.csv')

# Select features and target
features = ['open', 'high', 'low', 'volume', 'return', 'rolling_mean', 'rolling_std']
target = 'close'

X = data[features]
y = data[target]

# Sample a smaller subset of the data for quicker testing
print("Sampling data...")
X_sample, _, y_sample, _ = train_test_split(X, y, train_size=0.1, random_state=42)

# Split data into training and testing sets
print("Splitting data into training and testing sets...")
X_train, X_test, y_train, y_test = train_test_split(X_sample, y_sample, test_size=0.2, random_state=42)

# Define the model
model = RandomForestRegressor()

# Define the parameter grid
param_grid = {
    'n_estimators': [50, 100],
    'max_depth': [10, None],
    'max_features': ['sqrt', 'log2'],  # Corrected max_features parameter
    'criterion': ['squared_error']
}

# Perform GridSearchCV
print("Starting GridSearchCV...")
grid_search = GridSearchCV(model, param_grid, cv=3, n_jobs=-1, verbose=2)
grid_search.fit(X_train, y_train)

print(f"Best parameters found: {grid_search.best_params_}")

# Save the model
best_model = grid_search.best_estimator_
joblib.dump(best_model, 'models/rf_model.joblib')
print("Model saved to models/rf_model.joblib")
