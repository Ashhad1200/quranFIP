"""
Simple indexing script that loads .env file and runs indexing.
"""
import os
import sys
from pathlib import Path

# Load .env file manually
env_path = Path(__file__).parent / ".env"
if env_path.exists():
    print(f"Loading environment from: {env_path}")
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                os.environ[key.strip()] = value.strip()
                if key.strip() == "OPENAI_API_KEY":
                    print(f"  Set {key.strip()}: {value.strip()[:15]}...")

# Make sure we're using CPU if CUDA isn't available
os.environ["EMBED_DEVICE"] = "cpu"

# Check for OpenAI API key
api_key = os.environ.get("OPENAI_API_KEY", "")
if not api_key:
    print("ERROR: OPENAI_API_KEY not found in .env file!")
    sys.exit(1)

print(f"\nOpenAI API Key loaded: {api_key[:15]}...")
print(f"Using device: cpu")
print(f"Qdrant host: {os.environ.get('QDRANT_HOST', 'localhost')}")
print(f"Qdrant port: {os.environ.get('QDRANT_PORT', '6333')}")

# Now import after env is set
from indexing.index_ayahs import main as index_ayahs_main

if __name__ == "__main__":
    print("\n=== Starting Ayahs Indexing ===\n")

    # Check if --smoke flag is passed
    if "--smoke" in sys.argv:
        sys.argv = [sys.argv[0], "--smoke"]
    else:
        sys.argv = [sys.argv[0]]

    index_ayahs_main()
