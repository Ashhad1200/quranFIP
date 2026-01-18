"""
FastAPI application for the Tajweed Pronunciation Assistant.

This service evaluates user recitations against reference audio using
Dynamic Time Warping (DTW) on Mel spectrograms.
"""

from __future__ import annotations

import os
import tempfile
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Import the tajweed_agent modules
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from tajweed_agent import config, data_loader, features, dtw_similarity

app = FastAPI(
    title="Quran Pronunciation Assistant API",
    description="AI-powered pronunciation feedback for Quranic recitation",
    version="1.0.0",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("CORS_ORIGINS", "http://localhost:3000,http://localhost:5173").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EvaluationResult(BaseModel):
    """Response model for pronunciation evaluation."""
    level: str
    surah: int
    ayah: Optional[int] = None
    word: Optional[int] = None
    dtw_distance: float
    avg_cost: float
    score: float
    score_percent: float
    label: str
    label_display: str
    color: str


class HealthResponse(BaseModel):
    """Health check response."""
    status: str
    service: str
    data_root: str
    data_root_exists: bool


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    data_root = Path(config.DATA_ROOT)
    return HealthResponse(
        status="ok",
        service="pronunciation-assistant",
        data_root=str(data_root),
        data_root_exists=data_root.exists(),
    )


def _evaluate_audio(
    audio_bytes: bytes,
    level: str,
    surah: int,
    ayah: Optional[int] = None,
    word: Optional[int] = None,
) -> EvaluationResult:
    """
    Core evaluation logic.

    Writes the uploaded audio to a temp file, extracts Mel features,
    compares against reference, and returns the evaluation result.
    """
    # Save uploaded audio to a temporary file
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        tmp.write(audio_bytes)
        tmp_path = tmp.name

    try:
        # Get reference Mel spectrogram
        mel_ref = data_loader.get_reference_mel(
            level,
            surah,
            ayah=ayah,
            word=word,
        )

        # Extract user's Mel spectrogram
        mel_user = features.extract_mel_from_audio(
            tmp_path,
            n_mels=mel_ref.shape[0],
        )

        # Compute DTW similarity
        distance, avg_cost = dtw_similarity.dtw_distance(mel_ref, mel_user)
        score = dtw_similarity.score_from_distance(distance, level=level)
        label = dtw_similarity.label_from_score(score, level=level)

        return EvaluationResult(
            level=level,
            surah=surah,
            ayah=ayah,
            word=word,
            dtw_distance=round(distance, 4),
            avg_cost=round(avg_cost, 4),
            score=round(score, 4),
            score_percent=round(score * 100, 2),
            label=label,
            label_display=config.LABELS[label],
            color=config.COLORS[label],
        )
    finally:
        # Clean up temp file
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)


@app.post("/evaluate/word", response_model=EvaluationResult)
async def evaluate_word(
    audio: UploadFile = File(..., description="WAV audio file of user's recitation"),
    surah: int = Form(..., ge=1, le=114, description="Surah number (1-114)"),
    ayah: int = Form(..., ge=1, description="Ayah number (1-based)"),
    word: int = Form(..., ge=1, description="Word number (1-based)"),
):
    """
    Evaluate a single word pronunciation.

    Upload a WAV file containing the user's pronunciation of a specific word,
    and receive feedback on how closely it matches the reference.
    """
    try:
        audio_bytes = await audio.read()
        return _evaluate_audio(audio_bytes, "word", surah, ayah, word)
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Evaluation failed: {str(e)}")


@app.post("/evaluate/ayah", response_model=EvaluationResult)
async def evaluate_ayah(
    audio: UploadFile = File(..., description="WAV audio file of user's recitation"),
    surah: int = Form(..., ge=1, le=114, description="Surah number (1-114)"),
    ayah: int = Form(..., ge=1, description="Ayah number (1-based)"),
):
    """
    Evaluate an entire ayah pronunciation.

    Upload a WAV file containing the user's recitation of a complete ayah,
    and receive feedback on the overall quality.
    """
    try:
        audio_bytes = await audio.read()
        return _evaluate_audio(audio_bytes, "ayah", surah, ayah)
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Evaluation failed: {str(e)}")


@app.post("/evaluate/surah", response_model=EvaluationResult)
async def evaluate_surah(
    audio: UploadFile = File(..., description="WAV audio file of user's recitation"),
    surah: int = Form(..., ge=1, le=114, description="Surah number (1-114)"),
):
    """
    Evaluate an entire surah pronunciation.

    Upload a WAV file containing the user's recitation of a complete surah,
    and receive feedback on the overall quality.
    """
    try:
        audio_bytes = await audio.read()
        return _evaluate_audio(audio_bytes, "surah", surah)
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Evaluation failed: {str(e)}")


@app.post("/evaluate", response_model=EvaluationResult)
async def evaluate_generic(
    audio: UploadFile = File(..., description="WAV audio file of user's recitation"),
    surah: int = Form(..., ge=1, le=114, description="Surah number (1-114)"),
    ayah: Optional[int] = Form(None, ge=1, description="Ayah number (1-based, optional)"),
    word: Optional[int] = Form(None, ge=1, description="Word number (1-based, optional)"),
):
    """
    Generic evaluation endpoint that auto-detects the level.

    - If word is provided: word-level evaluation
    - If ayah is provided (no word): ayah-level evaluation
    - If only surah is provided: surah-level evaluation
    """
    if word is not None:
        if ayah is None:
            raise HTTPException(
                status_code=400,
                detail="Word-level evaluation requires ayah to be specified"
            )
        level = "word"
    elif ayah is not None:
        level = "ayah"
    else:
        level = "surah"

    try:
        audio_bytes = await audio.read()
        return _evaluate_audio(audio_bytes, level, surah, ayah, word)
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Evaluation failed: {str(e)}")
