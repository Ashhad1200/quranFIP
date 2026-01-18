"""
Local indexing script - directly uses OpenAI embeddings with Qdrant.
"""
import os
import sys
import json
import uuid
from pathlib import Path
from typing import List
from tqdm import tqdm

# Load .env file
env_path = Path(__file__).parent / ".env"
if env_path.exists():
    print(f"Loading environment from: {env_path}")
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                os.environ[key.strip()] = value.strip()

# Configuration
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
OPENAI_EMBED_MODEL = os.environ.get("OPENAI_EMBED_MODEL", "text-embedding-3-small")
QDRANT_HOST = os.environ.get("QDRANT_HOST", "localhost")
QDRANT_PORT = int(os.environ.get("QDRANT_PORT", "6333"))
COLLECTION_NAME = os.environ.get("QDRANT_COLLECTION_AYAHS", "quran_ayahs_openai_v1")
VECTOR_DIM = 1536
BATCH_SIZE = 64

if not OPENAI_API_KEY:
    print("ERROR: OPENAI_API_KEY not found!")
    sys.exit(1)

print(f"OpenAI Key: {OPENAI_API_KEY[:15]}...")
print(f"Qdrant: {QDRANT_HOST}:{QDRANT_PORT}")
print(f"Collection: {COLLECTION_NAME}")

# Import dependencies
try:
    from openai import OpenAI
    from qdrant_client import QdrantClient
    from qdrant_client.models import Distance, PointStruct, VectorParams
except ImportError as e:
    print(f"Missing dependency: {e}")
    print("Run: pip install openai qdrant-client")
    sys.exit(1)

# Initialize clients
openai_client = OpenAI(api_key=OPENAI_API_KEY)
qdrant_client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)

def load_ayahs(path: str) -> List[dict]:
    """Load ayahs from JSON."""
    with open(path, encoding="utf-8") as f:
        return json.load(f)

def get_embedding_text(ayah: dict) -> str:
    """Generate text for embedding."""
    parts = [
        ayah.get("arabic", ""),
        ayah.get("transliteration", ""),
        (ayah.get("translations") or {}).get("en", "")
    ]
    return " ".join(p for p in parts if p)

def embed_texts(texts: List[str]) -> List[List[float]]:
    """Get embeddings from OpenAI."""
    response = openai_client.embeddings.create(
        input=texts,
        model=OPENAI_EMBED_MODEL
    )
    return [item.embedding for item in response.data]

def ensure_collection():
    """Create collection if it doesn't exist."""
    collections = {c.name for c in qdrant_client.get_collections().collections}
    if COLLECTION_NAME not in collections:
        print(f"Creating collection: {COLLECTION_NAME}")
        qdrant_client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=VECTOR_DIM, distance=Distance.COSINE)
        )
    else:
        print(f"Collection exists: {COLLECTION_NAME}")

def to_point(ayah: dict, vector: List[float]) -> PointStruct:
    """Convert ayah to Qdrant point."""
    chunk_id = ayah.get("chunk_id", f"{ayah['surah_num']}:{ayah['ayah_num']}")
    surah_info = ayah.get("surah_info", {})

    payload = {
        "chunk_id": chunk_id,
        "surah_num": ayah["surah_num"],
        "ayah_num": ayah["ayah_num"],
        "surah_name_ar": surah_info.get("name_ar", ""),
        "surah_name_en": surah_info.get("name_en", ""),
        "revealed_in": surah_info.get("revealed_in", ""),
        "arabic": ayah.get("arabic", ""),
        "transliteration": ayah.get("transliteration", ""),
        "translations": ayah.get("translations", {}),
        "tafsirs": ayah.get("tafsirs", {}),
    }

    point_id = str(uuid.uuid5(uuid.NAMESPACE_URL, f"ayah:{chunk_id}"))
    return PointStruct(id=point_id, vector=vector, payload=payload)

def main():
    smoke_mode = "--smoke" in sys.argv

    # Load data
    json_path = Path(__file__).parent / "metadata" / "ayahs_collection.json"
    print(f"\n[load] Reading from: {json_path}")
    ayahs = load_ayahs(str(json_path))

    if smoke_mode:
        ayahs = ayahs[:20]
        print(f"[load] SMOKE MODE: {len(ayahs)} ayahs")
    else:
        print(f"[load] Total: {len(ayahs)} ayahs")

    # Ensure collection exists
    ensure_collection()

    # Process in batches
    print(f"\n[index] Embedding and upserting (batch size: {BATCH_SIZE})...")

    for i in tqdm(range(0, len(ayahs), BATCH_SIZE)):
        batch = ayahs[i:i + BATCH_SIZE]
        texts = [get_embedding_text(a) for a in batch]

        # Get embeddings
        vectors = embed_texts(texts)

        # Create points
        points = [to_point(a, v) for a, v in zip(batch, vectors)]

        # Upsert to Qdrant
        qdrant_client.upsert(collection_name=COLLECTION_NAME, points=points)

    print(f"\n[done] Indexed {len(ayahs)} ayahs into '{COLLECTION_NAME}'")

if __name__ == "__main__":
    main()
