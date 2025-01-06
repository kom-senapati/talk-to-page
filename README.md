![talk-to-page](https://socialify.git.ci/kom-senapati/talk-to-page/image?font=Source+Code+Pro&language=1&name=1&owner=1&pattern=Solid&stargazers=1&theme=Dark)
    
<p align="center">
  <img src="https://img.shields.io/badge/LICENSE-Unlicense-brightgreen" />
</p>

### ⭐ About  

- Open-source web app for chatting with web pages.  
- Built with Next.js, CopilotKit.  
- Uses a self-RAG LangGraph agent to interact with URLs.  
- Simplifies web content extraction and conversation.  

| Demo Video                                                                 | Blog Post                                                                 |
|----------------------------------------------------------------------------|--------------------------------------------------------------------------|
| [![YouTube](http://i.ytimg.com/vi/O0Y2WEqkros/hqdefault.jpg)](https://www.youtube.com/watch?v=O0Y2WEqkros) | [![Blog](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ffr5p7w1bobvfjpqw29gn.png)](https://dev.to/komsenapati/building-talk-to-page-chat-or-talk-with-any-website-g0h) |


### :hammer_and_wrench: Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/CopilotKit-🪁-black" alt="CopilotKit" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/ShadCN--UI-7F56D9" alt="ShadCN UI" />
  <img src="https://img.shields.io/badge/LangGraph-purple" alt="LangGraph" />
  <img src="https://img.shields.io/badge/FastAPI-blue" alt="FastAPI" />
</p>

### :outbox_tray: Set up

#### **Setting Up the Agent and UI**

##### **1. Get an API Key**
- Obtain a **GROQ_API_KEY**. 

##### **2. Clone the Repository**
- Clone the repository to your local machine:
   ```sh
   git clone https://github.com/kom-senapati/talk-to-page.git
   ```

##### **3. Set Up the Agent**
- Navigate to the agent directory:
   ```sh
   cd agent
   ```
- Install dependencies using Poetry:
   ```sh
   poetry install
   ```
- Create a `.env` file inside the `./agent` directory with your **GROQ_API_KEY**:
   ```
   GROQ_API_KEY=YOUR_API_KEY_HERE
   ```
- Run the agent demo:
   ```sh
   poetry run demo
   ```

##### **4. Set Up the UI**
- Navigate to the UI directory:
   ```sh
   cd ./ui
   ```
- Install dependencies using Bun:
   ```sh
   bun i
   ```
- Create a `.env` file inside the `./ui` directory with your **GROQ_API_KEY**:
   ```
   GROQ_API_KEY=YOUR_API_KEY_HERE
   ```
- Run the Next.js project:
   ```sh
   bun dev
   ```

#### **Troubleshooting**
1. Ensure no other local application is running on port **8000**.
2. In the file `/agent/rag_agent/demo.py`, change the address from `0.0.0.0` to `127.0.0.1` or `localhost` if needed.

### :email: Contact
Hi, I'm K Om Senapati! 👋  
Connect with me on [LinkedIn](https://www.linkedin.com/in/kom-senapati/), [X](https://x.com/kom_senapati) and check out my other projects on [GitHub](https://github.com/kom-senapati).
