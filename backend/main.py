from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import google.generativeai as genai
import os

from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "https://ai-caption-generator-gold.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/caption")
async def caption_image(
    file: UploadFile = File(...)
):
    
    image_bytes = await file.read()

    response = model.generate_content(
        [
            "Describe this image in detail.",
            {
                "mime_type": file.content_type,
                "data": image_bytes
            }
        ]
    )

    return {
        "caption": response.text
    }