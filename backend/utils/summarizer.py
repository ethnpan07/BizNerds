import os
import re
from transformers import pipeline, logging
from transformers.pipelines import PipelineException
from huggingface_hub import snapshot_download

# Silence HF INFO logs
logging.set_verbosity_error()

# Cache folder
CACHE_DIR = os.path.join(os.getcwd(), "hf_cache")
os.makedirs(CACHE_DIR, exist_ok=True)

MODEL_ID = "sshleifer/distilbart-cnn-12-6"

# Step 1️⃣: Download model files into CACHE_DIR
try:
    local_dir = snapshot_download(repo_id=MODEL_ID, cache_dir=CACHE_DIR)
    print(f"Model downloaded to {local_dir}")
except Exception as e:
    raise RuntimeError(f"Failed to download {MODEL_ID}: {e}")

# Step 2️⃣: Load summarization pipeline from the local directory
try:
    summarizer = pipeline(
        "summarization",
        model=local_dir,
        local_files_only=True
    )
    print("Summarizer loaded successfully")
except Exception as e:
    raise RuntimeError(f"Failed to load pipeline from {local_dir}: {e}")

def clean_summary(text: str) -> str:
    text = text.strip()
    text = re.sub(r'\s+([.,;!?])', r'\1', text)
    return text if text.endswith('.') else text + '.'

def summarize_text(text: str, max_length=80, min_length=20) -> str:
    if not text:
        return ""
    try:
        result = summarizer(text, max_length=max_length, min_length=min_length, do_sample=False)
        return clean_summary(result[0].get("summary_text", ""))
    except PipelineException:
        return "Summary unavailable."
    except Exception as e:
        print(f"[Summarizer Error] {e}")
        return "Summary unavailable."
