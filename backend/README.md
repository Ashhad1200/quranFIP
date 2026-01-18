# QuranLearnAI Backend Services

Docker-based backend infrastructure for QuranLearnAI, providing four microservices:
1. **Quran Chatbot** - RAG-based Q&A system (Port 8001)
2. **Ayah Learning API** - Word-by-word lexicon service (Port 8002)
3. **Pronunciation Assistant** - AI pronunciation feedback (Port 8003)
4. **Qdrant Vector DB** - Semantic search engine (Port 6333)

---

## Quick Start

### Prerequisites
- Docker Desktop installed and running
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Setup

1. **Navigate to backend:**
   ```bash
   cd backend
   ```

2. **Configure environment:**
   ```bash
   # Copy the example environment file for chatbot
   cp .env.example "quran chatbot pipline/QuranChatBot/.env"

   # Edit the .env file and add your OpenAI API key
   ```

3. **Start all services:**
   ```bash
   docker-compose up -d
   ```

4. **Check status:**
   ```bash
   docker-compose ps
   ```

---

## Service URLs

| Service | URL | Description |
|---------|-----|-------------|
| **Quran Chatbot** | http://localhost:8001 | RAG-based Q&A API |
| **Chatbot Docs** | http://localhost:8001/docs | Swagger UI |
| **Ayah Learning** | http://localhost:8002 | Lexicon API |
| **Learning Docs** | http://localhost:8002/docs | Swagger UI |
| **Pronunciation** | http://localhost:8003 | Pronunciation feedback API |
| **Pronunciation Docs** | http://localhost:8003/docs | Swagger UI |
| **Qdrant** | http://localhost:6333 | Vector DB Dashboard |

---

## Service Details

### 1. Quran Chatbot (Port 8001)

**Tech Stack:** FastAPI, OpenAI, Qdrant, Sentence Transformers

**Endpoints:**
- `GET /health` - Health check
- `POST /query` - Submit chatbot query

**First Run:**
- Downloads embedding models (~500MB)
- Indexes Quran data into Qdrant (~5-10 min)
- Creates vector collections automatically

**Environment Variables Required:**
```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
QDRANT_HOST=qdrant
```

---

### 2. Ayah Learning API (Port 8002)

**Tech Stack:** FastAPI, Python

**Endpoints:**
- `GET /health` - Health check
- `GET /api/lexicon` - Full word lexicon
- `GET /api/ayah_index` - Ayah index
- `GET /api/ayah/{surah}/{ayah}` - Get specific ayah
- `GET /api/next?surah=X&ayah=Y` - Next ayah navigation

**Data:**
- Currently serves Surahs 112-114 (last 3 chapters)
- JSON-based, no external dependencies

---

### 3. Pronunciation Assistant (Port 8003)

**Tech Stack:** FastAPI, NumPy, SciPy, Librosa

**Endpoints:**
- `GET /health` - Health check
- `POST /evaluate/word` - Evaluate single word pronunciation
- `POST /evaluate/ayah` - Evaluate full ayah pronunciation
- `POST /evaluate/surah` - Evaluate full surah pronunciation
- `POST /evaluate` - Generic endpoint (auto-detects level)

**Features:**
- DTW (Dynamic Time Warping) based audio comparison
- Mel spectrogram feature extraction
- Scoring: Good / Intermediate / Wrong

**Request Format:**
```bash
curl -X POST http://localhost:8003/evaluate/word \
  -F "audio=@recording.wav" \
  -F "surah=114" \
  -F "ayah=1" \
  -F "word=1"
```

**Response:**
```json
{
  "level": "word",
  "surah": 114,
  "ayah": 1,
  "word": 1,
  "score": 0.85,
  "score_percent": 85.0,
  "label": "good",
  "label_display": "Good",
  "color": "#16a34a"
}
```

---

### 4. Qdrant Vector DB (Port 6333)

**Collections:**
- `quran_ayahs_openai_v1` - Ayah-level vectors (1536-dim)
- `quran_words_openai_v1` - Word-level vectors (1536-dim)

**Dashboard:** http://localhost:6333/dashboard

---

## Common Commands

### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f chatbot
docker-compose logs -f learning
docker-compose logs -f pronunciation
```

### Rebuild after code changes
```bash
# Rebuild specific service
docker-compose up -d --build chatbot
docker-compose up -d --build pronunciation

# Rebuild all
docker-compose up -d --build
```

### Reset everything (including volumes)
```bash
docker-compose down -v
```

---

## Testing

### Health Checks
```bash
# Chatbot
curl http://localhost:8001/health

# Learning API
curl http://localhost:8002/health

# Pronunciation
curl http://localhost:8003/health

# Qdrant
curl http://localhost:6333/collections
```

### Example API Calls

**Chatbot Query:**
```bash
curl -X POST http://localhost:8001/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is the purpose of life?",
    "lang": "en",
    "top_k": 3,
    "show_tafsir": true
  }'
```

**Get Ayah:**
```bash
curl http://localhost:8002/api/ayah/112/1
```

**Pronunciation Evaluation:**
```bash
curl -X POST http://localhost:8003/evaluate/word \
  -F "audio=@your_recording.wav" \
  -F "surah=112" \
  -F "ayah=1" \
  -F "word=1"
```

---

## Project Structure

```
backend/
├── docker-compose.yml                    # Main orchestration
├── .env.example                          # Environment template
├── README.md                             # This file
│
├── quran chatbot pipline/QuranChatBot/
│   ├── Dockerfile                        # Chatbot container
│   ├── .dockerignore
│   ├── requirements.txt
│   ├── app/
│   │   ├── fastapi_app.py               # FastAPI server
│   │   └── gradio_ui.py                 # Alternative UI
│   └── metadata/                         # Quran data
│
├── LEARN - AYAH BY AYAH/.../quran-fastapi/
│   ├── Dockerfile                        # Learning API container
│   ├── .dockerignore
│   ├── app/
│   │   └── main.py                       # FastAPI server
│   └── data/
│       ├── lexicon_112_114.json
│       └── ayah_index_112_114.json
│
└── pronounciation assitance project__/tajweed_agent_project/
    ├── Dockerfile                        # Pronunciation container
    ├── .dockerignore
    ├── requirements-docker.txt
    ├── app/
    │   └── main.py                       # FastAPI server
    ├── tajweed_agent/                    # Core evaluation logic
    │   ├── config.py
    │   ├── features.py
    │   ├── dtw_similarity.py
    │   └── data_loader.py
    └── data/QuranAudio/                  # Reference audio files
```

---

## Troubleshooting

### Container won't start

**Check logs:**
```bash
docker-compose logs chatbot
docker-compose logs pronunciation
```

**Common issues:**
- Missing `.env` file → Copy from `.env.example`
- Invalid OpenAI API key → Check your key
- Port already in use → Stop conflicting services

### Qdrant connection errors

**Verify Qdrant is running:**
```bash
docker-compose ps qdrant
curl http://localhost:6333/healthz
```

**Restart services:**
```bash
docker-compose restart chatbot
```

### Slow first startup

**Expected behavior:**
- Chatbot downloads ~500MB of ML models
- Indexing takes 5-10 minutes
- Check progress: `docker-compose logs -f chatbot`

### Reset Qdrant collections

```bash
# Stop services
docker-compose down

# Remove volumes
docker volume rm quran-qdrant-storage

# Restart (will re-index)
docker-compose up -d
```

---

## Security Notes

- **Never commit `.env` files** with real API keys
- OpenAI API key is only used by chatbot service
- All services run in isolated Docker network
- Only necessary ports are exposed to host

---

## Deployment

### Production Checklist
- [ ] Use production `.env` with real API keys
- [ ] Set `ENVIRONMENT=production`
- [ ] Configure reverse proxy (Nginx/Traefik)
- [ ] Enable HTTPS/TLS
- [ ] Set up monitoring and logging
- [ ] Configure auto-restart policies
- [ ] Backup Qdrant volumes regularly

### Deploy to Cloud

**Docker Compose compatible platforms:**
- AWS ECS
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform
- Railway
- Render

---

## License

Educational FYP project. See main repository for details.
