import os
import tempfile
import shutil
from fastapi import UploadFile, File
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
from langchain_huggingface import HuggingFaceEndpointEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import PromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from pydantic import BaseModel
from dotenv import load_dotenv
load_dotenv()
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

embeddings = HuggingFaceEndpointEmbeddings(
    repo_id="sentence-transformers/all-MiniLM-L6-v2",
    huggingfacehub_api_token=os.getenv("HUGGINGFACEHUB_API_TOKEN")
)
vector_store=None
llm = HuggingFaceEndpoint(
    repo_id="openai/gpt-oss-120b",
    temperature=0.5,
    huggingfacehub_api_token=os.getenv("HUGGINGFACEHUB_API_TOKEN")
)
chat_model = ChatHuggingFace(llm=llm)
prompt = PromptTemplate(
    template="""
You are a smart RAG Chat-bot who carefully reads PDF
Use ONLY the provided context.

If the answer is not in the context, say:
"I don't know based on the document."

Chat History:
{chat_history}

Context:
{context}

Question:
{question}

Formatting Rules:
- Use clear section headings (##)
- Use bullet points instead of tables
- Avoid repeating raw resume formatting
- Keep spacing clean
- Do not copy tables directly
- Convert structured resume data into readable explanation
""",
    input_variables=["chat_history", "context", "question"]
)
memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=False
)

# @app.post("/upload-pdf") 
# async def upload_pdf(file: UploadFile=File(...)):
#     global vector_store,me

#     with tempfile.NamedTemporaryFile(delete=False,suffix=".pdf") as temp_file:
#         temp_file.write(await file.read())
#         temp_path=temp_file.name

#     loader=PyPDFLoader(temp_path)
#     documents=loader.load()

#     text_splitter=RecursiveCharacterTextSplitter(
#         chunk_size=1000,
#         chunk_overlap=200
#     )
#     text=text_splitter.split_documents(documents)
#     vector_store=FAISS.from_documents(text,embeddings)

#     os.remove(temp_path)

#     return {"message":"PDF uploaded and processed successfully."}
@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    global vector_store, memory

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
        temp_file.write(await file.read())
        temp_path = temp_file.name

    loader = PyPDFLoader(temp_path)
    documents = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )

    text = text_splitter.split_documents(documents)
    vector_store = FAISS.from_documents(text, embeddings)

    memory.clear()

    os.remove(temp_path)

    return {"message": "PDF uploaded and processed successfully."}

class QuestionRequest(BaseModel):
    question: str
@app.post("/ask")
async def ask_question(data: QuestionRequest):
    global vector_store, memory

    question = data.question

    if vector_store is None:
        return {"error": "Please upload a PDF first."}

    retriever = vector_store.as_retriever(search_kwargs={"k": 12})

    docs = retriever.invoke(question)

    if not docs:
        return {"answer": "I couldn't find relevant information in the document."}

    context = "\n\n".join(doc.page_content for doc in docs)

    chat_history = memory.load_memory_variables({})["chat_history"]

    final_prompt = prompt.invoke({
        "chat_history": chat_history,
        "context": context,
        "question": question
    })

    response = chat_model.invoke(final_prompt)

    memory.save_context(
        {"input": question},
        {"output": response.content}
    )

    return {
        "answer": response.content,
        "sources": [
                        {
                            "page": doc.metadata.get("page"),
                            "source": doc.metadata.get("source")
                        }
                        for doc in docs
                    ]
    }



