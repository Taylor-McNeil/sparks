#Makefile

.PHONY: start-backend start-frontend dev

# Activate the Python virtual environment and run FastAPI
start-backend:
	cd backend && source .venv/Scripts/activate && uvicorn app.main:app --reload

start-frontend:
	cd frontend/spark-app && npm run dev	

dev:
	@echo "Open 2 terminals:"
	@echo "1️⃣ make start-backend"
	@echo "2️⃣ make start-frontend"