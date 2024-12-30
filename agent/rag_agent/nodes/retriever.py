from langchain_community.document_loaders import WebBaseLoader
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter

class Retriever:
    def __init__(self, url):
        self.url = url
        self.retriever = self._get_retriever(url)

    def _get_retriever(self, url):
        docs = WebBaseLoader(url).load()

        text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
            chunk_size=100, chunk_overlap=50
        )
        doc_splits = text_splitter.split_documents(docs)

        vectorstore = FAISS.from_documents(
            documents=doc_splits,
            embedding=FastEmbedEmbeddings(),
        )
        retriever = vectorstore.as_retriever()
        return retriever

    def update_retriever(self, url):
        self.url = url
        self.retriever = self._get_retriever(url)


url = "https://blog.langchain.dev/langgraph/"
retriever_instance = Retriever(url)
