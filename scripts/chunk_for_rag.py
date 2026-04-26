#!/usr/bin/env python3
"""
RAG Chunking Pipeline — Prepares knowledge base for embedding.

This script reads markdown files from the knowledge-base/ directory,
splits them into semantic chunks (300-800 tokens), and outputs JSONL
for embedding and RAG retrieval.

AI: Run this after building your knowledge base to prepare chunks for embedding.
    python3 scripts/chunk_for_rag.py

Output:
  - chunks.jsonl: One JSON line per chunk, ready for embeddings API

Dependencies:
  - Python 3.7+ (no external libraries required — uses only stdlib)

Chunks include:
  - id: Unique identifier (filename + chunk index)
  - text: The chunk content (300-800 tokens)
  - tokens: Estimated token count (rough approximation)
  - metadata: File, section, headers extracted from markdown
"""

import json
import os
import re
from pathlib import Path
from typing import List, Dict, Tuple


# ─────────────────────────────────────────────────────────────
# Token estimation (rough approximation)
# AI: This uses a simple heuristic; for production, use
# a proper tokenizer like transformers.AutoTokenizer
# ─────────────────────────────────────────────────────────────


def estimate_tokens(text: str) -> int:
    """
    Estimate token count for text.

    AI: This uses a simple word-count heuristic (~1.3 tokens per word
    for English text). For accurate counts, use a real tokenizer:

        from transformers import AutoTokenizer
        tokenizer = AutoTokenizer.from_pretrained("gpt2")
        return len(tokenizer.encode(text))

    For now, we use stdlib only to keep dependencies minimal.
    """
    # Split on whitespace and common punctuation boundaries
    words = re.findall(r'\b\w+\b', text.lower())
    # Rough heuristic: ~1.3 tokens per word in English
    return int(len(words) * 1.3)


# ─────────────────────────────────────────────────────────────
# Markdown parsing and metadata extraction
# ─────────────────────────────────────────────────────────────


def extract_metadata(content: str, filename: str) -> Dict[str, str]:
    """
    Extract metadata from markdown frontmatter and headers.

    AI: This looks for YAML frontmatter (---) at the top and
    the first H1 header (# ...) to infer document title and subject.
    """
    metadata = {
        'source_file': filename,
        'title': '',
        'section': '',
    }

    # Extract YAML frontmatter if present
    if content.startswith('---'):
        frontmatter_end = content.find('---', 3)
        if frontmatter_end != -1:
            frontmatter = content[3:frontmatter_end].strip()
            # Simple YAML parsing (key: value lines)
            for line in frontmatter.split('\n'):
                if ':' in line:
                    key, value = line.split(':', 1)
                    metadata[key.strip()] = value.strip().strip('"\'')

    # Extract first H1 as title
    h1_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    if h1_match:
        metadata['title'] = h1_match.group(1).strip()

    # Extract first H2 as section (if any)
    h2_match = re.search(r'^##\s+(.+)$', content, re.MULTILINE)
    if h2_match:
        metadata['section'] = h2_match.group(1).strip()

    return metadata


def chunk_by_headers(content: str) -> List[Tuple[str, str]]:
    """
    Split markdown into chunks by header boundaries.

    Returns list of (header_context, chunk_text) tuples.
    Header context helps preserve section information in chunks.

    AI: This preserves markdown structure by keeping related
    paragraphs together under their header.
    """
    chunks = []
    current_header = ''
    current_chunk = []

    lines = content.split('\n')

    for line in lines:
        # Detect headers
        if line.startswith('#'):
            # Save previous chunk if it has content
            if current_chunk and estimate_tokens('\n'.join(current_chunk)) > 0:
                chunk_text = '\n'.join(current_chunk).strip()
                if chunk_text:
                    chunks.append((current_header, chunk_text))

            # Update header context
            header_level = len(line) - len(line.lstrip('#'))
            if header_level <= 2:
                current_header = line.lstrip('#').strip()

            current_chunk = [line]
        else:
            current_chunk.append(line)

    # Append final chunk
    if current_chunk:
        chunk_text = '\n'.join(current_chunk).strip()
        if chunk_text:
            chunks.append((current_header, chunk_text))

    return chunks


def split_into_semantic_chunks(
    text: str,
    min_tokens: int = 300,
    max_tokens: int = 800,
    overlap: int = 50
) -> List[str]:
    """
    Split text into semantic chunks within token bounds.

    AI: This is a simple sentence-based splitter. For better
    semantic chunking, consider:
    - Langchain's semantic chunking
    - Custom sliding windows based on similarity
    - BERT-based sentence embeddings

    For now, we use simple heuristics:
    1. Split on paragraph boundaries (blank lines)
    2. If paragraph is too long, split on sentences
    3. Merge small paragraphs to meet min_tokens

    Args:
        text: Raw text to chunk
        min_tokens: Minimum chunk size (default 300)
        max_tokens: Maximum chunk size (default 800)
        overlap: Overlap tokens between chunks (for continuity)

    Returns:
        List of chunk strings
    """
    # Split on paragraphs first
    paragraphs = [p.strip() for p in text.split('\n\n') if p.strip()]

    chunks = []
    current_chunk = []
    current_tokens = 0

    for paragraph in paragraphs:
        para_tokens = estimate_tokens(paragraph)

        # If adding this paragraph exceeds max_tokens, save current chunk
        if current_tokens + para_tokens > max_tokens and current_chunk:
            chunk_text = '\n\n'.join(current_chunk)
            chunks.append(chunk_text)
            current_chunk = []
            current_tokens = 0

        current_chunk.append(paragraph)
        current_tokens += para_tokens

    # Add remaining chunk
    if current_chunk:
        chunk_text = '\n\n'.join(current_chunk)
        if estimate_tokens(chunk_text) >= min_tokens or not chunks:
            # Only add if meets min size or is the first chunk
            chunks.append(chunk_text)
        elif chunks:
            # Append to previous chunk if too small
            chunks[-1] += '\n\n' + chunk_text

    return chunks


def process_markdown_file(filepath: Path) -> List[Dict]:
    """
    Process a single markdown file into chunks.

    Returns list of chunk dicts with:
    - id: unique identifier
    - text: chunk content
    - tokens: estimated token count
    - metadata: source file, section, etc.

    AI: Each file can produce multiple chunks.
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    filename = filepath.name
    file_stem = filepath.stem
    metadata = extract_metadata(content, filename)

    # Split into semantic chunks
    raw_chunks = chunk_by_headers(content)

    output_chunks = []
    chunk_index = 0

    for header_context, chunk_text in raw_chunks:
        # Further split if chunk is too large
        sub_chunks = split_into_semantic_chunks(chunk_text)

        for sub_chunk in sub_chunks:
            tokens = estimate_tokens(sub_chunk)

            # Only output chunks that meet minimum token requirement
            if tokens >= 100:  # Lower min for sub-chunks
                chunk_id = f"{file_stem}#{chunk_index}"

                chunk_dict = {
                    'id': chunk_id,
                    'text': sub_chunk,
                    'tokens': tokens,
                    'metadata': {
                        'source_file': filename,
                        'source_path': str(filepath.relative_to(Path.cwd())),
                        'title': metadata.get('title', ''),
                        'section': header_context or metadata.get('section', ''),
                        'tags': metadata.get('tags', '').split(',') if metadata.get('tags') else [],
                    }
                }
                output_chunks.append(chunk_dict)
                chunk_index += 1

    return output_chunks


def main():
    """
    Main pipeline: read knowledge base, chunk, output JSONL.

    AI: This function:
    1. Finds all .md files in knowledge-base/
    2. Processes each file into chunks
    3. Writes all chunks to chunks.jsonl (one JSON per line)
    4. Prints summary statistics
    """
    kb_dir = Path('knowledge-base')

    if not kb_dir.exists():
        print(f"Error: {kb_dir} directory not found")
        print("Please run this script from the project root")
        return 1

    # Find all markdown files
    md_files = list(kb_dir.rglob('*.md'))

    if not md_files:
        print(f"No markdown files found in {kb_dir}")
        return 0

    print(f"Found {len(md_files)} markdown files in {kb_dir}")

    # Process all files
    all_chunks = []
    total_tokens = 0

    for filepath in sorted(md_files):
        try:
            chunks = process_markdown_file(filepath)
            all_chunks.extend(chunks)
            file_tokens = sum(c['tokens'] for c in chunks)
            total_tokens += file_tokens
            print(f"  ✓ {filepath.name}: {len(chunks)} chunks, {file_tokens} tokens")
        except Exception as e:
            print(f"  ✗ {filepath.name}: {e}")
            return 1

    # Write output JSONL
    output_file = Path('chunks.jsonl')
    with open(output_file, 'w', encoding='utf-8') as f:
        for chunk in all_chunks:
            f.write(json.dumps(chunk) + '\n')

    # Print summary
    print(f"\n{'─' * 50}")
    print(f"Chunking complete!")
    print(f"  Total chunks: {len(all_chunks)}")
    print(f"  Total tokens: {total_tokens}")
    print(f"  Avg chunk size: {total_tokens // len(all_chunks) if all_chunks else 0} tokens")
    print(f"  Output: {output_file}")
    print(f"\nNext: Upload chunks.jsonl to your embeddings service")
    print(f"      (e.g., Pinecone, Weaviate, or local vector DB)")

    return 0


if __name__ == '__main__':
    exit(main())
