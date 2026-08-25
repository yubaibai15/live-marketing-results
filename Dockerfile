FROM node:24-alpine AS frontend-build
WORKDIR /build
COPY frontend/package.json frontend/package-lock.json ./frontend/
RUN cd frontend && npm ci --ignore-scripts
COPY frontend ./frontend
RUN cd frontend && npm run build

FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt server.py ./
COPY --from=frontend-build /build/public ./public
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8000
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
