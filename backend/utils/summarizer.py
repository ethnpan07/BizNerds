import re
from transformers import pipeline

summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

def clean_summary(text: str) -> str:
    # Trim whitespace, remove space before punctuation, ensure ending period
    text = text.strip()
    text = re.sub(r'\s+([.,;!?])', r'\1', text)
    return text if text.endswith('.') else text + '.'

def summarize_text(text: str, max_length=80, min_length=20) -> str:
    if not text:
        return ""
    result = summarizer(text, max_length=max_length, min_length=min_length, do_sample=False)[0]["summary_text"]
    return clean_summary(result)
